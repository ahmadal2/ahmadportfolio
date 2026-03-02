import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ProfileCard from './ProfileCard'
import './ProfileCard.css'

const About: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-16 md:py-32 section-padding px-4">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-section font-bold text-white drop-shadow-2xl mb-4 md:mb-6">About Me</h2>
          <p className="text-base md:text-xl text-white max-w-3xl mx-auto leading-relaxed px-4">
            Passionate about creating digital experiences that inspire and delight.
            With over 1 year of experience, I bridge the gap between design and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-20">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProfileCard
              name="Ahmad"
              title="Full Stack Developer & Designer"
              handle="ahmaddev"
              status="Available"
              contactText="Get in Touch"
              avatarUrl="/images/logo/ahmad1.png"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => {
                const contactSection = document.querySelector('#contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            />
          </motion.div>

          {/* Bio Content with 3D Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-obsidian p-8 md:p-12 rounded-[40px] border border-white/10 shadow-2xl"
          >
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">Digital Architect</h3>
            <p className="text-white/60 text-lg leading-relaxed font-light mb-8">
              Based in the intersection of design and engineering, I create high-performance web applications that don't just work—they inspire. My approach combines technical rigor with a deep understanding of user psychology to deliver seamless digital experiences.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Experience", value: "1+ Year" },
                { label: "Projects", value: "10+" },
                { label: "Tech", value: "Full Stack" },
                { label: "Design", value: "Premium" }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-white/30 text-xs uppercase tracking-widest">{stat.label}</div>
                  <div className="text-white text-xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About