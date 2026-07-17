import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TiltCard from './TiltCard.jsx'
import './Projects.css'


const PROJECTS = [
  {
    id: 'genesis',
    name: 'Genesis',
    subtitle: 'AI Department Academic Intelligence System',
    checkpoint: 'genesis-core.ckpt',
    description:
      'A role-based college ecosystem with multi-portal data routing and a real-time SQL-backed messaging matrix. Segments student cohorts with K-Means clustering and visualizes performance through Chart.js radar graphs. A drag-and-drop analytics engine parses bulk datasets via Groq/Gemini APIs and raises JSON alerts through n8n.',
    achievement: '🏆 1st Place — AGENTVERSE Departmental Hackathon',
    metrics: [
      { label: 'Portals routed', value: 'Multi-role' },
      { label: 'Clustering', value: 'K-Means' },
      { label: 'Alerting', value: 'n8n → JSON' },
    ],
    tech: ['Flask', 'Groq API', 'Gemini API', 'n8n', 'PostgreSQL', 'Chart.js'],
    github: 'https://github.com/Praveenraja195/expo',
    images: [
      '/projects/genesis/Screenshot 2026-04-11 114426.png',
      '/projects/genesis/Screenshot 2026-04-11 114604.png',
      '/projects/genesis/Screenshot 2026-04-11 114919.png',
      '/projects/genesis/Screenshot 2026-04-11 114959.png',
      '/projects/genesis/Screenshot 2026-04-11 115341.png',
      '/projects/genesis/Screenshot 2026-04-11 115548.png',
      '/projects/genesis/Screenshot 2026-04-11 115641.png',
      '/projects/genesis/Screenshot 2026-04-11 115710.png',
      '/projects/genesis/Screenshot 2026-04-11 115733.png',
      '/projects/genesis/Screenshot 2026-04-11 115826.png',
      '/projects/genesis/Screenshot 2026-04-11 115848.png',
      '/projects/genesis/Screenshot 2026-04-11 115907.png',
      '/projects/genesis/Screenshot 2026-04-11 115940.png',
      '/projects/genesis/Screenshot 2026-04-11 115949.png',
      '/projects/genesis/Screenshot 2026-04-11 120045.png',
      '/projects/genesis/Screenshot 2026-04-11 120056.png',
      '/projects/genesis/Screenshot 2026-04-11 120109.png',
      '/projects/genesis/Screenshot 2026-04-11 120117.png',
      '/projects/genesis/Screenshot 2026-04-11 120137.png',
      '/projects/genesis/Screenshot 2026-04-11 120147.png',
    ],
    demo: 'https://expo-vno4.onrender.com/',
  },
  {
    id: 'repair-agent',
    name: 'Autonomous AI Repair Agent',
    subtitle: 'SWE-bench self-healing debugger',
    checkpoint: 'repair-agent.ckpt',
    description:
      'A self-healing AI repair agent built on Claude 3.5 Haiku that automates refactoring of OpenLibrary\'s data import logic, removing the need for manual intervention. An internal SQL query layer (find_staged_or_pending) cuts redundant external API calls, and a GitHub Actions workflow verifies system state changes automatically.',
    achievement: '⚙️ 100% test pass rate (3/3), 0.8s autonomous execution',
    metrics: [
      { label: 'API calls reduced', value: '40%' },
      { label: 'Test pass rate', value: '100%' },
      { label: 'Exec. speed', value: '0.8s' },
    ],
    tech: ['Python', 'Claude API', 'GitHub Actions', 'SQL'],
    github: 'https://github.com/Praveenraja195/swe-bench-claude',
    images: [
      '/projects/repair-agent/Screenshot 2026-07-09 151826.png',
      '/projects/repair-agent/Screenshot 2026-07-09 151916.png',
      '/projects/repair-agent/Screenshot 2026-07-09 152108.png',
      '/projects/repair-agent/Screenshot 2026-07-09 152132.png',
      '/projects/repair-agent/Screenshot 2026-07-09 152147.png',
      '/projects/repair-agent/Screenshot 2026-07-09 152202.png',
    ],
  },
  {
    id: 'pii-detector',
    name: 'PII Detector',
    subtitle: 'Smart India Hackathon — identity document redaction',
    checkpoint: 'pii-detector.ckpt',
    description:
      'A Flask web application integrated with a custom object detection model trained on 1,000+ image samples to isolate and mask sensitive identity parameters on Aadhaar and PAN cards. Real-time OpenCV pipeline renders precise pixel-level bounding boxes over document data for secure, private downloads.',
    achievement: '🥈 Selected — Smart India Hackathon (2 national cycles)',
    metrics: [
      { label: 'Training images', value: '1,000+' },
      { label: 'Detection', value: 'Roboflow API' },
      { label: 'Processing', value: 'Real-time' },
    ],
    tech: ['Python', 'Flask', 'Roboflow API', 'OpenCV'],
    github: 'https://github.com/Praveenraja195/pii_detector',
    images: [
      '/projects/pii-detector/Screenshot 2026-07-09 145249 - Copy.png',
      '/projects/pii-detector/Screenshot 2026-07-09 145432.png',
    ],
    demo: 'https://pii-detector-lilac.vercel.app/',
  },
  {
    id: 'movie-recommender',
    name: 'AI Movie Recommender',
    subtitle: 'RandomForest Prediction & OMDb API Matrix',
    checkpoint: 'movie-recommender.ckpt',
    description:
      'A full-stack movie recommendation web app using a RandomForestRegressor to predict movie relevance based on genre and IMDb ratings, with real-time poster and metadata retrieval integrated via the OMDb API.',
    achievement: '🎬 Smart IMDb predictions + real-time movie card rendering',
    metrics: [
      { label: 'Regression Model', value: 'RandomForest' },
      { label: 'Data Retrieval', value: 'OMDb API' },
      { label: 'Stack Architecture', value: 'Flask / HTML5' },
    ],
    tech: ['Python', 'Flask', 'pandas', 'scikit-learn', 'requests'],
    github: 'https://github.com/NM-Final-Project-GCEE/Batch-07',
    images: [
      '/projects/movie-recommender/screenshot1.png',
      '/projects/movie-recommender/screenshot2.png',
    ],
  },
  {
    id: 'meet-automation',
    name: 'Google Meet Automation',
    subtitle: 'Autonomous Session & Privacy Controller',
    checkpoint: 'meet-automation.ckpt',
    description:
      'A userscript that automates joining Google Meet sessions while securing microphone and camera settings beforehand. Leverages MutationObservers to monitor real-time DOM states, trigger actions, and reset automation on leave events.',
    achievement: '🔒 Zero-click privacy & state-based meeting automation',
    metrics: [
      { label: 'Platform support', value: 'Google Meet' },
      { label: 'DOM tracking', value: 'MutationObserver' },
      { label: 'Integration', value: 'Tampermonkey' },
    ],
    tech: ['JavaScript', 'Tampermonkey', 'DOM MutationObserver'],
    github: 'https://github.com/Praveenraja195/meet-automation',
    images: [
      '/projects/meet-automation/screenshot1.png',
      '/projects/meet-automation/screenshot2.png',
    ],
  },
  {
    id: 'face-attendance',
    name: 'Face Recognition Attendance',
    subtitle: 'Biometric Registration & Live Logging',
    checkpoint: 'face-attendance.ckpt',
    description:
      'A web interface combining Python, Flask, OpenCV, and the face_recognition library to stream frames, identify human subjects against a pre-registered image catalog, and log timestamps automatically to a CSV index.',
    achievement: '👤 Live face-matching pipeline + CSV attendance automation',
    metrics: [
      { label: 'Capture & Vision', value: 'OpenCV' },
      { label: 'Face Matching', value: 'face_recognition' },
      { label: 'Storage format', value: 'CSV Matrix' },
    ],
    tech: ['Python', 'Flask', 'OpenCV', 'face_recognition', 'CSV'],
    github: 'https://github.com/Praveenraja195/Face-Recognition-Attendance',
    images: [
      '/projects/face-attendance/screenshot1.png',
      '/projects/face-attendance/screenshot2.png',
    ],
  },
]

export default function Projects() {
  const [openId, setOpenId] = useState(PROJECTS[0].id)

  return (
    <section id="projects" className="projects section-wrap">
      <p className="eyebrow">PROJECTS // CHECKPOINTS</p>
      <h2 className="section-title">Trained <span>Checkpoints</span></h2>
      <p className="skills-hint">Load a checkpoint to inspect its architecture, metrics and weights.</p>

      <div className="checkpoint-list">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} open={openId === p.id} onToggle={() => setOpenId(openId === p.id ? null : p.id)} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, open, onToggle }) {
  return (
    <TiltCard className={`checkpoint ${open ? 'is-open' : ''}`} layout>
      <button className="checkpoint-head" onClick={onToggle}>
        <div>
          <p className="checkpoint-file">{project.checkpoint}</p>
          <h3 className="checkpoint-name">{project.name}</h3>
          <p className="checkpoint-sub">{project.subtitle}</p>
        </div>
        <span className="checkpoint-toggle">{open ? 'loaded ▾' : 'load ▸'}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="checkpoint-body-wrap"
          >
            <div className="checkpoint-body">
              <div className="checkpoint-visuals">
                <ImageCarousel images={project.images} name={project.name} />
                <div className="arch-panel">
                  <ArchDiagram tech={project.tech} />
                </div>
              </div>

              <p className="checkpoint-desc">{project.description}</p>
              <p className="checkpoint-achievement">{project.achievement}</p>

              <div className="checkpoint-metrics">
                {project.metrics.map((m) => (
                  <div key={m.label} className="metric-chip">
                    <span className="metric-value">{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="checkpoint-tech">
                {project.tech.map((t) => (
                  <span key={t} className="mono-tag">{t}</span>
                ))}
              </div>

              <div className="checkpoint-actions">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary sm">
                  view on GitHub ↗
                </a>
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-ghost sm">
                    live demo ↗
                  </a>
                ) : (
                  <span className="btn-ghost sm disabled">live demo // offline</span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TiltCard>
  )
}

function ImageCarousel({ images, name }) {
  const [idx, setIdx] = useState(0)
  if (!images || images.length === 0) return null

  const prev = () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="carousel">
      <div className="carousel-viewport">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[idx]}
            src={images[idx]}
            alt={`${name} screenshot ${idx + 1}`}
            className="carousel-img"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <>
          <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous image">‹</button>
          <button className="carousel-btn carousel-next" onClick={next} aria-label="Next image">›</button>
          <div className="carousel-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`carousel-dot ${i === idx ? 'active' : ''}`}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
          <span className="carousel-counter">{idx + 1} / {images.length}</span>
        </>
      )}
    </div>
  )
}

function ArchDiagram({ tech }) {
  const TECH_ICONS = {
    'Flask': '⚗️', 'Groq API': '🔮', 'Gemini API': '✦', 'n8n': '🔄',
    'PostgreSQL': '🐘', 'Chart.js': '📊', 'Python': '🐍', 'Claude API': '🧠',
    'GitHub Actions': '⚙️', 'SQL': '💾', 'Roboflow API': '📷', 'OpenCV': '👁️',
    'pandas': '🐼', 'scikit-learn': '🤖', 'requests': '🌐',
    'JavaScript': 'JS', 'Tampermonkey': '🐒', 'DOM MutationObserver': '👁️',
    'face_recognition': '👤', 'CSV': '📄',
  }

  return (
    <div className="arch-pipeline">
      <div className="arch-header">
        <span className="arch-header-dot" />
        <span>data pipeline</span>
      </div>
      <div className="arch-nodes">
        {tech.map((t, i) => (
          <div className="arch-node-row" key={t}>
            <div className="arch-node">
              <span className="arch-node-icon">{TECH_ICONS[t] || t.charAt(0)}</span>
              <span className="arch-node-name">{t}</span>
            </div>
            {i < tech.length - 1 && (
              <div className="arch-connector">
                <span className="arch-connector-line" />
                <span className="arch-connector-pulse" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
