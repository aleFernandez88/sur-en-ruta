/**
 * telefono.ts — progreso de scroll del documento → estado del demo → postMessage al iframe
 * (docs/planes/2026-09-22-recomposicion-ui-vertical.md §14.2.a, paso 15 del plan — Paso 1.3
 * parcial de §5; reescrito en Bloque E, E5, docs/planes/2026-09-23-bloque-e-secciones-chrome.md
 * §5, que corrige los hallazgos H6a-c). Lo arranca `Escenario.astro` (paso 10) SIEMPRE, tenga o no
 * un `<iframe>` real del otro lado (modo 'vivo'/'imagen' de `Telefono.astro`) — el rótulo "Vista
 * conceptual de la app" pulsa al cambiar de sección pase lo que pase con el demo.
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
 *
 * === Qué corrige el Bloque E (H6a-c) respecto de la versión de Bloque C/D ===
 * (a) La sección "actual" cambiaba en `desdePct` (el instante en que la sección EMPIEZA a
 *     asomar), no en la FRONTERA (la mitad del tramo de transición, §4.2) — el demo saltaba de
 *     pantalla antes de que la sección anterior terminara de irse de la vista. Ahora
 *     `idSeccionActual` cambia justo en `fronteraPct` de la sección anterior, exactamente donde
 *     cambian el fondo y el rótulo (mismo punto, misma tabla — alineados por construcción).
 * (b) `local` (el progreso DENTRO de una sección) se medía contra la sección ENTERA
 *     (`[desdePct,hastaPct]`), pero el contenido solo está pineado en `[desdePct,pinHastaPct]` — el
 *     demo llegaba tarde a su último estado. Ahora se mide contra la MESETA.
 * (c) `pin: null` en `que-es`/`cierre` "no cambiaba nada" del lado del demo (no es un protocolo
 *     declarativo de verdad: si el usuario volvía de `que-hace` a `que-es`, quedaba seleccionado
 *     el pin 1 de la sección anterior). Ahora esas dos secciones piden `pin: 0` explícito.
 */
import { offsets, type Offset } from './escenario.ts';

export interface EstadoDemo {
	pantalla: 'mapa' | 'rutas' | 'perfil';
	scroll: number;
	pin: number | null;
	ficha: 'colapsada' | 'expandida';
	animar: boolean;
}

/** La sección "actual" es la ÚLTIMA cuya FRONTERA ANTERIOR (la de la sección previa) ya se cruzó —
 * la primera sección no tiene frontera anterior, así que siempre es la base. Mismo criterio que
 * usan `escenario-keyframes.ts` (fondo/rótulo) para cambiar de estado: quedan alineados por
 * construcción (H6a resuelto). */
function seccionActual(pct: number, secciones: Offset[]): Offset {
	let actual = secciones[0];
	for (let i = 1; i < secciones.length; i++) {
		const fronteraAnterior = secciones[i - 1].fronteraPct;
		if (fronteraAnterior !== null && pct >= fronteraAnterior) actual = secciones[i];
	}
	return actual;
}

/** `progreso01` = fracción de scroll del DOCUMENTO entero (0..1). Expuesto aparte de
 * `estadoParaProgreso` para que `iniciar()` pueda detectar el CAMBIO de sección (pulso del rótulo,
 * §14.4) sin recalcular el mismo criterio dos veces con lógica duplicada. */
export function idSeccionActual(progreso01: number): string {
	const p = Math.max(0, Math.min(1, progreso01)) * 100;
	return seccionActual(p, offsets()).id;
}

/** Qué estado dicta cada sección, según su progreso LOCAL dentro de la MESETA pineada (0..1) —
 * tabla de §4.4 del plan de Bloque E (sustituye a la de §14.2.a). */
function estadoParaSeccion(id: string, local: number): EstadoDemo {
	switch (id) {
		case 'que-es':
			// La app respira, no cambia de contexto: P1 se lee sin scrollear (CLAUDE.md §1).
			// `pin: 0` explícito (H6c) — antes `null` "no cambiaba nada" y quedaba lo que hubiera
			// seleccionado la sección anterior si el usuario volvía para atrás.
			return { pantalla: 'mapa', scroll: local * 0.25, pin: 0, ficha: 'colapsada', animar: true };

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
			// Beat A (local < 0.35): las 4 herramientas + el cierre del beat, sección todavía en
			// su estado de reposo. Beat B (el resto): 5 pasos del carril, uno por 1/5 de `b`.
			if (local < 0.35) return { pantalla: 'mapa', scroll: 0, pin: 0, ficha: 'colapsada', animar: true };
			const b = Math.min(1, (local - 0.35) / 0.6);
			if (b < 0.2) return { pantalla: 'mapa', scroll: 0, pin: 0, ficha: 'colapsada', animar: true };
			if (b < 0.4) return { pantalla: 'mapa', scroll: 0, pin: 0, ficha: 'expandida', animar: true };
			if (b < 0.6) return { pantalla: 'rutas', scroll: 0, pin: null, ficha: 'colapsada', animar: true };
			if (b < 0.8) return { pantalla: 'perfil', scroll: 0, pin: null, ficha: 'colapsada', animar: true };
			return {
				pantalla: 'perfil',
				scroll: (b - 0.8) / 0.2,
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
			// Vuelve al inicio: cierra el círculo. `pin: 0` explícito (H6c, igual que `que-es`).
			// animar:false — no hay nada que transicionar, ya llegamos.
			return { pantalla: 'mapa', scroll: 0, pin: 0, ficha: 'colapsada', animar: false };
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
	const actual = seccionActual(p, secciones);

	// `local` se mide contra la MESETA pineada (`[desdePct, pinHastaPct]`), no contra la sección
	// entera (H6b) — fuera de la meseta (en pleno tramo de transición hacia la sección siguiente)
	// clampea a 1: el demo ya llegó a su último estado y se queda ahí hasta que cambie la sección
	// "actual" (en la frontera, ver `seccionActual`).
	const rango = actual.pinHastaPct - actual.desdePct;
	const local = rango > 0 ? Math.max(0, Math.min(1, (p - actual.desdePct) / rango)) : 1;

	const estado = estadoParaSeccion(actual.id, local);
	estado.scroll = redondear(estado.scroll);
	return estado;
}

/**
 * Arranca el loop sobre un `<iframe>` ya montado, o sobre `null` en modo 'imagen' (fallback N3,
 * §14.1): el loop sigue corriendo igual (el rótulo pulsa al cambiar de sección pase lo que pase
 * con el demo), pero sin postear nada — no hay nada del otro lado que escuche.
 *
 * Un solo `requestAnimationFrame`, con guarda de igualdad — ver el comentario grande del
 * frontmatter. `prefers-reduced-motion` fuerza `animar:false` siempre (§14.3): el celular sigue
 * cambiando de pantalla con el scroll, pero sin transición — reducir movimiento no es congelar el
 * producto.
 */
export function iniciar(iframe: HTMLIFrameElement | null): void {
	const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const rotulo = document.querySelector<HTMLElement>('.escenario__rotulo');
	let ultimoJSON: string | null = null;
	let ultimaSeccionId: string | null = null;
	let temporizadorPulso: ReturnType<typeof setTimeout> | null = null;
	let detenido = false;

	// Cuando el demo avisa que está listo (receptor temprano de Base.astro), se descarta la
	// guarda de igualdad para que el próximo tick reenvíe el estado: el que se posteó antes de
	// que el iframe escuchara se perdió.
	window.addEventListener('sur-en-ruta:demo-listo', () => {
		ultimoJSON = null;
	});

	function tick() {
		if (detenido) return;
		const doc = document.documentElement;
		const maximo = doc.scrollHeight - doc.clientHeight;
		const progreso = maximo > 0 ? window.scrollY / maximo : 0;

		// Pulso del rótulo (§14.4) — se salta el primer tick (ultimaSeccionId === null) para no
		// pulsar apenas carga la página, antes de que el usuario haya cambiado nada.
		const seccionId = idSeccionActual(progreso);
		if (rotulo && seccionId !== ultimaSeccionId) {
			if (ultimaSeccionId !== null) {
				rotulo.classList.add('escenario__rotulo--pulso');
				if (temporizadorPulso !== null) clearTimeout(temporizadorPulso);
				temporizadorPulso = setTimeout(() => rotulo.classList.remove('escenario__rotulo--pulso'), 600);
			}
			ultimaSeccionId = seccionId;
		}

		const estado = estadoParaProgreso(progreso);
		if (prefiereMenosMovimiento) estado.animar = false;

		if (iframe) {
			const json = JSON.stringify(estado);
			if (json !== ultimoJSON) {
				ultimoJSON = json;
				iframe.contentWindow?.postMessage(
					{ fuente: 'sur-en-ruta', tipo: 'estado', ...estado },
					location.origin,
				);
			}
		}

		requestAnimationFrame(tick);
	}

	requestAnimationFrame(tick);
}
