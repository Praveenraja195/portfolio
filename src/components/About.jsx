import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './About.css'

const SPEC = [
  ['Model name', 'praveenraja-v2'],
  ['Architecture', 'ML + Full Stack Hybrid'],
  ['Training dataset', 'Computer Science, GCE Erode'],
  ['Fine-tuned on', 'Hackathons, Backend Systems, Cloud'],
  ['Domains', 'Research, AI/ML, Backend, DevOps'],
  ['Experience', 'Platform Testing @ TheContextLab.ai'],
  ['Optimization', 'Agentic Workflows, LLM Fine-tuning'],
  ['Loss function', 'Minimized bugs, maximized impact'],
  ['Current accuracy', '99%'],
  ['Status', 'Actively training & deploying'],
]

const TERMINAL_SCRIPT = [
  '> describe(praveenraja_v2)',
  'loading profile embeddings...',
  'Praveenraja S is a Computer Science undergraduate (CGPA 8.92)',
  'specializing in building end-to-end ML pipelines and agentic systems.',
  'Engineered a role-based AI ecosystem that secured 1st place at AGENTVERSE.',
  'Represented college at Smart India Hackathon across two national cycles.',
  'Currently validating agentic learning layers and scaling backend',
  'architectures as a Platform Testing Intern at TheContextLab.ai.',
  'Highly optimized for rapid prototyping and robust production deployment.',
  '> status: ready for deployment_',
]

export default function About() {
  const [activeTab, setActiveTab] = useState('specs')
  const [trainKey, setTrainKey] = useState(0)

  return (
    <section id="model" className="about section-wrap">
      <p className="eyebrow">MODEL // ABOUT</p>
      <h2 className="section-title">Model <span>Card</span></h2>

      <div className="about-grid">
        <motion.div
          className="spec-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="spec-card-tabs">
            <button
              className={`spec-tab-btn ${activeTab === 'specs' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              hyperparameters.json
            </button>
            <button
              className={`spec-tab-btn ${activeTab === 'curves' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('curves')}
            >
              training_loss.log
            </button>
          </div>
          <div className="spec-card-body">
            {activeTab === 'specs' ? (
              <dl>
                {SPEC.map(([k, v]) => (
                  <div className="spec-row" key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <TrainingVisualizer
                trainKey={trainKey}
                onRetrain={() => {
                  setTrainKey(prev => prev + 1)
                  try {
                    if (localStorage.getItem('ui-sound') === 'true') {
                      const ctx = new (window.AudioContext || window.webkitAudioContext)()
                      const osc = ctx.createOscillator()
                      const gain = ctx.createGain()
                      osc.type = 'sine'
                      osc.frequency.setValueAtTime(1200, ctx.currentTime)
                      gain.gain.setValueAtTime(0.015, ctx.currentTime)
                      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)
                      osc.connect(gain)
                      gain.connect(ctx.destination)
                      osc.start()
                      osc.stop(ctx.currentTime + 0.08)
                    }
                  } catch (e) {}
                }}
              />
            )}
          </div>
        </motion.div>

        <Terminal />
      </div>
    </section>
  )
}

const OPTIMIZERS = {
  Adam: {
    loss: 'M 10 12 Q 25 28 45 36 T 90 41',
    acc: 'M 10 38 Q 25 24 45 18 T 90 11',
    finalLoss: '0.042',
    finalAcc: '99.2%',
  },
  SGD: {
    loss: 'M 10 12 Q 15 22 25 15 T 40 28 T 55 24 T 70 32 T 90 29',
    acc: 'M 10 38 Q 25 35 45 32 T 70 31 T 90 28',
    finalLoss: '0.290',
    finalAcc: '82.5%',
  },
  RMSprop: {
    loss: 'M 10 12 Q 20 30 35 32 T 60 38 T 90 39',
    acc: 'M 10 38 Q 20 28 40 22 T 70 16 T 90 15',
    finalLoss: '0.086',
    finalAcc: '94.6%',
  }
}

function TrainingVisualizer({ trainKey, onRetrain }) {
  const [optimizer, setOptimizer] = useState('Adam')
  const config = OPTIMIZERS[optimizer]

  const playClick = () => {
    try {
      if (localStorage.getItem('ui-sound') === 'true') {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(900, ctx.currentTime)
        gain.gain.setValueAtTime(0.01, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.05)
      }
    } catch (e) {}
  }

  const handleOptimizerSelect = (name) => {
    setOptimizer(name)
    playClick()
    onRetrain()
  }

  return (
    <div className="training-visualizer">
      <div className="optimizer-selector">
        <span className="selector-title">OPTIMIZER:</span>
        {['Adam', 'SGD', 'RMSprop'].map((opt) => (
          <button
            key={opt}
            className={`optimizer-btn ${optimizer === opt ? 'is-active' : ''}`}
            onClick={() => handleOptimizerSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="metrics-header">
        <div className="metric">
          <span className="metric-dot loss" />
          <span className="metric-label">Loss:</span>
          <span className="metric-value font-mono">{config.finalLoss}</span>
        </div>
        <div className="metric">
          <span className="metric-dot acc" />
          <span className="metric-label">Accuracy:</span>
          <span className="metric-value font-mono">{config.finalAcc}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Epoch:</span>
          <span className="metric-value font-mono">100/100</span>
        </div>
      </div>
      
      <div className="chart-container">
        <svg viewBox="0 0 100 50" className="chart-svg">
          {/* Grid lines */}
          <line x1="10" y1="10" x2="90" y2="10" stroke="var(--line)" strokeWidth="0.15" strokeDasharray="1 1" />
          <line x1="10" y1="20" x2="90" y2="20" stroke="var(--line)" strokeWidth="0.15" strokeDasharray="1 1" />
          <line x1="10" y1="30" x2="90" y2="30" stroke="var(--line)" strokeWidth="0.15" strokeDasharray="1 1" />
          <line x1="10" y1="40" x2="90" y2="40" stroke="var(--line)" strokeWidth="0.15" strokeDasharray="1 1" />
          
          <line x1="30" y1="10" x2="30" y2="42" stroke="var(--line)" strokeWidth="0.15" strokeDasharray="1 1" />
          <line x1="50" y1="10" x2="50" y2="42" stroke="var(--line)" strokeWidth="0.15" strokeDasharray="1 1" />
          <line x1="70" y1="10" x2="70" y2="42" stroke="var(--line)" strokeWidth="0.15" strokeDasharray="1 1" />

          {/* Axes */}
          <line x1="10" y1="10" x2="10" y2="42" stroke="var(--line)" strokeWidth="0.3" />
          <line x1="10" y1="42" x2="90" y2="42" stroke="var(--line)" strokeWidth="0.3" />

          {/* Y-Axis Label ticks */}
          <text x="6" y="12" className="chart-text" fontSize="2" textAnchor="end">1.0</text>
          <text x="6" y="26" className="chart-text" fontSize="2" textAnchor="end">0.5</text>
          <text x="6" y="40" className="chart-text" fontSize="2" textAnchor="end">0.0</text>
          
          {/* X-Axis Label ticks */}
          <text x="10" y="46" className="chart-text" fontSize="2" textAnchor="middle">0</text>
          <text x="50" y="46" className="chart-text" fontSize="2" textAnchor="middle">50</text>
          <text x="90" y="46" className="chart-text" fontSize="2" textAnchor="middle">100</text>
          <text x="50" y="49" className="chart-text font-mono" fontSize="2" textAnchor="middle" letterSpacing="0.05em">EPOCHS</text>

          {/* Training Loss Curve (Cyan) */}
          <motion.path
            key={`loss-${optimizer}-${trainKey}`}
            d={config.loss}
            fill="none"
            stroke="var(--signal)"
            strokeWidth="0.65"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* Validation Accuracy Curve (Purple) */}
          <motion.path
            key={`acc-${optimizer}-${trainKey}`}
            d={config.acc}
            fill="none"
            stroke="var(--purple-bright)"
            strokeWidth="0.65"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="retrain-footer">
        <button className="retrain-btn" onClick={onRetrain}>
          ↻ RUN OPTIMIZATION (TRAIN)
        </button>
      </div>
    </div>
  )
}

function Terminal() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [lines, setLines] = useState([])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setLines(TERMINAL_SCRIPT.slice(0, i))
      if (i >= TERMINAL_SCRIPT.length) clearInterval(id)
    }, 380)
    return () => clearInterval(id)
  }, [inView])

  return (
    <motion.div
      ref={ref}
      className="terminal"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      <div className="terminal-bar">
        <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
        <span className="terminal-title">describe.sh</span>
      </div>
      <div className="terminal-body">
        {lines.map((l, idx) => (
          <p key={idx} className={l.startsWith('>') ? 'term-cmd' : 'term-out'}>{l}</p>
        ))}
        {lines.length > 0 && lines.length < TERMINAL_SCRIPT.length && <span className="term-cursor">▍</span>}
      </div>
    </motion.div>
  )
}
