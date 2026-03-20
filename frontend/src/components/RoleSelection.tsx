import { motion } from 'framer-motion';
import { User, Users, GraduationCap, ArrowLeft } from 'lucide-react';

export type UserRole = 'student' | 'parent' | 'teacher';

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
  onBack: () => void;
}

export default function RoleSelection({ onSelect, onBack }: RoleSelectionProps) {
  const roles = [
    {
      id: 'student' as UserRole,
      title: 'Student',
      description: 'Find career paths, take quizzes & submit assignments.',
      icon: <User size={48} className="text-orange-500" />,
      // Changed from image to video source
      videoSrc: "student.mp4", 
      color: 'border-orange-100 hover:border-orange-400 bg-orange-50/30'
    },
    {
      id: 'parent' as UserRole,
      title: 'Parent',
      description: "Track your child's progress & view performance reports.",
      icon: <Users size={48} className="text-orange-500" />,
      // Changed from image to video source
      videoSrc: "parents.mp4", 
      color: 'border-orange-100 hover:border-orange-400 bg-orange-50/30'
    },
    {
      id: 'teacher' as UserRole,
      title: 'Teacher',
      description: 'Manage classes, upload notes & analyze trends.',
      icon: <GraduationCap size={48} className="text-orange-500" />,
      // Changed from image to video source
      videoSrc: "teacher.mp4", 
      color: 'border-orange-100 hover:border-orange-400 bg-orange-50/30'
    }
  ];

  return (
    <div className="min-h-screen bg-white py-20 px-4 relative overflow-hidden">
      {/* Decorative Lamps (Simplified CSS version) */}
      <div className="absolute top-0 left-10 md:left-40 w-px h-32 bg-gray-800 hidden sm:block">
        <div className="absolute bottom-0 -left-4 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-yellow-200 rounded-full blur-sm animate-pulse"></div>
        </div>
      </div>
      <div className="absolute top-0 right-10 md:right-40 w-px h-32 bg-gray-800 hidden sm:block">
        <div className="absolute bottom-0 -left-4 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-yellow-200 rounded-full blur-sm animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
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
            Back
          </button>
        </div>

        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-green-600">Edu</span>-<span className="text-orange-500">Advisory</span>
          </h1>
          <p className="text-gray-500 text-lg">Your Gamified, Personalized Career & Education Advisor</p>
        </div>

        {/* Connecting Line */}
        <div className="relative hidden lg:block mb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gray-800"></div>
          <div className="flex justify-between w-3/4 mx-auto">
            <div className="w-px h-16 bg-gray-800 relative">
              <div className="absolute bottom-0 -left-1.5 w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
            <div className="w-px h-16 bg-gray-800 relative">
              <div className="absolute bottom-0 -left-1.5 w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
            <div className="w-px h-16 bg-gray-800 relative">
              <div className="absolute bottom-0 -left-1.5 w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(role.id)}
              className={`cursor-pointer group p-8 rounded-[32px] border-2 transition-all duration-300 text-center flex flex-col items-center ${role.color}`}
            >
              <div className="mb-6 w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-inner relative">
                {/* Replaced <img> with <video> */}
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
                  <source src={role.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{role.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}