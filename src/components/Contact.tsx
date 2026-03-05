import { useEffect, useRef, useState } from 'react'
import './Contact.css'
import { socialLinks, formspreeEndpoint } from '../config/contact'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.r').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formspreeEndpoint) {
      setStatus('error')
      setErrorMsg('Form not configured. Add VITE_FORMSPREE_ID to .env — see .env.example')
      return
    }
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      const data = (await res.json()) as { ok?: boolean; errors?: { message: string }[] }
      if (res.ok && data.ok !== false) {
        setStatus('success')
        form.reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setErrorMsg(data.errors?.map((e) => e.message).join(', ') || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Failed to send. Check your connection and try again.')
    }
  }

  const handleMagnet = (e: React.MouseEvent<HTMLButtonElement>) => {
    const b = e.currentTarget, r = b.getBoundingClientRect()
    b.style.transform = `translate(${(e.clientX-(r.left+r.width/2))*0.1}px,${(e.clientY-(r.top+r.height/2))*0.1}px)`
  }
  const resetMagnet = (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = '' }

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <div className="con-grid">
          <div>
            <p className="sec-label r">Get In Touch</p>
            <h2 className="con-big r d1">Let's Build<br /><em>Something</em><br />Together.</h2>
            <p className="con-desc r d2">Whether you want to collaborate, discuss AI, explore ideas, or just have a great conversation — reach out. I respond to everything.</p>
            <div className="soc-list r d3">
              {socialLinks.map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="soc-item">
                  <span className="sn">{s.name}</span>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.8rem' }}>
                    <span className="sh">{s.handle}</span>
                    <span className="sa">{s.icon}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="r d2">
            <form className="con-form" onSubmit={handleSubmit}>
              <div className="f2">
                <div className="fg">
                  <label className="fl" htmlFor="contact-name">Your Name</label>
                  <input id="contact-name" className="fi" name="name" type="text" placeholder="Jane Doe" required disabled={status === 'loading'} />
                </div>
                <div className="fg">
                  <label className="fl" htmlFor="contact-email">Your Email</label>
                  <input id="contact-email" className="fi" name="_replyto" type="email" placeholder="jane@example.com" required disabled={status === 'loading'} />
                </div>
              </div>
              <div className="fg">
                <label className="fl" htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" className="fi" name="subject" type="text" placeholder="Let's collaborate on..." required disabled={status === 'loading'} />
              </div>
              <div className="fg">
                <label className="fl" htmlFor="contact-message">Message</label>
                <textarea id="contact-message" className="ft" name="message" placeholder="Tell me about your idea or just say hi..." required disabled={status === 'loading'} />
              </div>
              <button type="submit" className="btn-g f-sub" disabled={status === 'loading'} onMouseMove={handleMagnet} onMouseLeave={resetMagnet}>
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>
              {status === 'success' && <p className="fmsg">✓ Message sent! I&apos;ll get back to you soon.</p>}
              {status === 'error' && <p className="fmsg fmsg-err">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
