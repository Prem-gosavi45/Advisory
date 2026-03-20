import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Rocket, 
  Palette,
  Languages
} from 'lucide-react';

interface InterestCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  interests: string[];
}

const CATEGORIES: InterestCategory[] = [
  {
    id: 'academic',
    title: 'Academic Interests',
    icon: <GraduationCap size={20} />,
    interests: ['Science', 'Mathematics', 'Arts & Humanities', 'Commerce']
  },
  {
    id: 'career',
    title: 'Career-Oriented Interests',
    icon: <Briefcase size={20} />,
    interests: ['Business & Entrepreneurship', 'Medicine & Healthcare', 'Teaching & Education']
  },
  {
    id: 'modern',
    title: 'Modern & Emerging Fields',
    icon: <Rocket size={20} />,
    interests: ['Artificial Intelligence (AI)', 'Data Science & Analytics', 'Robotics']
  },
  {
    id: 'creative',
    title: 'Creative Interests',
    icon: <Palette size={20} />,
    interests: ['Music', 'Visual Arts', 'Writing & Content Creation']
  }
];

const CLASSES = ['8th', '9th', '10th', '11th', '12th', 'Undergraduate', 'Graduate'];

interface InterestSelectionProps {
  onComplete: (data: { selectedClass: string; selectedInterests: string[] }) => void;
}

export default function InterestSelection({ onComplete }: InterestSelectionProps) {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
    setError(false);
  };

  const handleSubmit = () => {
    if (!selectedClass || selectedInterests.length === 0) {
      setError(true);
      return;
    }
    onComplete({ selectedClass, selectedInterests });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Edu-Advisory Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-green-600">Edu</span>-<span className="text-orange-500">Advisory</span>
            </span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Languages size={16} />
            English
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Tell Us About Yourself</h1>
          <p className="text-xl text-gray-500 font-medium">This will help us personalize your experience.</p>
        </div>

        <div className="space-y-8">
          {/* Class Selection */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-4">Select Your Class</label>
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setError(false);
                }}
                className="w-full px-6 py-4 rounded-3xl border border-gray-200 bg-white text-gray-700 appearance-none focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all cursor-pointer"
              >
                <option value="" disabled>-- Select a Class --</option>
                {CLASSES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Interests Selection */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg font-bold text-gray-900">Choose Your Interests</label>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Sparkles size={16} className="text-orange-500" />
                Suggest For Me
              </button>
            </div>

            <div className="space-y-3">
              {CATEGORIES.map((category) => (
                <div key={category.id} className="overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all ${
                      expandedCategory === category.id 
                        ? 'bg-orange-600 border-orange-600 text-white' 
                        : 'bg-white border-gray-200 text-gray-900 hover:border-orange-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={expandedCategory === category.id ? 'text-white' : 'text-orange-600'}>
                        {category.icon}
                      </span>
                      <span className="font-bold">{category.title}</span>
                    </div>
                    {expandedCategory === category.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  <AnimatePresence>
                    {expandedCategory === category.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-6 flex flex-wrap gap-3">
                          {category.interests.map((interest) => (
                            <button
                              key={interest}
                              onClick={() => toggleInterest(interest)}
                              className={`px-6 py-3 rounded-full border text-sm font-bold transition-all ${
                                selectedInterests.includes(interest)
                                  ? 'bg-orange-600 border-orange-600 text-white'
                                  : 'bg-white border-gray-200 text-gray-700 hover:border-orange-200'
                              }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-500 font-medium"
            >
              Please select your class and at least one interest.
            </motion.p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-5 bg-orange-600 text-white rounded-3xl font-bold text-lg hover:bg-orange-700 transition-all transform hover:scale-[1.02] shadow-xl shadow-orange-900/20 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            Find My Career Match to Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
