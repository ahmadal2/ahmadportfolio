import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send, CheckCircle, Loader } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          access_key: process.env.REACT_APP_WEB3FORMS_ACCESS_KEY,
          subject: `New Project Inquiry from ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email,
          to: process.env.REACT_APP_CONTACT_EMAIL
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitting(false)
        setIsSubmitted(true)
        
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: '',
            email: '',
            company: '',
            project: '',
            message: ''
          })
        }, 3000)
      } else {
        throw new Error(result.message || 'Failed to send email')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
      setError('Failed to send your message. Please try again later.')
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: process.env.REACT_APP_CONTACT_EMAIL || "ahmed.aa.ss748@gmail.com",
      href: `mailto:${process.env.REACT_APP_CONTACT_EMAIL || "ahmed.aa.ss748@gmail.com"}`
    }
  ]

  const socialLinks = [
    { icon: Mail, href: "https://linkedin.com/in/alexchen", label: "LinkedIn" },
    { icon: Mail, href: "https://twitter.com/alexchen", label: "Twitter" },
    { icon: Mail, href: "https://github.com/alexchen", label: "GitHub" }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 px-4">
          {/* Contact Form with Liquid Glass Effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="group h-auto w-full rounded-3xl bg-gradient-to-br from-gray-900/20 to-black/20 shadow-2xl transition-all duration-700 ease-out border border-white/10 backdrop-blur-2xl overflow-hidden">
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
              <div className="relative p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">
                  Start a Project
                </h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 md:py-12"
                  >
                    <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg md:text-xl font-semibold text-white mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-gray-400 text-sm md:text-base">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-center py-2 bg-red-500/10 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                    )}
                    
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 md:py-4 glass rounded-xl border-0 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all duration-300 text-white placeholder-transparent peer text-sm md:text-base"
                          placeholder="Your Name"
                        />
                        <label className="absolute left-4 top-3 md:top-4 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm md:peer-placeholder-shown:top-4 md:peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs md:peer-focus:text-sm peer-focus:text-apple-blue bg-black/50 px-2 rounded">
                          Your Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 md:py-4 glass rounded-xl border-0 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all duration-300 text-white placeholder-transparent peer text-sm md:text-base"
                          placeholder="Email Address"
                        />
                        <label className="absolute left-4 top-3 md:top-4 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm md:peer-placeholder-shown:top-4 md:peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs md:peer-focus:text-sm peer-focus:text-apple-blue bg-black/50 px-2 rounded">
                          Email Address
                        </label>
                      </div>
                    </div>

                    {/* Company & Project Type Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative">
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 md:py-4 glass rounded-xl border-0 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all duration-300 text-white placeholder-transparent peer text-sm md:text-base"
                          placeholder="Company"
                        />
                        <label className="absolute left-4 top-3 md:top-4 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm md:peer-placeholder-shown:top-4 md:peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs md:peer-focus:text-sm peer-focus:text-apple-blue bg-black/50 px-2 rounded">
                          Company
                        </label>
                      </div>
                      <div className="relative">
                        <select
                          name="project"
                          value={formData.project}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 md:py-4 glass rounded-xl border-0 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all duration-300 text-white bg-black/50 appearance-none cursor-pointer text-sm md:text-base"
                        >
                          <option value="" className="text-gray-700">Project Type</option>
                          <option value="web-design" className="text-white bg-black/80 py-2">Web Design</option>
                          <option value="mobile-app" className="text-white bg-black/80 py-2">Mobile App</option>
                          <option value="branding" className="text-white bg-black/80 py-2">Branding</option>
                          <option value="consultation" className="text-white bg-black/80 py-2">Consultation</option>
                          <option value="other" className="text-white bg-black/80 py-2">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 md:py-4 glass rounded-xl border-0 focus:glass-strong focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all duration-300 text-white placeholder-transparent peer resize-none bg-black/50 text-sm md:text-base"
                        placeholder="Tell me about your project..."
                      />
                      <label className="absolute left-4 top-3 md:top-4 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm md:peer-placeholder-shown:top-4 md:peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs md:peer-focus:text-sm peer-focus:text-apple-blue bg-black/50 px-2 rounded">
                        Tell me about your project...
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative group w-full max-w-[200px] md:max-w-xs h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border border-white/30 shadow-lg hover:shadow-cyan-500/30 transition-all duration-500 overflow-hidden"
                      >
                        {/* Liquid glass effect layers */}
                        <div className="absolute inset-0">
                          {/* Animated liquid effect */}
                          <div className="absolute inset-0 opacity-50">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse"></div>
                            <div className="absolute top-1/4 left-0 w-full h-1/3 bg-gradient-to-r from-cyan-400/30 via-transparent to-blue-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                          </div>
                          
                          {/* Highlight edges */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-40 pointer-events-none"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="relative flex items-center justify-center gap-2 z-10 text-white font-medium text-sm md:text-base">
                          {isSubmitting ? (
                            <>
                              <Loader className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : isSubmitted ? (
                            <>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                              >
                                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                              </motion.div>
                              <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                Send is successful
                              </motion.span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 md:w-5 md:h-5" />
                              <span>Send Message</span>
                            </>
                          )}
                        </div>
                        
                        {/* Liquid highlight effect */}
                        <div className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none">
                          <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                      </button>
                    </div>
                  </form>
                )}
              </div>
              
              {/* Liquid highlight effect */}
              <div className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none">
                <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info & Map with Liquid Glass Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="group h-auto w-full rounded-3xl bg-gradient-to-br from-gray-900/20 to-black/20 shadow-2xl transition-all duration-700 ease-out border border-white/10 backdrop-blur-2xl overflow-hidden">
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
              <div className="relative p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">
                  Get in Touch
                </h3>

                <div className="space-y-4 md:space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 p-4 glass rounded-2xl hover:glass-strong transition-all duration-300 group"
                    >
                      <div className="p-2 md:p-3 bg-gradient-to-r from-apple-blue to-apple-purple rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs md:text-sm text-gray-400">
                          {info.label}
                        </div>
                        <div className="font-medium text-white group-hover:text-apple-blue transition-colors duration-300 text-sm md:text-base">
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="p-2 md:p-3 glass rounded-xl hover:glass-strong transition-all duration-300 group"
                      >
                        <social.icon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-apple-blue transition-colors duration-300" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Liquid highlight effect */}
              <div className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none">
                <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
              </div>
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="group h-auto w-full rounded-3xl bg-gradient-to-br from-gray-900/20 to-black/20 shadow-2xl transition-all duration-700 ease-out border border-white/10 backdrop-blur-2xl overflow-hidden"
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
              <div className="relative p-4">
                <div className="w-full h-48 md:h-64 bg-gradient-to-br from-apple-blue/20 to-apple-purple/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center px-4">
                    <Mail className="w-8 h-8 md:w-12 md:h-12 text-apple-blue mx-auto mb-4" />
                    <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                      Get in Touch
                    </h4>
                    <p className="text-gray-400 text-xs md:text-sm">
                      I'm available for projects worldwide
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Liquid highlight effect */}
              <div className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-none">
                <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact