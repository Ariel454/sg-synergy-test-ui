import ParallaxBackground from './ParallaxBackground'
import HeroContent from './HeroContent'

export default function Hero() {
  return (
    <section id="inicio" className="relative h-screen overflow-hidden">
      <ParallaxBackground />
      <HeroContent />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-neutral-500 text-[10px] tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-indigo-400/60 to-transparent animate-bounce" />
      </div>
    </section>
  )
}
