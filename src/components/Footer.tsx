import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Instagram, Linkedin, Mail } from 'lucide-react'
import { usePerformance } from '@/hooks/usePerformance'

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()
  const { isLowEnd } = usePerformance()

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

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "#hero" },
        { name: "About", href: "#about" },
        { name: "Work", href: "#portfolio" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "UI/UX Design", href: "#" },
        { name: "Web Development", href: "#" },
        { name: "Mobile Apps", href: "#" },
        { name: "Consulting", href: "#" },
        { name: "Branding", href: "#" }
      ]
    },
    {
      title: "Connect",
      links: [
        { name: "LinkedIn", href: "#" },
        { name: "Twitter", href: "#" },
        { name: "GitHub", href: "#" },
        { name: "Dribbble", href: "#" },
        { name: "Behance", href: "#" }
      ]
    }
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.open(href, '_blank')
    }
  }

  return (
    <footer className="relative py-24 md:py-32 section-padding bg-black text-white overflow-hidden">
      {/* 2026 Mesh Gradient Background - Subtle & Professional */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-white/5 to-white/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-white/5 to-white/10 blur-[120px]"></div>
      </div>

      <div className="container-width relative z-10">
        {/* Sophisticated Minimalist Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative mb-32 group overflow-hidden rounded-[40px] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
        >
          {/* Obsidian Glass Material */}
          <div
            className="absolute inset-0 bg-[#050505]/95 overflow-hidden"
            style={{ backdropFilter: isLowEnd ? 'none' : 'blur(60px)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"></div>
          </div>

          <div className="relative p-12 md:p-24 flex flex-col items-center text-center max-w-5xl mx-auto z-10">
            {/* Header Section */}
            <div className="mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-7xl font-semibold text-white mb-8 tracking-tight"
              >
                Let's Create Together
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-white/60 text-xl md:text-2xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
              >
                Ready to bring your vision to life? Let's discuss your next project and create something extraordinary together.
              </motion.p>
            </div>

            {/* Contact Action Hub */}
            <div className="w-full bg-white/[0.02] border border-white/[0.08] rounded-[32px] p-8 md:p-12 mb-12 backdrop-blur-md">
              <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-left">
                  <h3 className="text-2xl font-medium text-white mb-2">Get in Touch</h3>
                  <p className="text-white/40 font-light text-lg">Feel free to reach out directly.</p>
                </div>

                {/* Silver Glass Email Action */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center gap-6 px-8 py-5 rounded-2xl bg-white/[0.05] border border-white/10 group/email cursor-pointer transition-colors hover:bg-white/[0.08]"
                  onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=ahmed.aa.ss748@gmail.com', '_blank')}
                >
                  <Mail className="w-6 h-6 text-white/70" />
                  <span className="font-mono text-xl text-white/90 tracking-wide">ahmed.aa.ss748@gmail.com</span>
                </motion.div>
              </div>

              <div className="w-full h-px bg-white/[0.05] my-10"></div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Socials - Silver Minimalist */}
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-colors"
                      >
                        <Icon className="w-6 h-6 text-white/60" />
                      </motion.a>
                    )
                  })}
                </div>

                {/* Primary Button - White Silver */}
                <motion.button
                  onClick={() => window.location.href = 'mailto:ahmed.aa.ss748@gmail.com'}
                  whileHover={{ scale: 1.02, backgroundColor: "#ffffff", color: "#000000" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 rounded-full bg-white/90 text-black font-semibold tracking-wide text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all"
                >
                  Contact Me
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-black bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mb-6 tracking-tighter">
                AHMAD
              </h3>
              <p className="text-white/60 text-lg leading-relaxed font-light">
                Crafting the future of digital experiences with code and aesthetic precision.
              </p>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * (sectionIndex + 1) }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * (sectionIndex + 1) + 0.05 * linkIndex
                    }}
                    viewport={{ once: true }}
                  >
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="group relative flex items-center text-white/50 hover:text-white transition-all duration-300 text-left overflow-hidden"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0"
        >
          <div className="text-sm tracking-widest text-white/30 uppercase">
            © {currentYear} Ahmad. Personal Space.
          </div>

          <div className="flex items-center space-x-12 text-xs tracking-widest uppercase text-white/30">
            <button className="hover:text-cyan-400 transition-colors duration-300">
              Privacy
            </button>
            <button className="hover:text-cyan-400 transition-colors duration-300">
              Terms
            </button>
          </div>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-12 right-12 p-6 glass-strong border border-white/10 rounded-2xl text-white hover:text-cyan-400 hover:scale-110 active:scale-95 transition-all duration-500 z-50 group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          <ArrowUp size={28} className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1" />
        </motion.button>
      </div>

      {/* Decorative Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </footer>
  )
}
export default Footer
