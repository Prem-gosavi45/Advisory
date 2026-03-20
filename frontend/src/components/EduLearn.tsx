import { useState } from 'react';
import { 
  Flame, Trophy, CheckCircle2, Play, Lock, BookOpen, 
  Target, Award, Zap, ChevronRight, Star, Shield, Layout
} from 'lucide-react';
import { motion } from 'framer-motion';
import StudyResources from './StudyResources';

interface EduLearnProps {
  userName: string;
}

export default function EduLearn({ userName }: EduLearnProps) {
  const [activeTab, setActiveTab] = useState<'Class' | 'Subject'>('Class');
  const [activeView, setActiveView] = useState<'overview' | 'resources'>('overview');

  const dailyQuests = [
    { id: 1, title: 'Review 1 Study Note', subtitle: 'Uploaded by peers in Class 12', xp: 50, completed: false },
    { id: 2, title: 'Complete 1 Mock Interview', subtitle: 'AI or Peer mock session', xp: 100, completed: false },
    { id: 3, title: "Solve 'Two Sum' in DSA", subtitle: 'Data Structures module', xp: 30, completed: false },
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah', xp: 2450, avatar: 'S', color: 'bg-red-500' },
    { rank: 2, name: 'Mike', xp: 2100, avatar: 'M', color: 'bg-blue-500' },
    { rank: 3, name: 'You', xp: 1250, avatar: 'AJ', color: 'bg-indigo-500', isUser: true },
  ];

  const badges = [
    { name: 'First Step', icon: '🦶', unlocked: true },
    { name: 'Bookworm', icon: '📚', unlocked: true },
    { name: 'On Fire', icon: '🔥', unlocked: false },
    { name: 'Expert', icon: '🧠', unlocked: false },
    { name: 'Helper', icon: '🤝', unlocked: false },
    { name: 'Legend', icon: '👑', unlocked: false },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Stats Bar */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
          <span>Home</span>
          <span>/</span>
          <span className="text-gray-900">Student Dashboard</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full font-bold border border-orange-100">
            <Flame size={18} className="fill-orange-600" />
            <span>12 Days</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-bold text-gray-500 uppercase">XP Progress</div>
            <div className="w-32 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <span className="text-xs font-bold text-indigo-600">450 / 1000</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-indigo-100">
                5
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                Novice
              </div>
            </div>
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              {userName.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 border-b border-gray-200">
        <button 
          onClick={() => setActiveView('overview')}
          className={`pb-3 px-1 font-bold text-sm transition-colors relative ${
            activeView === 'overview' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Overview
          {activeView === 'overview' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />
          )}
        </button>
        <button 
          onClick={() => setActiveView('resources')}
          className={`pb-3 px-1 font-bold text-sm transition-colors relative ${
            activeView === 'resources' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Study Resources
          {activeView === 'resources' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />
          )}
        </button>
      </div>

      {activeView === 'overview' ? (
        <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Welcome Section */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userName} 🌻 ! 👋</h1>
          </div>

          {/* Daily Quests */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Target className="text-purple-600" />
                Daily Quests
              </h2>
              <span className="text-xs font-medium bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                Resets in 4h 12m
              </span>
            </div>

            <div className="space-y-4">
              {dailyQuests.map((quest) => (
                <div key={quest.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl border border-gray-50 hover:border-gray-100 transition-all group">
                  <div className="flex items-center gap-4">
                    <button className="text-gray-300 hover:text-green-500 transition-colors">
                      <CheckCircle2 size={24} />
                    </button>
                    <div>
                      <h3 className="font-bold text-gray-900">{quest.title}</h3>
                      <p className="text-sm text-gray-500">{quest.subtitle}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-lg border border-amber-100">
                    +{quest.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Learning */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="text-blue-600" />
              Resume Learning
            </h2>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1 w-full">
                <h3 className="font-bold text-gray-900 mb-2">React.js: Advanced Hooks</h3>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-gray-500 font-medium">75% Completed</p>
              </div>
              <button className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 whitespace-nowrap">
                Continue (+20 XP)
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1 w-full">
                <h3 className="font-bold text-gray-900 mb-1">System Design: Load Balancing</h3>
                <p className="text-xs text-gray-500">Start new module</p>
              </div>
              <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap">
                Start (+10 XP)
              </button>
            </div>
          </div>

          {/* Syllabus Tracker */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
              <BookOpen className="text-indigo-600" />
              Syllabus Tracker
            </h2>
            <div className="flex gap-2">
              {['Physics', 'Chemistry', 'Maths'].map((subject) => (
                <button key={subject} className="px-4 py-2 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 text-gray-600 rounded-xl text-sm font-bold transition-colors">
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-8">
          
          {/* Leaderboard */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Trophy className="text-amber-500" />
              Leaderboard
            </h2>
            
            <div className="flex bg-gray-50 p-1 rounded-xl mb-6">
              {['Class', 'Subject'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${
                    activeTab === tab ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    user.isUser ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-bold w-4 text-center ${
                      user.rank === 1 ? 'text-amber-500' : 
                      user.rank === 2 ? 'text-gray-500' : 
                      user.rank === 3 ? 'text-indigo-500' : 'text-gray-400'
                    }`}>{user.rank}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${user.color}`}>
                      {user.avatar}
                    </div>
                    <span className={`font-bold text-sm ${user.isUser ? 'text-indigo-900' : 'text-gray-700'}`}>
                      {user.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-500">{user.xp} XP</span>
                </div>
              ))}
              <button className="w-full text-center text-xs font-bold text-indigo-600 hover:underline mt-2">
                View Full Rankings
              </button>
            </div>
          </div>

          {/* Badge Collection */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Award className="text-orange-500" />
              Badge Collection
            </h2>
            
            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 ${
                    badge.unlocked 
                      ? 'bg-white border-yellow-400 shadow-sm' 
                      : 'bg-gray-100 border-gray-200 grayscale opacity-50'
                  }`}>
                    {badge.icon}
                  </div>
                  <span className={`text-[10px] font-bold text-center ${
                    badge.unlocked ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Unlock */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Next Unlock</h3>
                <p className="text-indigo-100 text-xs mt-1">Level 6 Reward</p>
              </div>
              <span className="bg-white/20 px-2 py-1 rounded-lg text-xs font-bold">Lvl 6</span>
            </div>
            
            <p className="text-sm text-indigo-50 mb-4">
              Unlock <span className="font-bold text-white">Peer Mentorship</span> features to teach others.
            </p>
            
            <div className="w-full bg-black/20 rounded-full h-1.5">
              <div className="bg-white h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>

        </div>
      </div>
      ) : (
        <StudyResources />
      )}
    </div>
  );
}
