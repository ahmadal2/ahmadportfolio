import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navbarRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", href: "hero", color: "#3DFF54" },
    { name: "About", href: "about", color: "#A3C4F0" },
    { name: "Skills", href: "skills", color: "#7EE8FA" },
    { name: "Projects", href: "demo-archive", color: "#297BFF" },
    { name: "Contact", href: "contact", color: "#FF9966" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navbarRef.current) return;
    const rect = navbarRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
        <motion.div
          ref={navbarRef}
          onMouseMove={handleMouseMove}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 18, stiffness: 80 }}
          className={cn(
            "pointer-events-auto relative flex items-center px-4 py-2 rounded-full",
            "transition-all duration-700 ease-in-out border backdrop-blur-3xl",
            scrolled
              ? "bg-black/40 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-95"
              : "bg-white/5 border-white/10 shadow-none scale-100"
          )}
        >
          {/* Futuristic Spotlight Effect */}
          <div
            className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-5 py-2.5 rounded-full group transition-all duration-300"
              >
                <span className="relative z-10 text-xs lg:text-sm font-bold tracking-widest uppercase text-white/50 group-hover:text-white transition-all duration-300">
                  {item.name}
                </span>

                {/* Magnetic Hover Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-full blur-sm transition-all duration-500"
                  layoutId="nav-bg"
                />

                {/* 2026 Glowing Indicator */}
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full bg-white opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 15px 2px ${item.color}`
                  }}
                />
              </motion.button>
            ))}

            {/* Premium Button at the end */}
            <div className="ml-4 border-l border-white/10 pl-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2 bg-white text-black text-xs font-black uppercase tracking-tighter rounded-full hover:bg-white/90 transition-colors"
              >
                Hire Me
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center p-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-3 text-white transition-opacity duration-300 active:opacity-50 glass-light rounded-full border border-white/10"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} className="relative z-50 text-white" /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/80 md:hidden flex items-center justify-center p-6 backdrop-blur-2xl h-screen overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm glass-strong border border-white/20 rounded-[40px] p-8 space-y-6 relative overflow-hidden"
            >
              {/* Decorative background light for mobile menu */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />

              <div className="flex flex-col gap-4 relative z-10">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.href)}
                    className="group flex items-center justify-between p-4 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                  >
                    <span className="text-xl font-black italic tracking-tighter text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                      {item.name}
                    </span>
                    <div
                      className="w-3 h-3 rounded-full group-hover:scale-150 transition-transform duration-500 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                      style={{ backgroundColor: item.color }}
                    />
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-4 text-xs font-bold uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors"
              >
                Close Menu
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
