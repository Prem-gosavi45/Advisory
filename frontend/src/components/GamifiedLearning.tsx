import { useState, useEffect, useCallback } from 'react';
import { 
  Trophy, Brain, Timer, Star, Play, RotateCcw, 
  ChevronLeft, Zap, Target, Award, Flame, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type GameType = 'memory' | 'math' | 'pattern' | null;

export default function GamifiedLearning() {
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  const addXp = (amount: number) => {
    const newXp = xp + amount;
    if (newXp >= level * 100) {
      setLevel(level + 1);
      setXp(newXp - (level * 100));
    } else {
      setXp(newXp);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <Brain className="text-indigo-600" size={36} />
            Mind Gym
          </h1>
          <p className="text-gray-500">Train your brain with scientifically designed mind games.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center px-6 border-r border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Level</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-indigo-600">{level}</span>
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(xp / (level * 100)) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="text-center px-6 border-r border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total XP</p>
            <div className="flex items-center gap-2 text-orange-500">
              <Flame size={20} fill="currentColor" />
              <span className="text-2xl font-black">{xp + (level - 1) * 100}</span>
            </div>
          </div>
          <div className="text-center px-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Rank</p>
            <div className="flex items-center gap-2 text-yellow-500">
              <Trophy size={20} fill="currentColor" />
              <span className="text-2xl font-black">Novice</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!activeGame ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <GameCard 
              title="Memory Match"
              description="Test your short-term memory by matching pairs of educational icons."
              icon={Target}
              color="bg-blue-500"
              onClick={() => setActiveGame('memory')}
              difficulty="Easy"
              xpReward="50 XP"
            />
            <GameCard 
              title="Math Sprint"
              description="Solve as many arithmetic problems as you can in 60 seconds."
              icon={Zap}
              color="bg-orange-500"
              onClick={() => setActiveGame('math')}
              difficulty="Medium"
              xpReward="100 XP"
            />
            <GameCard 
              title="Pattern Recall"
              description="Watch a sequence of lights and repeat them in the correct order."
              icon={Award}
              color="bg-purple-500"
              onClick={() => setActiveGame('pattern')}
              difficulty="Hard"
              xpReward="150 XP"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[3rem] p-8 shadow-xl border border-gray-100 min-h-[600px] flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setActiveGame(null)}
                className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-900 transition-colors"
              >
                <ChevronLeft size={20} />
                Back to Gym
              </button>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-gray-50 rounded-xl flex items-center gap-2">
                  <Star className="text-yellow-500" size={18} fill="currentColor" />
                  <span className="font-bold text-gray-700">Score: {score}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              {activeGame === 'memory' && <MemoryGame onWin={(s) => { setScore(s); addXp(50); }} />}
              {activeGame === 'math' && <MathGame onEnd={(s) => { setScore(s); addXp(s * 10); }} />}
              {activeGame === 'pattern' && <PatternGame onEnd={(s) => { setScore(s); addXp(s * 20); }} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GameCard({ title, description, icon: Icon, color, onClick, difficulty, xpReward }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col h-full group cursor-pointer"
      onClick={onClick}
    >
      <div className={`w-16 h-16 ${color} rounded-3xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon size={32} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{difficulty}</span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">{xpReward}</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-500 leading-relaxed mb-8 flex-1">{description}</p>
      <button className="w-full py-4 bg-gray-50 rounded-2xl font-bold text-gray-900 group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
        <Play size={18} fill="currentColor" />
        Play Now
      </button>
    </motion.div>
  );
}

// --- Memory Game Implementation ---
function MemoryGame({ onWin }: { onWin: (score: number) => void }) {
  const icons = [Brain, Zap, Target, Award, Flame, Heart, Star, Trophy];
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initialize = useCallback(() => {
    const deck = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((Icon, i) => ({ id: i, Icon }));
    setCards(deck);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleClick = (id: number) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].Icon === cards[second].Icon) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        if (solved.length + 2 === cards.length) {
          onWin(Math.max(100 - moves * 2, 10));
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="space-y-8 flex flex-col items-center">
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(i)}
            className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-500 preserve-3d ${
              flipped.includes(i) || solved.includes(i) 
                ? 'bg-indigo-600 text-white rotate-y-180' 
                : 'bg-gray-100 text-gray-300'
            }`}
          >
            {(flipped.includes(i) || solved.includes(i)) ? <card.Icon size={32} /> : <Brain size={32} />}
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-gray-500 font-bold">Moves: {moves}</p>
        <button onClick={initialize} className="mt-4 flex items-center gap-2 text-indigo-600 font-bold">
          <RotateCcw size={18} /> Reset Game
        </button>
      </div>
    </div>
  );
}

// --- Math Game Implementation ---
function MathGame({ onEnd }: { onEnd: (score: number) => void }) {
  const [problem, setProblem] = useState({ a: 0, b: 0, op: '+', ans: 0 });
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const generateProblem = useCallback(() => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, ans;
    if (op === '*') {
      a = Math.floor(Math.random() * 12) + 1;
      b = Math.floor(Math.random() * 12) + 1;
      ans = a * b;
    } else {
      a = Math.floor(Math.random() * 50) + 1;
      b = Math.floor(Math.random() * 50) + 1;
      ans = op === '+' ? a + b : a - b;
    }
    setProblem({ a, b, op, ans });
  }, []);

  useEffect(() => {
    let timer: any;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onEnd(score);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, score, onEnd]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(input) === problem.ans) {
      setScore(s => s + 1);
      setInput('');
      generateProblem();
    } else {
      setInput('');
    }
  };

  if (!isActive && timeLeft === 60) {
    return (
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
          <Timer size={48} />
        </div>
        <h2 className="text-3xl font-bold">Ready for Math Sprint?</h2>
        <p className="text-gray-500">Solve as many as you can in 60 seconds.</p>
        <button 
          onClick={() => { setIsActive(true); generateProblem(); }}
          className="px-12 py-4 bg-orange-600 text-white rounded-2xl font-bold text-xl shadow-lg shadow-orange-100"
        >
          Start Sprint
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-12 text-center">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-orange-600 font-bold text-2xl">
          <Timer size={24} />
          {timeLeft}s
        </div>
        <div className="text-2xl font-bold text-gray-900">Score: {score}</div>
      </div>

      <div className="text-6xl font-black text-gray-900 tracking-tighter">
        {problem.a} {problem.op === '*' ? '×' : problem.op} {problem.b} = ?
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          autoFocus
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[2rem] text-4xl text-center font-bold focus:border-orange-500 outline-none transition-all"
          placeholder="Answer"
        />
        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Press Enter to Submit</p>
      </form>
    </div>
  );
}

// --- Pattern Game Implementation ---
function PatternGame({ onEnd }: { onEnd: (score: number) => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle');

  const startNextRound = useCallback((currentSeq: number[]) => {
    const next = Math.floor(Math.random() * 4);
    const newSeq = [...currentSeq, next];
    setSequence(newSeq);
    setUserSequence([]);
    showSequence(newSeq);
  }, []);

  const showSequence = async (seq: number[]) => {
    setIsShowing(true);
    for (let i = 0; i < seq.length; i++) {
      setActiveIndex(seq[i]);
      await new Promise(r => setTimeout(r, 600));
      setActiveIndex(null);
      await new Promise(r => setTimeout(r, 200));
    }
    setIsShowing(false);
  };

  const handlePadClick = (index: number) => {
    if (isShowing || gameState !== 'playing') return;

    const newUserSeq = [...userSequence, index];
    setUserSequence(newUserSeq);

    if (newUserSeq[newUserSeq.length - 1] !== sequence[newUserSeq.length - 1]) {
      setGameState('over');
      onEnd(sequence.length - 1);
      return;
    }

    if (newUserSeq.length === sequence.length) {
      setTimeout(() => startNextRound(sequence), 1000);
    }
  };

  if (gameState === 'idle') {
    return (
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
          <Zap size={48} />
        </div>
        <h2 className="text-3xl font-bold">Pattern Recall</h2>
        <p className="text-gray-500">Watch the sequence and repeat it perfectly.</p>
        <button 
          onClick={() => { setGameState('playing'); startNextRound([]); }}
          className="px-12 py-4 bg-purple-600 text-white rounded-2xl font-bold text-xl shadow-lg shadow-purple-100"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 text-center">
      <div className="text-2xl font-bold text-gray-900">Round: {sequence.length}</div>
      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePadClick(i)}
            className={`w-32 h-32 rounded-3xl cursor-pointer transition-all ${
              activeIndex === i 
                ? 'bg-purple-400 scale-105 shadow-xl shadow-purple-200' 
                : 'bg-purple-100 hover:bg-purple-200'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-400 font-bold uppercase tracking-widest">
        {isShowing ? 'Watch Carefully...' : 'Your Turn!'}
      </p>
    </div>
  );
}
