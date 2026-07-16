import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import EventGallery from './EventGallery.jsx'
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
]

const BADGES = [
  { icon: '🏆', title: 'AGENTVERSE Winner', desc: '1st place — Department Hackathon, GCE Erode' },
  { icon: '🎓', title: 'Academic Honors', desc: 'Maintained CGPA of 8.92 with clean academic standing' },
  { icon: '🥉', title: 'Code Quest — 3rd Place', desc: 'National level, Nandha Engineering College' },
  { icon: '🛡️', title: 'EXPLOIT-X CTF', desc: '8-hour CTF at KPR Institute, Coimbatore' },
  { icon: '🏅', title: 'Smart India Hackathon ×2', desc: 'College-level selection across two national cycles' },
  { icon: '🖥️', title: '24hr Hackathon', desc: 'Linux antivirus app at KPR, Coimbatore' },
  { icon: '📋', title: 'Smart Campus Coordinator', desc: 'Event coordinator for 8-hr hackathon, GCE Erode' },
  { icon: '🧪', title: 'Beta Platform Tester', desc: 'Validated scenarios & CLI setup for Sapiency AI' },
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
  { platform: 'ServiceNow', name: 'Welcome to ServiceNow', date: '2025', id: 'SN-001', image: '/certificates/welcome-to-servicenow.png' },
  { platform: 'ServiceNow', name: 'Flow Designer (Flows)', date: '2025', id: 'SN-002', image: '/certificates/flow-designer.png' },
  { platform: 'NPTEL', name: 'Introduction to Machine Learning', date: '2024', id: 'NP-301', image: '/certificates/machine-learning.png' },
  { platform: 'Google', name: 'Cybersecurity (via Ingage)', date: '2024', id: 'G-102', image: '/certificates/cybersecurity.png' },
  { platform: 'Coursera', name: 'Crash Course on Python', date: '2023', id: 'CO-941', image: '/certificates/crash-course-python.png' },
  { platform: 'Anthropic', name: 'Claude 101', date: '2024', id: 'AN-101', image: '/certificates/claude-101.png' },
  { platform: 'Anthropic', name: 'ClaudeCode 101', date: '2025', id: 'AN-202', image: '/certificates/claudecode-101.png' },
]

function CertCard({ cert, index, onClick }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className="cert-card"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <div className="cert-card-header">
        <span className="cert-platform">{cert.platform}</span>
        <span className="cert-status-dot" />
      </div>

      <div className="cert-card-preview-wrap">
        {!imgError ? (
          <img
            src={cert.image}
            alt={cert.name}
            className="cert-card-image"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="cert-card-fallback-mini">
            <div className="mini-cert-frame">
              <span className="mini-cert-platform">{cert.platform}</span>
              <span className="mini-cert-title">{cert.name}</span>
              <span className="mini-cert-seal">✓</span>
            </div>
          </div>
        )}
        <div className="cert-card-hover-overlay">
          <span className="overlay-decrypt-text">DECRYPT // VIEW LOG</span>
        </div>
      </div>

      <h4 className="cert-name">{cert.name}</h4>

      <div className="cert-card-footer">
        <span className="cert-id">{cert.id}</span>
        <span className="cert-status-text">verified ✓</span>
      </div>
    </motion.div>
  )
}

function Certifications() {
  const [activeCert, setActiveCert] = useState(null)

  return (
    <div className="certs">
      <p className="eyebrow">SAVED LOGS // CERTIFICATIONS</p>
      <div className="cert-grid">
        {CERTS.map((c, i) => (
          <CertCard
            key={c.id}
            cert={c}
            index={i}
            onClick={() => setActiveCert(c)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeCert && (
          <motion.div
            className="cert-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              className="cert-lightbox-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cert-lightbox-close"
                onClick={() => setActiveCert(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
              <div className="cert-lightbox-header">
                <span className="cert-lightbox-platform">{activeCert.platform}</span>
                <span className="cert-lightbox-id">{activeCert.id}</span>
              </div>
              <h3 className="cert-lightbox-title">{activeCert.name}</h3>
              <div className="cert-lightbox-image-wrap">
                <img
                  src={activeCert.image}
                  alt={`${activeCert.name} Certificate`}
                  className="cert-lightbox-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `
                      <div class="cert-placeholder-fallback">
                        <div class="fallback-icon">📄</div>
                        <p class="fallback-text">Certificate image file not found.</p>
                        <code class="fallback-path">${activeCert.image}</code>
                        <p class="fallback-hint">Please place your certificate image at this path to display it here.</p>
                      </div>
                    `;
                  }}
                />
              </div>
              <div className="cert-lightbox-footer">
                <span>Issue Date: {activeCert.date}</span>
                <span className="cert-lightbox-status">Status: Verified ✓</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Experience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 85%"]
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="research" className="experience section-wrap">
      <p className="eyebrow">RESEARCH // FINE-TUNING LOG</p>
      <h2 className="section-title">Training <span>Timeline</span></h2>

      <div ref={containerRef} className="timeline">
        <motion.div 
          className="timeline-track" 
          style={{ scaleY, transformOrigin: 'top' }}
        />
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

      <EventGallery />

      <Achievements />
      <Certifications />
    </section>
  )
}
