"use client";

import { cn } from '@/lib/utils';
import { ArrowRight, Code2, Zap, LucideIcon, Rocket } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  color?: string;
  icon?: LucideIcon;
}

export default function CardFlip({
  title = 'Node.js',
  subtitle = 'Backend Runtime',
  description = 'Ich entwickle Server-Anwendungen mit Node.js, Express und arbeite mit REST APIs und Datenbanken.',
  features = [
    'Express.js Framework',
    'REST API Development',
    'MongoDB Integration',
    'Authentication & JWT',
  ],
  color = '#2563eb',
  icon: Icon = Rocket
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cardTitle = title.split(' ');

  return (
    <div
      style={{
        ['--primary' as any]: color ?? '#2563eb',
      }}
      className="group relative h-[450px] w-full max-w-[340px] [perspective:2000px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        {/* Front of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[backface-visibility:hidden]',
            'overflow-hidden rounded-[3rem]',
            'backdrop-blur-2xl bg-white/[0.01]',
            'border border-white/10',
            'transition-all duration-700',
            'group-hover:border-white/20',
          )}
        >
          {/* Constant Glitz Sweep (Looping Animation) */}
          <motion.div
            animate={{
              background: [
                "linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%, transparent 100%)",
                "linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%, transparent 100%)"
              ],
              backgroundPosition: ["200% 0", "-200% 0"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ backgroundSize: '200% 100%' }}
          />

          {/* Morphing Liquid Border (Front) */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <filter id={`liquid-morph-${title.replace(/\s+/g, '-')}`}>
                  <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="1">
                    <animate attributeName="baseFrequency" values="0.015;0.022;0.015" dur="12s" repeatCount="indefinite" />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" scale="18" />
                </filter>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="none"
                stroke={color}
                strokeWidth="2"
                rx="48"
                filter={`url(#liquid-morph-${title.replace(/\s+/g, '-')})`}
              />
            </svg>
          </div>

          {/* Content Container */}
          <div className="relative z-20 h-full flex flex-col p-10">
            {/* Top Icon Block */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative mb-10">
                <div
                  className="absolute inset-x-[-20%] inset-y-[-20%] blur-3xl opacity-20 transition-opacity duration-1000 rounded-full animate-pulse"
                  style={{ backgroundColor: color }}
                />
                <div className="relative h-28 w-28 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 group-hover:border-white/30 shadow-2xl">
                  <Icon size={48} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                </div>
              </div>

              {/* Typography */}
              <div className="text-center space-y-4">
                <span
                  className="text-[10px] font-black uppercase tracking-[0.6em] mb-4 block opacity-60"
                  style={{ color }}
                >
                  {subtitle}
                </span>
                <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
                  {cardTitle[0]}<br />
                  <span className="text-white/10 group-hover:text-white transition-all duration-700 delay-100">
                    {cardTitle.slice(1).join(' ')}
                  </span>
                </h3>
              </div>
            </div>

            {/* Bottom Indicator */}
            <div className="flex justify-center pt-8">
              <Zap size={20} className="text-white/40 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-[3rem] p-10',
            'backdrop-blur-3xl bg-white/[0.02]',
            'border border-white/10',
            'flex flex-col',
            'transition-all duration-700',
          )}
          style={{ borderRightColor: `${color}40`, borderBottomColor: `${color}40` }}
        >
          {/* Constant Glitz (Back) */}
          <motion.div
            animate={{ backgroundPosition: ["100% 0", "-100% 0"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            style={{
              background: `linear-gradient(110deg, transparent 45%, ${color}20 50%, transparent 55%)`,
              backgroundSize: '200% 100%'
            }}
          />

          <div
            className="absolute -top-20 -right-20 w-64 h-64 blur-[120px] opacity-10 rounded-full animate-pulse-slow"
            style={{ backgroundColor: color }}
          />

          <div className="relative z-10 flex-1 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-2xl"
                  style={{ color }}
                >
                  <Code2 size={24} />
                </div>
                <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">{title}</h4>
              </div>
              <p className="text-white/40 text-[11px] leading-relaxed uppercase tracking-[0.2em] font-black">
                {description}
              </p>
            </div>

            <div className="space-y-5">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-4 transition-all duration-700"
                  style={{
                    transform: isFlipped ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 80 + 200}ms`,
                  }}
                >
                  <div
                    className="h-1.5 w-1.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] group-hover:text-white/60 transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              scrollToContact();
            }}
            className="relative z-20 mt-8 group/btn flex items-center justify-between p-5 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden shadow-2xl"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white italic">Initialize Deployment</span>
            <div className="flex items-center gap-1">
              <ArrowRight size={18} className="text-white/40 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all duration-500" />
            </div>
            <div
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-700"
              style={{ backgroundColor: color }}
            />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
