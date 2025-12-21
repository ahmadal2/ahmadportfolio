'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BottomScrollEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  // Transform scroll progress to various animation values
  const scale1 = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [0.9, 1.2]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [0.95, 1.4]);
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.7, 1]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.5, 1]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  
  const y1 = useTransform(scrollYProgress, [0, 1], ['50%', '0%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['30%', '0%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['10%', '0%']);

  return (
    <div className="w-full py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Scroll Experience</h2>
          <p className="text-xl text-gray-400">Scroll down to see the animation effects</p>
        </div>
        
        <div ref={containerRef} className="h-[150vh] relative flex items-center justify-center overflow-hidden rounded-3xl border border-gray-800">
          {/* Background with parallax effect */}
          <motion.div 
            style={{ scale: scale1, opacity: opacity1, y: y1 }}
            className="absolute inset-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80" 
              alt="Background layer 1" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </motion.div>
          
          {/* Middle layer with rotation and scaling */}
          <motion.div 
            style={{ scale: scale2, opacity: opacity2, rotate: rotate2, y: y2 }}
            className="absolute w-3/4 h-3/4 rounded-2xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80" 
              alt="Background layer 2" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </motion.div>
          
          {/* Top layer with more dramatic effects */}
          <motion.div 
            style={{ scale: scale3, opacity: opacity3, rotate: rotate3, y: y3 }}
            className="absolute w-1/2 h-1/2 rounded-xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80" 
              alt="Background layer 3" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Floating elements that respond to scroll */}
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], ['20%', '-20%']) }}
            className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70"
          />
          
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], ['30%', '-30%']) }}
            className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-70"
          />
          
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], ['10%', '-10%']) }}
            className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 opacity-70"
          />
          
          {/* Center content with fade-in effect */}
          <div className="relative z-10 text-center p-8 max-w-2xl">
            <motion.h3 
              style={{ opacity: opacity3 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Architectural Innovation
            </motion.h3>
            <motion.p 
              style={{ opacity: opacity3 }}
              className="text-xl text-gray-300 mb-8"
            >
              Experience the future of architectural design with our cutting-edge solutions
            </motion.p>
            
            {/* Progress indicator */}
            <motion.div 
              style={{ opacity: opacity3 }}
              className="w-full bg-gray-800 rounded-full h-2 mb-8"
            >
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
              />
            </motion.div>
            
            <motion.div 
              style={{ opacity: opacity3 }}
              className="text-gray-400"
            >
              Scroll to explore
            </motion.div>
          </div>
        </div>
        
        {/* Additional content after the scroll effect */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Performance Focused</h3>
            <p className="text-gray-300">
              All scroll effects are contained to this section and don't affect the rest of your website.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Smooth Animations</h3>
            <p className="text-gray-300">
              Powered by Framer Motion for buttery-smooth 60fps animations.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Responsive Design</h3>
            <p className="text-gray-300">
              Works perfectly on all devices from mobile to desktop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomScrollEffect;