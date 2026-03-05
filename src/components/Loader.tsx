import { useEffect, useState } from 'react'
import './Loader.css'

export default function Loader() {
  const [pct, setPct] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let current = 0
    const iv = setInterval(() => {
      current = Math.min(current + Math.random() * 15, 100)
      setPct(Math.floor(current))
      if (current >= 100) {
        clearInterval(iv)
        setTimeout(() => setHidden(true), 350)
      }
    }, 100)
    return () => clearInterval(iv)
  }, [])

  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <div className="ld-name">
        {'BIPIN'.split('').map((l, i) => <span key={i} style={{ animationDelay: `${i * 0.06}s` }}>{l}</span>)}
        <span className="sp">&nbsp;</span>
        {'THARU'.split('').map((l, i) => <span key={i + 6} style={{ animationDelay: `${(i + 6) * 0.06}s` }}>{l}</span>)}
      </div>
      <div className="ld-bar-w"><div className="ld-bar" /></div>
      <div className="ld-pct">{pct}%</div>
    </div>
  )
}
