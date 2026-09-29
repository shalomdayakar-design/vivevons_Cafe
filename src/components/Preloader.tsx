import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-olive text-cream p-8 md:p-16 select-none"
        >
          {/* Top Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] font-sans text-sage"
          >
            The Café of Second Chances
          </motion.div>

          {/* Central Logo & Brand */}
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.img
              src="/logo.jpg"
              alt="VIVEVONS Logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-cream/20 shadow-2xl p-1 bg-cream/5 backdrop-blur"
            />

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl md:text-6xl tracking-widest text-cream font-light"
            >
              VIVEVONS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-xs md:text-sm tracking-[0.25em] text-cream/80 uppercase font-light"
            >
              More Than Just a Café
            </motion.p>
          </div>

          {/* Bottom Progress Line */}
          <div className="w-full max-w-xs space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-sage tracking-wider">
              <span>INITIALIZING SANCTUARY</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-[2px] w-full bg-cream/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-terracotta"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
