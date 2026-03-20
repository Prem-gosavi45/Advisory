import { useState, useEffect } from 'react';

export default function LoadingPage({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small delay for smooth transition
          return 100;
        }
        // Speed up as it gets closer to 100
        const increment = prevProgress > 80 ? 2 : 1;
        return Math.min(prevProgress + increment, 100);
      });
    }, 30);

    return () => {
      clearInterval(timer);
    };
  }, [onComplete]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center font-sans">
      <main className="flex flex-col items-center justify-center flex-grow text-center">
        <img src="/logo.png" alt="Edu-Advisory Logo" className="w-32 h-32 mb-6 object-contain" />
        <h1 className="text-5xl font-bold whitespace-nowrap">
          <span className="text-green-600">Edu</span>-<span className="text-orange-500">Advisory</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 tracking-widest">
          YOUR AI-POWERED EDUCATION ADVISOR
        </p>
        <div className="w-64 mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-right mt-2 font-semibold text-gray-600">{progress}%</p>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-400">
        © 2026 Edu-Advisory. All Rights Reserved.
      </footer>
    </div>
  );
}
