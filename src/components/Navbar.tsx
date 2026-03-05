import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const links = [
  { label: 'About',    path: '/about'    },
  { label: 'Passions', path: '/passions' },
  { label: 'Hobbies',  path: '/hobbies'  },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact',  path: '/contact'  },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const goTo = (path: string) => {
    setMenuOpen(false)
    navigate(path)
  }

  return (
    <>
      <div id="mob-menu" className={menuOpen ? 'open' : ''}>
        {links.map((l, i) => (
          <button key={l.path} className="mob-a" onClick={() => goTo(l.path)}>
            <span className="mob-n">0{i + 1}</span>{l.label}
          </button>
        ))}
        <p className="mob-foot">Kathmandu, Nepal 🇳🇵</p>
      </div>

      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo">B<em>.</em>Tharu</Link>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.path}><Link to={l.path}>{l.label}</Link></li>
          ))}
        </ul>
        <div className="nav-right">
          <Link to="/contact" className="nav-cta">Connect</Link>
          <button className={`nav-burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  )
}
