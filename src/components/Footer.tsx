import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const [time, setTime] = useState('--:--:--')
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const tick = () => {
      const ktm = new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Kathmandu'}))
      const p = (v: number) => String(v).padStart(2,'0')
      setTime(`${p(ktm.getHours())}:${p(ktm.getMinutes())}:${p(ktm.getSeconds())}`)
    }
    tick(); const iv = setInterval(tick, 1000); return () => clearInterval(iv)
  }, [])

  return (
    <footer>
      <p className="fc">© 2025 <span>Bipin Tharu</span> — Crafted in Kathmandu 🇳🇵</p>
      <div className="fr">
        <p className="ft2">📍 Kathmandu, Nepal</p>
        <p className="ft2">Local Time: <span>{time}</span> NPT</p>
        <button
          className="btt"
          onClick={() => location.pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/')}
        >
          ↑ Top
        </button>
      </div>
    </footer>
  )
}
