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
      const timer = setTimeout(() => setStage(2), 2000); // Reduced time
      return () => clearTimeout(timer);
    }
    if (stage === 2) {
      const timer = setTimeout(() => setStage(3), 1500); // Reduced time
      return () => clearTimeout(timer);
    }
    if (stage === 3) {
      const timer = setTimeout(() => {
        onComplete();
        setIsSkipping(false);
      }, 500); // Reduced time
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
          return prev + 4; // Increased step for faster progress
        });
      }, 30); // Reduced interval
      return () => clearInterval(interval);
    }
  }, [stage, isSkipping]);

  const skipIntro = useCallback(() => {
    setIsSkipping(true);
    setShowSkip(false);
    setStage(3);
    setTimeout(() => onComplete(), 100); // Reduced timeout
  }, [onComplete]);

  // Memoize floating elements to prevent re-creation
  const floatingElements = useMemo(() => (
    [...Array(4)].map((_, i) => ( // Reduced number of elements
      <motion.div
        key={i}
        className="absolute w-px h-px rounded-full bg-cyan-400"
        style={{
          left: `${20 + Math.random() * 60}%`,
          top: `${20 + Math.random() * 60}%`,
          boxShadow: '0 0 4px #06b6d4',
        }}
        animate={{
          y: [0, -20, 0], // Reduced animation distance
          opacity: [0, 0.6, 0],
          scale: [1, 1.2, 1] // Reduced scale animation
        }}
        transition={{
          duration: 3 + Math.random() * 1, // Reduced duration
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut"
        }}
      />
    ))
  ), []);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: '#0a0a0f',
      }}
    >
      {/* Sophisticated Grid Pattern - Simplified */}
      <div 
        className="absolute inset-0 opacity-10" // Reduced opacity
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px', // Increased grid size
        }}
      />

      {/* Minimal Ambient Glow - Simplified */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full" // Reduced size
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) transparent 70%)', // Reduced opacity
            filter: 'blur(60px)', // Reduced blur
          }}
          animate={{
            scale: [1, 1.1, 1], // Reduced scale animation
            opacity: [0.2, 0.3, 0.2], // Reduced opacity animation
          }}
          transition={{
            duration: 6, // Reduced duration
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full" // Reduced size
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) transparent 70%)', // Reduced opacity
            filter: 'blur(60px)', // Reduced blur
          }}
          animate={{
            scale: [1.1, 1, 1.1], // Reduced scale animation
            opacity: [0.2, 0.3, 0.2], // Reduced opacity animation
          }}
          transition={{
            duration: 6, // Reduced duration
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5 // Reduced delay
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
          className="absolute top-8 right-8 px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-all duration-300 z-50 group"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
          }}
          whileHover={{ 
            background: 'rgba(255, 255, 255, 0.04)',
            borderColor: 'rgba(6, 182, 212, 0.2)'
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
            transition={{ duration: 0.3 }} // Reduced duration
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Ultra Minimal Spinner */}
            <div className="relative w-24 h-24 mb-8"> {/* Reduced size */}
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.08)', // Reduced opacity
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
                  strokeWidth="1.5" // Reduced stroke width
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 62}`}
                  strokeDashoffset={`${2 * Math.PI * 62 * (1 - progress / 100)}`}
                  style={{ 
                    transition: 'stroke-dashoffset 0.2s cubic-bezier(0.4, 0, 0.2, 1)', // Reduced transition time
                    filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.2))' // Reduced shadow
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
              className="flex items-center gap-2" // Reduced gap
              animate={{ opacity: [0.4, 0.8, 0.4] }} // Reduced opacity animation
              transition={{ duration: 1.5, repeat: Infinity }} // Reduced duration
            >
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
              <span className="text-xs font-light text-white/40 tracking-wider"> {/* Reduced font size and opacity */}
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
            transition={{ duration: 0.4 }} // Reduced duration
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Main Title - Ultra Clean */}
            <motion.div
              initial={{ y: 15, opacity: 0 }} // Reduced animation distance
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Reduced delay and duration
              className="relative"
            >
              <h1 
                className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter text-center" // Reduced font sizes
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 50%, #bae6fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.03em', // Reduced letter spacing
                }}
              >
                AHMAD
              </h1>
              
              {/* Subtle Accent Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Reduced delay and duration
                className="h-px mt-3 mx-auto" // Reduced margin
                style={{
                  width: '50%', // Reduced width
                  background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
                  boxShadow: '0 0 6px rgba(6, 182, 212, 0.3)', // Reduced shadow
                }}
              />
            </motion.div>
            
            {/* Minimal Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }} // Reduced delay and duration
              className="mt-6 text-sm font-light text-white/30 tracking-widest uppercase" // Reduced margin and opacity
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
            transition={{ duration: 0.6, ease: "easeInOut" }} // Reduced duration
            className="absolute inset-0 bg-[#0a0a0f]"
          />
        )}
      </AnimatePresence>

      {/* Minimal Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements}
      </div>
    </div>
  );
};

export default CinematicIntro;