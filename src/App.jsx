import { useState, useEffect } from 'react'
import BootSequence from './components/BootSequence.jsx'
import NeuralBackground from './components/NeuralBackground.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import SkillsNetwork from './components/SkillsNetwork.jsx'
import Projects from './components/Projects.jsx'
import WorkExperience from './components/WorkExperience.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import DevMode from './components/DevMode.jsx'
import useDevMode from './hooks/useDevMode.js'
import ScrollToTop from './components/ScrollToTop.jsx'

let globalAudioCtx = null
let ambientNodes = null

const startAmbientDrone = (ctx) => {
  if (ambientNodes) return
  try {
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const osc3 = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    const mainGain = ctx.createGain()

    osc1.type = 'sawtooth'
    osc1.frequency.setValueAtTime(65.41, ctx.currentTime) // C2
    
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(98.00, ctx.currentTime) // G2
    
    osc3.type = 'sawtooth'
    osc3.frequency.setValueAtTime(130.81, ctx.currentTime) // C3

    osc1.detune.setValueAtTime(-6, ctx.currentTime)
    osc2.detune.setValueAtTime(0, ctx.currentTime)
    osc3.detune.setValueAtTime(6, ctx.currentTime)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(140, ctx.currentTime)
    filter.Q.setValueAtTime(3, ctx.currentTime)

    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.setValueAtTime(0.08, ctx.currentTime)
    lfoGain.gain.setValueAtTime(50, ctx.currentTime)

    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)

    mainGain.gain.setValueAtTime(0, ctx.currentTime)
    mainGain.gain.linearRampToValueAtTime(0.016, ctx.currentTime + 3.0)

    osc1.connect(filter)
    osc2.connect(filter)
    osc3.connect(filter)
    filter.connect(mainGain)
    mainGain.connect(ctx.destination)

    osc1.start()
    osc2.start()
    osc3.start()
    lfo.start()

    ambientNodes = { osc1, osc2, osc3, lfo, filter, mainGain, ctx }
  } catch (e) {}
}

const stopAmbientDrone = () => {
  if (!ambientNodes) return
  const { osc1, osc2, osc3, lfo, mainGain, ctx } = ambientNodes
  try {
    mainGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2)
    setTimeout(() => {
      osc1.stop()
      osc2.stop()
      osc3.stop()
      lfo.stop()
    }, 1300)
  } catch (e) {}
  ambientNodes = null
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [devMode, setDevMode] = useDevMode()
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'void')
  const [soundOn, setSoundOn] = useState(() => localStorage.getItem('ui-sound') === 'true')

  useEffect(() => {
    // Sync class theme on body
    document.body.className = `theme-${theme}`
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    localStorage.setItem('ui-sound', String(next))
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!globalAudioCtx) {
        globalAudioCtx = new AudioContext()
      }
      
      const ctx = globalAudioCtx
      if (ctx.state === 'suspended') {
        ctx.resume()
      }
      
      if (next) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(1000, ctx.currentTime)
        gain.gain.setValueAtTime(0.015, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.06)

        startAmbientDrone(ctx)
      } else {
        stopAmbientDrone()
      }
    } catch (e) {}
  }

  useEffect(() => {
    function initAmbient() {
      if (localStorage.getItem('ui-sound') === 'true') {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext
          if (!globalAudioCtx) {
            globalAudioCtx = new AudioContext()
          }
          if (globalAudioCtx.state === 'suspended') {
            globalAudioCtx.resume()
          }
          startAmbientDrone(globalAudioCtx)
        } catch (e) {}
      }
      window.removeEventListener('click', initAmbient)
    }

    if (soundOn) {
      window.addEventListener('click', initAmbient)
    }
    return () => window.removeEventListener('click', initAmbient)
  }, [soundOn])

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <NeuralBackground />
      {booted && (
        <>
          <Navbar theme={theme} setTheme={setTheme} soundOn={soundOn} toggleSound={toggleSound} />
          <main>
            <Hero />
            <About />
            <SkillsNetwork />
            <Projects />
            <WorkExperience />
            <Experience />
            <Contact soundOn={soundOn} toggleSound={toggleSound} />
          </main>
          <Footer />
          <ScrollToTop />
        </>
      )}
      <DevMode active={devMode} onClose={() => setDevMode(false)} />
    </>
  )
}
