import { useState, useEffect, useRef } from 'react';
import { 
  Timer, Volume2, CheckSquare, Play, Pause, RotateCcw, 
  CloudRain, Coffee, Trees, Flame, Wind, Plus, 
  Trash2, ChevronRight, Moon, Sun, BarChart3, 
  Settings as SettingsIcon, X, CheckCircle2, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  isPinned: boolean;
}

interface Sound {
  id: string;
  name: string;
  icon: any;
  volume: number;
  isPlaying: boolean;
  url: string;
}

export default function FocusFlow() {
  // --- Pomodoro State ---
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [focusLength, setFocusLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0);

  // --- Soundboard State ---
  const [sounds, setSounds] = useState<Sound[]>([
    { id: 'rain', name: 'Rain', icon: CloudRain, volume: 50, isPlaying: false, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 'cafe', name: 'Cafe', icon: Coffee, volume: 40, isPlaying: false, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'forest', name: 'Forest', icon: Trees, volume: 30, isPlaying: false, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 'fire', name: 'Fire', icon: Flame, volume: 60, isPlaying: false, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: 'wind', name: 'Wind', icon: Wind, volume: 20, isPlaying: false, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  ]);

  // --- Task Manager State ---
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // --- Timer Logic ---
  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
        if (mode === 'focus') setTotalFocusMinutes(m => m + 1/60);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const nextMode = mode === 'focus' ? 'break' : 'focus';
      setMode(nextMode);
      setTimeLeft((nextMode === 'focus' ? focusLength : breakLength) * 60);
      alert(nextMode === 'focus' ? "Break's over! Time to focus." : "Great work! Take a break.");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, focusLength, breakLength]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft((mode === 'focus' ? focusLength : breakLength) * 60);
  };

  // --- Task Logic ---
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
      isPinned: tasks.length === 0,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const pinTask = (id: string) => {
    setTasks(tasks.map(t => ({ ...t, isPinned: t.id === id })));
  };

  const pinnedTask = tasks.find(t => t.isPinned);

  // --- Sound Logic ---
  const toggleSound = (id: string) => {
    setSounds(sounds.map(s => s.id === id ? { ...s, isPlaying: !s.isPlaying } : s));
  };

  const updateVolume = (id: string, volume: number) => {
    setSounds(sounds.map(s => s.id === id ? { ...s, volume } : s));
  };

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 pb-12">
      {/* Left Column: Pomodoro & Stats */}
      <div className="lg:col-span-5 space-y-8">
        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
          {/* Background Animation */}
          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.05 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className={`absolute inset-0 rounded-full ${mode === 'focus' ? 'bg-indigo-500' : 'bg-orange-500'}`}
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 space-y-6 w-full">
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => { setMode('focus'); setTimeLeft(focusLength * 60); setIsActive(false); }}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${mode === 'focus' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-gray-50 text-gray-400'}`}
              >
                <Moon size={14} className="inline mr-2" /> Focus Mode
              </button>
              <button 
                onClick={() => { setMode('break'); setTimeLeft(breakLength * 60); setIsActive(false); }}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${mode === 'break' ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' : 'bg-gray-50 text-gray-400'}`}
              >
                <Coffee size={14} className="inline mr-2" /> Break Time
              </button>
            </div>

            <div className="text-8xl font-black text-gray-900 tracking-tighter tabular-nums">
              {formatTime(timeLeft)}
            </div>

            {pinnedTask && (
              <div className="bg-gray-50 px-6 py-3 rounded-2xl inline-flex items-center gap-3 border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-sm font-bold text-gray-600">Current Focus: {pinnedTask.text}</span>
              </div>
            )}

            <div className="flex justify-center gap-4 pt-4">
              <button 
                onClick={toggleTimer}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-105 ${isActive ? 'bg-gray-900' : 'bg-indigo-600 shadow-indigo-200'}`}
              >
                {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
              </button>
              <button 
                onClick={resetTimer}
                className="w-20 h-20 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all"
              >
                <RotateCcw size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">Total Focus Time</p>
            <h3 className="text-3xl font-black">{Math.floor(totalFocusMinutes)} <span className="text-lg font-normal opacity-60">mins</span></h3>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
            <BarChart3 size={32} className="text-indigo-300" />
          </div>
        </div>
      </div>

      {/* Right Column: Soundboard & Tasks */}
      <div className="lg:col-span-7 space-y-8">
        {/* Soundboard */}
        <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Volume2 className="text-indigo-600" size={24} />
              Ambient Soundboard
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-gray-50 rounded-full text-[10px] font-bold text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">Library Mix</button>
              <button className="px-4 py-1.5 bg-gray-50 rounded-full text-[10px] font-bold text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">Rainy Cafe</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sounds.map((sound) => (
              <div key={sound.id} className="p-4 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${sound.isPlaying ? 'bg-indigo-600 text-white' : 'bg-white text-gray-400'}`}>
                      <sound.icon size={20} />
                    </div>
                    <span className="font-bold text-gray-700">{sound.name}</span>
                  </div>
                  <button 
                    onClick={() => toggleSound(sound.id)}
                    className={`w-12 h-6 rounded-full transition-all relative ${sound.isPlaying ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${sound.isPlaying ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sound.volume}
                  onChange={(e) => updateVolume(sound.id, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Task Manager */}
        <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-8">
            <CheckSquare className="text-indigo-600" size={24} />
            Focus Tasks
          </h3>

          <form onSubmit={addTask} className="flex gap-3 mb-8">
            <input 
              type="text" 
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What are you focusing on?"
              className="flex-1 px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <button type="submit" className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
              <Plus size={24} />
            </button>
          </form>

          <div className="space-y-3">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`group p-4 rounded-2xl border transition-all flex items-center justify-between ${task.completed ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100 hover:border-indigo-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 hover:border-indigo-500'}`}
                    >
                      {task.completed && <CheckCircle2 size={16} />}
                    </button>
                    <span className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {task.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => pinTask(task.id)}
                      className={`p-2 rounded-lg transition-all ${task.isPinned ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:bg-gray-50'}`}
                    >
                      <Target size={18} />
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {tasks.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm font-medium">No tasks yet. Add one to start focusing!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
