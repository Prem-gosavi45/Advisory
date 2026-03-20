import { useState } from 'react';
import { 
  User, Lock, Bell, Shield, Palette, Globe, Link as LinkIcon, 
  CreditCard, Database, Accessibility, ChevronRight, Save, 
  Moon, Sun, Check, AlertCircle, Trash2, Download, Eye, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingSection {
  id: string;
  label: string;
  icon: any;
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const sections: SettingSection[] = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Account Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Safety', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'connections', label: 'Connected Accounts', icon: LinkIcon },
    { id: 'billing', label: 'Billing & Subscription', icon: CreditCard },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-72 shrink-0 space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 px-2">Settings</h1>
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                activeSection === section.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-gray-600 hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <section.icon size={20} />
                <span className="font-medium text-sm">{section.label}</span>
              </div>
              <ChevronRight size={16} className={activeSection === section.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-gray-50">
                    <div className="relative group">
                      <img 
                        src="https://picsum.photos/seed/avatar/100/100" 
                        alt="Profile" 
                        className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-md"
                        referrerPolicy="no-referrer"
                      />
                      <button className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold">
                        Change
                      </button>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                      <p className="text-sm text-gray-500">Update your photo and personal details.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Name</label>
                      <input type="text" defaultValue="Ragini" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address</label>
                      <input type="email" defaultValue="ragini@example.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-bold text-gray-700">Bio</label>
                      <textarea rows={4} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Tell us about yourself..." />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Security</h2>
                    <p className="text-sm text-gray-500">Manage your password and account security.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Change Password</h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Current Password" 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                          />
                          <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <input type="password" placeholder="New Password" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <input type="password" placeholder="Confirm New Password" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <div className="flex items-center gap-3">
                        <Shield className="text-indigo-600" />
                        <div>
                          <p className="font-bold text-indigo-900">Two-Factor Authentication</p>
                          <p className="text-xs text-indigo-700">Add an extra layer of security to your account.</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold">Enable</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Appearance</h2>
                    <p className="text-sm text-gray-500">Customize how the application looks to you.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setIsDarkMode(false)}
                      className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${!isDarkMode ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 bg-gray-50'}`}
                    >
                      <Sun size={32} className={!isDarkMode ? 'text-indigo-600' : 'text-gray-400'} />
                      <span className={`font-bold ${!isDarkMode ? 'text-indigo-900' : 'text-gray-500'}`}>Light Mode</span>
                    </button>
                    <button 
                      onClick={() => setIsDarkMode(true)}
                      className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${isDarkMode ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 bg-gray-50'}`}
                    >
                      <Moon size={32} className={isDarkMode ? 'text-indigo-600' : 'text-gray-400'} />
                      <span className={`font-bold ${isDarkMode ? 'text-indigo-900' : 'text-gray-500'}`}>Dark Mode</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Accent Color</h3>
                    <div className="flex gap-4">
                      {['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#ec4899'].map((color) => (
                        <button 
                          key={color} 
                          className="w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-white"
                          style={{ backgroundColor: color }}
                        >
                          {color === '#4f46e5' && <Check size={20} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Data Management */}
              {activeSection === 'data' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Data Management</h2>
                    <p className="text-sm text-gray-500">Control your data and export your information.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Download className="text-gray-400" />
                        <div>
                          <p className="font-bold text-gray-900">Export Personal Data</p>
                          <p className="text-xs text-gray-500">Download a copy of all your data in JSON format.</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50">Export</button>
                    </div>

                    <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Trash2 className="text-red-400" />
                        <div>
                          <p className="font-bold text-red-900">Delete Account</p>
                          <p className="text-xs text-red-700">Permanently delete your account and all associated data.</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700">Delete</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for other sections */}
              {!['profile', 'security', 'appearance', 'data'].includes(activeSection) && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <AlertCircle size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{sections.find(s => s.id === activeSection)?.label}</h3>
                  <p className="text-gray-500 max-w-xs">This section is under development. Check back soon for more features!</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button className="px-6 py-2.5 text-gray-600 font-bold hover:text-gray-900">Cancel</button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Loader2({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
