import React, { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Mail } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })


  // Animated subtitle texts - memoized to prevent unnecessary re-renders
  const subtitles = useMemo(() => [
    "Creative Full-Stack Developer & Designer",
    "Digital Experience & Innovation Architect",
    "Frontend Specialist with Pixel-Perfect UI/UX",
    "Backend & API Engineer for Scalable Web Apps",
    "User Experience Visionary & Interaction Designer"
  ], [])

  const [currentSubtitle, setCurrentSubtitle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length)
    }, 4000) // Increased interval to reduce CPU usage

    return () => clearInterval(interval)
  }, [subtitles.length])


  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Memoize floating elements to prevent re-creation on each render
  const floatingElements = useMemo(() => {
    return [...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))
  }, [])

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating Elements - Reduced number and complexity for better performance */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        className="relative z-10 text-center section-padding container-width px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 md:space-y-8"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-lg text-white/70 font-light tracking-wide"
          >
            Hello, I'm
          </motion.p>

          {/* Name - Ahmad */}
          <div className="relative inline-block">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl xs:text-6xl md:text-[8rem] lg:text-[10rem] font-black leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-600 via-indigo-950 via-blue-600 to-cyan-400 animate-rainbow bg-[length:200%_auto]"
            >
              Ahmad
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-40 origin-center"
            />
          </div>

          {/* Animated Subtitle */}
          <div className="relative h-12 xs:h-16 md:h-24 overflow-hidden mt-8">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentSubtitle}
                initial={{ y: 40, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -40, opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 text-lg xs:text-xl md:text-4xl font-light text-white/50 flex items-center justify-center text-center px-4 tracking-[0.2em] uppercase italic"
              >
                {subtitles[currentSubtitle]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="text-sm md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-extralight px-4 mt-6 tracking-wide"
          >
            Crafting the future of digital experiences with code and aesthetic precision.
          </motion.p>

        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero