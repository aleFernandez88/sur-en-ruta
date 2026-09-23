/**
 * escenario-keyframes.ts — genera los 4 `@keyframes` del escenario vertical a partir de las tablas
 * de `escenario.ts` (docs/planes/2026-09-23-bloque-e-secciones-chrome.md §3.2 opción C, §4.2, E3).
 *
 * Funciones PURAS: no importan nada de Astro ni usan `?raw` (esa lectura de `tokens.css` la hace
 * quien llama — `Escenario.astro` con `import tokensCss from '../styles/tokens.css?raw'` en el
 * sitio real, o `fs.readFileSync` en `probar-modelo.mjs` para poder probarlas en Node sin Vite).
 * Sí importan `escenario.ts` (tablas de datos simples, sin sintaxis de Astro) — sería redundante
 * copiar `ESCENARIO`/`TELEFONO`/`FONDO`/`ROTULO`/`offsets()` acá.
 *
 * === Por qué el hex se resuelve en build time (opción C de §3.2) ===
 * Animar `--escenario-fondo` (una custom property `<color>` registrada) implica poner `var(--color-x)`
 * DENTRO de un `@keyframes` para que Chrome/Safari lo resuelvan — el mismo gotcha que ya costó 2
 * iteraciones (restricción 3 de escenario.ts) y sin Safari a mano para probarlo hoy. Acá el valor
 * sale ya resuelto a hex LITERAL desde `tokens.css`, leído en build time: cero riesgo de navegador,
 * y si falta un token o no es hex, el build falla ruidosamente (ver `requerirToken`).
 */
import { ESCENARIO, FONDO, ROTULO, TELEFONO, TOTAL_SVH, offsets } from './escenario.ts';
import { rutas } from '../data/rutas.ts';

// ================================================================================================
// Tokens: parseo de tokens.css + mezcla sRGB (misma familia que `color-mix(in srgb, …)`)
// ================================================================================================

/** Toma solo declaraciones `--nombre: #hex;` de un CSS — el resto (var(), calc(), etc.) se
 * ignora a propósito: un token pedido que no aparezca acá (porque no existe o no es hex literal)
 * lo detecta `requerirToken`, no esta función. */
export function parsearTokens(css: string): Record<string, string> {
	const tokens: Record<string, string> = {};
	const re = /(--[\w-]+)\s*:\s*#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\s*;/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(css))) {
		let hex = m[2];
		if (hex.length === 3)
			hex = hex
				.split('')
				.map((c) => c + c)
				.join('');
		tokens[m[1]] = `#${hex.toLowerCase()}`;
	}
	return tokens;
}

function requerirToken(tokens: Record<string, string>, nombre: string): string {
	const valor = tokens[nombre];
	if (!valor) {
		throw new Error(
			`escenario-keyframes.ts: el token "${nombre}" no existe en tokens.css o no es un hex literal.`,
		);
	}
	return valor;
}

function hexARgb(hex: string): [number, number, number] {
	const limpio = hex.replace('#', '');
	const par = [0, 2, 4].map((i) => parseInt(limpio.slice(i, i + 2), 16));
	return [par[0], par[1], par[2]];
}

function rgbAHex([r, g, b]: [number, number, number]): string {
	const c = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
	return `#${c(r)}${c(g)}${c(b)}`;
}

/** Mezcla sRGB tipo `color-mix(in srgb, hexA pA%, hexB)` — interpolación lineal por canal. */
export function mezclar(hexA: string, hexB: string, pA: number): string {
	const a = hexARgb(hexA);
	const b = hexARgb(hexB);
	const t = pA / 100;
	const mezcla: [number, number, number] = [
		a[0] * t + b[0] * (1 - t),
		a[1] * t + b[1] * (1 - t),
		a[2] * t + b[2] * (1 - t),
	];
	return rgbAHex(mezcla);
}

// ================================================================================================
// Helper compartido: stops → texto de @keyframes, validando % monótono no decreciente.
// ================================================================================================

interface Stop {
	pct: number;
	props: Record<string, string>;
}

function construirBloqueKeyframes(nombre: string, stops: Stop[]): string {
	let anterior = -Infinity;
	for (const s of stops) {
		if (s.pct < anterior) {
			throw new Error(
				`escenario-keyframes.ts: "${nombre}" tiene un % que retrocede (${s.pct} < ${anterior}) — los stops deben ser monótonos no decrecientes.`,
			);
		}
		anterior = s.pct;
	}
	const cuerpo = stops
		.map((s) => {
			const props = Object.entries(s.props)
				.map(([k, v]) => `${k}: ${v};`)
				.join(' ');
			return `  ${s.pct.toFixed(3)}% { ${props} }`;
		})
		.join('\n');
	return `@keyframes ${nombre} {\n${cuerpo}\n}`;
}

function svhAPctFactory() {
	const total = TOTAL_SVH - 100;
	return (svh: number) => Math.min(100, Math.max(0, (svh / total) * 100));
}

// ================================================================================================
// keyframesTelefono — --tel-x/--tel-y/--tel-escala/--tel-rot, un keyframes por breakpoint.
// ================================================================================================

/**
 * 2 stops por sección (uno en `desdePct`, otro en `pinHastaPct`, la meseta pineada) salvo la
 * última (`cierre`), que aporta 1 solo porque `desdePct === pinHastaPct` (no hay meseta: la
 * sección entra y el documento termina). La rampa de TRANSICIÓN entre dos secciones no necesita un
 * stop propio: sale sola de la interpolación lineal entre el `pinHastaPct` de una sección y el
 * `desdePct` de la siguiente — dos valores normalmente distintos a distinto %.
 */
export function keyframesTelefono(modo: 'escritorio' | 'movil'): string {
	const off = offsets();
	const stops: Stop[] = [];

	for (const o of off) {
		const estado = TELEFONO[o.id]?.[modo];
		if (!estado) throw new Error(`escenario-keyframes.ts: falta TELEFONO["${o.id}"].${modo}`);

		// Rotación 3D: SOLO "que-es" y SOLO en desktop (§4.3 — "en móvil siempre 0deg"; el resto de
		// las secciones tampoco rota nunca, en ningún breakpoint).
		const esQueEsEscritorio = o.id === 'que-es' && modo === 'escritorio';
		const rotDesde = esQueEsEscritorio ? -16 : 0;
		const rotHasta = 0;

		const propsBase = {
			'--tel-x': `${estado.x}%`,
			'--tel-y': `${estado.y}%`,
			'--tel-escala': `${estado.escala}`,
		};

		if (o.pinHastaPct > o.desdePct) {
			stops.push({ pct: o.desdePct, props: { ...propsBase, '--tel-rot': `${rotDesde}deg` } });
			stops.push({ pct: o.pinHastaPct, props: { ...propsBase, '--tel-rot': `${rotHasta}deg` } });
		} else {
			// Sección sin meseta (cierre): un solo stop, sin rotación posible (nunca es "que-es").
			stops.push({ pct: o.desdePct, props: { ...propsBase, '--tel-rot': '0deg' } });
		}
	}

	return construirBloqueKeyframes(`tel-${modo}`, stops);
}

// ================================================================================================
// keyframesFondo — --escenario-fondo (<color>) + --rotulo-claro (0|1), un solo keyframes.
// ================================================================================================

function colorDeSeccion(tokens: Record<string, string>, id: string, rutaIndex?: number): string {
	const f = FONDO[id];
	if (!f) throw new Error(`escenario-keyframes.ts: falta FONDO["${id}"]`);
	if (id === 'donde') {
		if (rutaIndex === undefined) {
			throw new Error('escenario-keyframes.ts: colorDeSeccion("donde", …) necesita rutaIndex.');
		}
		const tokenRuta = f.tokens[rutaIndex];
		if (!tokenRuta) throw new Error(`escenario-keyframes.ts: "donde" no tiene token para la ruta ${rutaIndex}.`);
		const hexRuta = requerirToken(tokens, tokenRuta);
		const hexNoche = requerirToken(tokens, '--color-marino-noche');
		const pctRuta = (1 - (f.mezclaNoche ?? 0)) * 100;
		return mezclar(hexRuta, hexNoche, pctRuta);
	}
	return requerirToken(tokens, f.tokens[0]);
}

function rotuloValor(id: string): string {
	const v = ROTULO[id];
	if (!v) throw new Error(`escenario-keyframes.ts: falta ROTULO["${id}"]`);
	return v === 'claro' ? '1' : '0';
}

/**
 * Mesetas por sección (color plano) con ventanas de transición de ±15svh en cada frontera entre
 * secciones (§4.2/§4.1). Dentro de `donde`, 6 sub-mesetas —una por ruta, en el orden de
 * `rutas.ts`— repartidas parejo en `[desde, pinHasta]` de la sección, con ventanas internas de
 * ±4svh entre rutas consecutivas (más angostas: son 6 cambios en el mismo tramo de una sección,
 * no el cambio de tema de una sección a otra).
 */
export function keyframesFondo(tokens: Record<string, string>): string {
	const off = offsets();
	const svhAPct = svhAPctFactory();
	const total = TOTAL_SVH - 100;
	const stops: Stop[] = [];

	off.forEach((o, i) => {
		const anterior = i === 0 ? null : off[i - 1];
		// Arranque de la meseta/tramo de esta sección: justo donde termina la ventana de
		// transición de la frontera ANTERIOR (o 0svh si es la primera sección).
		const inicioSeccion = anterior && anterior.fronteraSvh !== null ? anterior.fronteraSvh + 15 : 0;
		// Fin: justo donde arranca la ventana de transición de la PROPIA frontera (o el final del
		// documento si es la última sección, `cierre`, que no tiene frontera).
		const finSeccion = o.fronteraSvh !== null ? o.fronteraSvh - 15 : total;
		const rotulo = rotuloValor(o.id);

		if (o.id !== 'donde') {
			const color = colorDeSeccion(tokens, o.id);
			stops.push({ pct: svhAPct(inicioSeccion), props: { '--escenario-fondo': color, '--rotulo-claro': rotulo } });
			stops.push({ pct: svhAPct(finSeccion), props: { '--escenario-fondo': color, '--rotulo-claro': rotulo } });
		} else {
			const rango = o.pinHastaSvh - o.desdeSvh;
			for (let k = 0; k < 6; k++) {
				const inicioRuta = k === 0 ? inicioSeccion : o.desdeSvh + (k / 6) * rango + 4;
				const finRuta = k === 5 ? finSeccion : o.desdeSvh + ((k + 1) / 6) * rango - 4;
				const color = colorDeSeccion(tokens, 'donde', k);
				stops.push({ pct: svhAPct(inicioRuta), props: { '--escenario-fondo': color, '--rotulo-claro': rotulo } });
				stops.push({ pct: svhAPct(finRuta), props: { '--escenario-fondo': color, '--rotulo-claro': rotulo } });
			}
		}
	});

	return construirBloqueKeyframes('escenario-fondo', stops);
}

// ================================================================================================
// keyframesGlow — el glow radial de "que-es", visible solo mientras esa sección está en pantalla.
// ================================================================================================

/** Opacidad 1 hasta `frontera_0 − 15svh` y 0 desde `frontera_0 + 15svh` — la MISMA ventana que usa
 * `keyframesFondo` para pasar de "que-es" a "que-hace", así quedan sincronizados por construcción. */
export function keyframesGlow(): string {
	const off = offsets();
	const svhAPct = svhAPctFactory();
	const frontera0 = off[0]?.fronteraSvh;
	if (frontera0 === null || frontera0 === undefined) {
		throw new Error('escenario-keyframes.ts: la primera sección no tiene frontera (¿ESCENARIO vacío?).');
	}
	const stops: Stop[] = [
		{ pct: 0, props: { opacity: '1' } },
		{ pct: svhAPct(frontera0 - 15), props: { opacity: '1' } },
		{ pct: svhAPct(frontera0 + 15), props: { opacity: '0' } },
		{ pct: 100, props: { opacity: '0' } },
	];
	return construirBloqueKeyframes('escenario-glow', stops);
}
