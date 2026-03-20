/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LoadingPage from './components/LoadingPage';
import LandingPage from './components/LandingPage';
import RoleSelection, { UserRole } from './components/RoleSelection';
import InterestSelection from './components/InterestSelection';
import CareerQuiz from './components/CareerQuiz';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard'; // ✅ FIXED IMPORT
import ParentDashboard from './components/ParentDashboard';
import QuizResult from './components/QuizResult';
import { motion, AnimatePresence } from 'framer-motion';

type AppView = 'loading' | 'landing' | 'roleSelection' | 'interestSelection' | 'careerQuiz' | 'auth' | 'dashboard' | 'quizResult';

export default function App() {
  const [view, setView] = useState<AppView>('loading');
  const [role, setRole] = useState<UserRole | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [flowSource, setFlowSource] = useState<'normal' | 'signup'>('normal');
  const [userData, setUserData] = useState<{ 
    userName?: string;
    selectedClass?: string; 
    selectedInterests?: string[];
    quizCompleted?: boolean;
    quizResults?: any;
  }>({});
  
  const [registeredUsers, setRegisteredUsers] = useState<Record<string, string>>({});

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setAuthMode('signup');
    setFlowSource('signup');
    setView('auth');
  };

  const handleInterestComplete = (data: { selectedClass: string; selectedInterests: string[] }) => {
    setUserData(prev => ({ ...prev, ...data }));
    setView('careerQuiz');
  };

  const handleQuizComplete = (results: any) => {
    setUserData(prev => ({ ...prev, quizResults: results, quizCompleted: true }));
    setView('quizResult');
  };

  const handleQuizSkip = () => {
    setUserData(prev => ({ ...prev, quizCompleted: false }));
    setView('dashboard');
  };

  const handleAuthStart = (mode: 'login' | 'signup') => {
    setFlowSource('normal');
    setAuthMode(mode);
    setView('auth');
  };

  const handleSignUpClick = () => {
    setFlowSource('signup');
    setView('roleSelection');
  };

  const handleAuthSuccess = (mode: 'login' | 'signup', data: { name?: string; email: string }) => {
    let currentUserName = data.name;

    if (mode === 'signup' && data.name && data.email) {
      setRegisteredUsers(prev => ({ ...prev, [data.email]: data.name! }));
      currentUserName = data.name;
    } else if (mode === 'login' && data.email) {
      const storedName = registeredUsers[data.email];
      if (storedName) {
        currentUserName = storedName;
      } else {
        currentUserName = 'Ragini';
      }
    }

    if (currentUserName) {
      setUserData(prev => ({ ...prev, userName: currentUserName }));
    }
    
    if (role === 'parent' || mode === 'login') {
      setView('dashboard');
    } else {
      if (flowSource === 'signup') {
        setView('interestSelection');
      } else {
        setView('roleSelection');
      }
    }
  };

  const handleLogout = () => {
    setUserData({});
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AnimatePresence mode="wait">
        {view === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingPage onComplete={() => setView('landing')} />
          </motion.div>
        )}

        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage 
              onAuth={handleAuthStart}
              onSignUpClick={handleSignUpClick}
            />
          </motion.div>
        )}

        {view === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AuthPage 
              initialMode={authMode}
              onBack={() => setView('landing')}
              onSuccess={handleAuthSuccess}
            />
          </motion.div>
        )}

        {view === 'roleSelection' && (
          <motion.div
            key="roleSelection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RoleSelection 
              onSelect={handleRoleSelect} 
              onBack={() => setView('landing')} 
            />
          </motion.div>
        )}

        {view === 'interestSelection' && (
          <motion.div
            key="interestSelection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InterestSelection 
              onComplete={handleInterestComplete}
            />
          </motion.div>
        )}

        {view === 'careerQuiz' && (
          <motion.div
            key="careerQuiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CareerQuiz 
              userData={userData as any}
              onComplete={handleQuizComplete}
              onSkip={handleQuizSkip}
            />
          </motion.div>
        )}

        {view === 'quizResult' && (
          <motion.div
            key="quizResult"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <QuizResult 
              onDashboard={() => setView('dashboard')}
              onRetake={() => setView('careerQuiz')}
            />
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-screen"
          >
            {/* ✅ Routed to the correct dashboard based on role */}
            {role === 'parent' ? (
              <ParentDashboard />
            ) : (
              <Dashboard 
                onNavigate={setView} 
                onLogout={handleLogout} 
                userName={userData.userName} 
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}