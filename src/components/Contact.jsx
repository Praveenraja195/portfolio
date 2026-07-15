import { useEffect, useRef, useState } from 'react'
import './Contact.css'

const CONTACT_INFO = [
  { key: 'email', label: 'Email', value: 'praveenraja195@gmail.com', href: 'mailto:praveenraja195@gmail.com' },
  { key: 'phone', label: 'Phone', value: '+91 63822 79383', href: 'tel:+916382279383' },
  { key: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/praveenraja-s-5a9697357', href: 'https://linkedin.com/in/praveenraja-s-5a9697357' },
  { key: 'github', label: 'GitHub', value: 'github.com/Praveenraja195', href: 'https://github.com/Praveenraja195' },
]

const HELP_TEXT = 'available commands: contact · skills · projects · about · timeline · certs · intern · message · clear'

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
  '• [movie-recommender.ckpt] - AI Movie Recommender',
  '  ↳ RandomForest predictions + real-time OMDb API posters',
  '• [meet-automation.ckpt] - Google Meet Automation',
  '  ↳ Auto-join privacy script + DOM MutationObserver state tracking',
  '• [face-attendance.ckpt] - Face Recognition Attendance',
  '  ↳ Webcam face recognition + Flask & OpenCV real-time CSV logging',
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

const FORMSPREE_FORM_ID = 'mpqvwazv' // Paste your Formspree Form ID here

export default function Contact() {
  const [history, setHistory] = useState([
    { type: 'out', text: 'AI terminal ready. Type "contact" to retrieve reach-out details, or use "help" for a full checklist.' },
  ])
  const [input, setInput] = useState('')
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formStatus, setFormStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
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
    } else if (cmd === 'message' || cmd === 'msg' || cmd === 'mail' || cmd === 'send') {
      next.push({ type: 'out', text: 'Initiating messaging prompt...' })
      next.push({ type: 'out', text: '>>> Please use the DIRECT MESSAGE UPLINK panel next to this terminal to send an instant message directly to my inbox.' })
    } else if (cmd === '') {
      // no-op
    } else {
      next.push({ type: 'out', text: `command not recognized: "${raw}" — try "help"` })
    }
    setHistory(next)
    setInput('')
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) return

    setFormStatus('sending')
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          message: formMessage
        })
      })

      if (response.ok) {
        setFormStatus('success')
        setFormName('')
        setFormEmail('')
        setFormMessage('')
      } else {
        setFormStatus('error')
      }
    } catch (error) {
      console.error('Error transmitting message:', error)
      setFormStatus('error')
    }
  }

  return (
    <section id="contact" className="contact section-wrap">
      <p className="eyebrow">CONTACT // DIRECT TRANSMISSION</p>
      <h2 className="section-title">Open a <span>Connection</span></h2>
      <p className="skills-hint">Type terminal commands or fill out the direct uplink form to contact me directly.</p>

      <div className="contact-grid">
        <div className="contact-terminal-wrap">
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
        </div>

        {/* Direct Email Form Panel */}
        <div className="contact-form-panel">
          <div className="terminal-bar">
            <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
            <span className="terminal-title">transmit_message.sh</span>
          </div>
          <div className="contact-form-body">
            <p className="form-eyebrow">DIRECT MESSAGE UPLINK</p>
            {formStatus === 'success' ? (
              <div className="form-success-state">
                <span className="success-icon">✓</span>
                <p className="success-title">TRANSMISSION SECURED</p>
                <p className="success-desc">Your message has been successfully routed to my inbox. I'll get back to you shortly.</p>
                <button className="form-reset-btn" onClick={() => setFormStatus('idle')}>
                  SEND NEW SIGNAL
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-visual-form">
                <div className="form-group">
                  <label htmlFor="form-name">SENDER_NAME &gt;</label>
                  <input
                    type="text"
                    id="form-name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter name"
                    required
                    disabled={formStatus === 'sending'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-email">SENDER_EMAIL &gt;</label>
                  <input
                    type="email"
                    id="form-email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                    disabled={formStatus === 'sending'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-message">TRANSMISSION_DATA &gt;</label>
                  <textarea
                    id="form-message"
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Type message here..."
                    required
                    rows={4}
                    disabled={formStatus === 'sending'}
                  />
                </div>
                {formStatus === 'error' && (
                  <p className="form-error-msg">⚠ TRANSMISSION FAILED. Please retry.</p>
                )}
                <button
                  type="submit"
                  className={`form-submit-btn ${formStatus === 'sending' ? 'sending' : ''}`}
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? 'TRANSMITTING...' : 'TRANSMIT SIGNAL'}
                </button>
              </form>
            )}
          </div>
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
