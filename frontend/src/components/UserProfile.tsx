import { useState } from 'react';
import {
  User, Mail, Phone, MapPin, GraduationCap, BookOpen,
  Edit2, Camera, Shield, Bell, LogOut, ChevronRight, Award,
  Star, Clock, Target, Briefcase, Heart, Share2, Zap, Trophy, MessageSquare, Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserProfileProps {
  userName: string;
  userClass: string;
  userLocation: string;
  onLogout: () => void;
}

export default function UserProfile({ userName, userClass, userLocation, onLogout }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Populated with your actual developer profile details for the demo
  const [formData, setFormData] = useState({
    name: userName || 'Prem Gosavi',
    email: 'prem.gosavi@example.com',
    phone: '+91 8530988145',
    class: 'BCA Second Year',
    stream: 'Computer Applications',
    school: 'PVPIT, Savitribai Phule Pune University',
    location: userLocation || 'Pune, Maharashtra, India',
    bio: 'Full-stack developer building EduAdvisory. Passionate about React, data structures, and creating futuristic UIs. Vice President of HackWithIndia PVPIT Chapter.',
    skills: ['React', 'C++', 'Data Structures & Algorithms', 'Full Stack Development'],
    interests: ['Web Development', 'Hackathons', 'Surveillance Drones', 'Futuristic UIs']
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'achievements'>('overview');

  const handleSave = () => {
    setIsEditing(false);
  };

  const activities = [
    { id: 1, type: 'roadmap', title: 'Updated Full Stack Roadmap', time: '2 hours ago', score: null },
    { id: 2, type: 'quiz', title: 'Completed Advanced Algorithms Test', time: 'Yesterday', score: '95%' },
    { id: 3, type: 'forum', title: 'Answered a question on React Hooks', time: '2 days ago', score: null },
    { id: 4, type: 'learn', title: 'Finished "Futuristic HUD Design" module', time: '3 days ago', score: '100%' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header / Cover */}
      <div className="relative h-64 rounded-[3rem] bg-indigo-900 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
          <div className="grid grid-cols-8 gap-4 p-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="h-12 bg-white/5 rounded-xl rotate-12" />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full px-10 pt-10 pb-20 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <div className="relative group translate-y-16">
              <img
                src="https://picsum.photos/seed/avatar/200/200"
                alt="Profile"
                className="w-40 h-40 rounded-[2.5rem] border-8 border-white shadow-2xl object-cover bg-white"
                referrerPolicy="no-referrer"
              />
              <button className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-xl">
                <Camera size={20} />
              </button>
            </div>
            <div className="text-center md:text-left text-white space-y-1">
              <h1 className="text-4xl font-black tracking-tight">{formData.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-indigo-100/80 font-bold text-sm">
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={16} />
                  {formData.class}
                </span>
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {formData.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
              <Edit2 size={16} />
            </button>
            <button className="p-3 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 pt-16">
        {/* Left Column - Navigation & Stats */}
        <div className="lg:col-span-4 space-y-8">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-gray-100">
            <div className="space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'activity', label: 'Activity Feed', icon: Clock },
                { id: 'achievements', label: 'Achievements', icon: Award },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Learning Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-indigo-50 rounded-3xl text-center space-y-1">
                <p className="text-3xl font-black text-indigo-600">24</p>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Hours Focused</p>
              </div>
              <div className="p-6 bg-orange-50 rounded-3xl text-center space-y-1">
                <p className="text-3xl font-black text-orange-600">156</p>
                <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">XP Earned</p>
              </div>
              <div className="p-6 bg-green-50 rounded-3xl text-center space-y-1">
                <p className="text-3xl font-black text-green-600">8</p>
                <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Roadmaps</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-3xl text-center space-y-1">
                <p className="text-3xl font-black text-purple-600">12</p>
                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Badges</p>
              </div>
            </div>
          </div>

          {/* Skills & Interests */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 space-y-8">
            <div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                Skills
                <button className="text-indigo-600 hover:underline">Add</button>
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-xs font-bold border border-gray-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                Interests
                <button className="text-indigo-600 hover:underline">Add</button>
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map(interest => (
                  <span key={interest} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* About Section */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Zap className="text-yellow-500" size={24} />
                    About Me
                  </h2>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl focus:border-indigo-500 outline-none font-medium h-40 resize-none transition-all"
                    />
                  ) : (
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {formData.bio}
                    </p>
                  )}
                </div>

                {/* Contact & Academic Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 space-y-8">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <Mail className="text-indigo-600" size={20} />
                      Contact Info
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
                        <p className="font-bold text-gray-700">{formData.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                        <p className="font-bold text-gray-700">{formData.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 space-y-8">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <BookOpen className="text-blue-500" size={20} />
                      Academic Info
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">School / University</p>
                        <p className="font-bold text-gray-700">{formData.school}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stream</p>
                        <p className="font-bold text-gray-700">{formData.stream}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Activity</h2>
                <div className="space-y-8">
                  {activities.map((activity, i) => (
                    <div key={activity.id} className="relative flex gap-6">
                      {i !== activities.length - 1 && (
                        <div className="absolute left-[23px] top-12 bottom-[-32px] w-0.5 bg-gray-100" />
                      )}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${activity.type === 'quiz' ? 'bg-green-50 text-green-600' :
                          activity.type === 'roadmap' ? 'bg-blue-50 text-blue-600' :
                            activity.type === 'forum' ? 'bg-orange-50 text-orange-600' :
                              'bg-purple-50 text-purple-600'
                        }`}>
                        {activity.type === 'quiz' ? <Award size={24} /> :
                          activity.type === 'roadmap' ? <Target size={24} /> :
                            activity.type === 'forum' ? <MessageSquare size={24} /> :
                              <BookOpen size={24} />}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-900">{activity.title}</h4>
                          <span className="text-xs text-gray-400 font-medium">{activity.time}</span>
                        </div>
                        {activity.score && (
                          <p className="text-sm font-bold text-indigo-600 mb-2">Score: {activity.score}</p>
                        )}
                        <p className="text-sm text-gray-500">You successfully completed this activity and earned XP.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {[
                  { title: 'Early Bird', desc: 'Completed 5 tasks before 9 AM', icon: Sun, color: 'bg-orange-50 text-orange-600' },
                  { title: 'Quiz Master', desc: 'Scored 90%+ in 10 consecutive quizzes', icon: Trophy, color: 'bg-yellow-50 text-yellow-600' },
                  { title: 'Focus Ninja', desc: 'Completed 10 hours of deep work', icon: Zap, color: 'bg-indigo-50 text-indigo-600' },
                  { title: 'Helper', desc: 'Answered 20 community questions', icon: Heart, color: 'bg-red-50 text-red-600' },
                ].map((badge, i) => (
                  <div key={i} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-all">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${badge.color}`}>
                      <badge.icon size={40} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{badge.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}