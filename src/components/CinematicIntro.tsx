
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(1);
  const [showSkip, setShowSkip] = useState(true);
  const [isSkipping, setIsSkipping] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isSkipping) return;

    if (stage === 1) {
      const timer = setTimeout(() => setStage(2), 2500);
      return () => clearTimeout(timer);
    }
    if (stage === 2) {
      const timer = setTimeout(() => setStage(3), 2000);
      return () => clearTimeout(timer);
    }
    if (stage === 3) {
      const timer = setTimeout(() => {
        onComplete();
        setIsSkipping(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete, isSkipping]);

  useEffect(() => {
    if (stage === 1 && !isSkipping) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [stage, isSkipping]);

  const skipIntro = useCallback(() => {
    setIsSkipping(true);
    setShowSkip(false);
    setStage(3);
    setTimeout(() => onComplete(), 300);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black"
    >
      {/* 2026 Ethereal Backdrops */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full bg-blue-600/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-cyan-500/20 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>


      {/* Skip Button */}
      {showSkip && !isSkipping && stage < 3 && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onClick={skipIntro}
          className="absolute top-8 right-8 px-6 py-2 text-xs font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-all duration-300 z-50 rounded-full border border-white/10 hover:bg-white/5 backdrop-blur-md"
        >
          Skip Intro
        </motion.button>
      )}

      {/* Stage 1: Holographic Orb Loader */}
      <AnimatePresence mode="wait">
        {stage === 1 && !isSkipping && (
          <motion.div
            key="stage1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              {/* Quantum Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-cyan-500/30"
                  style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3 - i * 0.5, repeat: Infinity, ease: "linear" }}
                />
              ))}

              {/* Core Pulse */}
              <motion.div
                className="absolute w-32 h-32 rounded-full bg-cyan-400/10 blur-xl"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Percentage Text */}
              <div className="relative z-10 font-black text-4xl md:text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
                {Math.round(progress)}
                <span className="text-sm md:text-lg align-top ml-1 text-cyan-400">%</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-[10px] font-bold tracking-[0.5em] text-cyan-400/60 uppercase"
            >
              Initializing Core Systems
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Kinetic Typography Reveal */}
      <AnimatePresence mode="wait">
        {stage === 2 && !isSkipping && (
          <motion.div
            key="stage2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50"
              >
                AHMAD
              </motion.h1>
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "20%" }}
              transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
              className="h-1 bg-cyan-500 mt-4 rounded-full shadow-[0_0_20px_#06b6d4]"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-sm md:text-xl font-light text-white/60 tracking-[0.3em] uppercase text-center px-4"
            >
              Creative Developer
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3: Curtain Lift */}
      <AnimatePresence>
        {stage === 3 && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-black z-50 pointer-events-none"
          >
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cyan-500/20 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CinematicIntro;