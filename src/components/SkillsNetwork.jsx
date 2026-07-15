import { useState } from 'react'
import { motion } from 'framer-motion'
import './SkillsNetwork.css'

// Each skill is a node positioned within a 0-100 viewBox, clustered loosely
// by domain so the graph reads as three lobes: ML/AI, Web/Backend, Infra.
const SKILLS = [
  { id: 'python', name: 'Python', x: 32, y: 42, r: 5.5, cluster: 'core', years: '3+ yrs', confidence: 97, projects: 'Genesis, Repair Agent, PII Detector, Movie Recommender, Face Recognition Attendance', status: 'production' },
  { id: 'ml', name: 'Machine Learning', x: 22, y: 22, r: 5.5, cluster: 'ml', years: '2 yrs', confidence: 92, projects: 'Genesis clustering, PII detection, Movie relevance prediction', status: 'production' },
  { id: 'llm', name: 'LLMs', x: 10, y: 42, r: 5, cluster: 'ml', years: '1.5 yrs', confidence: 90, projects: 'Sapiency AI, Repair Agent', status: 'production' },
  { id: 'rag', name: 'RAG', x: 10, y: 64, r: 5, cluster: 'ml', years: '1 yr', confidence: 82, projects: 'Knowledge retrieval experiments', status: 'training' },
  { id: 'opencv', name: 'OpenCV', x: 22, y: 80, r: 5, cluster: 'ml', years: '1 yr', confidence: 85, projects: 'PII Detector redaction engine, Face Recognition Attendance', status: 'production' },
  { id: 'groq', name: 'Groq API', x: 36, y: 10, r: 4.5, cluster: 'ml', years: '1 yr', confidence: 88, projects: 'Genesis analytics engine', status: 'production' },
  { id: 'gemini', name: 'Gemini API', x: 62, y: 10, r: 4.5, cluster: 'ml', years: '1 yr', confidence: 86, projects: 'Genesis analytics engine', status: 'production' },
  { id: 'claude-api', name: 'Claude API', x: 78, y: 20, r: 5, cluster: 'ml', years: '0.5 yr', confidence: 84, projects: 'Autonomous Repair Agent', status: 'production' },
  { id: 'flask', name: 'Flask', x: 72, y: 40, r: 5, cluster: 'web', years: '2 yrs', confidence: 93, projects: 'Genesis, PII Detector, Movie Recommender, Face Recognition Attendance', status: 'production' },
  { id: 'fastapi', name: 'FastAPI', x: 88, y: 32, r: 4.5, cluster: 'web', years: '0.5 yr', confidence: 74, projects: 'Internal API prototypes', status: 'training' },
  { id: 'js', name: 'JavaScript', x: 86, y: 56, r: 5, cluster: 'web', years: '2 yrs', confidence: 88, projects: 'Genesis frontend, dashboards, Meet Automation', status: 'production' },
  { id: 'postgres', name: 'PostgreSQL', x: 68, y: 64, r: 5, cluster: 'web', years: '1.5 yrs', confidence: 87, projects: 'Genesis messaging matrix', status: 'production' },
  { id: 'mongo', name: 'MongoDB', x: 82, y: 74, r: 4.5, cluster: 'web', years: '1 yr', confidence: 80, projects: 'Genesis Atlas storage', status: 'production' },
  { id: 'sqlalchemy', name: 'SQLAlchemy', x: 60, y: 82, r: 4.5, cluster: 'web', years: '1 yr', confidence: 82, projects: 'Repair Agent query layer', status: 'production' },
  { id: 'docker', name: 'Docker', x: 40, y: 90, r: 4.5, cluster: 'infra', years: '1 yr', confidence: 78, projects: 'Deployment experiments', status: 'training' },
  { id: 'actions', name: 'GitHub Actions', x: 40, y: 68, r: 4.5, cluster: 'infra', years: '1 yr', confidence: 86, projects: 'Repair Agent CI/CD pipeline', status: 'production' },
  { id: 'aws', name: 'AWS (EC2)', x: 22, y: 92, r: 4.5, cluster: 'infra', years: '0.5 yr', confidence: 72, projects: 'App hosting trials', status: 'training' },
  { id: 'hadoop', name: 'Hadoop / Hive', x: 8, y: 18, r: 4.5, cluster: 'infra', years: '0.5 yr', confidence: 70, projects: 'Coursework — Big Data', status: 'training' },
  { id: 'n8n', name: 'n8n', x: 50, y: 24, r: 4.5, cluster: 'infra', years: '1 yr', confidence: 84, projects: 'Genesis alert automation', status: 'production' },
]

const CLUSTER_COLOR = {
  core: '#c4b5fd',
  ml: '#22d3ee',
  web: '#b388ff',
  infra: '#34e2a0',
}

// Icon/emoji map for skills — fallback to first letter
const SKILL_ICONS = {
  python: '🐍',
  ml: '🤖',
  llm: '🧠',
  rag: '🔍',
  opencv: '👁',
  groq: 'G',
  gemini: '✦',
  'claude-api': 'C',
  flask: '⚗',
  fastapi: '⚡',
  js: 'JS',
  postgres: '🐘',
  mongo: '🍃',
  sqlalchemy: 'SA',
  docker: '🐳',
  actions: '⚙',
  aws: '☁',
  hadoop: 'H',
  n8n: 'n8n',
}

export default function SkillsNetwork() {
  const [active, setActive] = useState(null)
  const activeSkill = SKILLS.find((s) => s.id === active)

  return (
    <section id="dataset" className="skills section-wrap">
      <p className="eyebrow">DATASET // SKILLS</p>
      <h2 className="section-title">Trained <span>Parameters</span></h2>
      <p className="skills-hint">Hover or tap a node to inspect it.</p>

      <div className="skills-stage">
        <svg viewBox="0 0 100 100" className="skills-svg" role="img" aria-label="Skills neural network">
          {/* Edges from center hub to each skill */}
          {SKILLS.map((s) => (
            <line
              key={`edge-${s.id}`}
              x1={50} y1={50} x2={s.x} y2={s.y}
              className={`skill-edge ${active === s.id ? 'is-active' : ''}`}
            />
          ))}

          {/* Center brain hub */}
          <g transform="translate(50 50)">
            <g className="center-hub">
              <circle r={9} fill="url(#hubGrad)" opacity={0.2} />
              <circle r={9} fill="none" stroke="url(#hubStroke)" strokeWidth="0.5" opacity={0.8} />
              <circle r={7} fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.25" strokeDasharray="1.5 1" />
              <text textAnchor="middle" dominantBaseline="central" className="hub-icon" fontSize="8">
                🧠
              </text>
              <text y={13} textAnchor="middle" className="hub-label">SKILLS</text>
            </g>
          </g>

          {/* Skill nodes */}
          {SKILLS.map((s, i) => (
            <g
              key={s.id}
              transform={`translate(${s.x} ${s.y})`}
              className="skill-node-group"
              onMouseEnter={() => setActive(s.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === s.id ? null : s.id)}
              tabIndex={0}
              role="button"
              aria-label={s.name}
              onFocus={() => setActive(s.id)}
            >
              <g className={`skill-float skill-float-${i % 5}`}>
                <circle
                  r={s.r}
                  fill={CLUSTER_COLOR[s.cluster]}
                  opacity={active && active !== s.id ? 0.2 : 0.15}
                  className="skill-node"
                />
                <circle
                  r={s.r}
                  fill="none"
                  stroke={CLUSTER_COLOR[s.cluster]}
                  strokeWidth="0.35"
                  opacity={active && active !== s.id ? 0.3 : 0.7}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="skill-icon-text"
                  fontSize={s.r * 1}
                >
                  {SKILL_ICONS[s.id] || s.name.charAt(0)}
                </text>
                <text y={s.r + 4.5} textAnchor="middle" className="skill-label">{s.name}</text>
              </g>
            </g>
          ))}
          <defs>
            <radialGradient id="hubGrad">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#4c1d95" />
            </radialGradient>
            <linearGradient id="hubStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b388ff" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.div
        className="skill-inspector"
        animate={{ opacity: activeSkill ? 1 : 0.4 }}
      >
        {activeSkill ? (
          <>
            <p className="inspector-name">{activeSkill.name}</p>
            <div className="inspector-row"><span>Experience</span><span>{activeSkill.years}</span></div>
            <div className="inspector-row"><span>Projects used</span><span>{activeSkill.projects}</span></div>
            <div className="inspector-row"><span>Learning status</span><span className={`status-tag ${activeSkill.status}`}>{activeSkill.status}</span></div>
            <div className="inspector-conf">
              <span>Confidence</span>
              <div className="conf-track"><div className="conf-fill" style={{ width: `${activeSkill.confidence}%` }} /></div>
              <span>{activeSkill.confidence}%</span>
            </div>
          </>
        ) : (
          <p className="inspector-empty">// select a parameter node to inspect weights</p>
        )}
      </motion.div>
    </section>
  )
}
