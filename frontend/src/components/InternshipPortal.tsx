import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Calendar, Search, Bookmark, Send, X, Check, Building2, Clock, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  isBookmarked: boolean;
}

const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern',
    company: 'Tech Innovations Inc.',
    location: 'Bangalore, India (Remote)',
    duration: '6 Months',
    stipend: '₹25,000/month',
    description: 'Join our dynamic team to work on cutting-edge web applications. You will be involved in the full software development lifecycle.',
    responsibilities: [
      'Develop and maintain web applications using React and Node.js.',
      'Collaborate with senior developers on system design and architecture.',
      'Write clean, maintainable, and efficient code.',
      'Participate in code reviews and team meetings.'
    ],
    requirements: [
      'Proficiency in JavaScript/TypeScript.',
      'Familiarity with React.js and Node.js.',
      'Basic understanding of database concepts (SQL/NoSQL).',
      'Strong problem-solving skills and attention to detail.',
      'Currently pursuing a Bachelor\'s or Master\'s degree in Computer Science or a related field.'
    ],
    postedDate: '2026-02-15',
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'Data Insights Co.',
    location: 'Pune, India',
    duration: '3 Months',
    stipend: '₹20,000/month',
    description: 'Work with our data science team to analyze large datasets and build predictive models.',
    responsibilities: [
      'Assist in data collection, cleaning, and preprocessing.',
      'Develop and implement machine learning models.',
      'Generate insights and create visualizations from data.',
      'Present findings to stakeholders.'
    ],
    requirements: [
      'Strong understanding of Python and its data science libraries (Pandas, NumPy, Scikit-learn).',
      'Knowledge of statistical modeling and machine learning algorithms.',
      'Experience with data visualization tools (Matplotlib, Seaborn).',
      'Excellent analytical and communication skills.',
      'Currently pursuing a Bachelor\'s or Master\'s degree in Data Science, Statistics, or a related field.'
    ],
    postedDate: '2026-02-10',
    isBookmarked: true,
  },
  {
    id: '3',
    title: 'UI/UX Design Intern',
    company: 'Creative Studio',
    location: 'Mumbai, India',
    duration: '4 Months',
    stipend: '₹18,000/month',
    description: 'Contribute to the design of intuitive and engaging user interfaces for our mobile and web products.',
    responsibilities: [
      'Conduct user research and usability testing.',
      'Create wireframes, prototypes, and high-fidelity mockups.',
      'Collaborate with product managers and developers.',
      'Ensure design consistency across all platforms.'
    ],
    requirements: [
      'Proficiency in design tools like Figma, Sketch, or Adobe XD.',
      'Understanding of user-centered design principles.',
      'Portfolio showcasing design projects.',
      'Strong communication and teamwork skills.',
      'Currently pursuing a Bachelor\'s or Master\'s degree in Design, HCI, or a related field.'
    ],
    postedDate: '2026-02-01',
    isBookmarked: false,
  },
  {
    id: '4',
    title: 'Marketing Intern',
    company: 'Global Brands Ltd.',
    location: 'Delhi, India',
    duration: '5 Months',
    stipend: '₹22,000/month',
    description: 'Support our marketing team in executing digital campaigns and content creation.',
    responsibilities: [
      'Assist in managing social media accounts.',
      'Create engaging content for various platforms.',
      'Analyze campaign performance and generate reports.',
      'Research market trends and competitor activities.'
    ],
    requirements: [
      'Strong written and verbal communication skills.',
      'Familiarity with social media platforms and digital marketing concepts.',
      'Basic knowledge of SEO/SEM.',
      'Ability to work independently and as part of a team.',
      'Currently pursuing a Bachelor\'s or Master\'s degree in Marketing, Business, or a related field.'
    ],
    postedDate: '2026-01-28',
    isBookmarked: false,
  },
];

export default function InternshipPortal() {
  const [internships, setInternships] = useState<Internship[]>(mockInternships);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    duration: '',
    stipend: '',
  });
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = filters.location === '' || internship.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesDuration = filters.duration === '' || internship.duration.toLowerCase().includes(filters.duration.toLowerCase());
    const matchesStipend = filters.stipend === '' || internship.stipend.toLowerCase().includes(filters.stipend.toLowerCase());

    return matchesSearch && matchesLocation && matchesDuration && matchesStipend;
  });

  const toggleBookmark = (id: string) => {
    setInternships(prev => 
      prev.map(int => 
        int.id === id ? { ...int, isBookmarked: !int.isBookmarked } : int
      )
    );
  };

  const handleApply = async () => {
    setApplicationStatus('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      // Simulate success or error randomly
      if (Math.random() > 0.2) { // 80% success rate
        setApplicationStatus('success');
      } else {
        throw new Error('Application failed');
      }
    } catch (error) {
      setApplicationStatus('error');
    }
  };

  const closeApplyModal = () => {
    setShowApplyModal(false);
    setApplicationStatus('idle');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
            <Briefcase size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Internship Portal</h1>
            <p className="text-xs text-gray-500">Find your next career opportunity</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { /* Implement view bookmarked */ }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-medium hover:bg-indigo-100 transition-colors text-sm"
          >
            <Bookmark size={16} /> Bookmarked
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search by title, company, or keyword..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <select 
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          className="p-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">All Locations</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Remote">Remote</option>
        </select>
        <select 
          value={filters.duration}
          onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
          className="p-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">All Durations</option>
          <option value="3 Months">3 Months</option>
          <option value="4 Months">4 Months</option>
          <option value="5 Months">5 Months</option>
          <option value="6 Months">6 Months</option>
        </select>
      </div>

      {/* Internship List and Detail View */}
      <div className="grid lg:grid-cols-3 gap-6 flex-1">
        {/* Internship List */}
        <div className="lg:col-span-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-bold text-gray-900">Internship Listings</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {filteredInternships.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No internships found matching your criteria.
              </div>
            ) : (
              filteredInternships.map(internship => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedInternship(internship)}
                  className={`bg-gray-50 p-4 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors ${
                    selectedInternship?.id === internship.id ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  <h3 className="font-bold text-gray-900">{internship.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{internship.company} - {internship.location}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><Clock size={12} /> {internship.duration}</span>
                    <span className="flex items-center gap-1"><Briefcase size={12} /> {internship.stipend}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(internship.id); }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-indigo-500"
                  >
                    <Bookmark size={20} fill={internship.isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Internship Detail View */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-bold text-gray-900">Internship Details</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <AnimatePresence mode="wait">
              {selectedInternship ? (
                <motion.div
                  key={selectedInternship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedInternship.title}</h3>
                      <p className="text-lg text-gray-700 mt-1 flex items-center gap-2"><Building2 size={18} /> {selectedInternship.company}</p>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-2"><MapPin size={16} /> {selectedInternship.location}</p>
                    </div>
                    <button 
                      onClick={() => toggleBookmark(selectedInternship.id)}
                      className="text-gray-400 hover:text-indigo-500"
                    >
                      <Bookmark size={24} fill={selectedInternship.isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"><Calendar size={14} /> {selectedInternship.duration}</span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"><Briefcase size={14} /> {selectedInternship.stipend}</span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs">Posted: {selectedInternship.postedDate}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">About the Internship</h4>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selectedInternship.description}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Responsibilities</h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {selectedInternship.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Requirements</h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {selectedInternship.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => setShowApplyModal(true)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors text-lg"
                  >
                    <Send size={20} /> Apply Now
                  </button>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Select an internship to view details.</p>
                  <p className="text-sm text-gray-400">Use the search and filters to find opportunities.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && selectedInternship && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white rounded-2xl p-8 shadow-xl max-w-lg w-full text-center"
            >
              {applicationStatus === 'idle' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">Apply for {selectedInternship.title}</h2>
                  <p className="text-gray-600">Are you sure you want to apply for this internship at {selectedInternship.company}?</p>
                  <div className="flex justify-center gap-3 mt-6">
                    <button 
                      onClick={closeApplyModal}
                      className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleApply}
                      className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Confirm Apply
                    </button>
                  </div>
                </div>
              )}
              {applicationStatus === 'submitting' && (
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                  <Loader2 size={48} className="animate-spin text-indigo-500" />
                  <p className="text-lg font-medium text-gray-700">Submitting your application...</p>
                </div>
              )}
              {applicationStatus === 'success' && (
                <div className="flex flex-col items-center justify-center space-y-4 py-8 text-green-600">
                  <CheckCircle2 size={48} />
                  <p className="text-lg font-medium">Application Submitted Successfully!</p>
                  <p className="text-sm text-gray-500">You will be notified of any updates.</p>
                  <button 
                    onClick={closeApplyModal}
                    className="mt-6 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
              {applicationStatus === 'error' && (
                <div className="flex flex-col items-center justify-center space-y-4 py-8 text-red-600">
                  <XCircle size={48} />
                  <p className="text-lg font-medium">Application Failed!</p>
                  <p className="text-sm text-gray-500">Please try again later or contact support.</p>
                  <button 
                    onClick={closeApplyModal}
                    className="mt-6 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
