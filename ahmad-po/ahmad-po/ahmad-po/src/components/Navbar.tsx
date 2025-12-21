import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { 
      name: "Home", 
      href: "hero",
      gradientFrom: '#a955ff',
      gradientTo: '#ea51ff'
    },
    { 
      name: "About", 
      href: "about",
      gradientFrom: '#56CCF2',
      gradientTo: '#2F80ED'
    },
   
    { 
      name: "Skills", 
      href: "skills",
      gradientFrom: '#80FF72',
      gradientTo: '#7EE8FA'
    },
     { 
      name: "Projects", 
      href: "portfolio",
      gradientFrom: '#FF9966',
      gradientTo: '#FF5E62'
    },
    { 
      name: "Contact", 
      href: "contact",
      gradientFrom: '#ffa9c6',
      gradientTo: '#f434e2'
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-white/50 dark:bg-[#0A192F]/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div
        className={`relative container mx-auto px-8 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="cursor-pointer flex items-center"
            onClick={() => scrollToSection("hero")}
          >
            <img
              src="/images/logo/logo1.png"
              alt="Ahmad"
              className={`transition-all duration-500 ${
                scrolled ? "h-8 w-auto" : "h-10 w-auto"
              }`}
            />
            <span className="ml-3 text-xl font-bold text-white">Ahmad</span>
          </div>

          {/* Desktop Navigation – iOS Dock Style with Gradient Effects */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-2 px-4 py-2 rounded-3xl relative overflow-hidden backdrop-blur-2xl border border-white/20 shadow-xl">
              {/* subtle glossy overlay like iOS */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/0 rounded-3xl pointer-events-none" />
              {/* glow aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-40 rounded-3xl pointer-events-none" />
              
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  style={{ 
                    '--gradient-from': item.gradientFrom, 
                    '--gradient-to': item.gradientTo 
                  } as React.CSSProperties}
                  className="relative px-5 py-2 text-sm font-semibold text-white rounded-full transition-all duration-500 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95 group"
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Gradient blur glow effect */}
                  <div className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-md opacity-0 -z-10 group-hover:opacity-60 transition-all duration-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Controls - Removed theme toggle, keeping only mobile menu button */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button with gradient effect */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-3 backdrop-blur-xl bg-white/30 dark:bg-white/10 border border-white/20 rounded-full transition-all duration-500 hover:scale-110 active:scale-95 group"
              style={{ 
                '--gradient-from': '#ec4899', 
                '--gradient-to': '#8b5cf6' 
              } as React.CSSProperties}
            >
              {isOpen ? <X size={18} className="text-white relative z-10" /> : <Menu size={18} className="text-white relative z-10" />}
              
              {/* Gradient background on hover */}
              <div className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 group-hover:opacity-80 transition-all duration-500" />
              
              {/* glow effect */}
              <div className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation – glassy floating panel with gradient effects */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-700 ease-out ${
            isOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative backdrop-blur-2xl bg-white/30 dark:bg-[#0A192F]/30 rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/5 dark:from-white/5 dark:via-transparent dark:to-transparent pointer-events-none" />
            <div className="py-4 relative">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  style={{ 
                    '--gradient-from': item.gradientFrom, 
                    '--gradient-to': item.gradientTo 
                  } as React.CSSProperties}
                  className="block w-full text-left px-8 py-4 text-white hover:text-white transition-all duration-500 font-medium relative group rounded-xl"
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 rounded-xl bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Gradient blur glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-sm opacity-0 group-hover:opacity-60 transition-all duration-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;