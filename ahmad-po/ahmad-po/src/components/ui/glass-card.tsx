import * as React from "react";
import { Calendar, MapPin, Award, Users, Code, Palette, Zap } from "lucide-react";

export interface GlassCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  name?: string;
  title?: string;
  content?: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  stats?: {
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    className, 
    name = "Ahmad",
    title = "Full Stack Developer & Designer",
    content = {
      paragraph1: "I'm Ahmad, a passionate full-stack developer and designer dedicated to creating modern digital experiences. My journey in web development started with a curiosity for technology and has evolved into a career focused on building innovative solutions that solve real-world problems.",
      paragraph2: "I specialize in creating responsive, user-friendly applications using modern technologies like React, TypeScript, Node.js, and TailwindCSS. I believe in the perfect balance between clean code, smooth interactions, and thoughtful design to deliver exceptional user experiences.",
      paragraph3: "When I'm not coding, I enjoy exploring new design trends, learning about emerging web technologies, and working on personal projects that challenge my creativity and technical skills."
    },
    stats = [
      { value: "1+", label: "Years Experience", icon: Calendar },
      { value: "5+", label: "Projects Completed", icon: Users },
      { value: "0+", label: "Certificates", icon: Award },
      { value: "Worldwide", label: "Locations", icon: MapPin },
    ],
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={`group h-auto w-full max-w-2xl [perspective:1000px] ${className}`}
        {...props}
      >
        <div className="relative h-full rounded-3xl bg-gradient-to-br from-gray-900/20 to-black/20 shadow-2xl transition-all duration-700 ease-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.4)_40px_60px_30px_-50px,rgba(0,194,255,0.2)_0px_0px_40px_inset] group-hover:[transform:rotate3d(1,1,0,12deg)] border border-white/10 backdrop-blur-2xl overflow-hidden">
          {/* Liquid glass effect layers */}
          <div className="absolute inset-0 rounded-3xl">
            {/* Base layer with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 backdrop-blur-2xl"></div>
            
            {/* Animated liquid effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
              <div className="absolute top-1/4 left-0 w-full h-1/3 bg-gradient-to-r from-cyan-400/5 via-transparent to-blue-400/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/4 left-0 w-full h-1/4 bg-gradient-to-r from-blue-400/5 via-transparent to-purple-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            
            {/* Highlight edges */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-20 pointer-events-none"></div>
          </div>
          
          {/* Content */}
          <div className="relative p-8 [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]">
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                My Story
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"></div>
            </div>
            
            {/* Story content */}
            <div className="space-y-4 text-white/90 mb-8">
              <p className="leading-relaxed drop-shadow-sm">{content.paragraph1}</p>
              <p className="leading-relaxed drop-shadow-sm">{content.paragraph2}</p>
              <p className="leading-relaxed drop-shadow-sm">{content.paragraph3}</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-cyan-500/20"
                >
                  <div className="flex items-center mb-2">
                    <stat.icon className="w-5 h-5 text-cyan-400 mr-2 drop-shadow" />
                    <span className="text-lg font-bold text-white drop-shadow">{stat.value}</span>
                  </div>
                  <div className="text-sm text-white/70 drop-shadow">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Liquid highlight effect */}
          <div className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none">
            <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
          </div>
        </div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;