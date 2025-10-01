import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import SmoothScroll from './components/SmoothScroll'
import CinematicIntro from './components/CinematicIntro'
import CookieConsent from './components/CookieConsent'
import CustomCursor from './components/CustomCursor'
import AuroraBackground from './components/AuroraBackground'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'skills', name: 'Skills' },
    { id: 'certifications', name: 'Awards' },
    { id: 'contact', name: 'Contact' }
  ]

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    // Check if intro has been shown before
    const introShown = localStorage.getItem('introShown')
    if (introShown === 'true') {
      setShowIntro(false)
    }
    
    // Check if device is mobile
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    localStorage.setItem('introShown', 'true')
  }

  const replayIntro = () => {
    setShowIntro(true)
    localStorage.removeItem('introShown')
  }

  const navigateToSection = (index: number) => {
    setCurrentSection(index)
    const section = document.querySelector(`#${sections[index].id}`)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Show intro if enabled
  if (showIntro) {
    return <CinematicIntro onComplete={handleIntroComplete} />
  }

  const mainContent = (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  )

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-remix overflow-hidden">
        {/* Aurora Background */}
        <AuroraBackground
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        <ScrollProgress />
        
        {/* Only show custom cursor on non-mobile devices */}
        {!isMobile && <CustomCursor />}
        
        {/* Book Navigation */}
        <div className="book-nav">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className={`book-nav-item ${currentSection === index ? 'active' : ''}`}
              onClick={() => navigateToSection(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={section.name}
            />
          ))}
        </div>

        {/* Replay Intro Button */}
        <motion.button
          onClick={replayIntro}
          className="fixed top-8 left-8 z-40 px-4 py-2 glass-strong rounded-xl text-white font-medium hover:scale-105 transition-transform text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎬 Replay Intro
        </motion.button>
        
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="book-page content-wrapper"
          >
            <Navbar />
            
            <main>
              {mainContent}
            </main>
            
            <Footer />
          </motion.div>
        </AnimatePresence>
        
        <CookieConsent />
      </div>
    </SmoothScroll>
  )
}

export default App