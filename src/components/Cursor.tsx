import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current.mx = e.clientX; pos.current.my = e.clientY }
    document.addEventListener('mousemove', move)

    let raf: number
    const animate = () => {
      const { mx, my } = pos.current
      pos.current.rx += (mx - pos.current.rx) * 0.22
      pos.current.ry += (my - pos.current.ry) * 0.22
      if (dotRef.current)  dotRef.current.style.cssText  = `left:${mx}px;top:${my}px`
      if (ringRef.current) ringRef.current.style.cssText = `left:${pos.current.rx}px;top:${pos.current.ry}px`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)
    const targets = document.querySelectorAll('a, button, .pass-card, .bc, .proj-row')
    targets.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      targets.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
    }
  }, [])

  return (
    <div id="cursor" className={hovered ? 'ch' : ''}>
      <div id="cdot"  ref={dotRef}  />
      <div id="cring" ref={ringRef} />
    </div>
  )
}
