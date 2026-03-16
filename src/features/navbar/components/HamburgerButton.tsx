import clsx from 'clsx'

type HamburgerButtonProps = {
  isOpen: boolean
  onToggle: () => void
}

export default function HamburgerButton({ isOpen, onToggle }: HamburgerButtonProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isOpen}
      className="flex flex-col justify-center items-center gap-1.5 p-2 md:hidden"
    >
      <span
        className={clsx(
          'block w-6 h-px bg-stone-300 transition-all duration-300',
          isOpen && 'rotate-45 translate-y-2',
        )}
      />
      <span
        className={clsx(
          'block w-6 h-px bg-stone-300 transition-all duration-300',
          isOpen && 'opacity-0',
        )}
      />
      <span
        className={clsx(
          'block w-6 h-px bg-stone-300 transition-all duration-300',
          isOpen && '-rotate-45 -translate-y-2',
        )}
      />
    </button>
  )
}
