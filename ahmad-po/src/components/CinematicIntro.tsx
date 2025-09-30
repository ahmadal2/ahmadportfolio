import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(1); // 1: Loading, 2: Title Formation, 3: Complete
  const [showSkip, setShowSkip] = useState(true);
  const [isSkipping, setIsSkipping] = useState(false);
  const [progress, setProgress] = useState(0);
  const titleText = "AHMAD PORTFOLIO";

  useEffect(() => {
    if (isSkipping) return;
    
    if (stage === 1) {
      const timer = setTimeout(() => setStage(2), 3500);
      return () => clearTimeout(timer);
    }
    if (stage === 2) {
      const timer = setTimeout(() => setStage(3), 2800);
      return () => clearTimeout(timer);
    }
    if (stage === 3) {
      const timer = setTimeout(() => {
        onComplete();
        setIsSkipping(false);
      }, 1200);
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
          return prev + 1.8;
        });
      }, 55);
      return () => clearInterval(interval);
    }
  }, [stage, isSkipping]);

  useEffect(() => {
    if (stage === 1) {
      setProgress(0);
    }
  }, [stage]);

  const skipIntro = useCallback(() => {
    setIsSkipping(true);
    setShowSkip(false);
    setStage(3);
    setTimeout(() => onComplete(), 300);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, #111827 0%, #0f0f23 50%, #000000 100%)',
      }}
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${80 + Math.random() * 120}px`,
              height: `${80 + Math.random() * 120}px`,
              background: i % 3 === 0 
                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' 
                : i % 3 === 1 
                ? 'linear-gradient(135deg, #06b6d4, #3b82f6)'
                : 'linear-gradient(135deg, #10b981, #059669)',
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Skip Button */}
      <AnimatePresence>
        {showSkip && !isSkipping && stage < 3 && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={skipIntro}
            className="absolute top-6 right-6 px-5 py-2.5 text-white/80 font-medium hover:text-white transition-all duration-300 rounded-2xl group relative overflow-hidden"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Skip Intro</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Stage 1: Modern Loading */}
      <AnimatePresence>
        {stage === 1 && !isSkipping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center w-full max-w-lg px-6"
          >
            {/* Modern Loading Ring */}
            <div className="relative w-64 h-64 mb-12">
              {/* Outer Ring */}
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              {/* Progress Ring */}
              <motion.div 
                className="absolute inset-4 rounded-full border-4 border-transparent"
                style={{
                  background: `conic-gradient(from 0deg, #6366f1 0%, #8b5cf6 ${progress * 1.8}%, transparent ${progress * 1.8}%, transparent 100%)`,
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 4px))',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 4px))',
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Glow */}
              <motion.div 
                className="absolute inset-12 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.2), transparent)',
                  filter: 'blur(20px)',
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Center Dot */}
              <motion.div 
                className="absolute inset-20 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 0 40px rgba(99, 102, 241, 0.5)',
                }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 20px rgba(99, 102, 241, 0.3)',
                    '0 0 60px rgba(99, 102, 241, 0.8)',
                    '0 0 20px rgba(99, 102, 241, 0.3)'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            {/* Loading Text */}
            <motion.div 
              className="mb-8 px-6 py-3 rounded-2xl"
              style={{
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              }}
              animate={{ 
                opacity: [0.7, 1, 0.7],
                y: [0, -2, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-xl font-semibold tracking-wide text-white/90">
                Loading Experience
              </div>
            </motion.div>
            
            {/* Progress Bar */}
            <div className="w-full max-w-sm">
              <div 
                className="w-full h-2 rounded-full overflow-hidden mb-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                <motion.div 
                  className="h-full rounded-full relative"
                  style={{ 
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              
              <div className="flex justify-between items-center text-sm text-white/70">
                <span>Initializing...</span>
                <span className="font-mono">{Math.round(progress)}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Title Formation */}
      <AnimatePresence>
        {stage === 2 && !isSkipping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center px-6"
          >
            {/* Main Title */}
            <motion.div 
              className="relative mb-8"
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 30%, #cbd5e1 60%, #94a3b8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(255,255,255,0.2))",
                }}
                animate={{ 
                  filter: [
                    "drop-shadow(0 0 20px rgba(255,255,255,0.1))",
                    "drop-shadow(0 0 40px rgba(99, 102, 241, 0.3))",
                    "drop-shadow(0 0 20px rgba(255,255,255,0.1))"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                {titleText}
              </motion.h1>
              
              {/* Floating Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4',
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </motion.div>
            
            {/* Animated Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
              className="h-1 rounded-full mb-6"
              style={{
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
              }}
            />
            
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="px-6 py-3 rounded-xl"
              style={{
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              }}
            >
              <div className="text-lg text-white/80 font-medium tracking-wide">
                Creative Developer & Designer
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3: Fade Out */}
      <AnimatePresence>
        {stage === 3 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, #111827 0%, #0f0f23 50%, #000000 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4',
            }}
            animate={{
              y: ["100vh", "-10vh"],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 15 + Math.random() * 10,
              delay: Math.random() * 8,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CinematicIntro;