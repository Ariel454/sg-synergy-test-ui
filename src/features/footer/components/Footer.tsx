import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="bg-neutral-950 border-t border-neutral-800 py-16 px-6 md:px-12 lg:px-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <span className="text-white tracking-widest text-lg font-semibold">
            LUXE PARFUMS
          </span>
          <p className="text-neutral-500 text-sm mt-3 leading-relaxed">
            El arte de la fragancia, elevado a su máxima expresión.
          </p>
          <SocialLinks />
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-neutral-500 text-[10px] tracking-[0.2em] uppercase mb-4">
            NAVEGACIÓN
          </h4>
          <a href="#inicio" className="text-neutral-400 hover:text-indigo-400 transition-colors text-sm block mb-2">
            Inicio
          </a>
          <a href="#coleccion" className="text-neutral-400 hover:text-indigo-400 transition-colors text-sm block mb-2">
            Colección
          </a>
          <a href="#contacto" className="text-neutral-400 hover:text-indigo-400 transition-colors text-sm block mb-2">
            Contacto
          </a>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-neutral-500 text-[10px] tracking-[0.2em] uppercase mb-4">
            CONTACTO
          </h4>
          <div className="mb-3">
            <span className="text-neutral-600 text-xs block">Email</span>
            <span className="text-neutral-300 text-sm">parfums@luxeparfums.com</span>
          </div>
          <div className="mb-3">
            <span className="text-neutral-600 text-xs block">Teléfono</span>
            <span className="text-neutral-300 text-sm">+593 2 345 6789</span>
          </div>
          <div>
            <span className="text-neutral-600 text-xs block">Dirección</span>
            <span className="text-neutral-300 text-sm">Av. 6 de Diciembre N24-253</span>
            <span className="text-neutral-400 text-xs block mt-0.5">Quito, Ecuador</span>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-neutral-800 text-center">
        <p className="text-neutral-600 text-xs tracking-widest">
          © 2024 LUXE PARFUMS. TODOS LOS DERECHOS RESERVADOS.
        </p>
      </div>
    </footer>
  )
}
