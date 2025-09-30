
import React, { useEffect, useRef } from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    if (typeof window !== 'undefined' && (window as any).Lenis) {
      lenisRef.current = new (window as any).Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      function raf(time: number) {
        lenisRef.current?.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
