import { useEffect, useRef } from 'react'
import './Passions.css'

const passions = [
  { num:'01', ico:'🤖', name:'Artificial Intelligence', desc:"I don't just use AI — I want to understand every layer of it. From neural architectures to emergent behaviours, I'm deep in the rabbit hole.", chip:'→ Deep Learning' },
  { num:'02', ico:'✨', name:'Vibe Coding',             desc:"There's a flow state in late-night coding where time disappears. I chase that feeling — building things that feel alive and have character.", chip:'→ Creative Dev' },
  { num:'03', ico:'🌍', name:'Exploring the World',    desc:'Adventure is both physical and intellectual. New places, new ideas, new cultures — every trip reshapes how I see everything.', chip:'→ Adventure' },
  { num:'04', ico:'🕸️', name:'Networking',             desc:'Your network is your most powerful tool. I actively seek meaningful connections — people who think differently and help me grow.', chip:'→ Community' },
  { num:'05', ico:'🪞', name:'Self-Mastery',           desc:"I study myself like a system. Finding bugs in my thinking, patching weak habits. The hardest and most rewarding project I'll work on.", chip:'→ Growth' },
  { num:'06', ico:'🎬', name:'Content Creation',       desc:'Ideas deserve to be shared. I document my journey — the wins, the failures, the discoveries. Creating is how I process what I learn.', chip:'→ Digital Media' },
]

export default function Passions() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.r').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="passions" ref={ref}>
      <div className="container">
        <div className="pass-head">
          <div className="r">
            <p className="sec-label">What Drives Me</p>
            <h2 className="sec-title">Passions &amp;<br /><em>Obsessions</em></h2>
          </div>
          <p className="pass-intro r d2">These aren't just interests — they're the lenses through which I see every problem, every opportunity, every conversation.</p>
        </div>
        <div className="pass-grid">
          {passions.map((p, i) => (
            <div className={`pass-card r d${(i % 3) + 1}`} key={p.num}>
              <span className="pass-num">{p.num}</span>
              <span className="pass-ico">{p.ico}</span>
              <h3 className="pass-name">{p.name}</h3>
              <p className="pass-desc">{p.desc}</p>
              <span className="pass-chip">{p.chip}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
