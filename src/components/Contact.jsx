import { useEffect, useRef, useState } from 'react'
import './Contact.css'

const CONTACT_INFO = [
  { key: 'email', label: 'Email', value: 'praveenraja195@gmail.com', href: 'mailto:praveenraja195@gmail.com' },
  { key: 'phone', label: 'Phone', value: '+91 63822 79383', href: 'tel:+916382279383' },
  { key: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/praveenraja-s-5a9697357', href: 'https://linkedin.com/in/praveenraja-s-5a9697357' },
  { key: 'github', label: 'GitHub', value: 'github.com/Praveenraja195', href: 'https://github.com/Praveenraja195' },
]

const HELP_TEXT = 'available commands: contact · skills · projects · about · timeline · certs · intern · clear'

const SKILLS_OUTPUT = [
  'Initializing weights inspection...',
  '====================================',
  '• Python (Core)            | [██████████████████░] 97%',
  '• Flask / Backend          | [██████████████████░] 93%',
  '• Machine Learning (ML)    | [██████████████████░] 92%',
  '• LLMs & RAG Systems       | [██████████████████░] 90%',
  '• n8n / Groq / Gemini APIs | [██████████████████░] 88%',
  '• PostgreSQL (Database)    | [█████████████████░░] 87%',
  '• GitHub Actions (CI/CD)   | [██████████████████░] 86%',
  '• Docker / AWS (EC2)       | [███████████████░░░] 78%',
]

const PROJECTS_OUTPUT = [
  'Scanning trained checkpoints...',
  '====================================',
  '• [genesis.ckpt] - Genesis (AI Department System)',
  '  ↳ 1st Place - AGENTVERSE department hackathon',
  '• [repair-agent.ckpt] - Autonomous AI Repair Agent',
  '  ↳ Claude 3.5 Haiku + self-healing debugger (0.8s exec)',
  '• [pii-detector.ckpt] - PII Detector',
  '  ↳ Roboflow object detection model + OpenCV mask (SIH selected)',
]

const ABOUT_OUTPUT = [
  'Model Specs (praveenraja-v2.ckpt):',
  '====================================',
  '• Full Name: Praveenraja S',
  '• Education: B.E. Computer Science, GCE Erode (CGPA: 8.92)',
  '• Specialization: AI/ML pipelines, Agentic workflows, Full Stack',
]

const TIMELINE_OUTPUT = [
  'Chronological log trace...',
  '====================================',
  '• [2026] Platform Testing Intern (TheContextLab.ai)',
  '• [2026] Won 1st Place at AGENTVERSE (Genesis)',
  '• [2026] Coordinator for Smart Campus Hackathon',
  '• [2025] Selected for SIH (Secure Data Wiping)',
  '• [2025] 24hr Hackathon - Antivirus App (KPR)',
  '• [2025] Exploit-X CTF 8hr Event (KPR)',
  '• [2025] 3rd Place - Code Quest (Nandha College)',
  '• [2024] Selected for SIH (PII Detector)',
  '• [2024] PSG iTech Coding Challenge Competitor',
  '• [2023] System initialization (Joined GCE Erode)',
]

const CERTS_OUTPUT = [
  'Checking saved certificates...',
  '====================================',
  '• ServiceNow | Welcome to ServiceNow         [ID: SN-001]',
  '• ServiceNow | Flow Designer (Flows)         [ID: SN-002]',
  '• NPTEL      | Intro to Machine Learning     [ID: NP-301]',
  '• Google     | Cybersecurity via Ingage      [ID: G-102]',
  '• Coursera   | Crash Course on Python        [ID: CO-941]',
  '• Anthropic  | Claude 101                    [ID: AN-101]',
  '• Anthropic  | ClaudeCode 101                [ID: AN-202]',
]

const INTERN_OUTPUT = [
  'Querying internship records...',
  '====================================',
  '• Role       | Platform Testing Intern',
  '• Company    | TheContextLab.ai (Remote)',
  '• Duration   | April 2026 — May 2026',
  '• Core Tasks |',
  '  - Installed & configured Sapiency AI CLI',
  '  - Executed end-to-end UX tests in Agile workflow',
  '  - Validated core paths for REVA & ADA agent learning modules',
  '  - Assessed behavioral logic & in-session guidance',
]

export default function Contact() {
  const [history, setHistory] = useState([
    { type: 'out', text: 'AI terminal ready. Type "contact" to retrieve reach-out details, or use "help" for a full checklist.' },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [history])

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase()
    const next = [...history, { type: 'cmd', text: raw }]

    if (cmd === 'contact') {
      next.push({ type: 'contact' })
    } else if (cmd === 'help') {
      next.push({ type: 'out', text: HELP_TEXT })
    } else if (cmd === 'skills') {
      SKILLS_OUTPUT.forEach(line => next.push({ type: 'out', text: line }))
    } else if (cmd === 'projects') {
      PROJECTS_OUTPUT.forEach(line => next.push({ type: 'out', text: line }))
    } else if (cmd === 'about') {
      ABOUT_OUTPUT.forEach(line => next.push({ type: 'out', text: line }))
    } else if (cmd === 'timeline') {
      TIMELINE_OUTPUT.forEach(line => next.push({ type: 'out', text: line }))
    } else if (cmd === 'certs' || cmd === 'certificates') {
      CERTS_OUTPUT.forEach(line => next.push({ type: 'out', text: line }))
    } else if (cmd === 'intern' || cmd === 'internship') {
      INTERN_OUTPUT.forEach(line => next.push({ type: 'out', text: line }))
    } else if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    } else if (cmd === '') {
      // no-op
    } else {
      next.push({ type: 'out', text: `command not recognized: "${raw}" — try "help"` })
    }
    setHistory(next)
    setInput('')
  }

  return (
    <section id="contact" className="contact section-wrap">
      <p className="eyebrow">CONTACT // TERMINAL</p>
      <h2 className="section-title">Open a <span>Connection</span></h2>
      <p className="skills-hint">Type <code>contact</code>, <code>skills</code>, <code>certs</code>, or <code>intern</code> below, or tap a quick command.</p>

      <div className="contact-terminal" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-bar">
          <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
          <span className="terminal-title">connection.sh</span>
        </div>
        <div className="contact-body" ref={scrollRef}>
          {history.map((h, i) => (
            <ContactLine key={i} item={h} />
          ))}
          <div className="contact-inputline">
            <span className="term-cmd">&gt;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') runCommand(input) }}
              placeholder="type a command..."
              aria-label="Terminal command input"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>
        <div className="contact-quick">
          {['contact', 'skills', 'projects', 'certs', 'intern', 'about', 'timeline', 'clear'].map((c) => (
            <button key={c} onClick={() => runCommand(c)}>{c}</button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactLine({ item }) {
  if (item.type === 'cmd') return <p className="term-cmd">&gt; {item.text}</p>
  if (item.type === 'out') return <p className="term-out">{item.text}</p>
  if (item.type === 'contact') {
    return (
      <div className="contact-card">
        {CONTACT_INFO.map((c) => (
          <a key={c.key} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="contact-row">
            <span className="contact-label">{c.label}</span>
            <span className="contact-value">{c.value}</span>
          </a>
        ))}
        <a href="/Praveenraja_S_Resume.pdf" download className="contact-row contact-download">
          <span className="contact-label">Resume</span>
          <span className="contact-value">download.pdf ↓</span>
        </a>
      </div>
    )
  }
  return null
}
