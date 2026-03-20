import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  LayoutDashboard, User, MessageSquare, Award, BookOpen, MapPin, Calendar, 
  Briefcase, Film, GraduationCap, Settings, LogOut, Search, Bell, Globe, 
  ArrowRight, Sparkles, CheckCircle2, Loader2, ArrowLeft, Users, Menu, ChevronLeft, ChevronRight, Share2, Library, Brain, Timer
} from 'lucide-react';
import UserProfile from './UserProfile';
import CommunityForum from './CommunityForum';
import EduLearn from './EduLearn';
import AptitudeQuiz from './AptitudeQuiz';
import CareerRoadmap from './CareerRoadmap';
import AdvisoraChat from './AdvisoraChat';
import CollegesNearby from './CollegesNearby';
import ResumeBuilder from './ResumeBuilder';
import Skillshare from './SkillShare';
import TimelineNotifications from './TimelineNotifications';
import InternshipPortal from './InternshipPortal';
import EventsWebinars from './EventsWebinars';
import MockInterviews from './MockInterviews';
import SuccessStories from './SuccessStories';
import Resources from './Resources';
import HomeworkAnalyzer from './HomeworkAnalyzer';
import SettingsComponent from './Settings';
import EduReels from './EduReels';
import HelpFAQ from './HelpFAQ';
import GamifiedLearning from './GamifiedLearning';
import CareerPaths from './CareerPaths';
import FocusFlow from './FocusFlow';

interface DashboardProps {
  onNavigate: (view: string) => void;
  onLogout: () => void;
  userName?: string;
}

export default function Dashboard({ onNavigate, onLogout, userName: propUserName }: DashboardProps) {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userName, setUserName] = useState(propUserName || 'Ragini');

  // Update local userName when prop changes
  if (propUserName && propUserName !== userName) {
    setUserName(propUserName);
  }

  const handleMenuClick = (id: string) => {
    if (id === 'logout') {
      onLogout();
    } else {
      setActiveMenuItem(id);
      // Handle other navigation if needed
    }
  };
  const [userClass, setUserClass] = useState('12th (Science)');
  const [userLocation, setUserLocation] = useState('Pungaon, Maharashtra');
  const [interests, setInterests] = useState(['AI', 'Engineering', 'Computer Science']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New scholarship matching your profile!', time: '2h ago' },
    { id: 2, text: 'Career session starting in 30 mins', time: '5h ago' },
  ]);

  const handleAddInterest = () => {
    const newInterest = prompt('Enter new interest:');
    if (newInterest) setInterests([...interests, newInterest]);
  };

  const handleApply = (name: string) => {
    alert(`Application started for ${name}! Check your email for next steps.`);
  };

  const jobs = [ 
    { title: 'AI & Machine Learning Engineer', growth: '+45%', salary: 'High' },
    { title: 'Data Scientist / Analyst', growth: '+30%', salary: 'High' },
    { title: 'Cybersecurity Specialist', growth: '+35%', salary: 'Very High' },
    { title: 'Cloud Computing Specialist', growth: '+28%', salary: 'High' },
  ];

  const scholarships = [ 
    { name: 'Merit-Based Scholarship', deadline: '30 Oct 2025', icon: GraduationCap, color: 'text-green-600 bg-green-50' },
    { name: 'Maha DBT Scholarship', deadline: '15 Nov 2025', icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
    { name: 'Private Scholarship', deadline: '01 Dec 2025', icon: Award, color: 'text-red-600 bg-red-50' },
  ];

  const sessions = [ 
    { name: 'Ravi Kumar', role: 'Career Coach', topic: 'Building Skills for Future Jobs', date: 'Tomorrow, 10 AM', img: 'https://picsum.photos/seed/mentor1/50/50' },
    { name: 'Dr. Anjali Mehta', role: 'Edu Consultant', topic: 'Choosing the Right Stream', date: '24 Oct, 2 PM', img: 'https://picsum.photos/seed/mentor2/50/50' },
    { name: 'Sunil Choudhary', role: 'IAS Officer', topic: 'Civil Services Prep Strategy', date: '26 Oct, 5 PM', img: 'https://picsum.photos/seed/mentor3/50/50' },
  ];

  const filteredJobs = jobs.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredScholarships = scholarships.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredSessions = sessions.filter(s => s.topic.toLowerCase().includes(searchQuery.toLowerCase()) || s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'edulearn', label: 'EduLearn', icon: BookOpen },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'communityForum', label: 'Community Forum', icon: Users },
    { id: 'careerRoadmap', label: 'Career Roadmaps', icon: Briefcase },
    { id: 'advisora', label: 'Advisora.ai', icon: MessageSquare },
    { id: 'aptitudeQuiz', label: 'Aptitude Quiz', icon: Award },
    { id: 'gamifiedLearning', label: 'Gamified Learning', icon: BookOpen },
    { id: 'careerPaths', label: 'Career Paths', icon: Briefcase },
    { id: 'collegesNearby', label: 'Colleges Nearby', icon: MapPin },
    { id: 'timelineNotifications', label: 'Timeline / Notifications', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: Library },
    { id: 'reels', label: 'Reels', icon: Film },
    { id: 'skillshare', label: 'Skillshare', icon: Share2 },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'myApplications', label: 'My Applications', icon: LayoutDashboard },
    { id: 'eventsWebinars', label: 'Events & Webinars', icon: Calendar },
    { id: 'homeworkAnalyzer', label: 'Homework Analyzer', icon: Brain },
    { id: 'focusFlow', label: 'Focus Flow', icon: Timer },
    { id: 'helpFAQ', label: 'Help / FAQ', icon: MessageSquare },
    { id: 'mockInterviews', label: 'Mock Interviews', icon: User },
    { id: 'resumeBuilder', label: 'Resume Builder', icon: Briefcase },
    { id: 'successStories', label: 'Success Stories', icon: Sparkles },
    { id: 'contactUs', label: 'Contact Us', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.div 
        initial={{ width: 280 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }} 
        transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 20 }} 
        className="bg-white shadow-xl z-20 flex flex-col relative border-r border-gray-100"
      >
        {/* Logo Area */}
        <div className={`flex items-center gap-3 h-20 px-6 border-b border-gray-50 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
          <img src="/logo.png" alt="Edu-Advisory Logo" className="w-8 h-8 object-contain shrink-0" />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xl font-bold tracking-tight whitespace-nowrap overflow-hidden"
              >
                <span className="text-green-600">Edu</span>-<span className="text-orange-500">Advisory</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-24 bg-white border border-gray-200 text-gray-500 hover:text-orange-600 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all z-50"
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-left transition-all group relative ${
                activeMenuItem === item.id 
                  ? 'bg-orange-50 text-orange-600 font-semibold' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              } ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <item.icon size={22} className={`shrink-0 ${activeMenuItem === item.id ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Tooltip for collapsed state */}
              {!isSidebarOpen && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile Snippet (Bottom) */}
        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={() => setActiveMenuItem('profile')}
            className={`flex items-center gap-3 w-full text-left ${!isSidebarOpen ? 'justify-center' : ''}`}
          >
            <img src="https://picsum.photos/seed/avatar/40/40" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">{userClass}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-gray-50/50">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 px-8 flex justify-between items-center shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Menu size={20} />
              </button>
            )}
            <div className="relative w-full max-w-md hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for colleges, courses, or career paths..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors relative"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50"
                  >
                    <h4 className="font-bold text-gray-900 mb-3">Notifications</h4>
                    <div className="space-y-3">
                      {notifications.map(n => (
                        <div key={n.id} className="flex gap-3 items-start p-2 hover:bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0" />
                          <div>
                            <p className="text-sm text-gray-800">{n.text}</p>
                            <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors">
                <Globe size={20} />
              </button>
            </div>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <button 
              onClick={() => setActiveMenuItem('profile')}
              className="flex items-center gap-2"
            >
               <img src="https://picsum.photos/seed/avatar/40/40" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {activeMenuItem === 'profile' ? (
              <UserProfile 
                userName={userName}
                userClass={userClass}
                userLocation={userLocation}
                onLogout={onLogout}
              />
            ) : activeMenuItem === 'communityForum' ? (
              <CommunityForum />
            ) : activeMenuItem === 'edulearn' ? (
              <EduLearn userName={userName} />
            ) : activeMenuItem === 'aptitudeQuiz' ? (
              <AptitudeQuiz />
            ) : activeMenuItem === 'careerRoadmap' ? (
              <CareerRoadmap />
            ) : activeMenuItem === 'advisora' ? (
              <AdvisoraChat />
            ) : activeMenuItem === 'collegesNearby' ? (
              <CollegesNearby />
            ) : activeMenuItem === 'resumeBuilder' ? (
              <ResumeBuilder />
            ) : activeMenuItem === 'skillshare' ? (
              <Skillshare />
            ) : activeMenuItem === 'timelineNotifications' ? (
              <TimelineNotifications />
            ) : activeMenuItem === 'internships' ? (
              <InternshipPortal />
            ) : activeMenuItem === 'eventsWebinars' ? (
              <EventsWebinars />
            ) : activeMenuItem === 'mockInterviews' ? (
              <MockInterviews />
            ) : activeMenuItem === 'successStories' ? (
              <SuccessStories />
            ) : activeMenuItem === 'resources' ? (
              <Resources />
            ) : activeMenuItem === 'homeworkAnalyzer' ? (
              <HomeworkAnalyzer />
            ) : activeMenuItem === 'settings' ? (
              <SettingsComponent />
            ) : activeMenuItem === 'reels' ? (
              <EduReels />
            ) : activeMenuItem === 'helpFAQ' ? (
              <HelpFAQ />
            ) : activeMenuItem === 'gamifiedLearning' ? (
              <GamifiedLearning />
            ) : activeMenuItem === 'careerPaths' ? (
              <CareerPaths />
            ) : activeMenuItem === 'focusFlow' ? (
              <FocusFlow />
            ) : (
              <>
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Track your progress and explore new opportunities.</p>
                  </div>
                  <div className="hidden sm:flex gap-2">
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 shadow-sm">
                      Last updated: Today, 10:30 AM
                    </span>
                  </div>
                </div>

                {/* Welcome Card */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-[32px] p-8 lg:p-10 mb-8 shadow-xl shadow-orange-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2">Welcome back, {userName} 👋</h2>
                    <p className="text-orange-100 text-lg flex items-center gap-2">
                      <GraduationCap size={18} />
                      Class/Stream: <span className="font-semibold bg-white/20 px-2 py-0.5 rounded-md">{userClass}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <MapPin size={18} className="text-orange-200" />
                    <span className="font-medium">{userLocation}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-orange-100 text-sm uppercase tracking-wider font-semibold mb-3">Your Focus Areas</p>
                  <div className="flex flex-wrap gap-3">
                    {interests.map((interest, index) => (
                      <span key={index} className="bg-white text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center gap-2">
                        {index === 0 && <Sparkles size={14} />}
                        {interest}
                      </span>
                    ))}
                    <button 
                      onClick={handleAddInterest}
                      className="px-4 py-1.5 rounded-full text-sm font-medium border border-white/30 hover:bg-white/10 transition-colors"
                    >
                      + Add Interest
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Layout for other sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* My Career Path */}
              <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Briefcase className="text-orange-500" size={24} />
                    My Career Path
                  </h3>
                  <button className="text-orange-600 text-sm font-bold hover:underline">View Full Report</button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Aptitude Quiz Status */}
                  <div className="bg-orange-50/50 rounded-3xl p-6 border border-orange-100 relative group hover:border-orange-200 transition-all">
                    <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm text-green-500">
                      <CheckCircle2 size={20} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Aptitude Quiz</h4>
                    <p className="text-xs text-gray-500 mb-6 uppercase tracking-wider font-semibold">Status: Completed</p>
                    
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Match Score</span>
                        <span className="font-bold text-gray-900">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div className="bg-orange-500 h-full rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Best fit: <span className="font-semibold text-orange-600">Science Stream</span></p>
                    </div>
                    
                    <button 
                      onClick={() => onNavigate('careerQuiz')}
                      className="w-full py-3 bg-white border border-orange-200 text-orange-600 rounded-xl font-bold text-sm hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                    >
                      Retake Quiz
                    </button>
                  </div>

                  {/* Career Analysis */}
                  <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100 hover:border-blue-200 transition-all">
                    <h4 className="font-bold text-gray-900 mb-4">Career Analysis Progress</h4>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-gray-700">Aptitude & Interest</span>
                          <span className="text-blue-600">3/5 Done</span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-2">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-gray-700">Career Fit</span>
                          <span className="text-purple-600">70% Match</span>
                        </div>
                        <div className="w-full bg-purple-100 rounded-full h-2">
                          <div className="bg-purple-500 h-full rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => onNavigate('advisor')}
                      className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                    >
                      View Detailed Analysis
                    </button>
                  </div>
                </div>
              </div>

              {/* Weekly Activities */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-pink-500"></div>
                <h3 className="text-xl font-bold mb-8">Weekly Focus</h3>
                <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle className="text-gray-100 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                    <circle
                      className="text-orange-500 stroke-current transition-all duration-1000 ease-out"
                      strokeWidth="8"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset="62.8"
                    ></circle>
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black text-gray-900">10</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Hrs/Week</span>
                  </div>
                </div>
                <div className="flex gap-6 w-full justify-center">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase font-bold">Target</p>
                    <p className="font-bold text-gray-900">15 Hrs</p>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase font-bold">Done</p>
                    <p className="font-bold text-orange-500">10 Hrs</p>
                  </div>
                </div>
              </div>

              {/* Future Trend Jobs */}
              <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="text-purple-500" size={24} />
                    Trending Careers for You
                  </h3>
                  <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900">
                    <Settings size={20} />
                  </button>
                </div>
                <div className="space-y-3">
                  {filteredJobs.map((job, index) => (
                    <div key={index} className="p-4 bg-gray-50 hover:bg-white hover:shadow-md rounded-2xl border border-gray-100 transition-all flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-400 group-hover:text-orange-500 group-hover:border-orange-200 transition-colors">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{job.title}</p>
                          <div className="flex gap-3 text-xs mt-1">
                            <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-md">Growth: {job.growth}</span>
                            <span className="text-gray-500">Salary: {job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={20} className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Scholarship Section */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Award className="text-yellow-500" size={24} />
                  Scholarships
                </h3>
                <div className="space-y-4">
                  {filteredScholarships.map((scholarship, index) => (
                    <div key={index} className="flex flex-col gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${scholarship.color}`}>
                            <scholarship.icon size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{scholarship.name}</p>
                            <p className="text-xs text-red-500 font-medium mt-0.5">Deadline: {scholarship.deadline}</p>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleApply(scholarship.name)}
                        className="w-full py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-900 hover:text-white transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Guidance Sessions */}
              <div className="lg:col-span-3 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Users className="text-indigo-500" size={24} />
                    Upcoming Guidance Sessions
                  </h3>
                  <button className="text-gray-500 hover:text-orange-600 text-sm font-medium">View Calendar</button>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSessions.map((session, index) => (
                    <div key={index} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all cursor-pointer">
                      <img src={session.img} alt={session.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-bold text-gray-900">{session.topic}</p>
                        <p className="text-sm text-gray-500 mt-1">by <span className="font-medium text-gray-700">{session.name}</span></p>
                        <div className="flex items-center gap-2 mt-3 text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md w-fit">
                          <Calendar size={12} />
                          {session.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            </>
          )}
          </div>
        </main>
      </div>
    </div>
  );
}
