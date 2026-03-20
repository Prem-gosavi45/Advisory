import { useState } from 'react';
import { 
  Search, BookOpen, GraduationCap, Users, MessageSquare, 
  Star, Filter, CheckCircle2, Clock, ArrowRightLeft,
  Zap, ShieldCheck, UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
  teaches: string[];
  learns: string[];
  rating: number;
  reviews: number;
  isOnline?: boolean;
  matchPercentage?: number; // Simulated match score
}

interface ConnectionRequest {
  id: string;
  user: SkillUser;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  timestamp: string;
}

export default function SkillShare() {
  const [activeTab, setActiveTab] = useState<'discover' | 'requests' | 'matches'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'perfect-match'>('all');

  // Mock Current User Skills
  const mySkills = {
    teaching: ['Java', 'React', 'System Design'],
    learning: ['Python', 'Machine Learning', 'UI/UX']
  };

  const [users, setUsers] = useState<SkillUser[]>([
    {
      id: '1',
      name: 'Aarav Patel',
      role: 'Senior Backend Dev',
      avatar: 'https://picsum.photos/seed/aarav/200/200',
      teaches: ['Python', 'Django', 'AWS'],
      learns: ['Java', 'Spring Boot'],
      rating: 4.9,
      reviews: 124,
      isOnline: true,
      matchPercentage: 95
    },
    {
      id: '2',
      name: 'Sneha Gupta',
      role: 'Product Designer',
      avatar: 'https://picsum.photos/seed/sneha/200/200',
      teaches: ['UI/UX', 'Figma', 'User Research'],
      learns: ['React', 'Frontend Basics'],
      rating: 4.8,
      reviews: 89,
      matchPercentage: 88
    },
    {
      id: '3',
      name: 'Rohan Sharma',
      role: 'Data Scientist',
      avatar: 'https://picsum.photos/seed/rohan/200/200',
      teaches: ['Machine Learning', 'Statistics', 'R'],
      learns: ['System Design', 'Go'],
      rating: 4.7,
      reviews: 56,
      isOnline: true,
      matchPercentage: 75
    },
    {
      id: '4',
      name: 'Priya Singh',
      role: 'Mobile Developer',
      avatar: 'https://picsum.photos/seed/priya/200/200',
      teaches: ['Flutter', 'Dart', 'Firebase'],
      learns: ['Kubernetes', 'Docker'],
      rating: 4.6,
      reviews: 34,
      matchPercentage: 45
    },
    {
      id: '5',
      name: 'Vikram Malhotra',
      role: 'DevOps Engineer',
      avatar: 'https://picsum.photos/seed/vikram/200/200',
      teaches: ['Kubernetes', 'Docker', 'Terraform'],
      learns: ['React', 'Node.js'],
      rating: 4.9,
      reviews: 210,
      isOnline: true,
      matchPercentage: 60
    }
  ]);

  const [requests, setRequests] = useState<ConnectionRequest[]>([
    {
      id: '101',
      user: {
        id: '6',
        name: 'Ishaan Kumar',
        role: 'Frontend Dev',
        avatar: 'https://picsum.photos/seed/ishaan/200/200',
        teaches: ['Vue.js', 'Nuxt'],
        learns: ['Java'],
        rating: 4.5,
        reviews: 12
      },
      status: 'pending',
      message: "Hi! I see you know Java. I can teach you Vue.js in exchange.",
      timestamp: '2 hours ago'
    }
  ]);

  const [connections, setConnections] = useState<SkillUser[]>([]);

  const handleConnect = (user: SkillUser) => {
    // Simulate sending a request
    alert(`Request sent to ${user.name}!`);
    // In a real app, this would update backend state
  };

  const handleAccept = (req: ConnectionRequest) => {
    setConnections([...connections, req.user]);
    setRequests(requests.filter(r => r.id !== req.id));
  };

  const handleReject = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.teaches.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          user.learns.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedFilter === 'perfect-match') {
      return matchesSearch && (user.matchPercentage || 0) > 80;
    }
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 h-[calc(100vh-6rem)] flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ArrowRightLeft className="text-indigo-600" size={32} />
            Skill Share
          </h1>
          <p className="text-gray-500 mt-1">Exchange knowledge, build connections, and grow together.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 hidden md:block">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">I want to learn</span>
            <div className="font-bold text-indigo-900">{mySkills.learning.join(', ')}</div>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100 hidden md:block">
            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">I can teach</span>
            <div className="font-bold text-green-900">{mySkills.teaching.join(', ')}</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-6 border-b border-gray-200 px-4">
        <button 
          onClick={() => setActiveTab('discover')}
          className={`pb-4 px-2 font-bold text-sm transition-colors relative ${
            activeTab === 'discover' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Discover Peers
          {activeTab === 'discover' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className={`pb-4 px-2 font-bold text-sm transition-colors relative ${
            activeTab === 'requests' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Requests <span className="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{requests.length}</span>
          {activeTab === 'requests' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('matches')}
          className={`pb-4 px-2 font-bold text-sm transition-colors relative ${
            activeTab === 'matches' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Matches <span className="ml-1 bg-gray-200 text-gray-700 text-[10px] px-1.5 py-0.5 rounded-full">{connections.length}</span>
          {activeTab === 'matches' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {activeTab === 'discover' && (
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name, skill to learn, or skill to teach..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                />
              </div>
              <button 
                onClick={() => setSelectedFilter(selectedFilter === 'all' ? 'perfect-match' : 'all')}
                className={`px-4 py-2 rounded-xl border font-bold flex items-center gap-2 transition-all ${
                  selectedFilter === 'perfect-match' 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Zap size={18} className={selectedFilter === 'perfect-match' ? 'fill-indigo-700' : ''} />
                Perfect Matches Only
              </button>
            </div>

            {/* User Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <motion.div 
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                >
                  {/* Match Badge */}
                  {(user.matchPercentage || 0) > 80 && (
                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-indigo-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                      {user.matchPercentage}% Match
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
                      <p className="text-gray-500 text-sm">{user.role}</p>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold mt-1">
                        <Star size={12} className="fill-yellow-500" />
                        {user.rating} <span className="text-gray-400 font-normal">({user.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-green-600 uppercase tracking-wider mb-2">
                        <GraduationCap size={14} /> Teaches
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {user.teaches.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium border border-green-100">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                        <BookOpen size={14} /> Wants to Learn
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {user.learns.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium border border-indigo-100">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleConnect(user)}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-gray-200"
                  >
                    <UserPlus size={18} /> Connect & Swap
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="max-w-3xl mx-auto space-y-4">
            {requests.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users size={48} className="mx-auto mb-4 opacity-20" />
                <p>No pending requests.</p>
              </div>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <img src={req.user.avatar} alt={req.user.name} className="w-16 h-16 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{req.user.name}</h3>
                        <p className="text-gray-500 text-sm">{req.user.role}</p>
                      </div>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={12} /> {req.timestamp}
                      </span>
                    </div>
                    
                    <div className="mt-3 bg-gray-50 p-3 rounded-xl text-sm text-gray-600 italic border border-gray-100">
                      "{req.message}"
                    </div>

                    <div className="flex gap-4 mt-4">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-green-600">Teaches:</span> {req.user.teaches.join(', ')}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-indigo-600">Learns:</span> {req.user.learns.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <button 
                      onClick={() => handleAccept(req)}
                      className="flex-1 md:flex-none px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => handleReject(req.id)}
                      className="flex-1 md:flex-none px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="grid md:grid-cols-2 gap-6">
            {connections.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-gray-500">
                <ArrowRightLeft size={48} className="mx-auto mb-4 opacity-20" />
                <p>No active connections yet. Start discovering!</p>
              </div>
            ) : (
              connections.map((user) => (
                <div key={user.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{user.name}</h3>
                    <p className="text-xs text-gray-500">Connected since today</p>
                  </div>
                  <button className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
                    <MessageSquare size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
