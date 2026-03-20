import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

interface UserProfile {
  id: string;
  name: string;
  hasSkills: string[];
  wantsSkills: string[];
  socketId?: string;
  isOnline: boolean;
}

interface SkillRequest {
  id: string;
  senderId: string;
  receiverId: string;
  skillToShare: string;
  skillToLearn: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const users: UserProfile[] = [];
const skillRequests: SkillRequest[] = [];

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
}

const messages: Message[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  const httpServer = http.createServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*", // Allow all origins for simplicity in dev, refine in prod
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('registerUser', (userProfile: Omit<UserProfile, 'id' | 'socketId' | 'isOnline'>) => {
      const existingUserIndex = users.findIndex(u => u.name === userProfile.name);
      let currentUser: UserProfile;

      if (existingUserIndex !== -1) {
        // Update existing user's socket ID and set online
        currentUser = { ...users[existingUserIndex], socketId: socket.id, isOnline: true };
        users[existingUserIndex] = currentUser;
      } else {
        // Create new user
        currentUser = { id: socket.id, ...userProfile, socketId: socket.id, isOnline: true };
        users.push(currentUser);
      }
      
      socket.emit('currentUser', currentUser);
      io.emit('updateUsers', users.map(u => ({ ...u, isOnline: !!u.socketId }))); // Broadcast active users with online status
      console.log('Registered users:', users.map(u => ({ id: u.id, name: u.name, socketId: u.socketId, isOnline: u.isOnline })));
    });

    socket.on('requestSkillShare', (data: { receiverId: string; skillToShare: string; skillToLearn: string }) => {
      const sender = users.find(u => u.socketId === socket.id);
      const receiver = users.find(u => u.id === data.receiverId);

      if (sender && receiver) {
        const requestId = `${sender.id}-${receiver.id}-${Date.now()}`;
        const request: SkillRequest = {
          id: requestId,
          senderId: sender.id,
          receiverId: receiver.id,
          skillToShare: data.skillToShare,
          skillToLearn: data.skillToLearn,
          status: 'pending'
        };
        skillRequests.push(request);
        
        // Notify receiver
        if (receiver.socketId) {
          io.to(receiver.socketId).emit('newSkillRequest', request);
        }
        // Notify sender of request sent
        socket.emit('skillRequestSent', request);
        console.log('Skill request sent:', request);
      }
    });

    socket.on('respondToSkillRequest', (data: { requestId: string; status: 'accepted' | 'rejected' }) => {
      const requestIndex = skillRequests.findIndex(req => req.id === data.requestId);
      if (requestIndex !== -1) {
        skillRequests[requestIndex].status = data.status;
        const updatedRequest = skillRequests[requestIndex];

        const sender = users.find(u => u.id === updatedRequest.senderId);
        const receiver = users.find(u => u.id === updatedRequest.receiverId);

        if (sender && receiver) {
          // Notify sender of response
          if (sender.socketId) {
            io.to(sender.socketId).emit('skillRequestResponse', updatedRequest);
          }
          // Notify receiver (self) of response
          socket.emit('skillRequestResponse', updatedRequest);
          console.log('Skill request responded:', updatedRequest);
        }
      }
    });

    socket.on('sendMessage', (data: { receiverId: string; content: string }) => {
      const sender = users.find(u => u.socketId === socket.id);
      const receiver = users.find(u => u.id === data.receiverId);

      if (sender && receiver) {
        const message: Message = {
          id: `${sender.id}-${receiver.id}-${Date.now()}`,
          senderId: sender.id,
          receiverId: receiver.id,
          content: data.content,
          timestamp: Date.now(),
        };
        messages.push(message);

        // Emit message to sender and receiver
        socket.emit('chatMessage', message);
        if (receiver.socketId) {
          io.to(receiver.socketId).emit('chatMessage', message);
        }
        console.log('Message sent:', message);
      }
    });

    socket.on('getChatHistory', (partnerId: string) => {
      const currentUser = users.find(u => u.socketId === socket.id);
      if (currentUser) {
        const chatHistory = messages.filter(
          msg => (msg.senderId === currentUser.id && msg.receiverId === partnerId) ||
                 (msg.senderId === partnerId && msg.receiverId === currentUser.id)
        ).sort((a, b) => a.timestamp - b.timestamp);
        socket.emit('chatHistory', chatHistory);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      const disconnectedUserIndex = users.findIndex(u => u.socketId === socket.id);
      if (disconnectedUserIndex !== -1) {
        users[disconnectedUserIndex].socketId = undefined; // Clear socket ID
        users[disconnectedUserIndex].isOnline = false; // Set offline
        io.emit('updateUsers', users.map(u => ({ ...u, isOnline: !!u.socketId }))); // Broadcast updated online status
        console.log('Active users after disconnect:', users.filter(u => u.isOnline).map(u => u.name));
      }
    });
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
