import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './DevMode.css'

const LOG_POOL = [
  'batch 214/500 — loss 0.0842 — lr 3e-4',
  'gradient norm clipped at 1.0',
  'checkpoint saved: praveenraja-v2-e214.ckpt',
  'attention head 7/12 — high activation on "backend"',
  'vector db query: k=5, cosine similarity 0.91',
  'agent "reva" heartbeat ok',
  'agent "ada" heartbeat ok',
  'memory retrieval: hackathons.json (12 entries)',
  'sync: github.com/Praveenraja195 — 3 repos',
  'inference latency: 0.8s (p95)',
]

export default function DevMode({ active, onClose }) {
  const [logs, setLogs] = useState([])
  const [gpu, setGpu] = useState(38)

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      setLogs((prev) => [...prev.slice(-11), LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)]])
      setGpu(30 + Math.floor(Math.random() * 60))
    }, 700)
    return () => clearInterval(id)
  }, [active])

  useEffect(() => {
    function onEsc(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="devmode"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="devmode-header">
            <p>DEVELOPER MODE — unlocked via Konami code / Ctrl+Shift+A</p>
            <button onClick={onClose}>close ✕</button>
          </div>

          <div className="devmode-grid">
            <div className="devmode-panel">
              <p className="devmode-panel-title">GPU utilization</p>
              <div className="devmode-gauge">
                <div className="devmode-gauge-fill" style={{ width: `${gpu}%` }} />
              </div>
              <p className="devmode-gauge-val">{gpu}%</p>
            </div>

            <div className="devmode-panel">
              <p className="devmode-panel-title">Memory allocation</p>
              <div className="devmode-mem">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span key={i} className={i < (gpu / 100) * 40 ? 'on' : ''} />
                ))}
              </div>
            </div>

            <div className="devmode-panel devmode-panel-wide">
              <p className="devmode-panel-title">Training logs</p>
              <div className="devmode-logs">
                {logs.map((l, i) => <p key={i}>{l}</p>)}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
