import { useEffect, useState } from 'react'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export default function useDevMode() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    let buffer = []
    function onKey(e) {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault()
        setActive((v) => !v)
        return
      }
      buffer = [...buffer, e.key].slice(-KONAMI.length)
      if (buffer.join(',') === KONAMI.join(',')) {
        setActive(true)
        buffer = []
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return [active, setActive]
}
