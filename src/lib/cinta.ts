/**
 * cinta.ts — matemática de la "cinta" horizontal (única fuente de verdad).
 *
 * Antes esta aritmética vivía duplicada: `index.astro` la calculaba con un helper `esc()` anclado
 * a un número medido en vivo (`CENTRO_REF = 26`) y `HiloRuta.astro` la recalculaba por su cuenta a
 * partir de `recorrido.length` — dos caminos al mismo número, ya desincronizados una vez (ver
 * docs/planes/2026-09-04-reescritura-index-p1-p5.md, hallazgo 2). Ese helper además dejó de ser
 * válido con el pivot del 2026-09-03: P1 pasa a ser el bloque 0 (sin Hero de apertura), y
 * `esc()` asumía que la pantalla 1 nunca se centra en 0 %.
 *
 * Agregar o quitar una pantalla = tocar `src/data/recorrido.ts` (el array). Nada más.
 *
 * === La línea de tiempo de la cinta (tabla de referencia, no recalcular a mano) ===
 * Con N_PANTALLAS = 5, el bloque k (0-indexado) se centra en 100·k/(N−1) % de `--hz-progreso`:
 *
 * | Pantalla            | id             | k | Centro | Ventana de entrada          | Disparador       |
 * |----------------------|----------------|---|--------|------------------------------|-------------------|
 * | P1 · ¿Qué es?        | que-es         | 0 | 0 %    | — (entrada temporal) · permanencia `0%→8%` (velo/texto), colchón `8%→14%` | :root.entrada + --hz-progreso |
 * | P2 · ¿Qué hace?      | que-hace       | 1 | 25 %   | 14% → 24.5%                  | --hz-progreso     |
 * | P3 · ¿Cómo lo hace?  | como-lo-hace   | 2 | 50 %   | A: 39%→44% · B: 43.5%→49.5%  | --hz-progreso     |
 * | P4 · ¿Dónde?         | donde          | 3 | 75 %   | 64% → 74.5%                  | --hz-progreso     |
 * | P5 · Cierre          | cierre         | 4 | 100 %  | 89% → 99.5%                  | --hz-progreso     |
 *
 * Reglas de las que salen esos rangos (memoria `proyecto_renamu_animaciones`, ya pagadas con
 * iteraciones perdidas):
 * - La secuencia tiene que TERMINAR en el instante de centrado, no después — si sigue después, el
 *   usuario llega a la pantalla con la animación a mitad de camino.
 * - La ventana tiene que ser lo más ANCHA posible sin salirse del rango de visibilidad sustancial
 *   (para el centro c: aprox. [c−9, c+9]) — una ventana angosta (menos de un tick de rueda) se
 *   percibe como un salto, no como una animación progresiva.
 * - P5 se centra en 100 % (fin del scroll): su ventana termina en 99,5 % a propósito, es el espejo
 *   del caso de P1 y funciona porque P5 sí tiene tramo de aproximación.
 *
 * === Restricciones técnicas que no se pueden violar (todas ya costaron debugging real) ===
 * 1. Toda animación scroll-driven va envuelta en `@supports (animation-timeline: scroll(root))`,
 *    con el estado final legible como default FUERA del bloque — Firefox estable todavía tiene
 *    `animation-timeline` detrás de flag.
 * 2. Todo `@keyframes` scroll-driven necesita su contrapartida en
 *    `@media (prefers-reduced-motion: reduce)` con `animation: none !important` + el estado final.
 * 3. Nunca `calc()` alrededor de un `var()` dentro de un `@keyframes` — Chrome descarta la regla
 *    entera sin avisar. La aritmética se resuelve acá (en TS) y se pasa el valor ya con unidad.
 * 4. `animation-range` nunca con `var()` — va inline, como literal calculado en el frontmatter de
 *    cada pantalla (usando las funciones de este módulo).
 * 5. Verificar cualquier animación con `el.getAnimations()[0].effect.getKeyframes()` y con scroll
 *    REAL (setear `track.scrollTop` desde la consola no avanza el ScrollTimeline de forma fiable).
 * 6. Toda ruta a un asset de `public/` va con `import.meta.env.BASE_URL` (`astro.config.mjs` fija
 *    `base: '/sur-en-ruta/'`) — nunca `/algo/...` a secas, restricción ya documentada en el plan §12.
 */
import { recorrido } from '../data/recorrido.ts';

/** Cantidad total de pantallas de la cinta. Único número que hace falta tocar al sumar/quitar una. */
export const N_PANTALLAS = recorrido.length;

/** % de `--hz-progreso` en que el bloque `k` (0-indexado) queda centrado. */
export function centro(k: number): number {
	return (100 * k) / (N_PANTALLAS - 1);
}

/**
 * Ventana de entrada "termina en el centrado" — la forma más común de animation-range de este
 * proyecto: arranca `antes` puntos antes del centro y termina `margen` puntos antes de llegar
 * (para que la secuencia esté 100 % resuelta apenas la pantalla queda quieta).
 */
export function ventana(k: number, antes = 11, margen = 0.5): string {
	const c = centro(k);
	return `${(c - antes).toFixed(2)}% ${(c - margen).toFixed(2)}%`;
}

/** Tramo explícito `desde% hasta%`, para cuando la ventana no se calcula desde un centro. */
export function tramo(desde: number, hasta: number): string {
	return `${desde.toFixed(2)}% ${hasta.toFixed(2)}%`;
}

/**
 * Rango de un elemento `i`-ésimo de una secuencia escalonada: arranca en `inicio + i·paso` y dura
 * `duracion` puntos. Usado para nodos/tarjetas que entran uno detrás de otro (P3 bloque B, etc.).
 */
export function escalonado(inicio: number, i: number, paso: number, duracion: number): string {
	const desde = inicio + i * paso;
	return `${desde.toFixed(2)}% ${(desde + duracion).toFixed(2)}%`;
}
