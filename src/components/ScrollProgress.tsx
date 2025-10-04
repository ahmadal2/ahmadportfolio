
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()
  
  // Optimize spring configuration for better performance
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,   // Reduced stiffness for smoother animation
    damping: 20,     // Reduced damping
    restDelta: 0.01  // Increased rest delta for faster completion
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-apple-blue via-apple-purple to-apple-pink z-50 origin-left"
      style={{ scaleX }}
    />
  )
}

export default ScrollProgress