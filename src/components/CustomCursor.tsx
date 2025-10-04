
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor: React.FC = () => {
  const mousePosition = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }
  
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(mousePosition.x, springConfig)
  const cursorY = useSpring(mousePosition.y, springConfig)
  
  const [isHovering, setIsHovering] = useState(false)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const throttleDelay = 16 // ~60fps throttling

  const updateMousePosition = useCallback((e: MouseEvent) => {
    mousePosition.x.set(e.clientX - 10)
    mousePosition.y.set(e.clientY - 10)
  }, [mousePosition.x, mousePosition.y])

  useEffect(() => {
    // Throttled mouse move handler
    const throttledMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (!previousTimeRef.current || now - previousTimeRef.current > throttleDelay) {
        updateMousePosition(e)
        previousTimeRef.current = now
      }
    }

    // Add event listeners for cursor tracking
    window.addEventListener('mousemove', throttledMouseMove, { passive: true })

    // Add hover effects for interactive elements with event delegation
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [updateMousePosition])

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 2 : 1,
          background: isHovering 
            ? 'rgba(255, 45, 146, 0.8)' 
            : 'rgba(0, 122, 255, 0.8)',
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      >
        <div 
          className={`w-12 h-12 rounded-full border border-white/20 ${
            isHovering ? 'scale-150' : 'scale-100'
          } transition-transform duration-300`}
        />
      </motion.div>
    </>
  )
}

export default CustomCursor