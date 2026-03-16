import { useHeroParallax } from '../hooks/useHeroParallax'

export default function HeroContent() {
  const fgRef = useHeroParallax('foreground', 0.15, 12)

  return (
    <div
      ref={fgRef}
      className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 will-change-transform"
    >
      <p className="text-indigo-400 tracking-[0.3em] text-xs uppercase mb-6">
        HAUTE PARFUMERIE
      </p>

      <h1 className="font-bold leading-tight">
        <span className="text-neutral-100 font-normal text-5xl md:text-7xl">
          El Arte de
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 text-5xl md:text-7xl">
          la Fragancia
        </span>
      </h1>

      <p className="text-neutral-400 max-w-md mt-6 text-sm md:text-base leading-relaxed">
        Descubre fragancias que trascienden el tiempo. Creadas para quienes
        aprecian lo extraordinario.
      </p>

      <a
        href="#coleccion"
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 mt-10 rounded-full text-sm font-medium transition-colors duration-300"
      >
        Explorar Colección
      </a>
    </div>
  )
}
