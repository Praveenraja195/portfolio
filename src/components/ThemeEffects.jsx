import { useEffect, useRef } from 'react'
import './ThemeEffects.css'

export default function ThemeEffects({ theme }) {
  if (theme === 'retro') {
    return (
      <>
        <div className="crt-overlay" />
        <div className="crt-vignette" />
        <div className="crt-flicker" />
      </>
    )
  }

  if (theme === 'matrix') {
    return <MatrixRain />
  }

  return null
}

function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    // Classic Matrix digital rain characters
    const CHARS = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890$#@%&'
    const fontSize = 14
    let columns = 0
    let drops = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.floor(canvas.width / fontSize)
      // Stagger drop starts with negative values so they fall independently from the top
      drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * -100))
    }

    function onMouseMove() {
      window.matrixRainLastMove = Date.now()
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onMouseMove)

    function draw() {
      // Paint translucent overlay to clear canvas with trail decay
      ctx.fillStyle = 'rgba(3, 8, 3, 0.16)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `bold ${fontSize}px IBM Plex Mono, monospace`

      // Detect if mouse is currently moving using global state for bulletproof reliability
      const lastMove = window.matrixRainLastMove || 0
      const isMoving = Date.now() - lastMove < 150
      const speed = isMoving ? 0.12 : 0.85 // Slow-mo speed when cursor moves, normal speed otherwise

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize
        const y = Math.floor(drops[i]) * fontSize

        if (y > 0) {
          // Highlight leading head of stream in white for glowing contrast
          ctx.fillStyle = '#ffffff'
          ctx.fillText(char, x, y)

          // Secondary trail elements are rendered in classic green
          ctx.fillStyle = '#22c55e'
          ctx.fillText(char, x, y - fontSize)
        }

        // Progress the drops vertically
        drops[i] += speed

        // Reset column randomly once it exits bottom boundary
        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-rain-canvas" aria-hidden="true" />
}
