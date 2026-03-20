import { useState } from 'react';
import { BookOpen, PlayCircle, Star, Search, Filter, ArrowRight, Quote, User, Calendar, Clock, Share2, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessStory {
  id: string;
  title: string;
  author: string;
  role: string;
  type: 'blog' | 'video';
  content: string;
  videoUrl?: string;
  imageUrl: string;
  tags: string[];
  date: string;
  readTime?: string;
  duration?: string;
  featured: boolean;
}

const mockStories: SuccessStory[] = [
  {
    id: '1',
    title: 'From Self-Taught Coder to Senior Engineer at Google',
    author: 'Alex Rivera',
    role: 'Senior Software Engineer',
    type: 'blog',
    content: `My journey started with a simple "Hello World" in Python. I didn't have a CS degree, but I had curiosity. Over the next three years, I spent every evening building projects, contributing to open source, and learning the fundamentals of data structures and algorithms. 

The key was consistency. I failed my first five interviews, but each failure taught me something new. I refined my resume, practiced mock interviews, and eventually landed a role at a startup. Two years later, I was recruited by Google. 

My advice? Don't just follow tutorials. Build something that solves a real problem. That's where the real learning happens.`,
    imageUrl: 'https://picsum.photos/seed/alex/800/600',
    tags: ['Career Growth', 'Software Engineering', 'Self-Taught'],
    date: 'Feb 15, 2026',
    readTime: '6 min read',
    featured: true
  },
  {
    id: '2',
    title: 'How I Landed My Dream Internship in Data Science',
    author: 'Sarah Chen',
    role: 'Data Science Intern',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    imageUrl: 'https://picsum.photos/seed/sarah/800/600',
    tags: ['Internship', 'Data Science', 'Interview Tips'],
    date: 'Jan 28, 2026',
    duration: '12:45',
    content: 'In this video, I share the exact steps I took to land a Data Science internship at Meta, from building a portfolio to acing the technical rounds.',
    featured: false
  },
  {
    id: '3',
    title: 'Transitioning from Marketing to Product Management',
    author: 'Jordan Smith',
    role: 'Product Manager',
    type: 'blog',
    content: `I spent five years in digital marketing before realizing my passion was in product development. The transition wasn't easy. I had to learn how to speak "engineer," understand technical constraints, and master the art of prioritization.

I started by taking on product-adjacent tasks in my marketing role—analyzing user behavior data, writing feature requests, and working closely with the dev team. I also completed a PM certification. 

The biggest hurdle was the mindset shift from "how do we sell this?" to "what problem are we solving?". If you're looking to switch, start where you are. Look for gaps in your current product and propose solutions.`,
    imageUrl: 'https://picsum.photos/seed/jordan/800/600',
    tags: ['Career Switch', 'Product Management', 'Marketing'],
    date: 'Feb 05, 2026',
    readTime: '8 min read',
    featured: false
  },
  {
    id: '4',
    title: 'Acing the FAANG Technical Interview: My Strategy',
    author: 'Priya Sharma',
    role: 'Software Engineer',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    imageUrl: 'https://picsum.photos/seed/priya/800/600',
    tags: ['Coding', 'FAANG', 'Algorithms'],
    date: 'Feb 10, 2026',
    duration: '15:20',
    content: 'Watch my comprehensive guide on preparing for high-stakes technical interviews at top tech companies.',
    featured: false
  },
  {
    id: '5',
    title: 'The Power of Networking: How I Found My Mentor',
    author: 'Marcus Johnson',
    role: 'UX Designer',
    type: 'blog',
    content: `I used to think networking was just about trading business cards. I was wrong. It's about building genuine relationships. 

I found my mentor through a local design meetup. Instead of asking for a job, I asked for feedback on a specific project. That one conversation turned into a monthly coffee chat, and eventually, a mentorship that changed the trajectory of my career. 

He helped me see the flaws in my portfolio and taught me how to present my design process to stakeholders. Don't be afraid to reach out to people you admire—just make sure you have a specific question or value to offer.`,
    imageUrl: 'https://picsum.photos/seed/marcus/800/600',
    tags: ['Networking', 'Mentorship', 'UX Design'],
    date: 'Jan 15, 2026',
    readTime: '5 min read',
    featured: false
  }
];

export default function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [filter, setFilter] = useState<'all' | 'blog' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStories = mockStories.filter(story => {
    const matchesFilter = filter === 'all' || story.type === filter;
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const featuredStory = mockStories.find(s => s.featured);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
        >
          Success Stories
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Inspiring journeys from our community. Learn from those who have walked the path before you.
        </motion.p>
      </div>

      {/* Featured Story */}
      {featuredStory && filter === 'all' && !searchQuery && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group cursor-pointer overflow-hidden rounded-3xl bg-indigo-900 text-white shadow-2xl"
          onClick={() => setSelectedStory(featuredStory)}
        >
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/30 backdrop-blur-md rounded-full text-sm font-medium border border-indigo-400/30">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                Featured Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {featuredStory.title}
              </h2>
              <p className="text-indigo-100 line-clamp-3 text-lg opacity-90">
                {featuredStory.content}
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 rounded-full bg-indigo-700 flex items-center justify-center font-bold text-xl">
                  {featuredStory.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{featuredStory.author}</p>
                  <p className="text-sm text-indigo-300">{featuredStory.role}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                Read Full Story <ArrowRight size={18} />
              </button>
            </div>
            <div className="relative h-64 md:h-full min-h-[400px]">
              <img 
                src={featuredStory.imageUrl} 
                alt={featuredStory.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-900/40 to-transparent md:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-transparent to-transparent md:hidden block" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl w-full md:w-auto">
          <button 
            onClick={() => setFilter('all')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('blog')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'blog' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Blogs
          </button>
          <button 
            onClick={() => setFilter('video')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'video' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Videos
          </button>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search stories, authors, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredStories.map((story) => (
            <motion.div
              layout
              key={story.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={story.imageUrl} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md ${
                    story.type === 'blog' ? 'bg-blue-500/80 text-white' : 'bg-red-500/80 text-white'
                  }`}>
                    {story.type === 'blog' ? <span className="flex items-center gap-1"><BookOpen size={12} /> Blog</span> : <span className="flex items-center gap-1"><PlayCircle size={12} /> Video</span>}
                  </span>
                </div>
                {story.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50">
                      <PlayCircle size={32} />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2">
                  {story.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2">
                  {story.title}
                </h3>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">
                    {story.author.charAt(0)}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">{story.author}</p>
                    <p className="text-gray-500">{story.role}</p>
                  </div>
                </div>
                <div className="pt-4 mt-auto flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest border-t border-gray-50">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {story.date}</span>
                  <span className="flex items-center gap-1">
                    {story.type === 'blog' ? <><Clock size={12} /> {story.readTime}</> : <><Clock size={12} /> {story.duration}</>}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header/Image */}
              <div className="relative h-64 md:h-80 shrink-0">
                <img 
                  src={selectedStory.imageUrl} 
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/40 transition-colors"
                >
                  <Share2 size={20} className="rotate-45" /> {/* Using share as close icon lookalike or just X */}
                </button>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="flex gap-2">
                    {selectedStory.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                    {selectedStory.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                      {selectedStory.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{selectedStory.author}</p>
                      <p className="text-gray-500">{selectedStory.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors">
                      <Bookmark size={20} />
                      <span className="text-sm font-medium">Save</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors">
                      <Share2 size={20} />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>
                </div>

                <div className="prose prose-indigo max-w-none">
                  {selectedStory.type === 'video' ? (
                    <div className="space-y-6">
                      <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={selectedStory.videoUrl} 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <Quote className="text-indigo-300 mb-4" size={32} />
                        <p className="text-indigo-900 italic text-lg leading-relaxed">
                          {selectedStory.content}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <Quote className="text-gray-300 shrink-0" size={32} />
                        <p className="text-gray-700 italic text-lg leading-relaxed">
                          {selectedStory.content.split('\n\n')[0]}
                        </p>
                      </div>
                      {selectedStory.content.split('\n\n').slice(1).map((para, i) => (
                        <p key={i} className="text-gray-700 leading-relaxed text-lg">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
