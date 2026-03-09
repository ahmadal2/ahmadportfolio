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
      lerp: 0.07, // Slower, smoother feel
      wheelMultiplier: 1.0,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.2, // Less sensitive for a "premium" feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
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