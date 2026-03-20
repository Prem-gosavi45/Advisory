import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Palette, Cpu, Users, PenTool, CheckCircle, Mic, ChevronDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

const MarioFont = "font-mono uppercase font-bold tracking-tight"; 

// 15 Questions
const quizQuestions = [
  {
    id: 1, question: "1. Do you feel more energized when working…",
    options: [{ text: 'With data/ideas', type: 'analytical' }, { text: 'Designing things', type: 'creative' }, { text: 'With people', type: 'social' }, { text: 'With hands/tools', type: 'hands-on' }]
  },
  {
    id: 2, question: "2. When faced with a difficult problem, you rely on…",
    options: [{ text: 'Step-by-step logic', type: 'analytical' }, { text: 'Intuition/Art', type: 'creative' }, { text: 'Group discussion', type: 'social' }, { text: 'Trial & error', type: 'hands-on' }]
  },
  {
    id: 3, question: "3. Do you prefer working…",
    options: [{ text: 'Independently', type: 'analytical' }, { text: 'In a creative flow', type: 'creative' }, { text: 'In a team', type: 'social' }, { text: 'Out in the field', type: 'hands-on' }]
  },
  {
    id: 4, question: "4. What motivates you more?",
    options: [{ text: 'Earning money', type: 'analytical' }, { text: 'Building the new', type: 'creative' }, { text: 'Helping others', type: 'social' }, { text: 'Recognition/Respect', type: 'hands-on' }]
  },
  {
    id: 5, question: "5. When making decisions, you trust…",
    options: [{ text: 'Facts & analysis', type: 'analytical' }, { text: 'Creative vision', type: 'creative' }, { text: 'Feelings & values', type: 'social' }, { text: 'Practical tests', type: 'hands-on' }]
  },
  {
    id: 6, question: "6. Do you like…",
    options: [{ text: 'Advance Planning', type: 'analytical' }, { text: 'Going with flow', type: 'creative' }, { text: 'Group consensus', type: 'social' }, { text: 'Adapting on fly', type: 'hands-on' }]
  },
  {
    id: 7, question: "7. For your career, what do you prefer?",
    options: [{ text: 'Stability & Security', type: 'analytical' }, { text: 'Creative Risk', type: 'creative' }, { text: 'Growth w/ Balance', type: 'social' }, { text: 'Tangible Results', type: 'hands-on' }]
  },
  {
    id: 8, question: "8. Would you rather…",
    options: [{ text: 'Improve systems', type: 'analytical' }, { text: 'Invent solutions', type: 'creative' }, { text: 'Coach others', type: 'social' }, { text: 'Build prototypes', type: 'hands-on' }]
  },
  {
    id: 9, question: "9. Do you enjoy expressing yourself more through…",
    options: [{ text: 'Numbers & Code', type: 'analytical' }, { text: 'Art & Writing', type: 'creative' }, { text: 'Speaking/Debate', type: 'social' }, { text: 'Crafting/Making', type: 'hands-on' }]
  },
  {
    id: 10, question: "10. Are you more interested in…",
    options: [{ text: 'Data & Software', type: 'analytical' }, { text: 'Media & Design', type: 'creative' }, { text: 'Understanding People', type: 'social' }, { text: 'Machines/Systems', type: 'hands-on' }]
  },
  {
    id: 11, question: "11. Which do you enjoy more?",
    options: [{ text: 'Logical puzzles', type: 'analytical' }, { text: 'Designing things', type: 'creative' }, { text: 'Social/Cultural issues', type: 'social' }, { text: 'Physical tasks', type: 'hands-on' }]
  },
  {
    id: 12, question: "12. Do you enjoy…",
    options: [{ text: 'Organizing data', type: 'analytical' }, { text: 'Brainstorming', type: 'creative' }, { text: 'Leading a group', type: 'social' }, { text: 'Supporting roles', type: 'hands-on' }]
  },
  {
    id: 13, question: "13. Which attracts you more?",
    options: [{ text: 'Complex theories', type: 'analytical' }, { text: 'Abstract ideas', type: 'creative' }, { text: 'Team synergy', type: 'social' }, { text: 'Practical hands-on', type: 'hands-on' }]
  },
  {
    id: 14, question: "14. Do you often…",
    options: [{ text: 'Prefer structure', type: 'analytical' }, { text: 'Get creative ideas', type: 'creative' }, { text: 'Help your friends', type: 'social' }, { text: 'Fix broken things', type: 'hands-on' }]
  },
  {
    id: 15, question: "15. In a project, your natural role is…",
    options: [{ text: 'Problem-solver', type: 'analytical' }, { text: 'Creative contributor', type: 'creative' }, { text: 'Team motivator', type: 'social' }, { text: 'Planner/Organizer', type: 'hands-on' }]
  }
];

// --- PURE CSS MARIO SPRITE ---
const CssMario = ({ facingRight }: { facingRight: boolean }) => (
  <div className="relative w-12 h-16 drop-shadow-md" style={{ transform: `scaleX(${facingRight ? 1 : -1})`, imageRendering: 'pixelated' }}>
    <div className="absolute top-0 left-2 w-10 h-2 bg-[#e81416]"></div>
    <div className="absolute top-2 left-0 w-8 h-2 bg-[#e81416]"></div>
    <div className="absolute top-4 left-0 w-10 h-6 bg-[#ffa040]"></div>
    <div className="absolute top-4 left-6 w-2 h-2 bg-[#604000]"></div> 
    <div className="absolute top-8 left-8 w-4 h-2 bg-[#604000]"></div> 
    <div className="absolute top-10 left-10 w-4 h-2 bg-[#ffa040]"></div> 
    <div className="absolute top-10 left-2 w-8 h-4 bg-[#0000a8]"></div>
    <div className="absolute top-12 left-0 w-3 h-4 bg-[#e81416]"></div> 
    <div className="absolute top-12 right-0 w-3 h-4 bg-[#e81416]"></div> 
    <div className="absolute top-14 left-0 w-12 h-2 bg-[#0000a8]"></div>
    <div className="absolute top-[60px] left-0 w-4 h-4 bg-[#604000]"></div>
    <div className="absolute top-[60px] left-8 w-4 h-4 bg-[#604000]"></div>
  </div>
);

// --- FLUFFY MOVING CLOUD COMPONENT ---
const Cloud = ({ delay, yOffset, speed }: { delay: number, yOffset: string, speed: number }) => (
  <motion.div 
    initial={{ x: '-20vw' }} 
    animate={{ x: '120vw' }} 
    transition={{ repeat: Infinity, duration: speed, ease: 'linear', delay: delay }}
    className={`absolute ${yOffset} z-0 opacity-80`}
  >
    <div className="relative w-32 h-12 bg-white rounded-full">
      <div className="absolute -top-6 left-6 w-16 h-16 bg-white rounded-full"></div>
      <div className="absolute -top-3 left-16 w-12 h-12 bg-white rounded-full"></div>
    </div>
  </motion.div>
);

interface CareerQuizProps {
  userData?: any;
  onComplete?: (results: any) => void;
  onSkip?: () => void;
}

export default function CareerQuiz({ onComplete, onSkip }: CareerQuizProps) {
  const [step, setStep] = useState<'intro' | 'game' | 'result'>('intro');
  const [playerAnswers, setPlayerAnswers] = useState<string[]>([]);
  const [hitBlock, setHitBlock] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const marioContainerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const hitBlockRef = useRef<number | null>(null);
  const [facingRight, setFacingRight] = useState(true);
  
  const physics = useRef({ x: 50, y: 0, vx: 0, vy: 0, isJumping: false, facingRight: true });
  const keys = useRef({ left: false, right: false, jump: false });

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    if (step !== 'game') return;

    const updatePhysics = () => {
      const p = physics.current;
      const k = keys.current;

      if (hitBlockRef.current === null) {
        if (k.right) { p.vx = 6; p.facingRight = true; } 
        else if (k.left) { p.vx = -6; p.facingRight = false; } 
        else { p.vx = 0; }

        if (k.jump && !p.isJumping) {
          p.vy = 18; 
          p.isJumping = true;
        }
      } else {
        p.vx = 0; 
      }

      p.vy -= 1; 
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = 0;
      if (p.x > window.innerWidth - 48) p.x = window.innerWidth - 48;

      if (p.y <= 0) {
        p.y = 0;
        p.vy = 0;
        p.isJumping = false;
      }

      const hitBoxBottom = 160; 
      const marioHead = p.y + 64; 

      if (p.vy > 0 && marioHead >= hitBoxBottom && marioHead <= hitBoxBottom + 20) {
        const blockCenters = [0.15, 0.35, 0.55, 0.75].map(pct => window.innerWidth * pct);
        
        blockCenters.forEach((center, index) => {
          const blockLeft = center - 40; 
          const blockRight = center + 40;
          const marioLeft = p.x;
          const marioRight = p.x + 48; 

          if (marioRight > blockLeft && marioLeft < blockRight && hitBlockRef.current === null) {
            p.vy = -5; 
            handleBlockHit(index);
          }
        });
      }

      if (marioContainerRef.current) {
        marioContainerRef.current.style.transform = `translate(${p.x}px, ${-p.y}px)`;
        setFacingRight(p.facingRight); 
      }

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [step]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'd') keys.current.right = true;
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.current.left = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') keys.current.jump = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'd') keys.current.right = false;
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.current.left = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') keys.current.jump = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleBlockHit = (index: number) => {
    hitBlockRef.current = index;
    setHitBlock(index);
    setScore(prev => prev + 200);

    setPlayerAnswers(prev => {
      const currentLevel = prev.length;
      const type = quizQuestions[currentLevel].options[index].type;
      const newAnswers = [...prev, type];
      
      setTimeout(() => {
        if (currentLevel < quizQuestions.length - 1) {
          setHitBlock(null);
          hitBlockRef.current = null;
          physics.current.x = 50; 
        } else {
          setStep('result');
        }
      }, 1200); 
      
      return newAnswers;
    });
  };

  const calculateIdentity = () => {
    const counts = { analytical: 0, creative: 0, social: 0, 'hands-on': 0 };
    playerAnswers.forEach(type => { if (type in counts) counts[type as keyof typeof counts]++; });

    if (counts.creative >= 5 && counts.analytical >= 3) {
      return {
        title: "CREATIVE TECHNOLOGIST", subtitle: "ART + ENGINEERING", icon: Palette,
        description: "You love art, but have an engineering mind. Blend both! Architecture, UI/UX design, and front-end development are your paths.",
        careers: ["ARCHITECT", "PRODUCT DESIGNER", "UI/UX DESIGNER", "FRONT-END DEV"]
      };
    } else if (counts.analytical >= 6) {
      return {
        title: "SYSTEMS MASTERMIND", subtitle: "PURE LOGIC & CODE", icon: Cpu,
        description: "You see the world in logic. Build future infrastructure. Engineering, data science, and software are calling you.",
        careers: ["SOFTWARE ENGINEER", "DATA SCIENTIST", "CLOUD ARCHITECT", "AI RESEARCHER"]
      };
    } else if (counts['hands-on'] >= counts.analytical && counts['hands-on'] >= counts.creative) {
      return {
        title: "INNOVATION CRAFTSMAN", subtitle: "BUILDING & MAKING", icon: PenTool,
        description: "You learn by doing. Building with your hands. Mechanical and civil engineering are your areas.",
        careers: ["MECHANICAL ENGINEER", "CIVIL ENGINEER", "SYSTEMS TESTER", "FIELD TECH"]
      };
    } else {
      return {
        title: "STRATEGIC LEADER", subtitle: "PEOPLE & VISION", icon: Users,
        description: "The glue that holds everything together. Strategy. People. Marketing. Leading teams to victory.",
        careers: ["PRODUCT MANAGER", "MARKETING DIRECTOR", "STARTUP FOUNDER", "CONSULTANT"]
      };
    }
  };

  const currentLevel = Math.min(playerAnswers.length, quizQuestions.length - 1);
  const currentQ = quizQuestions[currentLevel];

  // ==========================================
  // 1. INTRO SCREEN
  // ==========================================
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative font-sans">
        <h1 className="text-5xl md:text-6xl font-black text-[#f97316] mb-6 tracking-tight text-center">Career Compass</h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium mb-12 text-center">Play through 15 Levels to discover your true career path.</p>
        <button onClick={() => setStep('game')} className="px-10 py-4 bg-[#f97316] text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl flex items-center gap-2">
          🚀 Start Career Game
        </button>
      </div>
    );
  }

  // ==========================================
  // 2. RESULTS SCREEN
  // ==========================================
  if (step === 'result') {
    const result = calculateIdentity();
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative text-white" style={{ fontFamily: "'Press Start 2P', monospace" }}>
        <div className="absolute bottom-0 right-[5%] flex flex-col items-center z-0 opacity-40">
           <div className="w-4 h-48 bg-[#c84c0c] border-2 border-white flex justify-center">
             <div className="w-12 h-10 bg-green-500 border-2 border-white absolute -top-10 rounded-sm flex items-center justify-center"><div className="w-2 h-2 bg-black rounded-full"></div></div>
           </div>
           <div className="w-40 h-40 bg-[#ffcc99] border-4 border-white mt-2 flex flex-col justify-end items-center relative">
             <div className="w-12 h-20 bg-black rounded-t-full"></div>
           </div>
        </div>

        <div className="bg-transparent text-center max-w-3xl w-full z-10 relative mt-[-50px]">
          <h2 className="text-white text-xl md:text-3xl mb-12 tracking-widest animate-pulse">COURSE CLEAR!</h2>
          
          <div className="flex justify-center items-center gap-6 mb-12">
            <result.icon size={48} className="text-yellow-400" />
            <h1 className="text-yellow-400 text-lg md:text-2xl leading-loose">{result.title}</h1>
          </div>

          <div className="border-4 border-white p-8 mb-12 bg-black inline-block text-left w-full max-w-xl">
             <p className="text-white text-xs md:text-sm leading-loose mb-6">IDENTITY: <span className="text-[#fc9838]">{result.subtitle}</span></p>
             <p className="text-white text-[10px] md:text-xs leading-loose font-sans mb-8 tracking-wider">{result.description}</p>
             
             <p className="text-white text-xs md:text-sm mb-4 text-center">BEST CAREER PATHS</p>
             <div className="flex flex-wrap justify-center gap-4">
               {result.careers.map((career, idx) => (
                 <span key={idx} className="bg-transparent text-[#fc9838] px-4 py-2 border-2 border-[#fc9838] font-bold text-[10px] md:text-xs">{career}</span>
               ))}
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">
            <button onClick={() => { setCurrentLevel(0); setPlayerAnswers([]); setStep('intro'); setScore(0); hitBlockRef.current = null; physics.current.x = 50; }} className="px-6 py-4 bg-transparent hover:bg-white/10 text-white border-4 border-white text-[10px] md:text-xs transition-colors">
              PLAY AGAIN
            </button>
            <button onClick={() => onComplete && onComplete(result)} className="px-6 py-4 bg-[#c84c0c] hover:bg-[#e81416] text-white border-4 border-white text-[10px] md:text-xs transition-colors">
              SAVE & CONTINUE
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. PLAYABLE MARIO GAME SCREEN
  // ==========================================
  return (
    <div className="w-full h-screen bg-[#5c94fc] flex flex-col relative overflow-hidden select-none" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glowing Sun */}
        <div className="absolute top-16 right-[15%] w-24 h-24 bg-yellow-400 rounded-full shadow-[0_0_60px_rgba(250,204,21,0.8)] z-0 animate-pulse"></div>

        {/* Animated Fluffy Clouds */}
        <Cloud delay={0} yOffset="top-10" speed={45} />
        <Cloud delay={15} yOffset="top-32" speed={60} />
        <Cloud delay={30} yOffset="top-16" speed={50} />
        
        {/* Ground */}
        <div className="absolute bottom-0 left-0 w-full h-[100px] bg-[#c84c0c] z-20" 
             style={{ backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.5) 2px, transparent 2px), linear-gradient(180deg, rgba(0,0,0,0.5) 2px, transparent 2px)', backgroundSize: '32px 32px' }}>
          <div className="w-full h-8 bg-[#50b848] border-b-4 border-black absolute top-0 left-0"></div>
        </div> 
        
        {/* Fixed Pipes (Short on left, Tall on right) */}
        <div className="absolute bottom-[100px] left-[8%] w-16 h-16 bg-[#50b848] border-4 border-black z-10 flex justify-center"><div className="w-20 h-6 bg-[#50b848] border-4 border-black absolute -top-4 rounded-sm"></div></div>
        <div className="absolute bottom-[100px] right-[8%] w-16 h-32 bg-[#50b848] border-4 border-black z-10 flex justify-center"><div className="w-20 h-6 bg-[#50b848] border-4 border-black absolute -top-4 rounded-sm"></div></div>
      </div>

      {/* MARIO HUD */}
      <div className={`w-full flex justify-between p-6 z-30 text-white drop-shadow-md text-[10px] md:text-xl tracking-widest`}>
        <div><p>MARIO</p><p>{score.toString().padStart(6, '0')}</p></div>
        <div className="flex items-center gap-2 mt-4"><div className="w-4 h-6 bg-yellow-400 border-2 border-black rounded-full animate-pulse"></div><p>x{(currentLevel + 1).toString().padStart(2, '0')}</p></div>
        <div className="text-center"><p>WORLD</p><p>1-1</p></div>
        <div className="text-right"><p>TIME</p><p>367</p></div>
      </div>

      {/* QUESTION BOX (Fixed Overflow, Proper Alignment) */}
      <div className="w-full flex justify-center z-30 px-4 mt-8">
        <div className="bg-[#1a1f2e] border-4 border-black rounded-md shadow-2xl p-4 md:p-6 max-w-3xl w-full mx-auto">
          <h2 className={`text-white text-[10px] md:text-sm lg:text-base leading-loose break-words whitespace-normal text-center`}>
            {currentQ.question}
          </h2>
        </div>
      </div>

      {/* GAME PLAY AREA */}
      <div className="flex-1 relative w-full z-30" style={{ marginBottom: '100px' }}>
        
        {/* 4 Authentic ? Blocks with matching sleek option boxes */}
        {[15, 35, 55, 75].map((leftPos, index) => {
          const isHit = hitBlock === index;
          return (
            <div key={index} className="absolute flex flex-col items-center w-[120px] md:w-[140px]" style={{ left: `calc(${leftPos}vw - 60px)`, bottom: '160px' }}>
              
              {/* Sleek Option Text Box above block */}
              <div className={`bg-[#1a1f2e] border-2 border-gray-600 rounded p-2 mb-6 w-[110%] md:w-[120%] h-16 flex items-center justify-center shadow-lg transition-opacity ${hitBlock !== null && !isHit ? 'opacity-30' : ''}`}>
                <p className={`text-white text-center text-[7px] md:text-[9px] leading-snug break-words whitespace-normal tracking-wide`}>
                  {currentQ.options[index].text}
                </p>
              </div>
              
              {/* The Block */}
              <div className={`w-16 h-16 border-4 border-black flex items-center justify-center text-3xl shadow-xl transition-all relative
                ${isHit ? 'bg-[#c84c0c]' : 'bg-[#fc9838] animate-pulse'}
              `}>
                <div className="absolute top-1 left-1 w-1 h-1 bg-black"></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-black"></div>
                <div className="absolute bottom-1 left-1 w-1 h-1 bg-black"></div>
                <div className="absolute bottom-1 right-1 w-1 h-1 bg-black"></div>
                {isHit ? '' : '?'}
                
                {/* Coin Pop Animation */}
                {isHit && (
                  <motion.div 
                    className="w-6 h-10 bg-yellow-400 border-4 border-black rounded-full absolute z-[-1]"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="w-1 h-6 bg-yellow-600 mx-auto mt-1"></div>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}

        {/* MARIO SPRITE */}
        <div ref={marioContainerRef} className="absolute bottom-0 z-50" style={{ willChange: 'transform' }}>
          <CssMario facingRight={facingRight} />
        </div>
      </div>

      {/* NES Mobile Controls */}
      <div className="absolute bottom-6 w-full flex justify-between px-8 z-50 md:hidden opacity-80">
        <div className="flex gap-2">
          <button 
            onPointerDown={() => keys.current.left = true} onPointerUp={() => keys.current.left = false}
            onTouchStart={() => keys.current.left = true} onTouchEnd={() => keys.current.left = false}
            className="w-16 h-16 bg-gray-300 border-4 border-gray-400 rounded-l-xl flex items-center justify-center shadow-lg"
          ><ArrowLeft className="text-gray-800" size={32}/></button>
          <button 
            onPointerDown={() => keys.current.right = true} onPointerUp={() => keys.current.right = false}
            onTouchStart={() => keys.current.right = true} onTouchEnd={() => keys.current.right = false}
            className="w-16 h-16 bg-gray-300 border-4 border-gray-400 rounded-r-xl flex items-center justify-center shadow-lg"
          ><ArrowRight className="text-gray-800" size={32}/></button>
        </div>
        <button 
          onPointerDown={() => keys.current.jump = true} onPointerUp={() => keys.current.jump = false}
          onTouchStart={() => keys.current.jump = true} onTouchEnd={() => keys.current.jump = false}
          className="w-20 h-20 bg-red-600 border-4 border-red-800 rounded-full flex items-center justify-center shadow-xl"
        ><span className="text-white text-xl">A</span></button>
      </div>

    </div>
  );
}