import { useRef, useEffect, type RefObject } from 'react'

export function useHeroParallax(
  mode: 'background' | 'foreground',
  speed: number = 0.4,
  mouseSensitivity: number = 0,
): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isMobile = !window.matchMedia('(pointer: fine)').matches
    const mouse = { x: 0, y: 0 }
    let scheduled = false

    function apply() {
      if (!el) return
      const scrollY = window.scrollY

      if (mode === 'background') {
        el.style.transform = `translateY(${scrollY * speed}px)`
      } else {
        const mx = isMobile ? 0 : mouse.x * mouseSensitivity
        const my = (isMobile ? 0 : mouse.y * mouseSensitivity) - scrollY * speed
        el.style.transform = `translate(${mx}px, ${my}px)`
      }
    }

    function schedule() {
      if (!scheduled) {
        scheduled = true
        requestAnimationFrame(() => {
          scheduled = false
          apply()
        })
      }
    }

    function onScroll() {
      schedule()
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      mouse.y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
      schedule()
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (!isMobile) {
        window.removeEventListener('mousemove', onMouseMove)
      }
    }
  }, [mode, speed, mouseSensitivity])

  return ref
}
