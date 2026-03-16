import { PERFUMES } from '../data/perfumes.data'
import MasonryCard from './MasonryCard'

export default function MasonryGrid() {
  return (
    <section id="coleccion" className="py-24 px-6 md:px-12 lg:px-20 bg-[#080810]">
      <div className="text-center mb-16">
        <p className="text-indigo-400 tracking-[0.3em] text-xs uppercase mb-4">
          NUESTRA COLECCIÓN
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-100">
          Fragancias Selectas
        </h2>
        <p className="text-neutral-500 mt-4">
          Una curaduría de las esencias más codiciadas del mundo.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
        {PERFUMES.map((p) => (
          <MasonryCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  )
}
