import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, Share, Music2, Play, Volume2, VolumeX,
  ThumbsUp, Search, GraduationCap, Lightbulb, Brain, Target,
  Send, Clock, FileText, Sparkles, Youtube, Sun, Moon,
  BookOpen, Landmark, Cpu, Palette, Languages, X, Filter, Activity, Loader2, Paperclip, Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- API KEYS ---
const GEMINI_API_KEY = "AIzaSyA16m2AZcE04z3Sbz2C0VR-p-zTD7RDrMs";
const YOUTUBE_API_KEY = "AIzaSyCgeyt37hE-X3ja6IgjHUTLYvgu0SK1Mow";

// --- INTERFACES ---
interface Reel {
  id: string;
  videoUrl: string;
  thumbnail: string;
  creator: { name: string; avatar: string; isSubscribed: boolean; };
  description: string;
  tags: string[];
  likes: number;
  comments: string;
  category: string;
  transcript: string;
  summary: string;
}

// Fallback Mock Data in case API fails
const fallbackReels: Reel[] = [
  {
    id: '1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://picsum.photos/seed/reel1/400/700',
    creator: { name: 'TechWithTim', avatar: 'https://picsum.photos/seed/avatar1/50/50', isSubscribed: false },
    description: 'Quick tip on how to optimize your Python code! 🐍 #python #coding',
    tags: ['Python', 'Coding', 'Optimization'],
    likes: 12400, comments: '452', category: 'Programming',
    transcript: "0:00 Welcome back everyone.\n0:02 Today I'm going to show you a quick trick to make your Python loops 10x faster.",
    summary: "This video demonstrates how to optimize Python performance by replacing standard for-loops with list comprehensions."
  }
];

// --- CATEGORY DATA ---
const categoryGroups = [
  { title: "School Education", icon: BookOpen, items: ["Physics", "Chemistry", "Biology", "Mathematics", "Statistics", "Geography", "History", "Computer Basics", "Environmental Science"] },
  { title: "Competitive Exams", icon: Landmark, items: ["UPSC Civil Services", "MPSC State Services", "SSC CGL", "IBPS PO", "JEE Main", "NEET UG", "Railway Exams", "Defence Exams"] },
  { title: "Skills & Technology", icon: Cpu, items: ["Programming", "Web Development", "Mobile App Development", "Data Science", "Artificial Intelligence", "Machine Learning", "Cybersecurity", "Cloud Computing", "DevOps"] },
  { title: "College & University", icon: GraduationCap, items: ["Computer Science", "Data Structures", "Operating Systems", "Computer Networks", "DBMS", "Software Engineering", "Mathematics for CS"] },
  { title: "Career Development", icon: Target, items: ["Resume Building", "Interview Preparation", "Communication Skills", "Public Speaking", "Freelancing", "Entrepreneurship"] },
  { title: "Creative & Practical", icon: Palette, items: ["Graphic Design", "Video Editing", "Music Production", "Photography", "Content Creation", "UI/UX Design"] },
  { title: "Language Learning", icon: Languages, items: ["English", "Hindi", "Marathi", "Spanish", "French", "German"] }
];

// --- CENTER REEL COMPONENT ---
const ReelItem = ({ reel, isActive, isGlobalMuted, onPlayStateChange }: { reel: Reel, isActive: boolean, isGlobalMuted: boolean, onPlayStateChange: (playing: boolean) => void }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;

    if (isActive) {
      iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      setIsPlaying(true);
    } else {
      iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      setIsPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    const command = isGlobalMuted ? 'mute' : 'unMute';
    iframeRef.current.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
  }, [isGlobalMuted, isActive]);

  useEffect(() => {
    if (isActive) onPlayStateChange(isPlaying);
  }, [isPlaying, isActive, onPlayStateChange]);

  const handleVideoClick = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;

    if (isPlaying) {
      iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      setIsPlaying(false);
    } else {
      iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      setIsPlaying(true);
    }
  };

  const videoId = reel.id;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${videoId}&autoplay=${isActive ? 1 : 0}&mute=${isGlobalMuted ? 1 : 0}`;

  return (
    <div className="h-full w-full snap-start relative bg-black overflow-hidden group border-b border-[#333]">
      <div className="absolute inset-0 z-10 cursor-pointer" onClick={handleVideoClick} onDoubleClick={() => setIsLiked(true)} />
      <iframe ref={iframeRef} src={embedUrl} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-150" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />

      <AnimatePresence>
        {!isPlaying && isActive && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center"><Play size={32} fill="white" className="text-white ml-2 opacity-90" /></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none top-1/2 z-0" />

      {/* Right Side Actions */}
      <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5 z-20">
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => setIsLiked(!isLiked)} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-all bg-black/40 backdrop-blur-md relative z-20">
            <ThumbsUp size={18} fill={isLiked ? "white" : "none"} />
          </button>
          <span className="text-white text-[10px] font-semibold">{reel.likes >= 1000 ? (reel.likes / 1000).toFixed(1) + 'k' : reel.likes}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-all bg-black/40 backdrop-blur-md relative z-20"><MessageSquare size={18} /></button>
          <span className="text-white text-[10px] font-semibold">{reel.comments}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-all bg-black/40 backdrop-blur-md relative z-20"><Share size={18} /></button>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute left-0 right-16 bottom-4 p-4 space-y-2 z-20 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto relative z-20">
          <img src={reel.creator.avatar} className="w-8 h-8 rounded-full object-cover border border-white/20" />
          <span className="text-white font-bold text-sm">@{reel.creator.name}</span>
        </div>
        <p className="text-white/90 text-[13px] leading-relaxed line-clamp-2 pr-2 drop-shadow-md">{reel.description}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 z-20">
        <motion.div className="h-full bg-red-600" initial={{ width: 0 }} animate={{ width: isPlaying ? '100%' : '0%' }} transition={{ duration: 15, ease: "linear" }} />
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---
export default function EduReels() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('Programming');
  const [activeRightTab, setActiveRightTab] = useState<'transcript' | 'summary'>('transcript');

  // Modals & State
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [reels, setReels] = useState<Reel[]>([]);
  const [isFetchingReels, setIsFetchingReels] = useState(true);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Analytics State
  const [globalIsPlaying, setGlobalIsPlaying] = useState(false);
  const [watchStats, setWatchStats] = useState({
    totalSeconds: 0,
    categorySeconds: {} as Record<string, number>,
    seenReelIds: new Set<string>()
  });

  const currentReel = reels[currentReelIndex] || fallbackReels[0];
  const containerRef = useRef<HTMLDivElement>(null);

  // --- FETCH YOUTUBE SHORTS ---
  useEffect(() => {
    const fetchYouTubeReels = async () => {
      setIsFetchingReels(true);
      try {
        const searchQuery = activeCategory === 'All' ? 'Educational Shorts' : `${activeCategory} educational tutorial shorts`;
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${encodeURIComponent(searchQuery)}&type=video&videoDuration=short&key=${YOUTUBE_API_KEY}`);

        if (!response.ok) throw new Error('YouTube API quota exceeded or invalid key.');

        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const mappedReels: Reel[] = data.items.map((item: any) => ({
            id: item.id.videoId,
            videoUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
            thumbnail: item.snippet.thumbnails.high.url,
            creator: {
              name: item.snippet.channelTitle,
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${item.snippet.channelTitle}`,
              isSubscribed: false
            },
            description: item.snippet.title,
            tags: [activeCategory.split(' ')[0], 'Education', 'Shorts'],
            likes: Math.floor(Math.random() * 10000) + 500,
            comments: Math.floor(Math.random() * 500).toString(),
            category: activeCategory,
            transcript: "Live transcripts are not available from the basic Search API. Listen to the audio for detailed instructions.",
            summary: `An educational short by ${item.snippet.channelTitle} discussing topics related to ${activeCategory}.`
          }));

          setReels(mappedReels);
        } else {
          setReels(fallbackReels);
        }
      } catch (error) {
        console.error("Failed to fetch YouTube reels, using fallback.", error);
        setReels(fallbackReels);
      } finally {
        setIsFetchingReels(false);
        setCurrentReelIndex(0);
        if (containerRef.current) containerRef.current.scrollTop = 0;
      }
    };

    fetchYouTubeReels();
  }, [activeCategory]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [chatMessages, isChatLoading, showChatModal]);

  // Reset chat on reel change
  useEffect(() => {
    if (currentReel && reels.length > 0) {
      setChatMessages([
        { role: 'ai', text: `Hi! I'm your AI Tutor. I'm analyzing the current ${currentReel.category} video by @${currentReel.creator.name}. What would you like to ask or discuss?` }
      ]);
    }
  }, [currentReel?.id, reels.length]);

  // --- GEMINI AI API FUNCTION ---
  // --- UPDATED AI API FUNCTION ---
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    const API_KEY = "AIzaSyCQWllM51HidUNNwBWD861oafEy1MEzSts";

    // 2026 UNIVERSAL STABLE MODEL
    const model = "gemini-2.5-flash";

    try {
      // Using the v1 endpoint with the 2.5 series model
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a helpful educational AI tutor. The student is watching a video about ${currentReel?.category}. Question: ${userMsg}`
              }]
            }]
          })
        }
      );

      const data = await response.json();

      if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
        const aiText = data.candidates[0].content.parts[0].text.replace(/\*\*/g, '');
        setChatMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      } else {
        // If 2.5 is not yet enabled for your specific project, try the newest 3.1 lite
        throw new Error("MODEL_NOT_READY");
      }
    } catch (err) {
      console.warn("API Switch: Trying Gemini 3.1 Flash Lite...");

      try {
        const altResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `Briefly answer: ${userMsg}` }] }]
            })
          }
        );
        const altData = await altResponse.json();
        const finalAiText = altData.candidates[0].content.parts[0].text.replace(/\*\*/g, '');
        setChatMessages(prev => [...prev, { role: 'ai', text: finalAiText }]);
      } catch (finalErr) {
        setChatMessages(prev => [...prev, {
          role: 'ai',
          text: "I'm optimizing your connection. Please ensure 'Gemini API' is enabled in your Google AI Studio dashboard for 2026 models."
        }]);
      }
    } finally {
      setIsChatLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  // Analytics Timers & Scroll
  useEffect(() => {
    if (currentReel && reels.length > 0) {
      setWatchStats(prev => {
        const newSet = new Set(prev.seenReelIds);
        newSet.add(currentReel.id);
        return { ...prev, seenReelIds: newSet };
      });
    }
  }, [currentReel?.id, reels.length]);

  useEffect(() => {
    let interval: any;
    if (globalIsPlaying && currentReel && !isFetchingReels) {
      interval = setInterval(() => {
        setWatchStats(prev => {
          const cat = currentReel.category;
          const currentCatTime = prev.categorySeconds[cat] || 0;
          return {
            ...prev,
            totalSeconds: prev.totalSeconds + 1,
            categorySeconds: { ...prev.categorySeconds, [cat]: currentCatTime + 1 }
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [globalIsPlaying, currentReel, isFetchingReels]);

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
      if (index !== currentReelIndex) setCurrentReelIndex(index);
    }
  };

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setShowCategoryModal(false);
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const topCategory = Object.entries(watchStats.categorySeconds).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  // --- THEME VARIABLES ---
  const theme = {
    card: isDarkMode ? 'bg-[#121212] border-gray-800' : 'bg-white border-gray-200 shadow-sm',
    textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    hoverBg: isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100',
    activeBtn: isDarkMode ? 'bg-white text-black shadow-md' : 'bg-gray-900 text-white shadow-md',
    tabHeaderBg: isDarkMode ? 'bg-[#1a1a1a] border-gray-800' : 'bg-gray-50 border-gray-200',
    tabContentBg: isDarkMode ? 'bg-[#121212]' : 'bg-white',
    chatBubbleAI: isDarkMode ? 'bg-[#1a1a1a] border-gray-800 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700',
    chatBubbleUser: 'bg-red-600 text-white shadow-md',
    chatInputBg: isDarkMode ? 'bg-[#0a0a0a] border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900',
    chatIconBg: isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800',
    ring: isDarkMode ? 'ring-[#121212]' : 'ring-gray-200',
    modalOverlay: isDarkMode ? 'bg-black/70' : 'bg-gray-900/50',
  };

  return (
    <div className="w-full h-[calc(100vh-2rem)] min-h-[600px] bg-transparent flex p-4 gap-6 font-sans overflow-hidden transition-colors duration-300 relative">

      {/* POP-UP MODAL: CATEGORY SELECTION */}
      <AnimatePresence>
        {showCategoryModal && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${theme.modalOverlay}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl shadow-2xl border ${theme.card}`}
            >
              <div className={`p-6 border-b ${theme.tabHeaderBg} flex justify-between items-center shrink-0 rounded-t-3xl`}>
                <div className="flex items-center gap-3">
                  <Filter className="text-red-500" size={24} />
                  <h2 className={`text-xl font-extrabold ${theme.textPrimary}`}>Explore Categories</h2>
                </div>
                <button onClick={() => setShowCategoryModal(false)} className={`p-2 rounded-full transition-colors ${theme.hoverBg}`}>
                  <X size={24} className={theme.textPrimary} />
                </button>
              </div>

              <div className={`p-6 overflow-y-auto no-scrollbar flex-1 ${theme.tabContentBg} rounded-b-3xl`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {categoryGroups.map((group, idx) => (
                    <div key={idx} className="flex flex-col gap-3">
                      <div className={`flex items-center gap-2 text-sm font-bold ${theme.textPrimary} border-b border-gray-800 pb-2`}>
                        <group.icon size={16} className="text-red-500" /> {group.title}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <button key={item} onClick={() => selectCategory(item)} className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all border ${activeCategory === item ? 'bg-red-500 text-white border-red-500 shadow-md' : `${isDarkMode ? 'bg-[#1a1a1a] border-gray-800 text-gray-300 hover:border-gray-600' : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-400'}`}`}>
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POP-UP MODAL: AI CHAT ASSISTANT */}
      <AnimatePresence>
        {showChatModal && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${theme.modalOverlay}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full max-w-2xl h-[80vh] flex flex-col rounded-3xl shadow-2xl border ${theme.card} overflow-hidden relative`}
            >
              <div className={`p-4 border-b ${theme.tabHeaderBg} flex justify-between items-center shrink-0`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h2 className={`text-lg font-extrabold ${theme.textPrimary}`}>AI Tutor</h2>
                    <p className={`text-[11px] ${theme.textSecondary} flex items-center gap-1`}>
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online and ready to help
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowChatModal(false)} className={`p-2 rounded-full transition-colors ${theme.hoverBg}`}>
                  <X size={24} className={theme.textPrimary} />
                </button>
              </div>

              <div ref={chatScrollRef} className={`flex-1 p-6 flex flex-col gap-4 overflow-y-auto ${theme.tabContentBg} pb-24`}>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl max-w-[85%] text-[14px] leading-relaxed shadow-sm ${msg.role === 'ai' ? `border self-start rounded-tl-sm ${theme.chatBubbleAI}` : `self-end rounded-tr-sm ${theme.chatBubbleUser}`}`}>
                    {msg.text}
                  </div>
                ))}
                {isChatLoading && (
                  <div className={`border self-start p-4 rounded-2xl rounded-tl-sm max-w-[85%] ${theme.chatBubbleAI} flex gap-1.5 items-center`}>
                    <span className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                )}
              </div>

              <div className={`p-4 border-t ${theme.card} absolute bottom-0 left-0 right-0 w-full`}>
                <div className="mb-3 ml-2 flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-medium ${isDarkMode ? 'bg-[#1a1a1a] border-gray-700 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                    <Paperclip size={12} className="text-red-500" />
                    Attached Context: <span className="font-bold">{currentReel?.category} Reel by @{currentReel?.creator.name}</span>
                  </div>
                </div>

                <div className={`flex items-center gap-3 rounded-full border p-1.5 pl-5 transition-colors shadow-inner ${theme.chatInputBg}`}>
                  <button className={`p-1.5 rounded-full ${theme.hoverBg} text-gray-400 hover:text-red-500 transition-colors`} title="Attach File (Simulated)">
                    <Paperclip size={18} />
                  </button>
                  <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask a question about this video..." className="bg-transparent text-sm outline-none flex-1 placeholder-gray-500" disabled={isChatLoading} />
                  <button onClick={handleSendMessage} disabled={isChatLoading || !chatInput.trim()} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 disabled:opacity-50 ${theme.chatIconBg}`}>
                    <Send size={16} className="ml-[-2px]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LEFT COLUMN: Controls & Functional Stats */}
      <div className="w-1/4 min-w-[240px] max-w-[280px] flex flex-col gap-4 shrink-0">

        <div className={`${theme.card} rounded-2xl p-5 border flex items-center justify-between transition-colors duration-300 shrink-0`}>
          <div className="flex items-center gap-3">
            <Youtube className="text-red-600" size={28} />
            <h1 className={`${theme.textPrimary} font-extrabold text-xl tracking-tight transition-colors duration-300`}>EduReels</h1>
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full ${theme.hoverBg} ${theme.textSecondary} transition-colors`}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className={`${theme.card} rounded-2xl p-6 border flex flex-col transition-colors duration-300`}>
          <h3 className={`text-[11px] font-bold ${theme.textSecondary} uppercase tracking-wider mb-2 flex items-center gap-2 transition-colors duration-300`}>
            <Filter size={14} /> Content Filter
          </h3>
          <p className={`text-xs ${theme.textSecondary} mb-4 transition-colors duration-300`}>
            Currently viewing:<br />
            <span className={`font-bold text-[14px] mt-1 block ${theme.textPrimary} truncate`}>{activeCategory}</span>
          </p>
          <button onClick={() => setShowCategoryModal(true)} className={`w-full py-3 px-4 rounded-xl text-[13px] font-bold transition-all shadow-sm flex justify-center items-center gap-2 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-black'}`}>
            <Search size={16} /> Browse Categories
          </button>
        </div>

        <div className={`${theme.card} rounded-2xl p-6 border flex-1 transition-colors duration-300`}>
          <h3 className={`text-[11px] font-bold ${theme.textSecondary} uppercase tracking-wider mb-6 flex items-center gap-2 transition-colors duration-300`}>
            <Activity size={14} /> Learning Stats
          </h3>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-500/10 rounded-xl text-red-500"><Clock size={16} /></div>
                <div className="flex flex-col">
                  <span className={`text-xs font-bold ${theme.textPrimary}`}>Watch Time</span>
                  <span className={`text-[10px] ${theme.textSecondary}`}>Session Total</span>
                </div>
              </div>
              <span className={`text-sm font-black ${theme.textPrimary}`}>{formatTime(watchStats.totalSeconds)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500"><Play size={16} /></div>
                <div className="flex flex-col">
                  <span className={`text-xs font-bold ${theme.textPrimary}`}>Reels Viewed</span>
                  <span className={`text-[10px] ${theme.textSecondary}`}>Unique Videos</span>
                </div>
              </div>
              <span className={`text-sm font-black ${theme.textPrimary}`}>{watchStats.seenReelIds.size}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-500"><Target size={16} /></div>
                <div className="flex flex-col">
                  <span className={`text-xs font-bold ${theme.textPrimary}`}>Top Topic</span>
                  <span className={`text-[10px] ${theme.textSecondary}`}>Most Watched</span>
                </div>
              </div>
              <span className={`text-[11px] font-bold ${theme.textPrimary} max-w-[80px] text-right truncate`} title={topCategory}>{topCategory}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER COLUMN: The Video Reel Feed */}
      <div className="flex-1 flex flex-col items-center justify-center bg-transparent relative min-w-[320px]">
        <div className="absolute top-0 right-4 z-40 hidden lg:block">
          <button onClick={() => setIsMuted(!isMuted)} className="text-white bg-black/60 p-3 rounded-full backdrop-blur-md hover:bg-black/80 transition-colors shadow-lg border border-gray-700">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        <div className={`w-full max-w-[380px] h-[85vh] max-h-[850px] min-h-[500px] rounded-[2rem] overflow-hidden shadow-2xl ring-[6px] ${theme.ring} bg-black relative transition-all duration-300`}>
          {isFetchingReels ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212] z-50">
              <Loader2 size={40} className="text-red-500 animate-spin mb-4" />
              <p className="text-white text-sm font-bold">Fetching YouTube Shorts...</p>
            </div>
          ) : (
            <div ref={containerRef} onScroll={handleScroll} className="h-full w-full overflow-y-scroll snap-y snap-mandatory bg-black [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {reels.length > 0 ? (
                reels.map((reel, index) => (
                  <ReelItem key={reel.id} reel={reel} isActive={currentReelIndex === index} isGlobalMuted={isMuted} onPlayStateChange={(playing) => setGlobalIsPlaying(playing)} />
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-white/50 text-sm flex-col gap-4 text-center px-8">
                  <Search size={40} className="text-white/20" />
                  <p>No educational reels found for <span className="font-bold text-white">{activeCategory}</span> yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Transcript, Summary & AI Btn */}
      <div className="w-1/4 min-w-[280px] max-w-[320px] flex flex-col gap-4 shrink-0">

        <div className={`${theme.card} rounded-2xl border flex-1 flex flex-col overflow-hidden transition-colors duration-300`}>
          <div className={`flex border-b ${theme.tabHeaderBg} transition-colors duration-300`}>
            <button onClick={() => setActiveRightTab('transcript')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeRightTab === 'transcript' ? `${theme.textPrimary} ${theme.tabContentBg} border-b-2 border-red-500` : `${theme.textSecondary} ${theme.hoverBg}`}`}>
              <FileText size={16} /> Transcript
            </button>
            <button onClick={() => setActiveRightTab('summary')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeRightTab === 'summary' ? `${theme.textPrimary} ${theme.tabContentBg} border-b-2 border-red-500` : `${theme.textSecondary} ${theme.hoverBg}`}`}>
              <Lightbulb size={16} /> Summary
            </button>
          </div>

          <div className={`p-6 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden ${theme.tabContentBg} transition-colors duration-300`}>
            <AnimatePresence mode="wait">
              {activeRightTab === 'summary' ? (
                <motion.div key="summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className={`text-base font-bold ${theme.textPrimary} mb-4 transition-colors duration-300`}>Reel Summary</h3>
                  <p className={`text-sm leading-relaxed p-5 rounded-xl border ${theme.chatBubbleAI} transition-colors duration-300`}>
                    {currentReel?.summary || "No summary available for this content."}
                  </p>
                </motion.div>
              ) : (
                <motion.div key="transcript" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className={`text-base font-bold ${theme.textPrimary} mb-4 transition-colors duration-300`}>Transcript</h3>
                  <div className="space-y-4">
                    {currentReel?.transcript ? currentReel.transcript.split('\n').map((line, idx) => {
                      const [time, ...textParts] = line.split(' ');
                      return (
                        <p key={idx} className={`text-sm ${theme.textSecondary} leading-relaxed ${theme.hoverBg} hover:${theme.textPrimary} p-2 rounded-lg transition-colors cursor-pointer flex gap-4`}>
                          <span className="text-red-500 font-mono font-semibold shrink-0 w-10">{time}</span>
                          <span>{textParts.join(' ')}</span>
                        </p>
                      );
                    }) : <p className={`text-sm ${theme.textSecondary}`}>Transcript unavailable.</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Big 'Ask AI' Button */}
        <button
          onClick={() => setShowChatModal(true)}
          className={`w-full p-4 rounded-2xl border flex items-center justify-center gap-3 text-sm font-bold transition-all shadow-lg hover:scale-[1.02] active:scale-95 ${isDarkMode ? 'bg-red-600 border-red-500 text-white hover:bg-red-700' : 'bg-red-500 border-red-600 text-white hover:bg-red-600'
            }`}
        >
          <Sparkles size={20} />
          Ask AI Tutor
        </button>

      </div>
    </div>
  );
}