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
 * === La tabla (Bloque E, docs/planes/2026-09-23-bloque-e-secciones-chrome.md §3.6/§4.2, E3) ===
 * que-es:160 · que-hace:160 · como-lo-hace:260 · donde:260 · cierre:100 = 940 svh. Reemplaza al
 * presupuesto original de §11.3 (800svh, 160/140/220/180/100): con ese reparto cada sección quedaba
 * pineada MENOS de lo que parece (H5 del plan de Bloque E — el pin descuenta 100svh, así que
 * `que-hace` quedaba con 40svh pineados y `donde` repartía 6 rutas en 80svh, ~13svh por ruta, un
 * solo tick de rueda). Ale decidió la Opción B (940svh) el 2026-09-23: ~27svh por ruta de `donde` y
 * ~19svh por paso de `como-lo-hace`, unos 2 ticks de rueda cada uno.
 *
 * `ESCENARIO` ya NO es una tabla suelta: se DERIVA de `recorrido` (fuente única del orden y los
 * nombres, ver src/data/recorrido.ts) cruzada con `PRESUPUESTO_SVH` — antes las dos vivían
 * separadas y podían desincronizarse (hallazgo H10 del plan de Bloque E).
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
import { recorrido } from '../data/recorrido.ts';
import { rutas } from '../data/rutas.ts';

interface Seccion {
	id: string;
	largoSvh: number;
}

/** Presupuesto de scroll por sección, en svh — Bloque E, Opción B de §3.6 (940svh). Sumar/quitar
 * una sección = agregar su id acá Y en `recorrido.ts`; si falta uno de los dos, `ESCENARIO` tira
 * error en el arranque (ver abajo). */
export const PRESUPUESTO_SVH: Record<string, number> = {
	'que-es': 160,
	'que-hace': 160,
	'como-lo-hace': 260,
	donde: 260,
	cierre: 100,
};

/** `ESCENARIO` se deriva de `recorrido` (orden y nombres) cruzado con `PRESUPUESTO_SVH` (largo) —
 * antes eran dos tablas independientes (H10 del plan de Bloque E). */
export const ESCENARIO: Seccion[] = recorrido.map((r) => {
	const largoSvh = PRESUPUESTO_SVH[r.id];
	if (largoSvh === undefined) {
		throw new Error(
			`escenario.ts: la sección "${r.id}" está en recorrido.ts pero no tiene presupuesto en PRESUPUESTO_SVH.`,
		);
	}
	return { id: r.id, largoSvh };
});

/** Suma de `largoSvh` de todas las secciones (940 con la tabla de arriba). */
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
	/** Fin de la MESETA pineada: `desdeSvh + largoSvh − 100` (§4.2 del plan de Bloque E). Puede
	 * coincidir con `desdeSvh` cuando `largoSvh ≤ 100` (pasa con `cierre`: no hay meseta, la
	 * sección entra y el documento termina). */
	pinHastaSvh: number;
	/** Punto medio del tramo de TRANSICIÓN hacia la sección siguiente: `pinHastaSvh + 50`. `null`
	 * en la última sección (`cierre`), que no tiene "siguiente". */
	fronteraSvh: number | null;
	/** % del scroll del DOCUMENTO (0-100, ya clampeado) donde arranca/termina esta sección. */
	desdePct: number;
	hastaPct: number;
	pinHastaPct: number;
	fronteraPct: number | null;
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
	const svhAPct = (svh: number) => Math.min(100, (svh / totalScrolleable) * 100);
	let acumulado = 0;
	const lista = ESCENARIO.map((s) => {
		const desdeSvh = acumulado;
		const hastaSvh = acumulado + s.largoSvh;
		acumulado = hastaSvh;
		const pinHastaSvh = desdeSvh + Math.max(0, s.largoSvh - 100);
		return { id: s.id, desdeSvh, hastaSvh, pinHastaSvh };
	});
	return lista.map((o, i) => {
		const esUltima = i === lista.length - 1;
		const fronteraSvh = esUltima ? null : o.pinHastaSvh + 50;
		const desdePct = svhAPct(o.desdeSvh);
		const hastaPct = svhAPct(o.hastaSvh);
		const pinHastaPct = svhAPct(o.pinHastaSvh);
		const fronteraPct = fronteraSvh === null ? null : svhAPct(fronteraSvh);
		return {
			id: o.id,
			desdeSvh: o.desdeSvh,
			hastaSvh: o.hastaSvh,
			pinHastaSvh: o.pinHastaSvh,
			fronteraSvh,
			desdePct,
			hastaPct,
			pinHastaPct,
			fronteraPct,
			centroPct: (desdePct + hastaPct) / 2,
		};
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

// ================================================================================================
// Tablas de DATOS (sin CSS) que consume escenario-keyframes.ts — Bloque E, §4.1/§4.3 del plan.
// ================================================================================================

export interface EstadoTelefono {
	/** % del ancla (100vw × 100svh), eje X. */
	x: number;
	/** % del ancla, eje Y. */
	y: number;
	/** Sobre un celular base de 56svh de alto (Telefono.astro). */
	escala: number;
}

/** Posición del celular por sección y breakpoint — §4.3 del plan de Bloque E. La rotación 3D de
 * `que-es` (−16° → 0°, solo desktop) NO vive acá: es un caso especial que resuelve
 * `keyframesTelefono` directamente, porque es la única sección donde `--tel-rot` vale algo
 * distinto de 0. Valores INICIALES: se afinan en E13, solo tocando esta tabla, con capturas. */
export const TELEFONO: Record<string, { escritorio: EstadoTelefono; movil: EstadoTelefono }> = {
	'que-es': {
		escritorio: { x: 20, y: 0, escala: 1 },
		movil: { x: 0, y: 30, escala: 0.88 },
	},
	'que-hace': {
		escritorio: { x: 27, y: 2, escala: 0.86 },
		// y: 40 → 44 (E8 del plan, mobile, ajuste explícitamente autorizado: "si C2 falla porque
		// las 3 tarjetas no entran arriba del celular, primero se sube y ... hasta 44%"). Verificado
		// con el verificador contra 390×844 y 369×698: seguía sin alcanzar, así que además se aplicó
		// la 2ª mitad de esa misma instrucción — las tarjetas pasan a título + ítems en una línea
		// (P2QueHace.astro, mobile).
		//
		// AJUSTE DEL EJECUTOR sobre el plan (E13), con evidencia: y: 44 → 58. El verificador con
		// `--reducido` (movimiento reducido) encontró C2 en FAIL en 390×844/369×698 — el cierre
		// ("La red transforma... valor para cada lugar") se muestra siempre bajo movimiento
		// reducido (P2QueHace.astro:374-380, ya no espera su animación de entrada por scroll) y su
		// última línea quedaba detrás de `.telefono__marco` (medido con getBoundingClientRect: el
		// texto terminaba 31px más abajo que el borde superior del celular en 390×844, 12,5px en
		// 369×698). Bajo movimiento normal no se nota porque el cierre recién se hace visible al
		// 70% del tramo, cuando el scroll ya pasó este punto. El `y` es un % de la ALTURA del
		// viewport (translate relativo a `.escenario__ancla`, `height:100svh`), así que el mismo %
		// mueve menos px en el viewport más bajo (369×698) — 52 alcanzaba en 390×844 pero no en
		// 369×698. y:58 deja margen medido en los dos (≈29px en 390×844, ≈24px en 369×698) sin
		// arriesgar el mínimo de C1 (25% visible): con y:44 el celular estaba al 65% visible.
		movil: { x: 0, y: 58, escala: 0.72 },
	},
	'como-lo-hace': {
		escritorio: { x: -25, y: 2, escala: 0.84 },
		movil: { x: 0, y: 40, escala: 0.72 },
	},
	donde: {
		escritorio: { x: 25, y: 2, escala: 0.9 },
		movil: { x: 0, y: 34, escala: 0.8 },
	},
	cierre: {
		escritorio: { x: 0, y: 0, escala: 1.04 },
		movil: { x: 0, y: 30, escala: 0.88 },
	},
};

export interface FondoSeccion {
	/** Uno o más nombres de custom property de color de `tokens.css` (con el `--` incluido). Para
	 * `donde`, 6 tokens (uno por ruta, mismo orden que `rutas.ts`); para el resto, uno solo. */
	tokens: string[];
	/** Fracción (0-1) de `--color-marino-noche` mezclada por encima — solo `donde` (§4.1:
	 * "color-mix(ruta 80%, marino-noche)" → 0.2 de noche, 0.8 de ruta). */
	mezclaNoche?: number;
	/** Si esta sección pinta el glow radial de P1 (lo agrega `Escenario.astro` aparte, ver
	 * `keyframesGlow`). */
	glow?: boolean;
}

/** Extrae el nombre del custom property de un valor tipo `var(--color-ruta-vino)`. */
function tokenDeVar(valor: string): string {
	const m = /--[\w-]+/.exec(valor);
	if (!m) throw new Error(`escenario.ts: "${valor}" no tiene la forma var(--nombre-token)`);
	return m[0];
}

/** Fondo, rótulo y glow por sección — tabla §4.1 del plan de Bloque E (sustituye a la de §11.3). */
export const FONDO: Record<string, FondoSeccion> = {
	'que-es': { tokens: ['--color-marino-noche'], glow: true },
	'que-hace': { tokens: ['--color-verde'] },
	'como-lo-hace': { tokens: ['--color-marino-noche'] },
	donde: { tokens: rutas.map((r) => tokenDeVar(r.colorTrazo)), mezclaNoche: 0.2 },
	cierre: { tokens: ['--color-arena'] },
};

/** Tratamiento del rótulo "Vista conceptual de la app" (claro/oscuro) por sección — §4.1. */
export const ROTULO: Record<string, 'oscuro' | 'claro'> = {
	'que-es': 'oscuro',
	'que-hace': 'claro',
	'como-lo-hace': 'oscuro',
	donde: 'oscuro',
	cierre: 'claro',
};
