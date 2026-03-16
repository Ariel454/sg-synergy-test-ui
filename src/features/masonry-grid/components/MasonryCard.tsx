import { useState } from 'react'
import type { Perfume } from '../types'

const IMAGE_HEIGHTS: Record<number, number> = {
  1: 380,
  2: 460,
  3: 300,
  4: 320,
  5: 400,
  6: 500,
  7: 350,
  8: 420,
  9: 300,
}

export default function MasonryCard({ id, image, title, house, excerpt, fullText }: Perfume) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="break-inside-avoid mb-5 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1">
      <img
        loading="lazy"
        src={image}
        alt={title}
        width={600}
        height={IMAGE_HEIGHTS[id] ?? 380}
        className="w-full object-cover"
      />

      <div className="p-5">
        <span className="text-indigo-400 text-[10px] tracking-widest uppercase">
          {house}
        </span>

        <h3 className="text-neutral-100 text-lg font-semibold mt-1 mb-2">
          {title}
        </h3>

        <p className="text-neutral-400 text-sm leading-relaxed">{excerpt}</p>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-in-out"
          style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <p className="text-neutral-400 text-sm leading-relaxed pt-3">{fullText}</p>
          </div>
        </div>

        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-4 text-indigo-400 text-xs tracking-widest uppercase hover:text-indigo-300 transition-colors"
        >
          {expanded ? 'Ver menos ↑' : 'Ver más ↓'}
        </button>
      </div>
    </article>
  )
}
