# Fuente del SVG del mapa de Uruguay

**TODO — pendiente.** Este archivo queda intencionalmente sin completar.

El paso 9 del plan (`docs/planes/2026-08-20-landing-inversores.md`) pide un SVG real de Uruguay
(silueta + departamentos + corredores), optimizado, con `id` por ruta para animar trazos, y
**registrar acá de dónde sale la geometría y bajo qué licencia** — verificado, no asumido.

No se descargó ni se inventó ninguna geometría en esta pasada porque no se pudo verificar la
licencia de una fuente real en el tiempo disponible. Usar un SVG de procedencia no verificada en
una pieza dirigida a inversores (que puede terminar publicada) no es aceptable: si la geometría
tiene una licencia que exige atribución o prohíbe uso comercial, hay que saberlo antes de usarla,
no después.

Mientras tanto, `src/components/MapaPlaceholder.astro` renderiza un rectángulo simple con el
texto "mapa pendiente" en el lugar donde va este SVG, para que la estructura de la página se vea
completa sin simular un mapa real.

**Qué falta para cerrar este paso:**
1. Elegir una fuente de geometría de Uruguay (departamentos + silueta) con licencia verificable
   (ej. Natural Earth, dominio público, o un banco con licencia comercial clara).
2. Verificar y citar acá la licencia exacta y el link de origen.
3. Optimizar el SVG (`svgo` o similar) y asignar `id` por corredor/ruta para poder animar el
   trazo con `stroke-dashoffset`.
4. Reemplazar `MapaPlaceholder.astro` por el SVG real en los componentes que lo usan (`Hero`,
   `Problema`, `Rutas`).
