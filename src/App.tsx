import Navbar from './features/navbar/components/Navbar'
import Hero from './features/hero/components/Hero'
import MasonryGrid from './features/masonry-grid/components/MasonryGrid'
import Footer from './features/footer/components/Footer'

function App() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />
      <main>
        <Hero />
        <MasonryGrid />
      </main>
      <Footer />
    </div>
  )
}

export default App
