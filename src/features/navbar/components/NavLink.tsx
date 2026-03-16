import clsx from 'clsx'

type NavLinkProps = {
  href: string
  label: string
  isActive: boolean
  onClick?: () => void
}

export default function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={clsx(
        'text-xs tracking-widest uppercase transition-colors duration-300',
        isActive
          ? 'text-indigo-400 border-b border-indigo-400'
          : 'text-neutral-300 hover:text-white',
      )}
    >
      {label}
    </a>
  )
}
