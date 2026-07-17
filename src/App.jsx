import { useState, useEffect, useRef } from 'react'
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
import ThemeEffects from './components/ThemeEffects.jsx'

let globalAudioCtx = null
let audioSource = null
let analyserNode = null

const initAudioAnalysis = (audioEl) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!globalAudioCtx) {
      globalAudioCtx = new AudioContext()
    }
    if (globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume()
    }
    if (!audioSource && audioEl) {
      audioSource = globalAudioCtx.createMediaElementSource(audioEl)
      analyserNode = globalAudioCtx.createAnalyser()
      analyserNode.fftSize = 64
      audioSource.connect(analyserNode)
      analyserNode.connect(globalAudioCtx.destination)
    }
  } catch (e) {
    console.warn("Failed to initialize Web Audio Analyser:", e)
  }
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [devMode, setDevMode] = useDevMode()
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'void')
  const [soundOn, setSoundOn] = useState(() => localStorage.getItem('ui-sound') === 'true')
  const audioRef = useRef(null)

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

        initAudioAnalysis(audioRef.current)
      }
    } catch (e) {}
  }

  // Handle Play/Pause when soundOn toggles
  useEffect(() => {
    if (!audioRef.current) return
    if (soundOn) {
      initAudioAnalysis(audioRef.current)
      audioRef.current.play().catch(err => {
        console.warn("Audio autoplay blocked by browser, resetting sound state to off.", err)
        setSoundOn(false)
        localStorage.setItem('ui-sound', 'false')
      })
    } else {
      audioRef.current.pause()
    }
  }, [soundOn])

  // Connect Analyser frequency updates to window.audioIntensity and window.audioFreqData for visual sync
  useEffect(() => {
    let rafId
    let dataArray = null
    
    const updateIntensity = () => {
      if (soundOn && analyserNode) {
        if (!dataArray) {
          dataArray = new Uint8Array(analyserNode.frequencyBinCount)
        }
        analyserNode.getByteFrequencyData(dataArray)
        window.audioFreqData = dataArray
        
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }
        const avg = sum / dataArray.length
        
        // Boost/normalize average volume for snappier responses (generally stays below 150/255)
        window.audioIntensity = Math.min(1.0, avg / 135)
      } else {
        window.audioIntensity = 0
        window.audioFreqData = null
      }
      rafId = requestAnimationFrame(updateIntensity)
    }
    
    updateIntensity()
    
    return () => {
      cancelAnimationFrame(rafId)
      window.audioIntensity = 0
      window.audioFreqData = null
    }
  }, [soundOn])

  return (
    <>
      <ThemeEffects theme={theme} key={theme} />
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
      
      {/* Background MP3 Music File */}
      <audio ref={audioRef} src="/background-music.mp3" loop />
    </>
  )
}
