/**
 * telefono.ts — progreso de scroll del documento → estado del demo → postMessage al iframe
 * (docs/planes/2026-09-22-recomposicion-ui-vertical.md §14.2.a, paso 15 del plan — Paso 1.3
 * parcial de §5). Lo arranca `Escenario.astro` sobre su propio `<iframe>` (modo 'vivo' de
 * `Telefono.astro`); en modo 'imagen' no hay nada que comandar.
 *
 * Es un solo `requestAnimationFrame` (no un listener de `scroll` propio, restricción de §14.2.a)
 * con guarda de igualdad: si el estado calculado es idéntico al último mandado, no postea nada —
 * sino, cada frame de scroll dispararía un mensaje, y la restricción del plan es explícita
 * ("un solo postMessage por frame COMO MUCHO", no uno siempre).
 *
 * === Por qué `scroll` se redondea a un paso de 0.1 ===
 * `que-es`, el último tramo de `como-lo-hace` y `donde` mandan un `scroll` que varía CONTINUO con
 * el progreso — sin redondear, la guarda de igualdad nunca frenaría nada ahí (un float distinto en
 * cada frame) y el total de mensajes por scrolleo completo sería cientos, no "menos de ~40" como
 * pide la verificación del plan. Redondear a 0.1 (11 pasos por tramo continuo) es la granularidad
 * más fina que cumple ese objetivo con las 5 secciones actuales — medido en vivo con un
 * `console.count` del lado del receptor, ver la verificación del paso 15.
 */
import { offsets } from './escenario.ts';

export interface EstadoDemo {
	pantalla: 'mapa' | 'rutas' | 'perfil';
	scroll: number;
	pin: number | null;
	ficha: 'colapsada' | 'expandida';
	animar: boolean;
}

/** Qué estado dicta cada sección, según su progreso LOCAL (0..1) — tabla de §14.2.a. */
function estadoParaSeccion(id: string, local: number): EstadoDemo {
	switch (id) {
		case 'que-es':
			// La app respira, no cambia de contexto: P1 se lee sin scrollear (CLAUDE.md §1).
			return { pantalla: 'mapa', scroll: local * 0.25, pin: null, ficha: 'colapsada', animar: true };

		case 'que-hace':
			// La ficha real de un punto es la prueba visual de "información clara" — se expande
			// cuando aparece la 2ª tarjeta de beneficio (mitad del tramo, aproximado).
			return {
				pantalla: 'mapa',
				scroll: 0,
				pin: 1,
				ficha: local >= 0.5 ? 'expandida' : 'colapsada',
				animar: true,
			};

		case 'como-lo-hace': {
			// 5 pasos del beat B, un estado por tramo de 1/5 — "01 mapa+pin:0 · 02 mapa+ficha:
			// expandida · 03 rutas scroll:0 · 04 perfil · 05 perfil scroll:1" (§14.2.a).
			if (local < 0.2) return { pantalla: 'mapa', scroll: 0, pin: 0, ficha: 'colapsada', animar: true };
			if (local < 0.4) return { pantalla: 'mapa', scroll: 0, pin: 0, ficha: 'expandida', animar: true };
			if (local < 0.6) return { pantalla: 'rutas', scroll: 0, pin: null, ficha: 'colapsada', animar: true };
			if (local < 0.8) return { pantalla: 'perfil', scroll: 0, pin: null, ficha: 'colapsada', animar: true };
			return {
				pantalla: 'perfil',
				scroll: (local - 0.8) / 0.2,
				pin: null,
				ficha: 'colapsada',
				animar: true,
			};
		}

		case 'donde':
			// El scroll de la página ES el scroll de la lista de rutas.
			return { pantalla: 'rutas', scroll: local, pin: null, ficha: 'colapsada', animar: true };

		case 'cierre':
		default:
			// Vuelve al inicio: cierra el círculo. animar:false — no hay nada que transicionar,
			// ya llegamos.
			return { pantalla: 'mapa', scroll: 0, pin: null, ficha: 'colapsada', animar: false };
	}
}

/** Redondea a un paso de 0.1 — ver el comentario grande del frontmatter. */
function redondear(n: number): number {
	return Math.round(n * 10) / 10;
}

/** `progreso01` = fracción de scroll del DOCUMENTO entero (0..1, no de una sección). */
export function estadoParaProgreso(progreso01: number): EstadoDemo {
	const p = Math.max(0, Math.min(1, progreso01)) * 100;
	const secciones = offsets();

	let actual = secciones[0];
	for (const s of secciones) {
		if (p >= s.desdePct) actual = s;
	}

	const rango = actual.hastaPct - actual.desdePct;
	const local = rango > 0 ? Math.max(0, Math.min(1, (p - actual.desdePct) / rango)) : 1;

	const estado = estadoParaSeccion(actual.id, local);
	estado.scroll = redondear(estado.scroll);
	return estado;
}

/**
 * Arranca el loop sobre un `<iframe>` ya montado. Un solo `requestAnimationFrame`, con guarda de
 * igualdad — ver el comentario grande del frontmatter. `prefers-reduced-motion` fuerza
 * `animar:false` siempre (§14.3): el celular sigue cambiando de pantalla con el scroll, pero sin
 * transición — reducir movimiento no es congelar el producto.
 */
export function iniciar(iframe: HTMLIFrameElement): void {
	const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	let ultimoJSON: string | null = null;
	let detenido = false;

	function tick() {
		if (detenido) return;
		const doc = document.documentElement;
		const maximo = doc.scrollHeight - doc.clientHeight;
		const progreso = maximo > 0 ? window.scrollY / maximo : 0;

		const estado = estadoParaProgreso(progreso);
		if (prefiereMenosMovimiento) estado.animar = false;

		const json = JSON.stringify(estado);
		if (json !== ultimoJSON) {
			ultimoJSON = json;
			iframe.contentWindow?.postMessage(
				{ fuente: 'sur-en-ruta', tipo: 'estado', ...estado },
				location.origin,
			);
		}

		requestAnimationFrame(tick);
	}

	requestAnimationFrame(tick);
}
