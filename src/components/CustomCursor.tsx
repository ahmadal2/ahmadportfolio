import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // High-fidelity spring for the smooth movement
  const springConfig = { damping: 20, stiffness: 400 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const previousTimeRef = useRef<number>()
  const throttleDelay = 10

  const updateMousePosition = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }, [mouseX, mouseY])

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

    // Hover detection
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
      {/* Minimal Point Cursor */}
      <motion.div
        className="fixed top-0 left-0 h-3 w-3 -ml-1.5 -mt-1.5 rounded-full z-[99999] pointer-events-none mix-blend-difference bg-white"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: { duration: 0.2 }
        }}
      />
    </div>
  )
}

export default CustomCursor
