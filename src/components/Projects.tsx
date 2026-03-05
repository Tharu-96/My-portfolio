import { useEffect, useRef } from 'react'
import './Projects.css'

const projects = [
  { idx:'01', title:'AI Chatbot Interface',   desc:'Conversational AI interface exploring prompt engineering and API integration with clean UX.', stack:['Python','React','OpenAI API'], status:'live' as const, url:'https://gemini.google.com' },
  { idx:'02', title:'Portfolio Website',      desc:'This very site — built from scratch with cinematic aesthetics and smooth interactions.',       stack:['React','CSS','Vite'],         status:'live' as const, url:'' /* uses current site at click time */ },
  { idx:'03', title:'ML Research Project',    desc:'Exploring machine learning fundamentals — classification models for academic research.',        stack:['Python','Sklearn','Jupyter'], status:'in-progress' },
  { idx:'04', title:'Content Strategy Tool',  desc:'Personal tool for planning and analysing content performance across platforms.',               stack:['React','Firebase','Tailwind'],status:'planned' },
]

export default function Projects() {
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
    <section id="projects" ref={ref}>
      <div className="container">
        <div className="proj-head">
          <div className="r">
            <p className="sec-label">What I've Built</p>
            <h2 className="sec-title">Projects &amp;<br /><em>Work</em></h2>
          </div>
          <p className="proj-note r d2">Early in my journey — but building constantly. Real things, real learning.</p>
        </div>
        <div className="proj-list">
          {projects.map((p, i) => (
            <div className={`proj-row r d${i + 1}`} key={p.idx} onClick={() => { if (p.status !== 'live') return; const url = p.idx === '02' ? window.location.origin : (p as { url?: string }).url; if (url) window.open(url, '_blank', 'noopener,noreferrer'); }}>
              <span className="proj-idx">{p.idx}</span>
              <div>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.desc}</p>
              </div>
              <div className="proj-stack">{p.stack.map(s => <span className="pill" key={s}>{s}</span>)}</div>
              {p.status === 'live'        && <span className="proj-arr">↗</span>}
              {p.status === 'in-progress' && <span className="proj-wip">In Progress</span>}
              {p.status === 'planned'     && <span className="proj-wip">Planned</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
