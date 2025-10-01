import React, { useState, useEffect, useCallback } from 'react';
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
      const timer = setTimeout(() => setStage(2), 3000);
      return () => clearTimeout(timer);
    }
    if (stage === 2) {
      const timer = setTimeout(() => setStage(3), 2500);
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
      }, 50);
      return () => clearInterval(interval);
    }
  }, [stage, isSkipping]);

  const skipIntro = useCallback(() => {
    setIsSkipping(true);
    setShowSkip(false);
    setStage(3);
    setTimeout(() => onComplete(), 200);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: '#0a0a0f',
      }}
    >
      {/* Sophisticated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Minimal Ambient Glow */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Skip Button - Professional & Minimal */}
      {showSkip && !isSkipping && stage < 3 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={skipIntro}
          className="absolute top-8 right-8 px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white transition-all duration-300 z-50 group"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
          }}
          whileHover={{ 
            background: 'rgba(255, 255, 255, 0.06)',
            borderColor: 'rgba(6, 182, 212, 0.3)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          Skip
        </motion.button>
      )}

      {/* Stage 1: Minimal Loading */}
      <AnimatePresence>
        {stage === 1 && !isSkipping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Ultra Minimal Spinner */}
            <div className="relative w-32 h-32 mb-12">
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              
              {/* Progress Arc */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 62}`}
                  strokeDashoffset={`${2 * Math.PI * 62 * (1 - progress / 100)}`}
                  style={{ 
                    transition: 'stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))'
                  }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Minimal Progress Indicator */}
            <motion.div 
              className="flex items-center gap-3"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
              <span className="text-sm font-light text-white/50 tracking-wider">
                LOADING
              </span>
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Clean Title Reveal */}
      <AnimatePresence>
        {stage === 2 && !isSkipping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Main Title - Ultra Clean */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <h1 
                className="text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter text-center"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 50%, #bae6fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.05em',
                }}
              >
                AHMAD
              </h1>
              
              {/* Subtle Accent Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-px mt-4 mx-auto"
                style={{
                  width: '60%',
                  background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
                }}
              />
            </motion.div>
            
            {/* Minimal Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-8 text-sm font-light text-white/40 tracking-widest uppercase"
            >
              Creative Developer & Designer

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3: Smooth Fade */}
      <AnimatePresence>
        {stage === 3 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#0a0a0f]"
          />
        )}
      </AnimatePresence>

      {/* Minimal Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px rounded-full bg-cyan-400"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              boxShadow: '0 0 4px #06b6d4',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CinematicIntro;