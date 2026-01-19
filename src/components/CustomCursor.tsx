import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const CustomCursor: React.FC = () => {
  const mousePosition = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  // High-fidelity spring for the core
  const coreSpringConfig = { damping: 20, stiffness: 400 }
  const coreX = useSpring(mousePosition.x, coreSpringConfig)
  const coreY = useSpring(mousePosition.y, coreSpringConfig)

  // Fluid spring for the outer ring
  const ringSpringConfig = { damping: 30, stiffness: 150 }
  const ringX = useSpring(mousePosition.x, ringSpringConfig)
  const ringY = useSpring(mousePosition.y, ringSpringConfig)

  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Particle springs must be at top level
  const particleX = useSpring(mousePosition.x, { damping: 40, stiffness: 100 })
  const particleY = useSpring(mousePosition.y, { damping: 40, stiffness: 100 })

  const previousTimeRef = useRef<number>()
  const throttleDelay = 10 // Higher precision for 2026 feel

  const updateMousePosition = useCallback((e: MouseEvent) => {
    mousePosition.x.set(e.clientX)
    mousePosition.y.set(e.clientY)
  }, [mousePosition.x, mousePosition.y])

  useEffect(() => {
    const throttledMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (!previousTimeRef.current || now - previousTimeRef.current > throttleDelay) {
        updateMousePosition(e)
        previousTimeRef.current = now
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Advanced hover detection for interactive elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(!!isInteractive);
    }

    window.addEventListener('mousemove', throttledMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleOver)

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [updateMousePosition])

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 2026 Neural Core */}
      <motion.div
        className="fixed top-0 left-0 h-4 w-4 -ml-2 -mt-2 rounded-full z-50 mix-blend-screen"
        style={{
          x: coreX,
          y: coreY,
          scale: isClicking ? 0.6 : isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "#4ade80" : "#89CFF0",
          boxShadow: isHovering
            ? "0 0 20px rgba(74, 222, 128, 0.8), 0 0 40px rgba(74, 222, 128, 0.4)"
            : "0 0 15px rgba(137, 207, 240, 0.6)",
        }}
      />

      {/* Reactive Refraction Ring */}
      <motion.div
        className="fixed top-0 left-0 h-12 w-12 -ml-6 -mt-6 rounded-full border border-white/20 z-40"
        style={{
          x: ringX,
          y: ringY,
          scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
          borderColor: isHovering ? "rgba(74, 222, 128, 0.4)" : "rgba(137, 207, 240, 0.2)",
          backdropFilter: isHovering ? "blur(4px)" : "none",
        }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 rounded-full border-t border-white/40 animate-spin-slow"
              style={{ borderTopColor: "#4ade80" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trailing Particle Effect (Subtle) */}
      {!isHovering && (
        <motion.div
          className="fixed top-0 left-0 h-1 w-1 rounded-full bg-white/20"
          style={{
            x: particleX,
            y: particleY,
          }}
        />
      )}
    </div>
  )
}

export default CustomCursor
