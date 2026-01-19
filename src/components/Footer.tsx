import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

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
    <footer className="relative py-20 section-padding bg-black text-white">
      <div className="container-width">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-4">AH</h3>
              <p className="text-white/70 leading-relaxed">
                Crafting innovative web solutions with passion and precision.
                Transforming ideas into exceptional digital experiences.
              </p>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (sectionIndex + 1) }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 * (sectionIndex + 1) + 0.05 * linkIndex
                    }}
                    viewport={{ once: true }}
                  >
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="magnetic text-white/70 hover:text-apple-blue transition-colors duration-300 text-left"
                    >
                      {link.name}
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
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-sm text-white/60">
            © {currentYear} Ahmad. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-sm text-white/60">
            <button className="magnetic hover:text-apple-blue transition-colors duration-300">
              Privacy Policy
            </button>
            <button className="magnetic hover:text-apple-blue transition-colors duration-300">
              Terms of Service
            </button>

          </div>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="magnetic fixed bottom-8 right-8 p-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white hover:text-apple-blue hover:scale-110 transition-all duration-300 z-40"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp size={24} />
        </motion.button>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-apple-blue to-apple-purple rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  )
}

export default Footer
