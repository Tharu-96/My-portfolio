import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader   from './components/Loader'
import Navbar   from './components/Navbar'
import Footer   from './components/Footer'
import HomePage     from './pages/HomePage'
import AboutPage    from './pages/AboutPage'
import PassionsPage from './pages/PassionsPage'
import HobbiesPage  from './pages/HobbiesPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage  from './pages/ContactPage'

export default function App() {
  useEffect(() => {
    const bar = document.getElementById('progress-bar')
    const onScroll = () => {
      const d = document.documentElement
      const pct = (window.scrollY / (d.scrollHeight - d.clientHeight)) * 100
      if (bar) bar.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div id="progress-bar" />
      <Loader />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/passions" element={<PassionsPage />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
