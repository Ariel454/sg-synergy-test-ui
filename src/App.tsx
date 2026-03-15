import Navbar from './features/navbar/components/Navbar'
import Hero from './features/hero/components/Hero'
import MasonryGrid from './features/masonry-grid/components/MasonryGrid'
import Footer from './features/footer/components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section id="coleccion" className="py-24 px-6 bg-dark">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-gold text-xs tracking-[0.4em] uppercase font-medium">
                Nuestra Selección
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-cream mt-4">
                Fragancias Icónicas
              </h2>
              <p className="text-cream/50 mt-4 max-w-xl mx-auto leading-relaxed">
                Una curaduría de los perfumes más deseados del mundo, seleccionados
                por su legado, calidad y proyección.
              </p>
            </div>
            <MasonryGrid />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
