
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Icon Components
const Icon = ({ name, className = '' }) => {
  const iconMap = {
    Home: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v7a1 1 0 001 1h12a1 1 0 001-1V9m-9 4v4m0 0H9m3 0h3" /></svg>,
    MessageSquare: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    Calendar: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    DollarSign: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Bell: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    BookOpen: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" /></svg>,
    MoreHorizontal: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>,
    Plus: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    RefreshCw: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    Check: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    ChevronLeft: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
    ChevronRight: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    Search: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  };
  return iconMap[name] || null;
};

// Icon aliases for easier use
const FiHome = (props) => <Icon name="Home" {...props} />;
const FiMessageSquare = (props) => <Icon name="MessageSquare" {...props} />;
const FiCalendar = (props) => <Icon name="Calendar" {...props} />;
const FiDollarSign = (props) => <Icon name="DollarSign" {...props} />;
const FiBell = (props) => <Icon name="Bell" {...props} />;
const FiBookOpen = (props) => <Icon name="BookOpen" {...props} />;
const FiMoreHorizontal = (props) => <Icon name="MoreHorizontal" {...props} />;
const FiPlus = (props) => <Icon name="Plus" {...props} />;
const FiRefreshCw = (props) => <Icon name="RefreshCw" {...props} />;
const FiCheck = (props) => <Icon name="Check" {...props} />;
const FiChevronLeft = (props) => <Icon name="ChevronLeft" {...props} />;
const FiChevronRight = (props) => <Icon name="ChevronRight" {...props} />;
const FiSearch = (props) => <Icon name="Search" {...props} />;

// Mock Data
const childData = [
  { id: 1, name: 'Alex', avatar: 'https://randomuser.me/api/portraits/thumb/men/75.jpg' },
  { id: 2, name: 'Sarah', avatar: 'https://randomuser.me/api/portraits/thumb/women/75.jpg' },
  { id: 3, name: 'David', avatar: 'https://randomuser.me/api/portraits/thumb/men/76.jpg' },
];

const goalsData = [
  { title: 'Complete 13 sessions', progress: 65, color: '#3B82F6' },
  { title: 'Complete 7 sessions', progress: 85, color: '#10B981' },
];

const recommendedTutors = [
  { subject: 'Mathematics', desc: 'Algebra, Geometry', tutor: 'Mr. Smith', avatar: 'https://randomuser.me/api/portraits/thumb/men/77.jpg' },
  { subject: 'Physics', desc: 'Mechanics, Optics', tutor: 'Ms. Jones', avatar: 'https://randomuser.me/api/portraits/thumb/women/77.jpg' },
];

const subjectsData = [
    { name: 'Mathematics', tutor: 'Mr. Smith', time: '10:00 - 11:00 AM' },
    { name: 'Physics', tutor: 'Ms. Jones', time: '1:00 - 2:00 PM' },
    { name: 'History', tutor: 'Mr. Brown', time: '3:00 - 4:00 PM' },
    { name: 'English', tutor: 'Ms. Davis', time: '5:00 - 6:00 PM' },
];

const dailyActivityData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3 },
  { day: 'Wed', hours: 4 },
  { day: 'Thu', hours: 2.5 },
  { day: 'Fri', hours: 5 },
  { day: 'Sat', hours: 6 },
  { day: 'Sun', hours: 1 },
];

const upcomingLessons = [
  { subject: 'Mathematics', date: '2024-07-28', time: '10:00 AM', participants: ['Alex'] },
  { subject: 'Physics', date: '2024-07-29', time: '1:00 PM', participants: ['Sarah'] },
];

// Reusable Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-lg p-6 ${className}`}>
    {children}
  </div>
);

const SidebarMenuItem = ({ icon, text, active = false }) => (
  <a href="#" className={`flex items-center space-x-4 px-4 py-3 rounded-lg text-gray-300 hover:bg-blue-600/20 transition-all duration-200 relative ${active ? 'text-white' : ''}`}>
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full"></div>}
    {React.createElement(icon, { className: "w-6 h-6" })}
    <span className="font-medium">{text}</span>
  </a>
);

const CircularProgress = ({ progress, color }) => (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-700"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={`text-[${color}]`}
          strokeWidth="10"
          strokeDasharray="283"
          strokeDashoffset={283 - (283 * progress) / 100}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-white">{progress}%</span>
      </div>
    </div>
  );
  

const ParentDashboard = () => {
  const [activeChild, setActiveChild] = useState(1);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`flex min-h-screen font-sans bg-gray-900 text-white ${darkMode ? 'dark' : ''}`}>
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-800/30 backdrop-blur-xl border-r border-gray-700/50 p-6 flex-shrink-0 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
            <span className="text-xl font-bold">EduPro</span>
          </div>
          <nav className="space-y-2">
            <SidebarMenuItem icon={FiHome} text="Dashboard" active />
            <SidebarMenuItem icon={FiMessageSquare} text="Messages" />
            <SidebarMenuItem icon={FiCalendar} text="Calendar" />
            <SidebarMenuItem icon={FiDollarSign} text="Finances" />
            <SidebarMenuItem icon={FiBell} text="Notifications" />
            <SidebarMenuItem icon={FiBookOpen} text="Classroom" />
            <SidebarMenuItem icon={FiMoreHorizontal} text="More" />
          </nav>
        </div>
        <div>
          <Card className="text-center mb-4">
            <p className="text-gray-400 text-sm">Balance</p>
            <p className="text-2xl font-bold">$365.00</p>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Top-Up
            </button>
          </Card>
          <div className="flex items-center space-x-3">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Parent" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">Jane Doe</p>
              <p className="text-sm text-gray-400">Parent</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, Jane!</h1>
            <p className="text-gray-400">Plan your children’s learning process</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {childData.map(child => (
                <img
                  key={child.id}
                  src={child.avatar}
                  alt={child.name}
                  className={`w-12 h-12 rounded-full cursor-pointer border-2 transition-all ${activeChild === child.id ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setActiveChild(child.id)}
                />
              ))}
            </div>
            <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
              <FiPlus className="w-6 h-6 text-gray-400" />
            </button>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." className="bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-800 rounded-lg">
                {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                {/* Goals */}
                <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {goalsData.map((goal, index) => (
                    <Card key={index} className="flex items-center space-x-6">
                        <CircularProgress progress={goal.progress} color={goal.color} />
                        <div>
                        <p className="font-semibold text-lg">{goal.title}</p>
                        <p className="text-sm text-gray-400">Progress</p>
                        </div>
                    </Card>
                    ))}
                </div>
                </section>

                {/* Recommended Tutors */}
                <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Recommended Tutors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {recommendedTutors.map((tutor, index) => (
                    <Card key={index}>
                        <div className="flex items-start justify-between">
                        <div>
                            <p className="font-bold text-lg text-blue-400">{tutor.subject}</p>
                            <p className="text-sm text-gray-400">{tutor.desc}</p>
                        </div>
                        <img src={tutor.avatar} alt="Tutor" className="w-12 h-12 rounded-full border-2 border-gray-600" />
                        </div>
                        <div className="mt-6 flex space-x-2">
                        <button className="p-3 bg-gray-700/50 rounded-full hover:bg-gray-600 transition-colors"><FiRefreshCw/></button>
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                            <FiCheck />
                            <span>Confirm</span>
                        </button>
                        </div>
                    </Card>
                    ))}
                </div>
                </section>
                
                {/* Subjects */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Subjects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {subjectsData.map((subject, index) => (
                            <Card key={index} className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-lg">{subject.name}</p>
                                    <p className="text-sm text-gray-400">{subject.tutor}</p>
                                </div>
                                <p className="font-semibold text-blue-400">{subject.time}</p>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
          
            {/* Right Sidebar */}
            <aside>
                {/* Daily Activity */}
                <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Daily Activity</h2>
                <Card>
                    <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={dailyActivityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis dataKey="day" tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                        <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(31, 41, 55, 0.8)',
                            borderColor: 'rgba(55, 65, 81, 1)',
                            color: '#fff'
                        }}
                        />
                        <Bar dataKey="hours" radius={[10, 10, 0, 0]}>
                            {dailyActivityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 4 ? '#3B82F6' : '#4B5563'} />
                            ))}
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>
                </Card>
                </section>

                {/* Upcoming Lessons */}
                <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Upcoming Lessons</h2>
                    <div className="flex space-x-2">
                        <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"><FiChevronLeft/></button>
                        <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"><FiChevronRight/></button>
                    </div>
                </div>
                <div className="space-y-4">
                    {upcomingLessons.map((lesson, index) => (
                    <Card key={index}>
                        <p className="font-bold text-lg">{lesson.subject}</p>
                        <p className="text-sm text-gray-400">{lesson.date} at {lesson.time}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex -space-x-2">
                                {childData.filter(c => lesson.participants.includes(c.name)).map(c => (
                                     <img key={c.id} src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full border-2 border-gray-800"/>
                                ))}
                            </div>
                            <button className="text-blue-500 font-semibold">Join</button>
                        </div>
                    </Card>
                    ))}
                </div>
                </section>
            </aside>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;
