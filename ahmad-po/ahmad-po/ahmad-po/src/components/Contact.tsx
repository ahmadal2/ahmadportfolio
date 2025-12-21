import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Instagram, Linkedin } from 'lucide-react'
import { RainbowButton } from '@/components/ui/rainbow-button'

const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const emailAddress = "ahmed.aa.ss748@gmail.com"

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`
  }

  const handleGmailClick = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`, '_blank')
  }

  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/ahmadal2"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/ahmadal2"
    }
  ]

  return (
    <section id="contact" ref={ref} className="py-16 md:py-32 section-padding bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 md:w-[32rem] md:h-[32rem] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 md:w-80 md:h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>
      
      <div className="container-width relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-section font-bold text-white drop-shadow-2xl mb-4 md:mb-6">
            Let's Create Together
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Ready to bring your vision to life? Let's discuss your next project
            and create something extraordinary together.
          </p>
        </motion.div>

        <div className="flex justify-center items-center min-h-[500px]">
          {/* Modern Liquid Glass and Rainbow Contact Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group h-auto w-full max-w-2xl rounded-3xl bg-gradient-to-br from-gray-900/20 to-black/20 shadow-2xl transition-all duration-700 ease-out border border-white/10 backdrop-blur-2xl overflow-hidden"
          >
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
            <div className="relative p-8 md:p-12 text-center">
              <div className="mb-8">
                <Mail className="w-16 h-16 md:w-20 md:h-20 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  Get in Touch
                </h3>
                <p className="text-gray-300 text-lg md:text-xl mb-8">
                  Feel free to reach out to me directly via email
                </p>
              </div>

              <div className="mb-10">
                <div className="glass p-6 rounded-2xl backdrop-blur-lg border border-white/20">
                  <p className="text-cyan-300 text-xl md:text-2xl font-mono break-all">
                    {emailAddress}
                  </p>
                </div>
              </div>

              {/* Email and Social Media Links */}
              <div className="flex flex-col items-center mb-10 space-y-6">
                {/* Modern Gmail Button with Liquid Glass and Rainbow Effect */}
                <motion.button
                  onClick={handleGmailClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-6 py-3 rounded-2xl bg-black text-white font-medium flex items-center space-x-2 overflow-hidden group border border-white/20"
                >
                  {/* Rainbow border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] bg-[length:400%] animate-rainbow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Liquid glass effect */}
                  <div className="absolute inset-0.5 rounded-xl glass backdrop-blur-lg bg-black/50"></div>
                  
                  {/* Gmail icon with modern styling */}
                  <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21l-9-7.5L3 21V3h10.5l7.5 6V4.5c0-.85.65-1.5 1.5-1.5H24z"/>
                    <path fill="#34A853" d="M3 21l9-7.5L21 21H3z"/>
                    <path fill="#FBBC05" d="M3 3l9 7.5L21 3H3z"/>
                  </svg>
                  <span className="relative z-10">Open in Gmail</span>
                </motion.button>

                {/* Social Media Links */}
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative p-4 rounded-2xl transition-all duration-300 group overflow-hidden"
                      >
                        {/* Modern rainbow border effect */}
                        <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] bg-[length:400%] animate-rainbow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Glass card background */}
                        <div className="absolute inset-0.5 rounded-xl glass backdrop-blur-lg bg-black/30 border border-white/10"></div>
                        
                        {/* Icon with modern gradient effect */}
                        <Icon className="w-8 h-8 relative z-10 group-hover:text-white transition-colors duration-300" 
                              style={{ 
                                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
                                transition: 'all 0.3s ease'
                              }} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center">
                {/* Larger Rainbow Button with liquid glass effect */}
                <div className="relative group">
                  {/* Liquid glass effect layers */}
                  <div className="absolute inset-0 rounded-2xl">
                    {/* Base layer with subtle gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl"></div>
                    
                    {/* Animated liquid effect */}
                    <div className="absolute inset-0 opacity-40">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse"></div>
                      <div className="absolute top-1/4 left-0 w-full h-1/3 bg-gradient-to-r from-cyan-400/30 via-transparent to-blue-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                    
                    {/* Highlight edges */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-30 pointer-events-none"></div>
                  </div>
                  
                  {/* Rainbow Button */}
                  <RainbowButton 
                    onClick={handleEmailClick}
                    className="relative z-10 px-10 py-6 h-16 text-xl font-semibold rounded-2xl overflow-hidden"
                  >
                    <Mail className="w-6 h-6 mr-3" />
                    Contact Me
                  </RainbowButton>
                  
                  {/* Liquid highlight effect */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Liquid highlight effect */}
            <div className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none">
              <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact