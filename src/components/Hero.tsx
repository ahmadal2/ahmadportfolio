
import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {ChevronDown, Mail} from 'lucide-react'

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  // Animated subtitle texts
  const subtitles = [
    "Creative Full-Stack Developer & Designer",
  "Digital Experience & Innovation Architect",
  "Frontend Specialist with Pixel-Perfect UI/UX",
  "Backend & API Engineer for Scalable Web Apps",
  "User Experience Visionary & Interaction Designer"
  ]

  const [currentSubtitle, setCurrentSubtitle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating Elements - Reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        className="relative z-10 text-center section-padding container-width px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6 md:space-y-8"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base md:text-lg text-white/70 font-light tracking-wide"
          >
            Hello, I'm
          </motion.p>

          {/* Name - Ahmad */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-5xl xs:text-6xl md:text-8xl lg:text-9xl font-bold text-white drop-shadow-2xl"
          >
            Ahmad
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="relative h-12 xs:h-16 md:h-20 overflow-hidden"
          >
            {subtitles.map((subtitle, index) => (
              <motion.h2
                key={index}
                className={`absolute inset-0 text-xl xs:text-2xl md:text-4xl lg:text-5xl font-light text-white flex items-center justify-center text-center px-4 ${
                  index === currentSubtitle ? 'opacity-100' : 'opacity-0'
                }`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ 
                  y: index === currentSubtitle ? 0 : -30, 
                  opacity: index === currentSubtitle ? 1 : 0 
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeInOut"
                }}
              >
                {subtitle}
              </motion.h2>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light px-4"
          >
           I'm Ahmad, a creative Full-Stack developer & designer crafting modern web experiences with design-driven frontends and scalable backends.
          </motion.p>

          {/* CTA Button - Single Get In Touch */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex justify-center items-center pt-6 md:pt-8"
          >
            <motion.button
              onClick={scrollToContact}
              className="magnetic group relative px-6 py-3 md:px-8 md:py-4 glass-strong rounded-xl md:rounded-2xl text-white font-medium text-base md:text-lg overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center space-x-2">
                <Mail size={18} className="md:w-5 md:h-5" />
                <span>Get In Touch</span>
              </div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToNext}
            className="magnetic flex flex-col items-center space-x-2 text-white/60 hover:text-blue-500 transition-colors duration-300"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs md:text-sm font-light">Get in touch</span>
            <ChevronDown size={20} className="md:w-6 md:h-6" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
