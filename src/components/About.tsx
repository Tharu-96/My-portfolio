import { useEffect, useRef } from 'react'
import './About.css'
import aboutPhoto from '../assets/main.png'

const tags = ['#AI Enthusiast','#Vibe Coder','#Explorer','#Strategist','#Networker','#Creator','#Problem Solver']

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.r, .rl').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <p className="sec-label r">About Me</p>

        <div className="about-grid">

          {/* ── PHOTO — always rendered, never hidden ── */}
          <div className="about-img-col rl">
            <div className="about-img-w">
              <img src={aboutPhoto} alt="Bipin Tharu" className="about-photo" />
              <div className="corner tl" />
              <div className="corner br" />
            </div>
            <div className="about-badge">
              <p className="badge-l">Currently Studying</p>
              <p className="badge-v">B.E. Computer Engineering</p>
            </div>
          </div>

          {/* ── TEXT CONTENT ── */}
          <div className="about-text">
            <p className="sec-label r">Who I Am</p>
            <p className="about-intro r d1">
              A curious mind building at the edge of <em>technology</em> and <em>human connection.</em>
            </p>
            <p className="about-p r d2">
              I'm Bipin Tharu — a Computer Engineering student at Thapathali Campus,
              Kathmandu. I don't just study technology; I obsess over it. From deep AI
              research to late-night vibe coding sessions, I thrive where curiosity meets craft.
            </p>
            <p className="about-p r d3">
              What drives me is growth. I treat my own weaknesses like bugs to fix — find them,
              study them, and patch them. Whether it's an algorithm or a conversation, my approach
              is always: figure it out, then figure it out better.
            </p>
            <div className="tags r d3">
              {tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
            <div className="about-meta r d4">
              <div className="meta"><p className="l">Degree</p><p className="v">B.E. Computer Engineering</p></div>
              <div className="meta"><p className="l">Campus</p><p className="v">Thapathali Campus</p></div>
              <div className="meta"><p className="l">Based In</p><p className="v">Kathmandu, Nepal 🇳🇵</p></div>
              <div className="meta"><p className="l">Focus Area</p><p className="v">AI / Machine Learning</p></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
