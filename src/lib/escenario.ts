/**
 * escenario.ts — matemática del escenario vertical (Opción 3 "Demo viva",
 * docs/planes/2026-09-22-recomposicion-ui-vertical.md §14.7 paso 7 — Paso 1.1 de §5). Reemplaza a
 * `cinta.ts` como única fuente de verdad de la línea de tiempo del documento; `cinta.ts` sigue
 * vivo hasta que las 5 pantallas y HiloRuta se migren (Bloque E, paso 17-18 del plan) — hasta
 * entonces conviven los dos módulos, cada uno con sus propios consumidores.
 *
 * Diferencia de fondo con `cinta.ts`: ahí cada pantalla era un PUNTO (`centro(k)`, un instante de
 * scroll donde se centra). Acá cada sección es un RANGO — mide `largoSvh` de scroll propio (Paso
 * 1.2, `Seccion.astro`), así que lo que hace falta no es "dónde se centra" sino "entre qué dos
 * puntos del scroll del DOCUMENTO ENTERO está activa". Eso es lo que da `offsets()`.
 *
 * === La tabla (Opción 3, §11.3) === que-es:160 · que-hace:140 · como-lo-hace:220 · donde:180 ·
 * cierre:100 = 800 svh.
 *
 * === Restricciones técnicas que no se pueden violar (trasladadas íntegras de cinta.ts:34-47,
 * todas ya costaron debugging real) ===
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
 *    REAL (setear `scrollTop` desde la consola no avanza el ScrollTimeline de forma fiable).
 * 6. Toda ruta a un asset de `public/` va con `import.meta.env.BASE_URL` (`astro.config.mjs` fija
 *    `base: '/sur-en-ruta/'`) — nunca `/algo/...` a secas, restricción ya documentada en el plan §12.
 */

interface Seccion {
	id: string;
	largoSvh: number;
}

/** Tabla de presupuesto de scroll — Opción 3 (§11.3). Sumar/quitar una sección = tocar esto. */
export const ESCENARIO: Seccion[] = [
	{ id: 'que-es', largoSvh: 160 },
	{ id: 'que-hace', largoSvh: 140 },
	{ id: 'como-lo-hace', largoSvh: 220 },
	{ id: 'donde', largoSvh: 180 },
	{ id: 'cierre', largoSvh: 100 },
];

/** Suma de `largoSvh` de todas las secciones (800 con la tabla de arriba). */
export const TOTAL_SVH = ESCENARIO.reduce((acc, s) => acc + s.largoSvh, 0);

/** `largoSvh` de una sección por id — lo consume `Seccion.astro` vía cada `PnXxx.astro`. */
export function largoSvh(id: string): number {
	const seccion = ESCENARIO.find((s) => s.id === id);
	if (!seccion) throw new Error(`escenario.ts: sección desconocida "${id}"`);
	return seccion.largoSvh;
}

export interface Offset {
	id: string;
	/** Acumulado en svh, medido desde el tope del documento. */
	desdeSvh: number;
	hastaSvh: number;
	/** % del scroll del DOCUMENTO (0-100, ya clampeado) donde arranca/termina esta sección. */
	desdePct: number;
	hastaPct: number;
	centroPct: number;
}

/**
 * Acumulado de cada sección en svh, y su conversión a % del scroll del documento:
 * `pct = acumuladoSvh / (TOTAL_SVH − 100) · 100` (se resta una pantalla porque la última sección ya
 * está a la vista cuando el scroll termina — mismo motivo por el que `cinta.ts` dividía por `N−1`
 * en vez de `N`, el razonamiento no cambia, la fórmula sí). Clampeado a [0,100]: más allá de
 * `TOTAL_SVH − 100` svh no existe scroll posible, así que la última sección (que sigue "activa"
 * mientras el usuario está parado en el fondo del documento) queda pegada en 100% — no es un bug,
 * es lo mismo que pasaba con `centro(N-1) = 100` antes.
 */
export function offsets(): Offset[] {
	const totalScrolleable = TOTAL_SVH - 100;
	let acumulado = 0;
	return ESCENARIO.map((s) => {
		const desdeSvh = acumulado;
		const hastaSvh = acumulado + s.largoSvh;
		acumulado = hastaSvh;
		const desdePct = Math.min(100, (desdeSvh / totalScrolleable) * 100);
		const hastaPct = Math.min(100, (hastaSvh / totalScrolleable) * 100);
		return { id: s.id, desdeSvh, hastaSvh, desdePct, hastaPct, centroPct: (desdePct + hastaPct) / 2 };
	});
}

/** % del scroll del documento donde el "centro" de la sección `id` queda a la vista. */
export function centro(id: string): number {
	const o = offsets().find((o) => o.id === id);
	if (!o) throw new Error(`escenario.ts: sección desconocida "${id}"`);
	return o.centroPct;
}

/** Tramo explícito `desde% hasta%` — copiado tal cual de `cinta.ts:70-72`, funciona igual. */
export function tramo(desde: number, hasta: number): string {
	return `${desde.toFixed(2)}% ${hasta.toFixed(2)}%`;
}

/**
 * Rango de un elemento `i`-ésimo de una secuencia escalonada — copiado tal cual de
 * `cinta.ts:78-81`. Usado para nodos/tarjetas que entran uno detrás de otro (P3 beat B, etc.).
 */
export function escalonado(inicio: number, i: number, paso: number, duracion: number): string {
	const desde = inicio + i * paso;
	return `${desde.toFixed(2)}% ${(desde + duracion).toFixed(2)}%`;
}
