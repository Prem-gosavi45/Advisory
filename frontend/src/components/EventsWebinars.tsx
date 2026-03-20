import { useState } from 'react';
import { CalendarDays, Laptop, Users, Code, Award, MapPin, Clock, ExternalLink, Bookmark, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Event {
  id: string;
  type: 'webinar' | 'workshop' | 'hackathon' | 'competition' | 'meetup';
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  host: string;
  location: string; // 'Online' or physical address
  registrationLink: string;
  isRegistered: boolean;
  category: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    type: 'webinar',
    title: 'Future of AI in Software Development',
    description: 'Explore how artificial intelligence is transforming the software development landscape, from code generation to automated testing.',
    date: '2026-03-10',
    time: '14:00',
    host: 'Google Developers',
    location: 'Online',
    registrationLink: 'https://example.com/ai-webinar',
    isRegistered: false,
    category: 'Technology'
  },
  {
    id: '2',
    type: 'hackathon',
    title: 'Innovate for Impact Hackathon',
    description: 'A 24-hour hackathon challenging participants to build solutions for social good using modern technologies.',
    date: '2026-03-22',
    time: '09:00',
    host: 'Tech For Good Foundation',
    location: 'Virtual Event',
    registrationLink: 'https://example.com/hackathon',
    isRegistered: true,
    category: 'Development'
  },
  {
    id: '3',
    type: 'workshop',
    title: 'Mastering React Hooks',
    description: 'An intensive workshop covering advanced React Hooks, custom hooks, and state management patterns.',
    date: '2026-03-15',
    time: '10:00',
    host: 'React India Community',
    location: 'Bangalore, India',
    registrationLink: 'https://example.com/react-workshop',
    isRegistered: false,
    category: 'Frontend'
  },
  {
    id: '4',
    type: 'competition',
    title: 'Data Science Challenge 2026',
    description: 'Compete with data scientists worldwide to solve real-world problems using machine learning and statistical analysis.',
    date: '2026-04-01',
    time: '00:00',
    host: 'Kaggle',
    location: 'Online',
    registrationLink: 'https://example.com/data-challenge',
    isRegistered: false,
    category: 'Data Science'
  },
  {
    id: '5',
    type: 'meetup',
    title: 'Local Python Developers Meetup',
    description: 'Network with local Python developers, share insights, and learn about new projects in the community.',
    date: '2026-03-05',
    time: '18:30',
    host: 'Python User Group',
    location: 'Delhi, India',
    registrationLink: 'https://example.com/python-meetup',
    isRegistered: false,
    category: 'Networking'
  }
];

const EventIcon = ({ type }: { type: Event['type'] }) => {
  switch (type) {
    case 'webinar': return <Laptop size={20} className="text-blue-500" />;
    case 'workshop': return <Users size={20} className="text-green-500" />;
    case 'hackathon': return <Code size={20} className="text-purple-500" />;
    case 'competition': return <Award size={20} className="text-orange-500" />;
    case 'meetup': return <MapPin size={20} className="text-teal-500" />;
    default: return <CalendarDays size={20} className="text-gray-500" />;
  }
};

export default function EventsWebinars() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterType, setFilterType] = useState<'all' | Event['type']>('all');
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const filteredEvents = events.filter(event => 
    filterType === 'all' || event.type === filterType
  );

  const handleRegister = async (eventId: string) => {
    setRegistrationStatus('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      if (Math.random() > 0.2) { // 80% success rate
        setEvents(prev => prev.map(e => e.id === eventId ? { ...e, isRegistered: true } : e));
        setRegistrationStatus('success');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setRegistrationStatus('error');
    }
  };

  const closeRegistrationStatus = () => {
    setRegistrationStatus('idle');
    setSelectedEvent(null); // Close detail view after action
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
            <CalendarDays size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Events & Webinars</h1>
            <p className="text-xs text-gray-500">Discover and register for upcoming opportunities</p>
          </div>
        </div>
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as 'all' | Event['type'])}
          className="p-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
        >
          <option value="all">All Types</option>
          <option value="webinar">Webinars</option>
          <option value="workshop">Workshops</option>
          <option value="hackathon">Hackathons</option>
          <option value="competition">Competitions</option>
          <option value="meetup">Meetups</option>
        </select>
      </div>

      {/* Events List and Detail View */}
      <div className="grid lg:grid-cols-3 gap-6 flex-1">
        {/* Events List */}
        <div className="lg:col-span-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-bold text-gray-900">Upcoming Events</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {filteredEvents.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No events found matching your criteria.
              </div>
            ) : (
              filteredEvents.map(event => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedEvent(event)}
                  className={`bg-gray-50 p-4 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors ${
                    selectedEvent?.id === event.id ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <EventIcon type={event.type} />
                    <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                  </div>
                  <p className="text-sm text-gray-700 mt-1 flex items-center gap-2"><MapPin size={14} /> {event.location}</p>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-2"><CalendarDays size={14} /> {event.date} <Clock size={14} /> {event.time}</p>
                  {event.isRegistered && (
                    <span className="absolute top-4 right-4 text-green-600 flex items-center gap-1 text-xs font-medium">
                      <CheckCircle2 size={14} /> Registered
                    </span>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Event Detail View */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-bold text-gray-900">Event Details</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <motion.div
                  key={selectedEvent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <EventIcon type={selectedEvent.type} />
                        <h3 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h3>
                      </div>
                      <p className="text-lg text-gray-700 mt-1 flex items-center gap-2"><Users size={18} /> {selectedEvent.host}</p>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-2"><MapPin size={16} /> {selectedEvent.location}</p>
                    </div>
                    {selectedEvent.isRegistered && (
                      <span className="text-green-600 flex items-center gap-1 text-base font-medium">
                        <CheckCircle2 size={20} /> Registered
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"><CalendarDays size={14} /> {selectedEvent.date}</span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"><Clock size={14} /> {selectedEvent.time}</span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">Category: {selectedEvent.category}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">About the Event</h4>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selectedEvent.description}</p>
                  </div>

                  <div className="flex gap-4">
                    <a 
                      href={selectedEvent.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors text-lg"
                    >
                      <ExternalLink size={20} /> {selectedEvent.isRegistered ? 'View Event' : 'Register Now'}
                    </a>
                    {!selectedEvent.isRegistered && (
                      <button 
                        onClick={() => handleRegister(selectedEvent.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors text-lg"
                      >
                        <Bookmark size={20} /> Add to Calendar
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <CalendarDays size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Select an event to view details.</p>
                  <p className="text-sm text-gray-400">Use the filters to find interesting events.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Registration Status Modal */}
      <AnimatePresence>
        {registrationStatus !== 'idle' && selectedEvent && (
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
              {registrationStatus === 'submitting' && (
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                  <Loader2 size={48} className="animate-spin text-indigo-500" />
                  <p className="text-lg font-medium text-gray-700">Registering for {selectedEvent.title}...</p>
                </div>
              )}
              {registrationStatus === 'success' && (
                <div className="flex flex-col items-center justify-center space-y-4 py-8 text-green-600">
                  <CheckCircle2 size={48} />
                  <p className="text-lg font-medium">Registration Successful!</p>
                  <p className="text-sm text-gray-500">You are now registered for {selectedEvent.title}.</p>
                  <button 
                    onClick={closeRegistrationStatus}
                    className="mt-6 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
              {registrationStatus === 'error' && (
                <div className="flex flex-col items-center justify-center space-y-4 py-8 text-red-600">
                  <XCircle size={48} />
                  <p className="text-lg font-medium">Registration Failed!</p>
                  <p className="text-sm text-gray-500">Please try again later.</p>
                  <button 
                    onClick={closeRegistrationStatus}
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
