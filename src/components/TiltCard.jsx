import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

export default function TiltCard({ children, className = '', maxTilt = 8, ...props }) {
  const ref = useRef(null)
  
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  // Smooth springs to animate the rotation transition
  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), { damping: 25, stiffness: 180 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), { damping: 25, stiffness: 180 })

  function handleMouseMove(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width)
    y.set(mouseY / height)
  }

  function handleMouseLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        ...props.style
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
