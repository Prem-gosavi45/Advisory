import { useState } from 'react';
import { 
  Briefcase, TrendingUp, DollarSign, Clock, Users, 
  ChevronRight, Search, Filter, Star, Info, 
  BarChart3, MapPin, GraduationCap, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CareerPath {
  id: string;
  title: string;
  category: string;
  demand: 'High' | 'Medium' | 'Stable';
  salaryRange: string;
  description: string;
  progression: {
    level: string;
    years: string;
    salary: string;
  }[];
  skills: string[];
  dayInLife: string[];
  topCompanies: string[];
}

const careerPaths: CareerPath[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    category: 'Technology',
    demand: 'High',
    salaryRange: '₹6L - ₹35L+',
    description: 'A Full Stack Developer handles both the front-end and back-end of web applications. They are the "Swiss Army Knives" of the tech world.',
    progression: [
      { level: 'Junior Developer', years: '0-2 yrs', salary: '₹4L - ₹8L' },
      { level: 'Senior Developer', years: '3-6 yrs', salary: '₹12L - ₹22L' },
      { level: 'Tech Lead / Architect', years: '7+ yrs', salary: '₹25L - ₹50L+' },
    ],
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'System Design'],
    dayInLife: [
      'Daily stand-up meetings with the team',
      'Writing and reviewing code for new features',
      'Debugging complex issues in production',
      'Collaborating with designers and product managers'
    ],
    topCompanies: ['Google', 'Microsoft', 'Zomato', 'CRED']
  },
  {
    id: '2',
    title: 'Product Manager',
    category: 'Management',
    demand: 'High',
    salaryRange: '₹10L - ₹45L+',
    description: 'Product Managers sit at the intersection of Business, Design, and Technology. They define the "What" and "Why" of a product.',
    progression: [
      { level: 'Associate PM', years: '0-2 yrs', salary: '₹8L - ₹15L' },
      { level: 'Product Manager', years: '3-5 yrs', salary: '₹18L - ₹30L' },
      { level: 'Director of Product', years: '8+ yrs', salary: '₹40L - ₹80L+' },
    ],
    skills: ['Market Research', 'Data Analytics', 'User Empathy', 'Agile', 'Strategy'],
    dayInLife: [
      'Analyzing user feedback and metrics',
      'Prioritizing the product backlog',
      'Defining product requirements (PRDs)',
      'Stakeholder management and alignment'
    ],
    topCompanies: ['Amazon', 'Flipkart', 'Uber', 'Razorpay']
  },
  {
    id: '3',
    title: 'Data Scientist',
    category: 'Data Science',
    demand: 'High',
    salaryRange: '₹8L - ₹40L+',
    description: 'Data Scientists use statistical methods and machine learning to extract insights from complex data sets to drive business decisions.',
    progression: [
      { level: 'Junior Data Analyst', years: '0-2 yrs', salary: '₹6L - ₹10L' },
      { level: 'Data Scientist', years: '3-6 yrs', salary: '₹15L - ₹28L' },
      { level: 'Principal Data Scientist', years: '8+ yrs', salary: '₹35L - ₹60L+' },
    ],
    skills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
    dayInLife: [
      'Cleaning and preprocessing raw data',
      'Building and training ML models',
      'Presenting insights to stakeholders',
      'Researching new algorithms'
    ],
    topCompanies: ['Meta', 'Netflix', 'Fractal Analytics', 'Mu Sigma']
  }
];

export default function CareerPaths() {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Management', 'Data Science', 'Design', 'Finance'];

  const filteredPaths = careerPaths.filter(path => {
    const matchesCategory = activeCategory === 'All' || path.category === activeCategory;
    const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Career Paths</h1>
          <p className="text-gray-500">Explore the hierarchy, salary, and daily life of various professional roles.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-64"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-indigo-600 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              activeCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* List of Paths */}
        <div className="lg:col-span-1 space-y-4">
          {filteredPaths.map(path => (
            <button
              key={path.id}
              onClick={() => setSelectedPath(path)}
              className={`w-full text-left p-6 rounded-[2rem] border transition-all ${
                selectedPath?.id === path.id 
                  ? 'bg-white border-indigo-600 shadow-xl shadow-indigo-50' 
                  : 'bg-white border-gray-100 hover:border-indigo-200 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Briefcase size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  path.demand === 'High' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {path.demand} Demand
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{path.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{path.category}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-600 font-bold">
                  <DollarSign size={14} />
                  {path.salaryRange}
                </div>
                <ChevronRight size={18} className={selectedPath?.id === path.id ? 'text-indigo-600' : 'text-gray-300'} />
              </div>
            </button>
          ))}
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedPath ? (
              <motion.div
                key={selectedPath.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100 space-y-12"
              >
                {/* Overview */}
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <h2 className="text-3xl font-bold text-gray-900">{selectedPath.title}</h2>
                    <div className="flex gap-2">
                      {selectedPath.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-bold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {selectedPath.description}
                  </p>
                </div>

                {/* Progression Ladder */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="text-indigo-600" size={24} />
                    Career Progression & Salary
                  </h3>
                  <div className="space-y-4">
                    {selectedPath.progression.map((step, i) => (
                      <div key={i} className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-bold text-indigo-600 shadow-sm">
                          {i + 1}
                        </div>
                        <div className="flex-1 grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Level</p>
                            <p className="font-bold text-gray-900">{step.level}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Experience</p>
                            <p className="font-bold text-gray-700">{step.years}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Salary</p>
                            <p className="font-bold text-green-600">{step.salary}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Day in the Life */}
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Clock className="text-orange-500" size={24} />
                      A Day in the Life
                    </h3>
                    <ul className="space-y-4">
                      {selectedPath.dayInLife.map((item, i) => (
                        <li key={i} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Building2 className="text-blue-500" size={24} />
                      Top Hiring Companies
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedPath.topCompanies.map(company => (
                        <div key={company} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-gray-400 text-[10px]">
                            {company[0]}
                          </div>
                          <span className="font-bold text-gray-700 text-xs">{company}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Info size={14} />
                    Data based on 2024-25 market trends in India
                  </div>
                  <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                    View Roadmap
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[3rem] border border-dashed border-gray-200">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                  <BarChart3 size={48} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Select a Career Path</h3>
                <p className="text-gray-500 mt-4 max-w-sm mx-auto">
                  Click on any role from the left to explore detailed insights about progression, salary, and daily responsibilities.
                </p>
                
                <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-lg">
                  <div className="space-y-2">
                    <div className="mx-auto w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                      <DollarSign size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Salary Data</p>
                  </div>
                  <div className="space-y-2">
                    <div className="mx-auto w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <GraduationCap size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Skill Sets</p>
                  </div>
                  <div className="space-y-2">
                    <div className="mx-auto w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                      <MapPin size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Market Demand</p>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
