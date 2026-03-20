import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ArrowLeft, ChevronDown } from 'lucide-react';

interface AuthPageProps {
  initialMode: 'login' | 'signup';
  onBack: () => void;
  onSuccess: (mode: 'login' | 'signup', data: { name?: string; email: string }) => void;
}

export default function AuthPage({ initialMode, onBack, onSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success
    // For login, we simulate a user named "Ragini" if not found, but we pass the email
    // For signup, we use the entered name
    const userName = mode === 'signup' ? name : undefined;
    onSuccess(mode, { name: userName, email });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors group"
        >
          <ArrowLeft size={20} className="text-gray-600 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Edu-Advisory Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-green-600">Edu</span>-<span className="text-orange-500">Advisory</span>
          </span>
        </div>
      </div>

      {/* Animation Side */}
      <div className="w-full lg:w-1/2 h-[300px] lg:h-screen lg:sticky lg:top-0 bg-gray-50 relative overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Using a high-quality placeholder video as signup_animation.mp4 is not provided */}
          <source src="macro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 overflow-y-auto">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {mode === 'signup' ? (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                <p className="text-gray-500 mb-10">Join the Advisory community – your career growth partner.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                    <div className="relative">
                      <select 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none bg-white text-gray-700"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>Select your category</option>
                        <option value="general">General (Open)</option>
                        <option value="obc">OBC (Other Backward Classes)</option>
                        <option value="sc">SC (Scheduled Caste)</option>
                        <option value="st">ST (Scheduled Tribe)</option>
                        <option value="ews">EWS (Economically Weaker Section)</option>
                        <option value="vj_nt">VJ / NT (Vimukta Jati / Nomadic Tribes)</option>
                        <option value="sbc">SBC (Special Backward Class)</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 mt-4"
                  >
                    Sign up
                  </button>
                </form>

                <p className="text-center mt-8 text-gray-600">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setMode('login')}
                    className="font-bold text-gray-900 hover:underline"
                  >
                    Login
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-500 mb-10">Log in to continue your journey with Edu-Advisory.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-900">Password</label>
                      <button type="button" className="text-sm text-orange-600 hover:underline font-medium">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 mt-4"
                  >
                    Log in
                  </button>
                </form>

                <p className="text-center mt-8 text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setMode('signup')}
                    className="font-bold text-gray-900 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}