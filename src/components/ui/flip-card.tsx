'use client';

import { cn } from '@/lib/utils';
import { ArrowRight, Code2, Copy, Rocket, Zap } from 'lucide-react';
import { useState } from 'react';

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  color?: string;
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
  color = '#10b981'
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Function to scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        ['--primary' as any]: color ?? '#2563eb',
      }}
      className="group relative h-[360px] w-full max-w-[300px] [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-all duration-700',
          isFlipped
            ? '[transform:rotateY(180deg)]'
            : '[transform:rotateY(0deg)]',
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(0deg)] [backface-visibility:hidden]',
            'overflow-hidden rounded-2xl',
            'backdrop-blur-xl bg-black/40',
            'border border-white/10',
            'shadow-2xl',
            'transition-all duration-700',
            'group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
            'group-hover:border-white/20',
            isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Background gradient effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-br via-transparent opacity-30"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${color}20, transparent, ${color}30)`
            }}
          />

          {/* Glass shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

          {/* Animated code blocks */}
          <div className="absolute inset-0 flex items-center justify-center pt-20">
            <div className="relative flex h-[100px] w-[200px] flex-col items-center justify-center gap-2">
              {/* Code blocks animation */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-3 w-full rounded-sm',
                    'bg-gradient-to-r',
                    'animate-[slideIn_2s_ease-in-out_infinite]',
                    'opacity-0',
                  )}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${color}30, ${color}60, ${color}30)`,
                    width: `${60 + Math.random() * 40}%`,
                    animationDelay: `${i * 0.2}s`,
                    marginLeft: `${Math.random() * 20}%`,
                  }}
                />
              ))}

              {/* Central rocket icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={cn(
                    'h-12 w-12 rounded-xl',
                    'bg-gradient-to-br',
                    'flex items-center justify-center',
                    'shadow-lg',
                    'animate-pulse',
                    'transition-all duration-500 group-hover:scale-110 group-hover:rotate-12',
                  )}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${color}, ${color}CC)`,
                    boxShadow: `0 4px 12px ${color}40`,
                  }}
                >
                  <Rocket className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom content */}
          <div className="absolute right-0 bottom-0 left-0 p-5 backdrop-blur-sm bg-black/20">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 
                  className="text-lg leading-snug font-semibold tracking-tight transition-all duration-500 ease-out group-hover:translate-y-[-4px]"
                  style={{ 
                    color: color,
                    textShadow: `0 0 20px ${color}60`
                  }}
                >
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm tracking-tight text-white/70 transition-all delay-[50ms] duration-500 ease-out group-hover:translate-y-[-4px]">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative">
                <div
                  className={cn(
                    'absolute inset-[-8px] rounded-lg transition-opacity duration-300',
                    'bg-gradient-to-br to-transparent',
                    'opacity-0 group-hover/icon:opacity-100',
                  )}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${color}30, ${color}10, transparent)`
                  }}
                />
                <Zap 
                  className="relative z-10 h-5 w-5 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-12" 
                  style={{ color: color }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-5',
            'backdrop-blur-xl bg-black/40',
            'border border-white/10',
            'shadow-2xl',
            'flex flex-col',
            'transition-all duration-700',
            'group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
            'group-hover:border-white/20',
          )}
        >
          {/* Background gradient */}
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent opacity-20"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${color}20, transparent, ${color}30)`
            }}
          />

          {/* Glass shine */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />

          <div className="relative z-10 flex-1 space-y-5">
            <div className="space-y-2">
              <div className="mb-2 flex items-center gap-2">
                <div 
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${color}, ${color}CC)`,
                  }}
                >
                  <Code2 className="h-4 w-4 text-white" />
                </div>
                <h3 
                  className="text-lg leading-snug font-semibold tracking-tight transition-all duration-500 ease-out group-hover:translate-y-[-2px]"
                  style={{ color: color }}
                >
                  {title}
                </h3>
              </div>
              <p className="line-clamp-2 text-sm tracking-tight text-white/70 transition-all duration-500 ease-out group-hover:translate-y-[-2px]">
                {description}
              </p>
            </div>

            <div className="space-y-2.5">
              {features.map((feature, index) => {
                const icons = [Copy, Code2, Rocket, Zap];
                const IconComponent = icons[index % icons.length];

                return (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-white/80 transition-all duration-500"
                    style={{
                      transform: isFlipped
                        ? 'translateX(0)'
                        : 'translateX(-10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <div 
                      className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md"
                      style={{
                        backgroundColor: `${color}20`,
                      }}
                    >
                      <IconComponent 
                        className="h-3 w-3" 
                        style={{ color: color }}
                      />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-white/10 pt-4">
            <div
              className={cn(
                'group/start relative',
                'flex items-center justify-between',
                'rounded-lg p-2.5',
                'transition-all duration-300',
                'backdrop-blur-sm bg-white/5',
                'hover:bg-white/10',
                'hover:scale-[1.02] hover:cursor-pointer',
                'border border-white/10',
                'hover:border-white/20',
              )}
              style={{
                backgroundImage: `linear-gradient(to right, ${color}15, ${color}08, transparent)`,
              }}
              onClick={scrollToContact}
            >
              <span 
                className="text-sm font-semibold transition-colors duration-300"
                style={{ color: color }}
              >
                Start Building
              </span>
              <div className="group/icon relative">
                <div
                  className={cn(
                    'absolute inset-[-6px] rounded-lg transition-all duration-300',
                    'bg-gradient-to-br to-transparent',
                    'scale-90 opacity-0 group-hover/start:scale-100 group-hover/start:opacity-100',
                  )}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${color}30, ${color}10, transparent)`
                  }}
                />
                <ArrowRight 
                  className="relative z-10 h-4 w-4 transition-all duration-300 group-hover/start:translate-x-1 group-hover/start:scale-110" 
                  style={{ color: color }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}