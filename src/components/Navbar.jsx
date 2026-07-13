import { useEffect, useState } from 'react'
import './Navbar.css'

const MODULES = [
  { id: 'core', label: 'CORE' },
  { id: 'model', label: 'MODEL' },
  { id: 'dataset', label: 'DATASET' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'research', label: 'RESEARCH' },
  { id: 'contact', label: 'CONTACT' },
]

const THEMES = [
  { id: 'void', name: 'Void', dotColor: '#8b5cf6', glowColor: '#b388ff' },
  { id: 'light', name: 'Light', dotColor: '#64748b', glowColor: '#7c3aed' },
  { id: 'matrix', name: 'Matrix', dotColor: '#16a34a', glowColor: '#22c55e' },
  { id: 'retro', name: 'Retro', dotColor: '#ea580c', glowColor: '#f97316' },
]

export default function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('core')

  useEffect(() => {
    const sections = MODULES.map((m) => document.getElementById(m.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  function go(id) {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="nav-brand" onClick={() => go('core')} aria-label="Go to top">
          <span className="nav-brand-dot" />
          Praveenraja S
        </button>

        <div className="nav-right">
          <nav className="nav-modules" aria-label="Site modules">
            {MODULES.map((m) => (
              <button
                key={m.id}
                className={`nav-module ${active === m.id ? 'is-active' : ''}`}
                onClick={() => go(m.id)}
              >
                <span className="nav-module-idx">{active === m.id ? '●' : '○'}</span>
                {m.label}
              </button>
            ))}
          </nav>

          <div className="theme-selector">
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`theme-dot ${theme === t.id ? 'is-active' : ''}`}
                style={{ color: t.glowColor, backgroundColor: t.dotColor }}
                onClick={() => setTheme(t.id)}
                title={`Switch to ${t.name} theme`}
                aria-label={`Switch to ${t.name} theme`}
              />
            ))}
          </div>

          <button
            className="nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-mobile">
          {MODULES.map((m) => (
            <button key={m.id} className="nav-mobile-item" onClick={() => go(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
