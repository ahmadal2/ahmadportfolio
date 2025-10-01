import React, { useEffect, useRef } from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  // Simply return children without any JavaScript-based smooth scrolling
  // Rely on CSS scroll-behavior: smooth instead
  return <>{children}</>
}

export default SmoothScroll
