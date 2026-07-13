import { useEffect, useRef } from 'react'
import './NeuralBackground.css'

// Renders an ambient, continuously-animated neural network: nodes, synapse
// lines, drifting data packets, and a faint field of tensor glyphs. Reacts
// to pointer position by attracting nearby nodes slightly (a "gradient pull").
export default function NeuralBackground() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let width, height
    let nodes = []
    let packets = []
    const GLYPHS = ['∇θ', 'Σ', 'ReLU', 'σ(x)', '∂L', 'Wx+b', 'softmax', 'Q·Kᵀ', '⊕', 'λ']

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      const density = width < 640 ? 22000 : 14000
      const count = Math.min(90, Math.floor((width * height) / density))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
        pulse: Math.random() * Math.PI * 2,
        glyph: Math.random() < 0.06 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null,
      }))
      packets = Array.from({ length: width < 640 ? 5 : 10 }, spawnPacket)
    }

    function getCanvasColors() {
      const isLight = document.body.classList.contains('theme-light')
      const isMatrix = document.body.classList.contains('theme-matrix')
      const isRetro = document.body.classList.contains('theme-retro')
      
      if (isLight) {
        return {
          line: '124,58,237',
          node: 'rgba(124, 58, 237, 0.45)',
          glyph: 'rgba(8, 145, 178, 0.35)',
          packet: ['124,58,237', '8,145,178']
        }
      } else if (isMatrix) {
        return {
          line: '34,197,94',
          node: 'rgba(34, 197, 94, 0.45)',
          glyph: 'rgba(34, 197, 94, 0.35)',
          packet: ['34,197,94', '74,222,128']
        }
      } else if (isRetro) {
        return {
          line: '234,88,12',
          node: 'rgba(234, 88, 12, 0.45)',
          glyph: 'rgba(234, 88, 12, 0.35)',
          packet: ['234,88,12', '249,115,22']
        }
      } else {
        return {
          line: '139,92,246',
          node: 'rgba(179,136,255,0.55)',
          glyph: 'rgba(34,211,238,0.28)',
          packet: ['139,92,246', '34,211,238']
        }
      }
    }

    function spawnPacket() {
      const fromLeft = Math.random() < 0.5
      const colors = getCanvasColors()
      const chosenColor = Math.random() < 0.5 ? colors.packet[0] : colors.packet[1]
      return {
        x: fromLeft ? -20 : width + 20,
        y: Math.random() * height,
        vx: (fromLeft ? 1 : -1) * (0.4 + Math.random() * 0.6),
        color: chosenColor,
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height)
      const colors = getCanvasColors()

      // synapse lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            const op = (1 - dist / 130) * 0.16
            ctx.strokeStyle = `rgba(${colors.line},${op})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // nodes
      nodes.forEach((n) => {
        if (!prefersReduced) {
          n.x += n.vx
          n.y += n.vy
          n.pulse += 0.02

          const dx = n.x - mouse.current.x
          const dy = n.y - mouse.current.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 140) {
            n.x += dx / d * 0.4
            n.y += dy / d * 0.4
          }

          if (n.x < -20) n.x = width + 20
          if (n.x > width + 20) n.x = -20
          if (n.y < -20) n.y = height + 20
          if (n.y > height + 20) n.y = -20
        }

        const glow = 1.4 + Math.sin(n.pulse) * 0.6
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * glow, 0, Math.PI * 2)
        ctx.fillStyle = colors.node
        ctx.fill()

        if (n.glyph) {
          ctx.font = '9px IBM Plex Mono, monospace'
          ctx.fillStyle = colors.glyph
          ctx.fillText(n.glyph, n.x + 6, n.y - 6)
        }
      })

      // data packets
      if (!prefersReduced) {
        packets.forEach((p) => {
          p.x += p.vx
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.color},0.9)`
          ctx.shadowColor = `rgba(${p.color},0.9)`
          ctx.shadowBlur = 6
          ctx.fill()
          ctx.shadowBlur = 0
        })
        packets = packets.filter((p) => p.x > -30 && p.x < width + 30)
        while (packets.length < (width < 640 ? 5 : 10)) packets.push(spawnPacket())
      }

      raf = requestAnimationFrame(step)
    }

    function onMove(e) {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    function onLeave() {
      mouse.current.x = -9999
      mouse.current.y = -9999
    }

    resize()
    step()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="neural-bg" aria-hidden="true" />
}
