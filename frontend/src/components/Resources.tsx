import { useState } from 'react';
import { 
  Book, Video, FileText, Wrench, Search, Filter, ExternalLink, 
  Download, PlayCircle, CheckCircle, Star, Clock, ChevronRight,
  Library, GraduationCap, Lightbulb, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResourceItem {
  id: string;
  title: string;
  category: 'book' | 'video' | 'test' | 'tool';
  description: string;
  provider: string;
  link: string;
  thumbnail?: string;
  tags: string[];
  rating?: number;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

const mockResources: ResourceItem[] = [
  // Books
  {
    id: 'b1',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    category: 'book',
    description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees.',
    provider: 'Robert C. Martin',
    link: 'https://example.com/clean-code',
    thumbnail: 'https://picsum.photos/seed/book1/300/400',
    tags: ['Programming', 'Best Practices'],
    rating: 4.8,
    difficulty: 'Intermediate'
  },
  {
    id: 'b2',
    title: 'Thinking, Fast and Slow',
    category: 'book',
    description: 'A world-class psychologist and winner of the Nobel Prize in Economics takes us on a groundbreaking tour of the mind.',
    provider: 'Daniel Kahneman',
    link: 'https://example.com/thinking-fast',
    thumbnail: 'https://picsum.photos/seed/book2/300/400',
    tags: ['Psychology', 'Decision Making'],
    rating: 4.7,
    difficulty: 'Beginner'
  },
  // Videos
  {
    id: 'v1',
    title: 'React Course For Beginners - Learn React.js from Scratch',
    category: 'video',
    description: 'Learn React.js from scratch in this full course. We will build a project and learn all the core concepts.',
    provider: 'FreeCodeCamp',
    link: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    thumbnail: 'https://picsum.photos/seed/video1/400/225',
    tags: ['Frontend', 'React', 'Web Dev'],
    duration: '10:45:00',
    difficulty: 'Beginner'
  },
  {
    id: 'v2',
    title: 'Machine Learning Specialization',
    category: 'video',
    description: 'A foundational online program created in collaboration between DeepLearning.AI and Stanford Online.',
    provider: 'Andrew Ng',
    link: 'https://www.youtube.com/playlist?list=PLkDaE6sCZn6Ec-XTbcX1uRg2_u4xOEKy0',
    thumbnail: 'https://picsum.photos/seed/video2/400/225',
    tags: ['AI', 'Machine Learning', 'Data Science'],
    duration: '40+ hours',
    difficulty: 'Intermediate'
  },
  // Mock Tests
  {
    id: 't1',
    title: 'Full-Length SAT Practice Test',
    category: 'test',
    description: 'A comprehensive practice test covering Reading, Writing, and Math sections of the SAT.',
    provider: 'College Board',
    link: 'https://example.com/sat-test',
    tags: ['SAT', 'Exam Prep'],
    duration: '3 hours',
    difficulty: 'Intermediate'
  },
  {
    id: 't2',
    title: 'Python Certification Mock Exam',
    category: 'test',
    description: 'Test your knowledge of Python syntax, data types, and standard libraries with this mock exam.',
    provider: 'Python Institute',
    link: 'https://example.com/python-mock',
    tags: ['Python', 'Certification'],
    duration: '60 mins',
    difficulty: 'Advanced'
  },
  // Tools
  {
    id: 'l1',
    title: 'Notion - All-in-one Workspace',
    category: 'tool',
    description: 'A workspace that adapts to your needs. Write, plan, collaborate, and get organized.',
    provider: 'Notion Labs',
    link: 'https://notion.so',
    tags: ['Productivity', 'Organization'],
    difficulty: 'Beginner'
  },
  {
    id: 'l2',
    title: 'LeetCode - The World\'s Leading Online Programming Learning Platform',
    category: 'tool',
    description: 'Level up your coding skills and quickly land a job. This is the best place to expand your knowledge.',
    provider: 'LeetCode',
    link: 'https://leetcode.com',
    tags: ['Coding', 'Interview Prep'],
    difficulty: 'Advanced'
  }
];

export default function Resources() {
  const [activeTab, setActiveTab] = useState<'all' | 'book' | 'video' | 'test' | 'tool'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = mockResources.filter(res => {
    const matchesTab = activeTab === 'all' || res.category === activeTab;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const tabs = [
    { id: 'all', label: 'All Resources', icon: Library },
    { id: 'book', label: 'Books Library', icon: Book },
    { id: 'video', label: 'Learning Videos', icon: Video },
    { id: 'test', label: 'Mock Tests', icon: FileText },
    { id: 'tool', label: 'Self-Improvement', icon: Target },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Resource Center</h1>
          <p className="text-gray-500 mt-2">Everything you need to accelerate your learning journey.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search books, videos, tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((res) => (
            <motion.div
              layout
              key={res.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
            >
              {/* Thumbnail for Books and Videos */}
              {(res.category === 'book' || res.category === 'video') && res.thumbnail && (
                <div className={`relative ${res.category === 'book' ? 'h-64' : 'h-40'} overflow-hidden`}>
                  <img 
                    src={res.thumbnail} 
                    alt={res.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {res.category === 'video' && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px] font-bold rounded">
                      {res.duration}
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    res.category === 'book' ? 'bg-blue-100 text-blue-700' :
                    res.category === 'video' ? 'bg-red-100 text-red-700' :
                    res.category === 'test' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {res.category}
                  </span>
                  {res.rating && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={14} className="fill-current" />
                      <span className="text-xs font-bold">{res.rating}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">
                  {res.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3 flex-1">
                  {res.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {res.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Provider</span>
                    <span className="text-xs font-bold text-gray-700 truncate max-w-[120px]">{res.provider}</span>
                  </div>
                  <a 
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <Library size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No resources found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
            className="mt-6 text-indigo-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Quick Access Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-2xl font-bold">Learning Paths</h2>
          </div>
          <p className="text-indigo-100 mb-8">Curated collections of resources to help you master specific skills from scratch.</p>
          <div className="space-y-4">
            {['Frontend Development', 'Data Science & AI', 'Product Management'].map((path) => (
              <button key={path} className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                <span className="font-bold">{path}</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
              <Lightbulb size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Daily Tip</h2>
          </div>
          <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 italic text-gray-700 leading-relaxed">
            "The best way to learn is to teach. Try explaining a complex concept you just learned to a friend or write a blog post about it. It solidifies your understanding like nothing else."
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/40/40`} 
                  className="w-8 h-8 rounded-full border-2 border-white" 
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                +12k
              </div>
            </div>
            <span className="text-sm font-bold text-gray-400">Join 12,000+ learners today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
