# Luxe Parfums — Prueba Técnica Front-end

Landing page animada con efectos de scroll y componentes interactivos, construida con React + TypeScript + TailwindCSS v4.

---

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

Para construir para producción:

```bash
npm run build
npm run preview
```

---

## Enfoque técnico

### Arquitectura

El proyecto sigue una **estructura feature-based** inspirada en Domain-Driven Design. Cada sección de la página es una feature independiente con sus propios componentes, hooks y datos:

```
src/
  features/
    navbar/         → Barra de navegación + lógica de sección activa
    hero/           → Hero con parallax + hooks de animación
    masonry-grid/   → Grid tipo masonry + datos de tarjetas
    footer/         → Footer con redes sociales y contacto
```

Esta separación garantiza que cada feature sea modificable de forma aislada sin afectar el resto de la aplicación.

### Animaciones y performance (60fps)

El principio central para todas las animaciones es **cero re-renders de React durante el scroll o el movimiento del mouse**. En lugar de `useState` (que re-renderiza el componente en cada frame), se utilizan `useRef` + manipulación directa del DOM dentro de `requestAnimationFrame`:

```ts
// useHeroParallax.ts — patrón clave
function schedule() {
  if (!scheduled) {
    scheduled = true
    requestAnimationFrame(() => {
      scheduled = false
      el.style.transform = `translateY(${window.scrollY * speed}px)`
    })
  }
}
window.addEventListener('scroll', schedule, { passive: true })
```

- `passive: true` en los listeners de scroll y mouse para no bloquear el hilo principal.
- `will-change-transform` en los elementos con parallax para promover capas GPU.
- Solo se usan `transform` y `opacity` en animaciones (propiedades que no provocan reflow ni repaint).

### Parallax del Hero

El hook `useHeroParallax` soporta dos modos:
- **background**: mueve el video a `0.4x` la velocidad del scroll (efecto parallax clásico).
- **foreground**: desplaza el contenido hacia arriba con el scroll (`-0.15x`) y aplica un offset sutil según la posición del mouse (`±12px`). En móvil el tracking de mouse está desactivado automáticamente (`pointer: fine` media query).

### Expand animado en tarjetas ("Ver más")

Se usa el **CSS Grid trick** para animar la altura sin conocer el valor final:

```tsx
<div style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
     className="grid transition-[grid-template-rows] duration-300">
  <div className="overflow-hidden">
    {/* contenido expandible */}
  </div>
</div>
```

Esto evita el problema de `max-height` (que requiere un valor arbitrario alto y produce easing no lineal) y no rompe el layout de columnas CSS.

### Masonry Grid

Se implementó con la propiedad CSS `columns` sin JavaScript de layout. Las tarjetas usan `break-inside-avoid` para no partirse entre columnas. Cuando una tarjeta se expande, solo empuja el contenido de su propia columna hacia abajo, sin afectar las demás.

---

## Decisiones técnicas relevantes

### Vite en lugar de Create React App

Vite es significativamente más rápido que CRA para SPAs por varias razones:
- En desarrollo, sirve los módulos directamente como **ES Modules nativos** en el navegador, sin bundle previo. Esto hace que el arranque sea casi instantáneo independientemente del tamaño del proyecto.
- El **HMR (Hot Module Replacement)** actualiza solo el módulo modificado, no toda la aplicación, resultando en tiempos de actualización por debajo de 50ms.
- El build de producción usa **Rollup** internamente, que produce bundles más pequeños y optimizados que Webpack (usado por CRA).
- No requiere Babel para TypeScript ni JSX en la mayoría de los casos (usa esbuild/oxc que es ~100x más rápido).
- CRA está oficialmente deprecado desde 2023; Vite es el estándar de facto para nuevos proyectos React.

### TailwindCSS v4

La versión 4 adopta un enfoque **CSS-first**: se importa con `@import "tailwindcss"` directamente en el CSS, sin archivo `tailwind.config.js`. Se integra con Vite mediante `@tailwindcss/vite`, lo que simplifica la configuración al eliminar un archivo de configuración y mejora el rendimiento del build mediante detección automática de contenido.

### Sin librerías de animación (Framer Motion, GSAP, etc.)

Las animaciones se implementaron con CSS `transition` + `requestAnimationFrame` + propiedades `transform`/`opacity`. Esto es suficiente para los efectos requeridos y evita añadir dependencias pesadas al bundle. Framer Motion pesa ~140kb gzipped — se justifica en aplicaciones con animaciones complejas de layout compartido, pero es excesivo para parallax y transiciones de altura.

### `clsx` para merging de clases condicionales

Se usa `clsx` (0.8kb gzipped) para combinar clases de Tailwind condicionalmente en `NavLink` y `HamburgerButton`. Evita concatenaciones de strings frágiles y es la solución más liviana disponible para este propósito específico, sin necesidad de `tailwind-merge` (que solo es necesario cuando hay conflictos de utilidades del mismo tipo).

### Imágenes optimizadas para web

Todas las imágenes del Masonry Grid declaran atributos `width` y `height` explícitos para que el navegador reserve el espacio antes de que carguen, evitando **Cumulative Layout Shift (CLS)**. Se usa `loading="lazy"` para diferir la carga de imágenes fuera del viewport inicial.

---

## Qué mejoraría con más tiempo

1. **Video optimizado localmente**: el video del Hero apunta a una URL pública como ejemplo. En producción, lo ideal es hospedar un archivo `.webm` (mejor ratio de compresión) con `.mp4` como fallback, ambos procesados con `ffmpeg` para reducir el peso sin sacrificar calidad visual.

2. **Respetar `prefers-reduced-motion`**: el video y las animaciones de parallax deberían desactivarse si el usuario tiene activada esta preferencia en su sistema operativo, por accesibilidad.

3. **Scroll-triggered animations**: aplicar animaciones de entrada (`opacity: 0 → 1`, `translateY`) a las tarjetas al entrar al viewport usando `IntersectionObserver`, para una experiencia más dinámica.

4. **Virtualización del grid**: para colecciones grandes, usar una ventana virtual (como `@tanstack/virtual`) evita renderizar nodos del DOM fuera del viewport y mejora la performance en listas largas.

5. **Tests**: añadir tests con Vitest + Testing Library, especialmente para la lógica de expansión de `MasonryCard` y el estado activo del `Navbar`.

6. **Storybook**: documentar cada componente de forma aislada facilitaría la colaboración con diseño y el mantenimiento a largo plazo.
