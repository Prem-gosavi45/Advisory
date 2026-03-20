import { useState, useRef } from 'react';
import { Mic, Play, Pause, StopCircle, Send, MessageSquare, CheckCircle2, XCircle, Loader2, Lightbulb, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InterviewQuestion {
  id: string;
  question: string;
  type: 'behavioral' | 'technical' | 'situational';
  expectedKeywords?: string[]; // For mock evaluation
}

interface UserAnswer {
  questionId: string;
  answer: string;
  timestamp: number;
}

interface InterviewFeedback {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  questionSpecificFeedback: { questionId: string; feedback: string }[];
}

const mockQuestions: Record<string, InterviewQuestion[]> = {
  'Software Engineer': [
    { id: 'se1', question: 'Tell me about a time you faced a challenging bug. How did you approach it?', type: 'behavioral' },
    { id: 'se2', question: 'Explain the difference between `null` and `undefined` in JavaScript.', type: 'technical', expectedKeywords: ['absence of value', 'intentional', 'uninitialized', 'variable declaration'] },
    { id: 'se3', question: 'Design a data structure for a Least Recently Used (LRU) cache.', type: 'technical', expectedKeywords: ['hash map', 'doubly linked list', 'O(1)', 'get', 'put'] },
    { id: 'se4', question: 'How do you ensure the quality of your code?', type: 'behavioral' },
    { id: 'se5', question: 'Describe a time you had to work with a difficult team member.', type: 'behavioral' },
  ],
  'Data Scientist': [
    { id: 'ds1', question: 'Explain the bias-variance tradeoff.', type: 'technical', expectedKeywords: ['model complexity', 'underfitting', 'overfitting', 'generalization'] },
    { id: 'ds2', question: 'How would you approach a project to predict customer churn?', type: 'situational', expectedKeywords: ['data collection', 'feature engineering', 'model selection', 'evaluation metrics', 'deployment'] },
    { id: 'ds3', question: 'What is regularization and why is it important?', type: 'technical', expectedKeywords: ['overfitting', 'L1', 'L2', 'penalty', 'weights'] },
    { id: 'ds4', question: 'Tell me about a time you had to explain a complex model to a non-technical audience.', type: 'behavioral' },
    { id: 'ds5', question: 'How do you handle missing data?', type: 'technical', expectedKeywords: ['imputation', 'deletion', 'mean', 'median', 'mode', 'domain knowledge'] },
  ],
  'Product Manager': [
    { id: 'pm1', question: 'Tell me about a product you admire and why.', type: 'behavioral' },
    { id: 'pm2', question: 'How do you prioritize features for a product roadmap?', type: 'situational', expectedKeywords: ['customer value', 'business impact', 'effort', 'RICE', 'MoSCoW'] },
    { id: 'pm3', question: 'Describe a time you had to say no to a stakeholder.', type: 'behavioral' },
    { id: 'pm4', question: 'How do you define success for a product?', type: 'technical', expectedKeywords: ['metrics', 'KPIs', 'OKRs', 'user adoption', 'retention'] },
    { id: 'pm5', question: 'Imagine you are building a new feature for our product. Walk me through your process.', type: 'situational', expectedKeywords: ['problem definition', 'user research', 'solutioning', 'spec', 'launch', 'iterate'] },
  ],
};

const mockFeedback: InterviewFeedback = {
  overallScore: 75,
  strengths: [
    'Clear communication of technical concepts.',
    'Strong problem-solving approach for behavioral questions.',
    'Good understanding of core principles.'
  ],
  areasForImprovement: [
    'Provide more specific examples for situational questions.',
    'Elaborate further on the trade-offs in design decisions.',
    'Practice time management for technical questions.'
  ],
  questionSpecificFeedback: [
    { questionId: 'se1', feedback: 'Good structure, clear STAR method application.' },
    { questionId: 'se2', feedback: 'Correctly identified `null` as intentional, but could elaborate more on `undefined` scenarios.' },
    { questionId: 'se3', feedback: 'Solid approach to LRU cache, mentioned key data structures.' },
  ],
};

export default function MockInterviews() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  const questions = selectedRole ? mockQuestions[selectedRole] : [];
  const currentQuestion = questions[currentQuestionIndex];

  const startInterview = (role: string) => {
    setSelectedRole(role);
    setInterviewStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentAnswer('');
    setInterviewFinished(false);
    setFeedback(null);
  };

  const submitAnswer = () => {
    setUserAnswers(prev => [...prev, { questionId: currentQuestion.id, answer: currentAnswer, timestamp: Date.now() }]);
    setCurrentAnswer('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      endInterview();
    }
  };

  const endInterview = async () => {
    setInterviewStarted(false);
    setIsLoadingFeedback(true);
    // Simulate API call for feedback generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFeedback(mockFeedback);
    setIsLoadingFeedback(false);
    setInterviewFinished(true);
  };

  const restartInterview = () => {
    setSelectedRole(null);
    setInterviewStarted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentAnswer('');
    setInterviewFinished(false);
    setFeedback(null);
  };

  const getQuestionSpecificFeedback = (questionId: string) => {
    return feedback?.questionSpecificFeedback.find(f => f.questionId === questionId)?.feedback || 'No specific feedback.';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
            <UserCheck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Mock Interviews</h1>
            <p className="text-xs text-gray-500">Practice and ace your next interview</p>
          </div>
        </div>
        {interviewFinished && (
          <button 
            onClick={restartInterview}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-medium hover:bg-indigo-100 transition-colors text-sm"
          >
            Restart Interview
          </button>
        )}
      </div>

      {/* Role Selection / Interview Area */}
      {!interviewStarted && !interviewFinished && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col items-center justify-center text-center space-y-6"
        >
          <Lightbulb size={64} className="text-yellow-500" />
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Interview Role</h2>
          <p className="text-gray-600 max-w-md">Select a role to start a mock interview. You'll be asked a series of questions to test your skills and knowledge.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
            {Object.keys(mockQuestions).map(role => (
              <motion.button
                key={role}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startInterview(role)}
                className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors space-y-2"
              >
                <MessageSquare size={32} className="text-indigo-500" />
                <span className="font-semibold text-lg text-gray-800">{role}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Interview In Progress */}
      {interviewStarted && currentQuestion && (
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-indigo-600">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">{currentQuestion.type}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestion.question}</h2>

          <textarea
            className="flex-1 w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800"
            placeholder="Type your answer here..."
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-6">
            <button 
              onClick={endInterview}
              className="px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              <StopCircle size={20} className="inline-block mr-2" /> End Interview
            </button>
            <button 
              onClick={submitAnswer}
              disabled={!currentAnswer.trim()}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <Send size={20} className="inline-block mr-2" /> {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Loading Feedback */}
      {isLoadingFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col items-center justify-center text-center space-y-4"
        >
          <Loader2 size={64} className="animate-spin text-indigo-500" />
          <h2 className="text-2xl font-bold text-gray-900">Generating Feedback...</h2>
          <p className="text-gray-600">Please wait while we analyze your responses.</p>
        </motion.div>
      )}

      {/* Interview Feedback */}
      {interviewFinished && feedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 size={32} className="text-green-500" />
            <h2 className="text-3xl font-bold text-gray-900">Interview Complete!</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2">Overall Score: {feedback.overallScore}%</h3>
              <p className="text-sm text-gray-600">Based on your performance across all questions.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2">Role: {selectedRole}</h3>
              <p className="text-sm text-gray-600">Targeted interview for this position.</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Strengths</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Areas for Improvement</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {feedback.areasForImprovement.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-3">Question-Specific Feedback</h3>
            <div className="space-y-4">
              {userAnswers.map((ua, index) => (
                <div key={ua.questionId} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="font-medium text-gray-900 mb-1">Q{index + 1}: {questions.find(q => q.id === ua.questionId)?.question}</p>
                  <p className="text-sm text-gray-700 mb-2">Your Answer: {ua.answer}</p>
                  <p className="text-sm text-gray-600 flex items-start gap-2"><Lightbulb size={16} className="text-blue-500 shrink-0 mt-0.5" /> Feedback: {getQuestionSpecificFeedback(ua.questionId)}</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={restartInterview}
            className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors text-lg"
          >
            <Play size={20} /> Start New Interview
          </button>
        </motion.div>
      )}
    </div>
  );
}
