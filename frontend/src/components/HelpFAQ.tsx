import { useState } from 'react';
import { 
  Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, 
  HelpCircle, Book, Shield, User, CreditCard, ExternalLink,
  MessageSquare, LifeBuoy, FileText, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    category: 'General',
    question: 'What is Edu-Advisory Pro?',
    answer: 'Edu-Advisory Pro is an AI-powered platform designed to help students and professionals navigate their career paths. We provide personalized roadmaps, skill-sharing opportunities, resume building tools, and AI-driven homework analysis.'
  },
  {
    id: '2',
    category: 'Account',
    question: 'How do I reset my password?',
    answer: 'You can reset your password by going to Settings > Account Security. Click on "Change Password" and follow the instructions. If you cannot log in, use the "Forgot Password" link on the login page.'
  },
  {
    id: '3',
    category: 'AI Tools',
    question: 'How accurate is the Homework Analyzer?',
    answer: 'Our Homework Analyzer uses advanced multimodal AI (Gemini 3) to understand context, text, and mathematical symbols. While highly accurate, we recommend using it as a learning aid to understand the "why" behind solutions rather than just for raw answers.'
  },
  {
    id: '4',
    category: 'Career',
    question: 'How are the Career Roadmaps generated?',
    answer: 'Roadmaps are generated based on current industry trends, required skill sets, and successful career trajectories of professionals in those fields. Our AI analyzes thousands of data points to provide the most relevant path for you.'
  },
  {
    id: '5',
    category: 'Privacy',
    question: 'Is my data safe?',
    answer: 'Yes, we take privacy seriously. Your personal information and uploaded documents are encrypted. We do not share your personal data with third parties without your explicit consent.'
  },
  {
    id: '6',
    category: 'General',
    question: 'Is there a mobile app?',
    answer: 'Currently, Edu-Advisory Pro is a web-based application optimized for both desktop and mobile browsers. A native mobile app is in our future roadmap.'
  }
];

export default function HelpFAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', 'General', 'Account', 'AI Tools', 'Career', 'Privacy'];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold">
          <LifeBuoy size={18} />
          Help Center
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          How can we help you today?
        </h1>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search for questions, keywords, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-lg shadow-indigo-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Book, label: 'Guides', color: 'bg-blue-50 text-blue-600' },
          { icon: Zap, label: 'Quick Start', color: 'bg-orange-50 text-orange-600' },
          { icon: Shield, label: 'Security', color: 'bg-green-50 text-green-600' },
          { icon: MessageSquare, label: 'Community', color: 'bg-purple-50 text-purple-600' },
        ].map((item, i) => (
          <button key={i} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-3 group">
            <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <item.icon size={24} />
            </div>
            <span className="font-bold text-gray-700">{item.label}</span>
          </button>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="space-y-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div 
              key={faq.id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <button 
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                </div>
                {expandedId === faq.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="pt-2 border-t border-gray-50 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-indigo-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-indigo-100 opacity-80">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 space-y-4">
              <MessageCircle size={32} className="text-indigo-300" />
              <div>
                <h3 className="font-bold">Live Chat</h3>
                <p className="text-sm text-indigo-200">Available 24/7</p>
              </div>
              <button className="w-full py-2 bg-white text-indigo-900 rounded-xl font-bold text-sm">Start Chat</button>
            </div>
            
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 space-y-4">
              <Mail size={32} className="text-indigo-300" />
              <div>
                <h3 className="font-bold">Email Support</h3>
                <p className="text-sm text-indigo-200">Response in 24h</p>
              </div>
              <button className="w-full py-2 bg-white text-indigo-900 rounded-xl font-bold text-sm">Send Email</button>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 space-y-4">
              <Phone size={32} className="text-indigo-300" />
              <div>
                <h3 className="font-bold">Call Us</h3>
                <p className="text-sm text-indigo-200">Mon-Fri, 9am-6pm</p>
              </div>
              <button className="w-full py-2 bg-white text-indigo-900 rounded-xl font-bold text-sm">Call Now</button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-800/40 rounded-full -ml-32 -mb-32 blur-3xl" />
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
        <button className="hover:text-indigo-600 flex items-center gap-2">
          <FileText size={16} /> User Manual
        </button>
        <button className="hover:text-indigo-600 flex items-center gap-2">
          <Shield size={16} /> Privacy Policy
        </button>
        <button className="hover:text-indigo-600 flex items-center gap-2">
          <ExternalLink size={16} /> Terms of Service
        </button>
      </div>
    </div>
  );
}
