import { useEffect, useRef } from 'react'
import './Hero.css'
import heroPhoto from '../assets/hero.jpg'

const phrases = [
  'Exploring AI, one model at a time.',
  'Building things that matter.',
  'Connecting people and ideas.',
  'Student. Creator. Explorer.',
  'Deep in the AI rabbit hole.',
]

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let pi = 0, ci = 0, del = false
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const cur = phrases[pi]
      if (!del) {
        if (typedRef.current) typedRef.current.textContent = cur.slice(0, ++ci)
        if (ci === cur.length) { del = true; timer = setTimeout(tick, 2000); return }
      } else {
        if (typedRef.current) typedRef.current.textContent = cur.slice(0, --ci)
        if (ci === 0) { del = false; pi = (pi + 1) % phrases.length }
      }
      timer = setTimeout(tick, del ? 36 : 68)
    }
    const start = setTimeout(tick, 2600)
    return () => { clearTimeout(start); clearTimeout(timer) }
  }, [])

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  const handleMagnet = (e: React.MouseEvent<HTMLButtonElement>) => {
    const b = e.currentTarget, r = b.getBoundingClientRect()
    b.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.1}px,${(e.clientY - (r.top + r.height / 2)) * 0.1}px)`
  }
  const resetMagnet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = ''
  }

  return (
    <section id="hero">
      <div className="hero-bg">BIPIN</div>

      {/* ── MOBILE PHOTO — visible only on small screens, sits between name and buttons ── */}
      <div className="hero-mobile-photo">
        <div className="hero-img-w">
          <img src={heroPhoto} alt="Bipin Tharu" />
        </div>
        <div className="hero-tag">
          <p>📍 Thapathali Campus</p>
          <p className="sub">Computer Engineering</p>
        </div>
      </div>

      {/* ── LEFT / MAIN CONTENT ── */}
      <div className="hero-left">
        <p className="hero-eye">
          <span className="eye-line" />
          Computer Engineer · Kathmandu
        </p>

        <h1 className="hero-h1">
          <span className="line"><span className="li">Bipin</span></span>
          <span className="line"><span className="li italic-name">Tharu.</span></span>
        </h1>

        <p className="hero-sub">
          <span ref={typedRef} />
          <span className="t-cursor">_</span>
        </p>

        <div className="hero-btns">
          <button className="btn-g" onClick={() => scrollTo('#about')}
            onMouseMove={handleMagnet} onMouseLeave={resetMagnet}>
            Discover My Story →
          </button>
          <button className="btn-t" onClick={() => scrollTo('#contact')}
            onMouseMove={handleMagnet} onMouseLeave={resetMagnet}>
            Get In Touch <span className="arr">→</span>
          </button>
        </div>

        <div className="hero-scroll">
          <div className="scroll-ln" />
          <span className="scroll-lbl">Scroll</span>
        </div>
      </div>

      {/* ── RIGHT PHOTO — visible only on desktop ── */}
      <div className="hero-right">
        <div className="hero-frame">
          <div className="frame-b" />
          <div className="hero-img-w">
            <img src={heroPhoto} alt="Bipin Tharu" />
          </div>
          <div className="hero-tag">
            <p>📍 Thapathali Campus</p>
            <p className="sub">Computer Engineering</p>
          </div>
        </div>
      </div>

    </section>
  )
}
