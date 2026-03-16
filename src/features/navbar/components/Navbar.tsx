import { useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import NavLink from './NavLink'
import HamburgerButton from './HamburgerButton'

const NAV_ITEMS = [
  { href: '#inicio', label: 'Inicio', section: 'inicio' },
  { href: '#coleccion', label: 'Colección', section: 'coleccion' },
  { href: '#contacto', label: 'Contacto', section: 'contacto' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const activeSection = useActiveSection()

  const closeMenu = () => setIsOpen(false)

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-stone-800"
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-16">
        <a
          href="#inicio"
          className="text-white tracking-widest text-sm"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          LUXE PARFUMS
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.section}
              href={item.href}
              label={item.label}
              isActive={activeSection === item.section}
            />
          ))}
        </div>

        <HamburgerButton isOpen={isOpen} onToggle={() => setIsOpen((o) => !o)} />
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out md:hidden"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 px-6 pb-6">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.section}
                href={item.href}
                label={item.label}
                isActive={activeSection === item.section}
                onClick={closeMenu}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
