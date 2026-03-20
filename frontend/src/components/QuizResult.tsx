import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Target, Sparkles, ArrowRight, RotateCcw, Briefcase, Zap, TrendingUp } from 'lucide-react';

interface QuizResultProps {
  onDashboard: () => void;
  onRetake: () => void;
}

export default function QuizResult({ onDashboard, onRetake }: QuizResultProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onDashboard();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onDashboard]);

  // Mock data - in a real app, this would come from the backend based on quiz answers
  const result = {
    career: "Doctor / Medical Professional",
    match: 87,
    description: "Aligns with your desire to help others and analytical skills.",
    superpowers: ["Empathy", "Communication", "Leadership Support"],
    suggestedPaths: [
      { title: "UI/UX Designer", match: 48 },
      { title: "Software Developer", match: 45 },
      { title: "Data Scientist / AI Engineer", match: 43 },
    ],
    trendingFields: ["EdTech", "Social Entrepreneurship", "HR Tech"]
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Hero Section */}
      <div className="bg-orange-500 text-white pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-lg">
              <Target size={40} />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {result.career}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-orange-100 font-medium"
          >
            {result.match}% Match • {result.description}
          </motion.p>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 -mt-20 relative z-20 pb-20">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="md:col-span-4 space-y-8">
            {/* Superpowers */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-orange-500/5"
            >
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Zap size={14} className="text-orange-500" />
                Your Superpowers
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.superpowers.map((power, i) => (
                  <span key={i} className="px-4 py-2 bg-orange-50 text-orange-700 rounded-xl font-bold text-sm border border-orange-100">
                    {power}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Trending Fields */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-orange-500/5"
            >
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <TrendingUp size={14} className="text-blue-500" />
                Trending Fields For You
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.trendingFields.map((field, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl font-medium text-sm border border-gray-100">
                    {field}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-orange-500/5 h-full"
            >
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Briefcase size={14} className="text-purple-500" />
                Suggested Career Paths
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Main Result Card */}
                <div className="p-6 rounded-2xl border-2 border-orange-500 bg-orange-50/50 flex flex-col justify-between min-h-[160px]">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{result.career}</h4>
                    <p className="text-orange-600 font-bold text-sm">{result.match}% Match</p>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-1.5 mt-4">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${result.match}%` }}></div>
                  </div>
                </div>

                {/* Other Paths */}
                {result.suggestedPaths.map((path, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all flex flex-col justify-between min-h-[160px] bg-white">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{path.title}</h4>
                      <p className="text-yellow-600 font-bold text-sm">{path.match}% Match</p>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
                      <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${path.match}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-12">
          <button 
            onClick={onDashboard}
            className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            Explore Other Careers
          </button>

          <div className="flex items-center gap-6">
            <p className="text-gray-400 text-sm font-medium">
              Redirecting to dashboard in <span className="text-orange-500 font-bold">{countdown}s</span>
            </p>
            <button 
              onClick={onRetake}
              className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
