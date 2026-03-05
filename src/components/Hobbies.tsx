import { useEffect, useRef } from 'react'
import './Hobbies.css'

const items = ['⚽ Football','🏏 Cricket','🎮 Online Gaming','🎬 Content Creation','♟️ Strategy','🌄 Adventures','🤝 Networking','🧠 Deep Thinking']

const cards = [
  { cls:'bc s2 gold', emo:'⚽', title:'Football & Cricket',  text:"The pitch is where I decompress. Sport teaches teamwork, instinctive decision-making, and reading the game — skills that transfer directly to engineering." },
  { cls:'bc',         emo:'🎮', title:'Online Gaming',        text:"Fast decisions, pattern recognition, team co-ordination — gaming sharpens the mind in ways people underestimate." },
  { cls:'bc',         emo:'🌄', title:'Adventures',           text:"Nepal is a playground for the curious. I explore trails, towns, and perspectives most people miss." },
  { cls:'bc',         emo:'🎬', title:'Content',              text:"Turning ideas into visuals and stories into reels. Creating is my most honest form of expression." },
  { cls:'bc s3',      emo:'♟️', title:'Strategic Thinking',   text:"I love dissecting problems — from game theory to life decisions. Always building mental models, running scenarios, and finding the move three steps ahead." },
]

export default function Hobbies() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.r').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const doubled = [...items, ...items]

  return (
    <section id="hobbies" ref={ref}>
      <div className="container">
        <p className="sec-label r">Off the Clock</p>
        <h2 className="sec-title r d1">Life Beyond<br /><em>the Screen</em></h2>
      </div>
      <div className="marquee-o">
        <div className="marquee-t">
          {doubled.map((item, i) => (
            <span className="mi" key={i}>{item}<span className="ms" /></span>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="bento">
          {cards.map((c, i) => (
            <div className={`${c.cls} r d${(i % 3) + 1}`} key={i}>
              <span className="be">{c.emo}</span>
              <h3 className="bt">{c.title}</h3>
              <p className="bp">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
