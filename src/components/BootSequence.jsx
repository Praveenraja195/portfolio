import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './BootSequence.css'

const LOG_LINES = [
  { text: 'initializing neural core...', ms: 380 },
  { text: 'mounting vector database [knowledge.idx]', ms: 420 },
  { text: 'embedding 4 years of coursework + 3 shipped systems', ms: 520 },
  { text: 'loading weights: praveenraja-v2.ckpt (2.3B params)', ms: 460 },
  { text: 'connecting agents: reva, ada, genesis-core', ms: 380 },
  { text: 'running inference on candidate profile...', ms: 500 },
]

// Node layout that spells "AI" abstractly first, then the reveal swaps to
// the name typography — kept intentionally sparse so it reads as a graph,
// not clipart.
const NODE_COUNT = 46

function makeNodes() {
  return Array.from({ length: NODE_COUNT }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    delay: Math.random() * 0.6,
  }))
}

export default function BootSequence({ onDone }) {
  const [phase, setPhase] = useState('logs') // logs -> confidence -> reveal -> done
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const nodes = useRef(makeNodes())

  useEffect(() => {
    if (skipped) return
    if (lineIndex >= LOG_LINES.length) {
      setPhase('confidence')
      return
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), LOG_LINES[lineIndex].ms)
    return () => clearTimeout(t)
  }, [lineIndex, skipped])

  useEffect(() => {
    if (phase !== 'confidence' || skipped) return
    let raf
    const start = performance.now()
    const duration = 900
    function tick(now) {
      const p = Math.min(1, (now - start) / duration)
      setProgress(Math.floor(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setPhase('reveal'), 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase, skipped])

  useEffect(() => {
    if (phase !== 'reveal' || skipped) return
    const t = setTimeout(() => setPhase('done'), 1900)
    return () => clearTimeout(t)
  }, [phase, skipped])

  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(onDone, 550)
      return () => clearTimeout(t)
    }
  }, [phase, onDone])

  function skip() {
    setSkipped(true)
    setPhase('done')
  }

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="boot"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button className="boot-skip" onClick={skip}>skip ⏵</button>

          {phase === 'logs' && (
            <div className="boot-logs">
              <p className="boot-kicker">SYSTEM BOOT — PRAVEENRAJA_V2</p>
              {LOG_LINES.slice(0, lineIndex).map((l, i) => (
                <p key={i} className="boot-line">
                  <span className="boot-caret">▸</span> {l.text} <span className="boot-ok">[ok]</span>
                </p>
              ))}
              {lineIndex < LOG_LINES.length && (
                <p className="boot-line boot-line-active">
                  <span className="boot-caret">▸</span> {LOG_LINES[lineIndex].text}
                  <span className="boot-cursor">_</span>
                </p>
              )}
            </div>
          )}

          {phase === 'confidence' && (
            <div className="boot-confidence">
              <p className="boot-kicker">PREDICTION CONFIDENCE</p>
              <div className="boot-bar-track">
                <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="boot-pct">{progress}%</p>
            </div>
          )}

          {phase === 'reveal' && (
            <div className="boot-reveal">
              <svg viewBox="0 0 100 100" className="boot-graph" preserveAspectRatio="none">
                {nodes.current.map((n, i) => {
                  const partner = nodes.current[(i + 7) % nodes.current.length]
                  return (
                    <motion.line
                      key={`l-${n.id}`}
                      x1={n.x} y1={n.y} x2={partner.x} y2={partner.y}
                      stroke="url(#gradLine)"
                      strokeWidth="0.15"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 1.4, delay: n.delay, repeat: Infinity, repeatDelay: 1.2 }}
                    />
                  )
                })}
                <defs>
                  <linearGradient id="gradLine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                {nodes.current.map((n) => (
                  <motion.circle
                    key={n.id}
                    cx={n.x} cy={n.y} r={0.6}
                    fill="#c4b5fd"
                    initial={{ opacity: 0, r: 0 }}
                    animate={{ opacity: 1, r: 0.7 }}
                    transition={{ duration: 0.4, delay: n.delay }}
                  />
                ))}
              </svg>
              <motion.div
                className="boot-name"
                initial={{ opacity: 0, filter: 'blur(14px)', letterSpacing: '0.5em' }}
                animate={{ opacity: 1, filter: 'blur(0px)', letterSpacing: '0.02em' }}
                transition={{ duration: 1.1, delay: 0.4, ease: 'easeOut' }}
              >
                <h1>PRAVEENRAJA S</h1>
                <p>machine learning engineer // full stack developer</p>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
