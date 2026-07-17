import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TiltCard from './TiltCard.jsx'
import './WorkExperience.css'

export default function WorkExperience() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [cardImageError, setCardImageError] = useState(false)

  useEffect(() => {
    if (lightboxOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => document.body.classList.remove('modal-open')
  }, [lightboxOpen])

  const tasks = [
    'Installed, configured, and tested the Sapiency CLI end to end.',
    'Tested the learning agents — Reva (basic computer-science concepts validation) and ADA (advanced computer-science topics knowledge validation).',
    'Tested the Sapiency AI Advisor role and its in-session guidance.'
  ]

  return (
    <section id="experience" className="work-experience section-wrap">
      <p className="eyebrow">DEPLOYMENT // PROFESSIONAL EXPERIENCE</p>
      <h2 className="section-title">Runtime <span>Experience</span></h2>

      <div className="work-grid">
        {/* Experience Details Card */}
        <TiltCard
          className="work-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="work-card-header">
            <div className="work-meta">
              <span className="work-tag">ACTIVE RUNTIME</span>
              <h3 className="work-role">Platform Testing Intern</h3>
              <p className="work-company">TheContextLab.ai · Remote</p>
              <p className="work-duration">Apr 2026 — May 2026</p>
            </div>
            <div className="work-status-badge">
              <span className="pulse-dot"></span>
              <span>TESTING COMPLETED</span>
            </div>
          </div>

          <div className="work-divider" />

          <div className="work-body">
            <h4 className="work-subtitle">Sapiency AI Platform-Testing Project</h4>
            <p className="work-intro">
              Sapiency AI is an advanced learning and assessment platform that trains professionals to think effectively with AI by measuring their ability to defend AI-generated outputs through turn-based CLI scenarios.
            </p>
            <ul className="work-tasks">
              {tasks.map((task, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.2 }}
                >
                  <span className="task-bullet">&gt;</span>
                  <span className="task-text">{task}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </TiltCard>

        {/* Certificate Card */}
        <TiltCard
          className="work-cert-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onClick={() => setLightboxOpen(true)}
        >
          <div className="cert-card-pattern" />
          <div className="cert-card-inner">
            <div className="work-cert-card-preview-wrap">
              {!cardImageError ? (
                <img
                  src="/certificates/thecontextlab.png"
                  alt="Sapiency AI Certificate Preview"
                  className="work-cert-mini-image"
                  onError={() => setCardImageError(true)}
                />
              ) : (
                <div className="work-cert-mini-fallback-layout">
                  <div className="mini-cert-logo">THECONTEXTLAB.AI</div>
                  <div className="mini-cert-heading">CERTIFICATE OF COMPLETION</div>
                  <div className="mini-cert-name">Praveenraja S</div>
                  <div className="mini-cert-seal">✓</div>
                </div>
              )}
              <div className="work-cert-hover-overlay">
                <span className="overlay-decrypt-text">DECRYPT // VIEW LOG</span>
              </div>
            </div>

            <div className="cert-info">
              <p className="cert-eyebrow">VERIFIED LOG</p>
              <h3 className="cert-title">Certificate of Completion</h3>
              <p className="cert-subtitle">Sapiency AI Internship</p>
            </div>
            <div className="cert-status-row">
              <span className="cert-hash">ID: TCL-INT-2026</span>
              <span className="cert-status-tag">SECURE LOG ✓</span>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="work-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              className="work-lightbox-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="work-lightbox-close"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="work-lightbox-header">
                <span className="work-lightbox-tag">THECONTEXTLAB.AI // SYSTEM DEPLOYMENT</span>
                <span className="work-lightbox-id">TCL-INT-2026</span>
              </div>

              <div className="work-lightbox-body">
                {!imageError ? (
                  <img
                    src="/certificates/thecontextlab.png"
                    alt="Sapiency AI Internship Completion Certificate"
                    className="work-lightbox-image"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  /* Digital Certificate Fallback (HTML representation) */
                  <div className="digital-cert">
                    <div className="digital-cert-border">
                      <div className="digital-cert-header">
                        <span className="logo-text">THECONTEXTLAB.AI</span>
                        <h1 className="cert-main-title">C E R T I F I C A T E &nbsp; O F &nbsp; C O M P L E T I O N</h1>
                        <p className="cert-subject">SAPIENCY AI INTERNSHIP COMPLETION</p>
                      </div>

                      <div className="digital-cert-recipient">
                        <p className="cert-text-small">This is to certify that</p>
                        <h2 className="cert-name-highlight">Praveenraja S</h2>
                        <p className="cert-text-inst">studying at <strong>Government College of Engineering, Erode</strong></p>
                      </div>

                      <div className="digital-cert-desc">
                        <p>
                          has successfully completed an internship on the <strong>Sapiency AI platform-testing project</strong>, during which the participant completed testing of all scenarios across the <strong>ADA</strong> and <strong>REVA</strong> modules and validated the platform setup and the CLI user experience.
                        </p>
                        <div className="platform-note">
                          <strong>Sapiency AI</strong> is a learning and assessment platform from <strong>TheContextLab.ai</strong> that trains professionals to think effectively with AI. Rather than measuring whether AI is used, the platform measures whether a learner can defend what their AI produced — through scenario-based, turn-based learning sessions delivered via a CLI-native experience.
                        </div>
                      </div>

                      <div className="digital-cert-footer">
                        <div className="cert-sig">
                          <div className="sig-line" />
                          <span>PROJECT OVERSEER</span>
                        </div>
                        <div className="cert-seal">
                          <div className="seal-circle">
                            <span className="seal-check">✓</span>
                            <span className="seal-text">VERIFIED</span>
                          </div>
                        </div>
                        <div className="cert-sig">
                          <div className="sig-line" />
                          <span>THECONTEXTLAB.AI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="work-lightbox-footer">
                <span>Issue Date: May 2026</span>
                <span className="verified-status">Verification: SECURE CRYPTO LOG ✓</span>
              </div>
              
              {imageError && (
                <div className="digital-cert-hint">
                  <p>
                    📄 <strong>Note:</strong> Showing digital fallback version. To display a custom image, place your certificate image file at <code>/certificates/thecontextlab.png</code>.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
