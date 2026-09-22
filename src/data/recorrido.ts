/**
 * recorrido.ts — las 5 paradas de la cinta (spot de la app, pivot 2026-09-03).
 *
 * Fuente única del orden y de los nombres del recorrido: la importan tanto `src/pages/index.astro`
 * (para armar las <Pantalla> en orden y derivar N_PANTALLAS, ver src/lib/cinta.ts) como
 * `src/components/HiloRuta.astro` (para el nav lateral y su menú de pantalla completa). Antes cada
 * archivo tenía su propia copia del recorrido — desincronizadas ya una vez (ver
 * docs/planes/2026-09-04-reescritura-index-p1-p5.md, hallazgo 2). No duplicar de nuevo.
 *
 * Los `nombre` son los que se ven en el menú de HiloRuta — si Ale prefiere otros rótulos, se
 * cambian acá y en ningún otro lado.
 */
export const recorrido = [
	{ id: 'que-es', nombre: '¿Qué es?' },
	{ id: 'que-hace', nombre: '¿Qué hace?' },
	{ id: 'como-lo-hace', nombre: '¿Cómo lo hace?' },
	{ id: 'donde', nombre: '¿Dónde?' },
	{ id: 'cierre', nombre: 'Sur en Ruta' },
] as const;
