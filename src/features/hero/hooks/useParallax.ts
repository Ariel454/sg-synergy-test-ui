import { useEffect, useRef } from 'react'

/**
 * Drives parallax by directly mutating DOM transforms via RAF.
 * No React state updates = no re-renders = guaranteed 60fps.
 */
export function useParallax() {
  const bgRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)
  const scrollY = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY
    }

    const onMouse = (e: MouseEvent) => {
      // Skip on touch/coarse pointer devices
      if (window.matchMedia('(pointer: coarse)').matches) return
      mouse.current = {
        x: (e.clientX - window.innerWidth / 2) * 0.012,
        y: (e.clientY - window.innerHeight / 2) * 0.008,
      }
    }

    const tick = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY.current * 0.4}px)`
      }
      if (fgRef.current) {
        fgRef.current.style.transform = `translateY(${-scrollY.current * 0.12}px) translate(${mouse.current.x}px, ${mouse.current.y}px)`
      }
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return { bgRef, fgRef }
}
