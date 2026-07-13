import { useState, useEffect } from 'react'
import BootSequence from './components/BootSequence.jsx'
import NeuralBackground from './components/NeuralBackground.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import SkillsNetwork from './components/SkillsNetwork.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import DevMode from './components/DevMode.jsx'
import useDevMode from './hooks/useDevMode.js'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [devMode, setDevMode] = useDevMode()
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'void')

  useEffect(() => {
    // Sync class theme on body
    document.body.className = `theme-${theme}`
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <NeuralBackground />
      {booted && (
        <>
          <Navbar theme={theme} setTheme={setTheme} />
          <main>
            <Hero />
            <About />
            <SkillsNetwork />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </>
      )}
      <DevMode active={devMode} onClose={() => setDevMode(false)} />
    </>
  )
}
