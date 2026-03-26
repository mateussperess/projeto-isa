import { useEffect } from 'react'

export default function useCursor() {
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    const dot = document.querySelector('.cursor-dot')
    const ring = document.getElementById('cursorRing')
    let mx = -100, my = -100, rx = -100, ry = -100

    const onMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.parentElement.style.transform = `translate(${mx}px,${my}px)`
    }

    document.addEventListener('mousemove', onMouseMove)

    let rafId
    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx}px,${ry}px)`
      rafId = requestAnimationFrame(animRing)
    }
    rafId = requestAnimationFrame(animRing)

    const targets = document.querySelectorAll('a, button, .cat-card, .portfolio-item, .filter-btn')
    const expand = () => ring.classList.add('expanded')
    const collapse = () => ring.classList.remove('expanded')
    targets.forEach(el => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', collapse)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', expand)
        el.removeEventListener('mouseleave', collapse)
      })
    }
  }, [])
}