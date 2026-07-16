import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
  return (
    <section id="core" className="hero section-wrap">
      <div className="hero-content-wrapper">
        <div className="hero-image-wrapper" style={{ position: 'relative' }}>
          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src="/profile.png" alt="Praveenraja S" className="hero-image" />
          </motion.div>
          
          {/* Floating ML Emojis */}
          <motion.div className="floating-emoji e-1" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>🤖</motion.div>
          <motion.div className="floating-emoji e-2" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeInOut" }}>🧠</motion.div>
          <motion.div className="floating-emoji e-3" animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.5, ease: "easeInOut" }}>⚡</motion.div>
          <motion.div className="floating-emoji e-4" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.8, delay: 1.5, ease: "easeInOut" }}>📊</motion.div>
        </div>
        
        <div className="hero-text-content">
          <motion.div
            className="hero-greeting"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hi, I am
          </motion.div>

          <motion.div
            className="hero-name-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {"Praveenraja S".split('').map((char, index) => (
              <motion.span
                key={index}
                className="animated-char"
                initial={{ opacity: 0, y: 20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05, 
                  type: "spring", 
                  stiffness: 100 
                }}
                style={{ display: "inline-block" }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            NEURAL CORE // ACTIVE
          </motion.p>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Architecting <span>Agentic AI</span> &<br />Intelligent Systems.
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            I'm an ML Engineer & Full Stack Developer focused on building end-to-end intelligent solutions. From fine-tuning LLMs to engineering scalable backend pipelines that drive real-world business impact.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <a className="btn-primary" href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({behavior:'smooth'}) }}>
              deploy models → view projects
            </a>
            <a className="btn-ghost" href="/Praveenraja_S_Resume.pdf" download>
              download resume ↓
            </a>
            <a className="btn-ghost" href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}) }}>
              initialize contact
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Stat value="99%" label="model accuracy" />
        <Stat value="6" label="deployed systems" />
        <Stat value="1st" label="AGENTVERSE place" />
        <Stat value="8.92" label="cgpa / 10" />
        <Stat value="500M+" label="parameters tuned" />
        <Stat value="7+" label="projects built" />
        <Stat value="24/7" label="agentic uptime" />
        <Stat value="O(1)" label="problem solving" />
      </motion.div>
    </section>
  )
}

function Stat({ value, label }) {
  return (
    <div className="stat">
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  )
}
