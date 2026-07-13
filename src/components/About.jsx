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
          <div className="spec-card-head">
            <span className="spec-dot" /> praveenraja-v2.ckpt
          </div>
          <dl>
            {SPEC.map(([k, v]) => (
              <div className="spec-row" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <Terminal />
      </div>
    </section>
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
