import { useState } from 'react';
import { 
  Search, MessageSquare, Heart, Share2, MoreHorizontal, 
  Filter, Plus, Hash, TrendingUp, Users, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CommunityForum() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', icon: Hash },
    { name: 'Study Groups', icon: Users },
    { name: 'Career Guidance', icon: TrendingUp },
    { name: 'Exam Prep', icon: BookOpen },
    { name: 'General', icon: MessageSquare },
  ];

  const posts = [
    {
      id: 1,
      user: { name: 'Rahul Sharma', avatar: 'https://picsum.photos/seed/u1/40/40', role: 'Student' },
      time: '2 hours ago',
      category: 'Exam Prep',
      title: 'Best resources for JEE Advanced Physics?',
      content: 'I am struggling with Rotational Mechanics. Can anyone suggest good books or video lectures that cover the basics well? I have already tried HC Verma but need more practice problems.',
      likes: 24,
      comments: 12,
      tags: ['JEE', 'Physics', 'Help']
    },
    {
      id: 2,
      user: { name: 'Priya Patel', avatar: 'https://picsum.photos/seed/u2/40/40', role: 'Mentor' },
      time: '5 hours ago',
      category: 'Career Guidance',
      title: 'Roadmap to becoming a Data Scientist in 2026',
      content: 'Here is a step-by-step guide for anyone starting their data science journey. Focus on Python, SQL, and Statistics first before jumping into Deep Learning models...',
      likes: 156,
      comments: 45,
      tags: ['DataScience', 'Career', 'Guide']
    },
    {
      id: 3,
      user: { name: 'Amit Kumar', avatar: 'https://picsum.photos/seed/u3/40/40', role: 'Student' },
      time: '1 day ago',
      category: 'Study Groups',
      title: 'Looking for a study partner for NEET 2026',
      content: 'I am looking for a serious study partner to track progress and discuss doubts. Preferably someone who is also in 11th grade.',
      likes: 8,
      comments: 3,
      tags: ['NEET', 'StudyBuddy']
    }
  ];

  const filteredPosts = posts.filter(post => 
    (activeCategory === 'All' || post.category === activeCategory) &&
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
          <p className="text-gray-500 mt-1">Connect, learn, and grow with your peers.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200">
          <Plus size={20} />
          New Discussion
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar - Categories */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeCategory === cat.name 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <cat.icon size={18} />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-2">Top Contributors</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative">
                    <img src={`https://picsum.photos/seed/c${i}/40/40`} className="w-10 h-10 rounded-full border-2 border-white/20" alt="User" referrerPolicy="no-referrer" />
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 rounded-full border border-white">
                      #{i}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-sm">User Name</p>
                    <p className="text-xs text-indigo-100">1.2k Karma</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          {filteredPosts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="font-bold text-gray-900">{post.user.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-gray-600">{post.user.role}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="mb-4">
                <span className="inline-block px-2.5 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg mb-2">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 leading-relaxed">{post.content}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">#{tag}</span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group">
                  <Heart size={20} className="group-hover:fill-red-500" />
                  <span className="font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageSquare size={20} />
                  <span className="font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors ml-auto">
                  <Share2 size={20} />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
