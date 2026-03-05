import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  children: React.ReactNode
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis for smooth scrolling with optimized settings
    const lenis = new Lenis({
      lerp: 0.1, // Faster responsiveness
      wheelMultiplier: 1.0, // Natural scroll speed
      smoothWheel: true,
      syncTouch: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 2, // Better mobile responsiveness
    })

    lenisRef.current = lenis

    // Optimize scroll event handling with requestAnimationFrame
    let rafId: number

    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Cleanup
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className="relative">
      {children}
    </div>
  )
}

export default SmoothScroll