import { useState, useEffect } from 'react'

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const sectionIds = ['inicio', 'coleccion', 'contacto']
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )

    for (const el of elements) {
      observer.observe(el)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return activeSection
}
