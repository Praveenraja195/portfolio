import { motion } from 'framer-motion'
import './Experience.css'

const STEPS = [
  {
    year: '2023',
    label: 'Base model initialized',
    title: 'B.E. Computer Science — GCE Erode',
    meta: '2023 — Present · CGPA 8.92',
    detail: 'Pre-trained on core computer science fundamentals, data structures, algorithms, and systems coursework. No history of arrears.',
  },
  {
    year: '2024',
    label: 'First benchmark test',
    title: 'Multi-Event Coding Challenge — PSG iTech, Coimbatore',
    meta: 'March 2024 · Coimbatore',
    detail: 'Participated in multiple coding events at PSG Institute of Technology, Coimbatore to benchmark skills against competitive programmers across institutions.',
  },
  {
    year: '2024',
    label: 'Checkpoint saved',
    title: 'Smart India Hackathon — PII Detector',
    meta: 'September 2024 · National Level',
    detail: 'Built a PII detection and redaction system for identity documents (Aadhaar/PAN). Selected at college level for the national Smart India Hackathon.',
  },
  {
    year: '2024',
    label: 'Reward signal',
    title: 'ZINNIA — Department Symposium',
    meta: '2024 · GCE Erode',
    detail: 'Participated in ZINNIA, the departmental technical symposium, and won multiple prizes across different events.',
  },
  {
    year: '2025',
    label: 'Validation reward',
    title: '3rd Place — Code Quest, Nandha Engineering College',
    meta: 'February 2025 · Erode',
    detail: 'Won third place with a cash prize at Code Quest, a national-level technical competition held at Nandha College of Engineering, Erode.',
  },
  {
    year: '2025',
    label: 'Adversarial training',
    title: 'EXPLOIT-X CTF — KPR Institute of Technology',
    meta: 'April 2025 · Coimbatore · 8 hrs',
    detail: 'Competed in EXPLOIT-X, an intense 8-hour Capture The Flag cybersecurity event at KPR Institute of Technology, Coimbatore. Tested skills in reverse engineering, web exploitation, and cryptography.',
  },
  {
    year: '2025',
    label: 'Intensive fine-tuning',
    title: '24-Hour Hackathon — Linux Antivirus App',
    meta: 'September 2025 · KPR, Coimbatore',
    detail: 'Built a Linux antivirus application during a 24-hour non-stop hackathon at KPR Institute, Coimbatore. Gained hands-on experience in system-level security and real-time threat detection.',
  },
  {
    year: '2025',
    label: 'Checkpoint saved',
    title: 'Smart India Hackathon — Secure Data Wiping',
    meta: 'October 2025 · College Level Selection',
    detail: 'Selected at college level for Smart India Hackathon on the topic of secure data wiping — building tools for irreversible, standards-compliant data destruction.',
  },
  {
    year: '2026',
    label: 'Leadership epoch',
    title: 'Coordinator — Smart Campus Hackathon',
    meta: '2026 · GCE Erode · 8 hrs',
    detail: 'Served as one of the coordinators for the Smart Campus Hackathon, an 8-hour college-level event. Managed event logistics, problem statement design, and judging workflow.',
  },
  {
    year: '2026',
    label: 'Peak reward signal 🏆',
    title: '1st Place — AGENTVERSE Hackathon',
    meta: 'March 2026 · GCE Erode',
    detail: 'Won first place at AGENTVERSE, the departmental hackathon, for Genesis — a role-based AI ecosystem with multi-portal routing, K-Means clustering, and real-time messaging.',
  },
  {
    year: '2026',
    label: 'Fine-tune epoch',
    title: 'Platform Testing Intern — TheContextLab.ai',
    meta: 'Apr 2026 — May 2026 · Remote',
    detail: 'Installed and configured the Sapiency AI CLI, running end-to-end UX tests in an Agile workflow. Validated core scenario paths for the REVA and ADA agentic learning modules.',
  },
]

const BADGES = [
  { icon: '🏆', title: 'AGENTVERSE Winner', desc: '1st place — Department Hackathon, GCE Erode' },
  { icon: '🥉', title: 'Code Quest — 3rd Place', desc: 'National level, Nandha Engineering College' },
  { icon: '🛡️', title: 'EXPLOIT-X CTF', desc: '8-hour CTF at KPR Institute, Coimbatore' },
  { icon: '🏅', title: 'Smart India Hackathon ×2', desc: 'College-level selection across two national cycles' },
  { icon: '🖥️', title: '24hr Hackathon', desc: 'Linux antivirus app at KPR, Coimbatore' },
  { icon: '📋', title: 'Smart Campus Coordinator', desc: 'Event coordinator for 8-hr hackathon, GCE Erode' },
]

function Achievements() {
  return (
    <div className="achievements">
      <p className="eyebrow">UNLOCKED // ACHIEVEMENTS</p>
      <div className="badge-grid">
        {BADGES.map((b, i) => (
          <motion.div
            key={b.title}
            className="badge"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 14 }}
            whileHover={{ y: -4 }}
          >
            <span className="badge-icon">{b.icon}</span>
            <p className="badge-title">{b.title}</p>
            <p className="badge-desc">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const CERTS = [
  { platform: 'ServiceNow', name: 'Welcome to ServiceNow', date: '2025', id: 'SN-001' },
  { platform: 'ServiceNow', name: 'Flow Designer (Flows)', date: '2025', id: 'SN-002' },
  { platform: 'NPTEL', name: 'Introduction to Machine Learning', date: '2024', id: 'NP-301' },
  { platform: 'Google', name: 'Cybersecurity (via Ingage)', date: '2024', id: 'G-102' },
  { platform: 'Coursera', name: 'Crash Course on Python', date: '2023', id: 'CO-941' },
  { platform: 'Anthropic', name: 'Claude 101', date: '2024', id: 'AN-101' },
  { platform: 'Anthropic', name: 'ClaudeCode 101', date: '2025', id: 'AN-202' },
]

function Certifications() {
  return (
    <div className="certs">
      <p className="eyebrow">SAVED LOGS // CERTIFICATIONS</p>
      <div className="cert-grid">
        {CERTS.map((c, i) => (
          <motion.div
            key={c.id}
            className="cert-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, borderColor: 'var(--signal)' }}
          >
            <div className="cert-card-header">
              <span className="cert-platform">{c.platform}</span>
              <span className="cert-status-dot" />
            </div>
            <h4 className="cert-name">{c.name}</h4>
            <div className="cert-card-footer">
              <span className="cert-id">{c.id}</span>
              <span className="cert-status-text">verified ✓</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="research" className="experience section-wrap">
      <p className="eyebrow">RESEARCH // FINE-TUNING LOG</p>
      <h2 className="section-title">Training <span>Timeline</span></h2>

      <div className="timeline">
        <div className="timeline-track" />
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="timeline-node" />
            <div className="timeline-card">
              <span className="timeline-tag">{s.label}</span>
              <h3>{s.title}</h3>
              <p className="timeline-meta">{s.meta}</p>
              <p className="timeline-detail">{s.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Achievements />
      <Certifications />
    </section>
  )
}
