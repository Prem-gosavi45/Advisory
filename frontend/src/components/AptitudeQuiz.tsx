import { useState } from 'react';
import { 
  CheckCircle2, ChevronRight, RotateCcw, Award, Play, 
  Calculator, Globe, Users, PenTool, Code, Cpu, FileText, 
  Stethoscope, Puzzle, MonitorPlay, ChevronLeft, PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuizSection {
  id: string;
  title: string;
  questionCount: number;
  questions: Question[];
}

interface QuizCategory {
  id: string;
  title: string;
  subtopics: string[];
  icon: any;
  sections: QuizSection[];
}

export default function AptitudeQuiz() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{questionId: number, selected: number, correct: number}[]>([]);

  // Helper function to simulate 25 questions per section (Total 50 per category)
  const getPlaceholderQuestions = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      text: `This is question ${i + 1} for this section. Please select the correct option.`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 1
    }));
  };

  // Exact data from your list
  const categories: QuizCategory[] = [
    {
      id: 'general',
      title: 'General Aptitude',
      subtopics: ['Arithmetic Aptitude', 'Data Interpretation', 'Online Aptitude Test', 'Data Interpretation Test'],
      icon: PieChart,
      sections: [
        { id: 'sec1', title: 'Section 1', questionCount: 25, questions: getPlaceholderQuestions(25) },
        { id: 'sec2', title: 'Section 2', questionCount: 25, questions: getPlaceholderQuestions(25) }
      ]
    },
    {
      id: 'verbal',
      title: 'Verbal and Reasoning',
      subtopics: ['Verbal Ability', 'Logical Reasoning', 'Verbal Reasoning', 'Non Verbal Reasoning'],
      icon: CheckCircle2,
      sections: [
        { id: 'sec1', title: 'Section 1', questionCount: 25, questions: getPlaceholderQuestions(25) },
        { id: 'sec2', title: 'Section 2', questionCount: 25, questions: getPlaceholderQuestions(25) }
      ]
    },
    {
      id: 'gk',
      title: 'Current Affairs & GK',
      subtopics: ['Current Affairs', 'Basic General Knowledge', 'General Science', 'Read more...'],
      icon: Globe,
      sections: [
        { id: 'sec1', title: 'Section 1', questionCount: 25, questions: getPlaceholderQuestions(25) },
        { id: 'sec2', title: 'Section 2', questionCount: 25, questions: getPlaceholderQuestions(25) }
      ]
    },
    {
      id: 'interview',
      title: 'Interview',
      subtopics: ['Placement Papers', 'Group Discussion', 'HR Interview', 'Read more...'],
      icon: Users,
      sections: [
        { id: 'sec1', title: 'Section 1', questionCount: 25, questions: getPlaceholderQuestions(25) },
        { id: 'sec2', title: 'Section 2', questionCount: 25, questions: getPlaceholderQuestions(25) }
      ]
    },
    {
      id: 'engineering',
      title: 'Engineering',
      subtopics: ['Mechanical Engineering', 'Civil Engineering', 'ECE, EEE, CSE', 'Chemical Engineering'],
      icon: PenTool,
      sections: [
        { id: 'sec1', title: 'Section 1', questionCount: 25, questions: getPlaceholderQuestions(25) },
        { id: 'sec2', title: 'Section 2', questionCount: 25, questions: getPlaceholderQuestions(25) }
      ]
    },
    {
      id: 'programming',
      title: 'Programming',
      subtopics: ['C Programming', 'C++ Programming', 'C# Programming', 'Java Programming'],
      icon: Code,
      sections: [
        { id: 'sec1', title: 'Section 1', questionCount: 25, questions: getPlaceholderQuestions(25) },
        { id: 'sec2', title: 'Section 2', questionCount: 25, questions: getPlaceholderQuestions(25) }
      ]
    },
    {
      id: 'online-tests',
      title: 'Online Tests',
      subtopics: ['Aptitude Test', 'Verbal Ability Test', 'Logical Reasoning Test', 'C Programming Test', 'Read more...'],
      icon: MonitorPlay,
      sections: [
        { id: 'sec1', title: 'Section 1', questionCount: 25, questions: getPlaceholderQuestions(25) },
        { id: 'sec2', title: 'Section 2', questionCount: 25, questions: getPlaceholderQuestions(25) }
      ]
    },
    {
      id: 'tech-mcq',
      title: 'Technical MCQs',
      subtopics: ['Networking Questions', 'Database Questions', 'Basic Electronics', 'Digital Electronics', 'Read more...'],
      icon: Cpu,
      sections: [
        { id: 'sec1', title: 'Section 1', questionCount: 25, questions: getPlaceholderQuestions(25) },
        { id: 'sec2', title: 'Section 2', questionCount: 25, questions: getPlaceholderQuestions(25) }
      ]
    },
    {
      id: 'tech-short',
      title: 'Technical Short Answers',
      subtopics: ['Software Testing', 'The C Language Basics', 'SQL Server', 'Networking', 'Read more...'],
      icon: FileText,
      sections: [
        { id: 'sec1', title: 'Section 1', questionCount: 25, questions: getPlaceholderQuestions(25) },
        { id: 'sec2', title: 'Section 2', questionCount: 25, questions: getPlaceholderQuestions(25) }
      ]
    },
    {
      id: 'medical',
      title: 'Medical Science',
      subtopics: ['Microbiology', 'Biochemistry', 'Biotechnology', 'Biochemical Engineering'],
      icon: Stethoscope,
      sections: [
        { id: 'sec1', title: 'Section 1', questionCount: 25, questions: getPlaceholderQuestions(25) },
        { id: 'sec2', title: 'Section 2', questionCount: 25, questions: getPlaceholderQuestions(25) }
      ]
    },
    {
      id: 'puzzles',
      title: 'Puzzles',
      subtopics: ['Sudoku', 'Number puzzles', 'Missing letters puzzles', 'Logical puzzles', 'Clock puzzles'],
      icon: Puzzle,
      sections: [
        { id: 'sec1', title: 'Section 1', questionCount: 25, questions: getPlaceholderQuestions(25) },
        { id: 'sec2', title: 'Section 2', questionCount: 25, questions: getPlaceholderQuestions(25) }
      ]
    }
  ];

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveSection(null);
  };

  const handleStartSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setSelectedOption(null);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (activeCategory && activeSection && selectedOption !== null) {
      const category = categories.find(c => c.id === activeCategory);
      const section = category?.sections.find(s => s.id === activeSection);
      if (!section) return;

      const currentQuestion = section.questions[currentQuestionIndex];
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      
      if (isCorrect) setScore(score + 1);
      
      setAnswers([...answers, {
        questionId: currentQuestion.id,
        selected: selectedOption,
        correct: currentQuestion.correctAnswer
      }]);

      if (currentQuestionIndex < section.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const handleRetake = () => {
    setActiveSection(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const currentCategory = categories.find(c => c.id === activeCategory);
  const currentSection = currentCategory?.sections.find(s => s.id === activeSection);

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Top Header Label */}
      {!activeCategory && (
        <div className="mb-6 pt-6">
          <p className="text-[13px] text-gray-700">Aptitude questions and answers for your placement interviews and competitive exams!</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!activeCategory ? (
          /* Grid Category Selection (Exact match to your image) */
          <motion.div 
            key="categories"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {categories.map((category) => (
              <div 
                key={category.id}
                onClick={() => handleSelectCategory(category.id)}
                className="bg-white border border-gray-200 rounded shadow-sm p-5 relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col"
              >
                {/* Background Watermark Icon (Right Aligned, Faint) */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 text-gray-100 opacity-40">
                  <category.icon size={110} strokeWidth={1.5} />
                </div>

                {/* Green Header */}
                <h3 className="text-[15px] font-bold text-[#6a9e22] mb-3 relative z-10">
                  {category.title}
                </h3>
                
                {/* List Items */}
                <ul className="space-y-2 relative z-10">
                  {category.subtopics.map((sub, idx) => (
                    <li key={idx} className="flex items-center text-[13px] text-gray-700 hover:text-[#6a9e22] transition-colors">
                      <ChevronRight size={14} className="mr-1.5 text-gray-400" />
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        ) : !activeSection ? (
          /* Section Selection Screen */
          <motion.div
            key="sections"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-md shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto mt-8"
          >
            <button 
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-[#6a9e22] font-semibold text-sm mb-6 transition-colors"
            >
              <ChevronLeft size={16} /> Back to Categories
            </button>

            <h2 className="text-2xl font-bold text-[#6a9e22] mb-2">{currentCategory?.title}</h2>
            <p className="text-gray-600 mb-8 text-sm">Select a section to begin. Each section contains {currentCategory?.sections[0].questionCount} questions.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {currentCategory?.sections.map((section) => (
                <div 
                  key={section.id}
                  onClick={() => handleStartSection(section.id)}
                  className="border border-gray-200 rounded-md p-5 hover:border-[#6a9e22] hover:bg-[#f6f9f1] cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h3 className="text-base font-bold text-gray-800 group-hover:text-[#6a9e22]">{section.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{section.questions.length} Questions</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#6a9e22] group-hover:text-white transition-colors">
                    <Play size={14} className="ml-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : !showResult && currentSection ? (
          /* Quiz Interface */
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-md shadow-sm border border-gray-200 p-8 max-w-3xl mx-auto mt-8"
          >
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#6a9e22]">{currentCategory?.title} - {currentSection.title}</h2>
                <p className="text-xs text-gray-500 mt-1">Question {currentQuestionIndex + 1} of {currentSection.questions.length}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-[15px] font-medium text-gray-800 leading-relaxed">
                {currentQuestionIndex + 1}. {currentSection.questions[currentQuestionIndex].text}
              </h3>
            </div>

            <div className="space-y-2 mb-8">
              {currentSection.questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-3 rounded-md text-left border transition-all flex items-center gap-3 text-[14px] ${
                    selectedOption === index 
                      ? 'border-[#6a9e22] bg-[#f6f9f1] text-[#6a9e22] font-semibold' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedOption === index ? 'border-[#6a9e22]' : 'border-gray-300'}`}>
                    {selectedOption === index && <div className="w-2 h-2 rounded-full bg-[#6a9e22]"></div>}
                  </div>
                  <span>{option}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className="px-5 py-2 bg-[#6a9e22] text-white rounded text-sm font-semibold hover:bg-[#59841c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {currentQuestionIndex === currentSection.questions.length - 1 ? 'Submit Section' : 'Next Question'}
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Results Screen */
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-md shadow-sm border border-gray-200 p-10 max-w-2xl mx-auto text-center mt-8"
          >
            <div className="w-16 h-16 bg-[#f6f9f1] rounded-full flex items-center justify-center mx-auto mb-6 text-[#6a9e22]">
              <Award size={32} />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">{currentSection?.title} Completed!</h2>
            <p className="text-gray-500 mb-8 text-sm">Here is your performance summary for {currentCategory?.title}.</p>

            <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
              <div className="p-4 border border-gray-100 rounded-md bg-gray-50">
                <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">Score</p>
                <p className="text-xl font-bold text-gray-900">{score}/{currentSection?.questions.length}</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-md bg-gray-50">
                <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">Accuracy</p>
                <p className="text-xl font-bold text-[#6a9e22]">
                  {currentSection ? Math.round((score / currentSection.questions.length) * 100) : 0}%
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setActiveSection(null)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Other Sections
              </button>
              <button 
                onClick={() => handleStartSection(currentSection!.id)}
                className="px-4 py-2 bg-[#6a9e22] text-white rounded text-sm font-semibold hover:bg-[#59841c] transition-colors flex items-center gap-2"
              >
                <RotateCcw size={14} />
                Retake Section
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}