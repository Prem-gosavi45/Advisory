import { useState } from 'react';
import { getEducationalAdvice, AdvisoryResponse } from '../services/gemini';
import { Search, BookOpen, GraduationCap, ArrowRight, Loader2, Sparkles, ArrowLeft } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvisorProps {
  onBack: () => void;
  userData?: {
    selectedClass?: string;
    selectedInterests?: string[];
    quizCompleted?: boolean;
  };
}

export default function Advisor({ onBack, userData }: AdvisorProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdvisoryResponse | null>(null);

  const isQuizPending = userData?.quizCompleted === false;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isQuizPending) return;

    setLoading(true);
    try {
      const context = userData?.selectedClass 
        ? `User is in ${userData.selectedClass} class and interested in: ${userData.selectedInterests?.join(', ')}. `
        : '';
      const data = await getEducationalAdvice(context + query);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Edu-Advisory Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-green-600">Edu</span>-<span className="text-orange-500">Advisory</span>
          </span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      {isQuizPending && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-900">Aptitude Quiz Pending</p>
              <p className="text-sm text-gray-600">Complete the quiz to unlock Mentorship and advanced AI features.</p>
            </div>
          </div>
          <button 
            onClick={onBack}
            className="px-6 py-2 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors"
          >
            Take Quiz Now
          </button>
        </motion.div>
      )}

      <header className="mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4"
        >
          <Sparkles size={14} />
          AI-Powered Guidance
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Your Personal Education Advisor
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ask about career paths, course selections, or learning resources. 
          Get tailored advice powered by advanced AI.
        </p>
      </header>

      <form onSubmit={handleSearch} className="relative mb-12">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isQuizPending}
          placeholder={isQuizPending ? "Complete the quiz to unlock search..." : "e.g., How do I become a data scientist starting from zero?"}
          className={`w-full px-6 py-4 pr-16 text-lg rounded-2xl border border-gray-200 shadow-sm outline-none transition-all ${
            isQuizPending 
              ? 'bg-gray-50 cursor-not-allowed opacity-60' 
              : 'focus:ring-2 focus:ring-orange-500 focus:border-transparent'
          }`}
        />
        <button
          type="submit"
          disabled={loading || isQuizPending}
          className="absolute right-2 top-2 bottom-2 px-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="text-orange-600" />
                Expert Advice
              </h2>
              <div className="prose prose-orange max-w-none text-gray-700">
                <Markdown>{result.advice}</Markdown>
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              <section className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="text-orange-600" size={20} />
                  Recommended Paths
                </h3>
                <div className="space-y-4">
                  {result.recommendedPaths.map((path, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900">{path.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                          path.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          path.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {path.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{path.description}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ArrowRight className="text-orange-600" size={20} />
                  Useful Resources
                </h3>
                <div className="grid gap-3">
                  {result.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:bg-orange-50 hover:border-orange-100 transition-all group"
                    >
                      <span className="font-medium text-gray-700 group-hover:text-orange-700">{res.name}</span>
                      <ArrowRight size={16} className="text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { topic: "Career Change Advice", locked: false },
            { topic: "University Selection", locked: isQuizPending },
            { topic: "Mentorship Program", locked: isQuizPending }
          ].map((item, i) => (
            <div key={i} className={`p-6 bg-white rounded-3xl border border-gray-100 text-center relative overflow-hidden ${item.locked ? 'opacity-60' : ''}`}>
              {item.locked && (
                <div className="absolute inset-0 bg-gray-50/40 backdrop-blur-[1px] flex items-center justify-center z-10">
                  <div className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 flex items-center gap-1 text-xs font-bold text-gray-400">
                    <Loader2 size={12} /> Locked
                  </div>
                </div>
              )}
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-orange-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{item.topic}</h4>
              <p className="text-sm text-gray-500">
                {item.locked 
                  ? "Complete the quiz to unlock this feature." 
                  : `Get specialized guidance for your ${item.topic.toLowerCase()}.`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
