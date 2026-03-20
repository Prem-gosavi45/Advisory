import { useState } from 'react';
import { 
  Search, FileText, Download, Star, ChevronDown, 
  Beaker, Calculator, Atom, Zap, Upload, UserPlus, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudyResources() {
  const [activeClassTab, setActiveClassTab] = useState('Class 12');
  const [searchQuery, setSearchQuery] = useState('');

  const resources = [
    {
      title: 'Calculus Integration',
      subject: 'Math',
      class: 'Class 12',
      downloads: '2.4k',
      rating: 4,
      icon: Calculator,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Electrostatics',
      subject: 'Physics',
      class: 'Class 12',
      downloads: '1.8k',
      rating: 4,
      icon: Zap,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Organic Chemistry',
      subject: 'Chem',
      class: 'Class 12',
      downloads: '5.1k',
      rating: 4,
      icon: Beaker,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Genetics Principles',
      subject: 'Biology',
      class: 'Class 12',
      downloads: '3.2k',
      rating: 4,
      icon: Atom,
      color: 'bg-red-50 text-red-600'
    }
  ];

  const subjects = [
    { name: 'Physics', chapters: 30, icon: Atom, color: 'bg-purple-100 text-purple-600' },
    { name: 'Chemistry', chapters: 31, icon: Beaker, color: 'bg-green-100 text-green-600' },
    { name: 'Mathematics', chapters: 29, icon: Calculator, color: 'bg-blue-100 text-blue-600' },
  ];

  const contributors = [
    { name: 'Aryan Gupta', role: 'Physics • 12k DLs', avatar: 'https://picsum.photos/seed/aryan/40/40' },
    { name: 'Sarah J.', role: 'Biology • 8k DLs', avatar: 'https://picsum.photos/seed/sarah/40/40' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero / Search Section */}
      <div className="text-center space-y-6 py-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Best School & UG Study Materials</h1>
          <p className="text-gray-500 mt-2">Access over <span className="font-bold text-blue-600">50,000+</span> notes for Classes 9-12, JEE & NEET.</p>
        </div>

        <div className="max-w-2xl mx-auto flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for 'Physics Class 12 notes'..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>
          <div className="relative min-w-[140px]">
            <select className="w-full h-full px-4 bg-white rounded-xl border border-gray-200 text-gray-700 font-medium appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Class 12</option>
              <option>Class 11</option>
              <option>Class 10</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
            Search
          </button>
        </div>
      </div>

      {/* Browse by Class */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Browse by Class</h2>
          <div className="flex gap-6 text-sm font-medium text-gray-500">
            {['Class 12', 'Class 11', 'Class 10', 'Class 9'].map((cls) => (
              <button 
                key={cls}
                onClick={() => setActiveClassTab(cls)}
                className={`pb-2 border-b-2 transition-colors ${
                  activeClassTab === cls 
                    ? 'text-blue-600 border-blue-600' 
                    : 'border-transparent hover:text-gray-900'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((res, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${res.color}`}>
                  <FileText size={20} />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                  <Download size={12} />
                  {res.downloads}
                </div>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-1">{res.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{res.class} • {res.subject}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map((s) => (
                    <Star key={s} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star size={12} className="text-gray-300" />
                </div>
                <button className="text-xs font-bold text-blue-600 hover:underline">VIEW</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subject Study Guides */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Subject Study Guides</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {subjects.map((sub, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors flex items-center gap-4 cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${sub.color}`}>
                <sub.icon size={28} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{sub.name}</h3>
                <p className="text-sm text-gray-500">{sub.chapters} Chapters</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Revision Zone */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Zap className="text-yellow-500 fill-yellow-500" />
          Quick Revision Zone
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-1">Physics Formulas</h3>
              <p className="text-blue-100 text-sm mb-4">Mechanics & Optics in 4 pages.</p>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
                Download
              </button>
            </div>
            <FileText className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12" />
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-1">Chemistry Charts</h3>
              <p className="text-emerald-100 text-sm mb-4">Complete reaction maps.</p>
              <button className="px-4 py-2 bg-white text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-50 transition-colors">
                Download
              </button>
            </div>
            <Beaker className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12" />
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-1">Math Shortcuts</h3>
              <p className="text-orange-100 text-sm mb-4">Calculus tricks for JEE.</p>
              <button className="px-4 py-2 bg-white text-orange-600 rounded-lg text-xs font-bold hover:bg-orange-50 transition-colors">
                Download
              </button>
            </div>
            <Calculator className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12" />
          </div>
        </div>
      </div>

      {/* Contributors & Upload */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Top Student Contributors</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {contributors.map((user, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{user.name}</h3>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
              <button className="px-4 py-1.5 border border-blue-200 text-blue-600 rounded-full text-xs font-bold hover:bg-blue-50 transition-colors">
                Follow
              </button>
            </div>
          ))}
          
          <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Upload size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Upload Notes</h3>
                <p className="text-xs text-blue-100">Earn Badges</p>
              </div>
            </div>
            <ChevronRight size={20} />
          </div>
        </div>
      </div>

      {/* Quick Summary Accordion */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-xl">🧠</span>
          <span className="font-bold text-gray-900 text-sm">QUICK SUMMARY – 10 UNIQUE RESOURCE FEATURES</span>
        </div>
        <ChevronDown size={20} className="text-gray-400" />
      </div>
    </div>
  );
}
