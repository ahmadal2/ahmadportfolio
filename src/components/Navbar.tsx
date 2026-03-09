import React, { useState, useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MenuVertical } from "./ui/menu-vertical";
import { GlowingEffect } from "./ui/glowing-effect";

interface NavbarProps {
  activeSection?: number;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navbarRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", href: "hero", color: "#22d3ee" },
    { name: "About", href: "about", color: "#7EE8FA" },
    { name: "Skills", href: "skills", color: "#0ea5e9" },
    { name: "Projects", href: "demo-archive", color: "#3b82f6" },
    { name: "Services", href: "services", color: "#a5f3fc" },
    { name: "Contact", href: "contact", color: "#a5f3fc" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll lock implementation
  useEffect(() => {
    const html = document.documentElement;
    const { body } = document;

    if (isOpen) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      // On some mobile browsers, we need to fix the height to 100% as well
      html.style.height = '100%';
      body.style.height = '100%';
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
      html.style.height = '';
      body.style.height = '';
    }
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      html.style.height = '';
      body.style.height = '';
    };
  }, [isOpen]);

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
            "pointer-events-auto relative flex items-center justify-between w-full max-w-5xl px-8 py-3 rounded-full",
            "transition-all duration-700 ease-in-out border backdrop-blur-xl",
            "hidden md:flex", // Hide centered pill on mobile
            scrolled
              ? "bg-black/80 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] scale-95"
              : "bg-white/[0.03] border-white/[0.08] shadow-none scale-100"
          )}
        >
          {/* Cinematic Texture & Spotlight */}
          <div className="absolute inset-0 rounded-full opacity-10 pointer-events-none overflow-hidden mix-blend-soft-light">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          </div>

          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer z-10" onClick={() => scrollToSection('hero')}>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/images/logo/ahmad1.png"
                alt="Ahmad Logo"
                className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <div className="flex flex-col">


              <div className="h-[1px] w-0 bg-cyan-400 group-hover:w-full transition-all duration-500 shadow-[0_0_10px_#22d3ee]" />
            </div>
          </div>

          <div
            className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.08), transparent 60%)`
            }}
          />

          {/* Desktop Nav Items */}
          <div className="flex items-center gap-6 lg:gap-8 relative">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                onMouseEnter={() => setMousePosition({ ...mousePosition })} // Trigger hover state
                className="relative py-2 group transition-all duration-300"
              >
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 group-hover:text-white transition-colors duration-300">
                  {item.name}
                </span>

                {/* Sliding indicator - only if we had an 'active' state, but user wants 'more modern' deskop layout */}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 10px #22d3ee" }}
                />
              </button>
            ))}
          </div>

          {/* Premium CTA Button */}
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className={cn(
                "px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-500",
                "bg-white text-black hover:bg-cyan-500 hover:text-white border border-transparent hover:border-cyan-300/50"
              )}
            >
              Contact
            </motion.button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Right-Side Toggle - 2026 Aesthetic */}
      <div className="md:hidden fixed top-6 right-6 z-[120]">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="relative rounded-full p-[2px] overflow-hidden group"
        >
          <GlowingEffect
            blur={20}
            proximity={64}
            spread={80}
            variant="default"
            glow={true}
            disabled={false}
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "relative z-10 flex items-center justify-center size-14 rounded-full border border-white/20",
              "bg-black/60 backdrop-blur-xl transition-all duration-500",
              isOpen ? "rotate-[225deg] bg-white text-black" : "rotate-0 text-white"
            )}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} strokeWidth={3} /> : <Plus size={28} strokeWidth={3} />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="fixed inset-0 z-[110] bg-black/90 md:hidden flex items-center justify-center p-6 backdrop-blur-3xl h-screen overflow-hidden"
          >
            {/* 2026 Background Glows for Mobile Menu */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />

            <motion.div
              initial={{ x: 100, opacity: 0, skewX: 10 }}
              animate={{ x: 0, opacity: 1, skewX: 0 }}
              exit={{ x: -100, opacity: 0, skewX: -10 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="w-full flex items-center justify-center p-6 relative z-10"
            >
              <MenuVertical
                menuItems={navItems.map(item => ({ label: item.name, href: item.href }))}
                color="#22d3ee"
                onItemClick={(href) => {
                  setIsOpen(false);
                  setTimeout(() => scrollToSection(href), 300);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
