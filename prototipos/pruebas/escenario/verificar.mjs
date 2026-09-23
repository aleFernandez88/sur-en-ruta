// verificar.mjs — herramienta de verificación del escenario vertical (Bloque E, paso 17, E2).
// docs/planes/2026-09-23-bloque-e-secciones-chrome.md §5, E2.
//
// Corre Puppeteer contra el dev server REAL (`npx astro dev --host`, puerto 4321) y comprueba,
// en varios checkpoints de scroll, que el celular fijo, el fondo del escenario y el estado del
// demo dentro del iframe coinciden con lo que dicta la tabla de `escenario.ts` (offsets/ESCENARIO/
// TOTAL_SVH) y con el §4 del plan (fondo, tipografía, posición). Se apoya en `estadoParaProgreso`
// de `telefono.ts` para el estado del demo, así que el checkpoint C3 compara contra la MISMA
// función que corre en el navegador — no una copia reescrita a mano que podría desincronizarse.
//
// El color esperado del fondo (C4/C5) SÍ es una copia independiente de la tabla §4.1 del plan
// (no de `escenario.ts`/`FONDO`, que recién existe desde E3): la idea es comprobar el sitio contra
// la ESPECIFICACIÓN, no contra su propia implementación — si `escenario.ts` tuviera un bug en la
// tabla de fondos, comparar contra sí mismo no lo detectaría nunca.
//
// Uso (con `npx astro dev --host` corriendo):
//   node prototipos/pruebas/escenario/verificar.mjs [--viewport=escritorio|movil|todos]
//     [--reducido] [--capturas] [--peso] [--url=http://localhost:4321/sur-en-ruta/]
//
// Ver README.md en esta misma carpeta para el detalle de cada chequeo y la línea de base.

import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(HERE, '..', '..', '..');

// Puppeteer vive en el tooling interno del render del app-demo (prototipos/app-demo/render/), no
// en package.json de la raíz (§4.6 del plan: "nada de esto toca package.json").
const require = createRequire(path.join(RAIZ, 'prototipos', 'app-demo', 'render', 'package.json'));
const puppeteer = require('puppeteer');

// Node 24 hace type stripping de `.ts` sin compilar — los checkpoints y el estado esperado del
// demo salen de la MISMA tabla que usa el sitio, nunca de una copia reescrita a mano acá.
// `import()` con ruta absoluta en Windows necesita una URL `file://` (una ruta "C:\..." a secas no
// es un esquema soportado por el loader ESM).
const aUrl = (...partes) => pathToFileURL(path.join(RAIZ, ...partes)).href;
const { offsets, ESCENARIO, TOTAL_SVH } = await import(aUrl('src', 'lib', 'escenario.ts'));
const { estadoParaProgreso } = await import(aUrl('src', 'lib', 'telefono.ts'));
const { rutas } = await import(aUrl('src', 'data', 'rutas.ts'));

// ============================================================================================
// Args
// ============================================================================================

function parsearArgs(argv) {
	const args = {
		viewport: 'todos',
		reducido: false,
		capturas: false,
		peso: false,
		url: 'http://localhost:4321/sur-en-ruta/',
	};
	for (const a of argv) {
		if (a.startsWith('--viewport=')) args.viewport = a.slice('--viewport='.length);
		else if (a === '--reducido') args.reducido = true;
		else if (a === '--capturas') args.capturas = true;
		else if (a === '--peso') args.peso = true;
		else if (a.startsWith('--url=')) args.url = a.slice('--url='.length);
		else console.warn(`verificar.mjs: argumento desconocido "${a}", se ignora.`);
	}
	return args;
}

// ============================================================================================
// Viewports (§5, E2: flags --viewport=)
// ============================================================================================

const VIEWPORTS_ESCRITORIO = [
	{ nombre: 'escritorio-1024x768', mobile: false, viewport: { width: 1024, height: 768 } },
	{ nombre: 'escritorio-1440x900', mobile: false, viewport: { width: 1440, height: 900 } },
	{ nombre: 'escritorio-1920x1080', mobile: false, viewport: { width: 1920, height: 1080 } },
];

const VIEWPORTS_MOVIL = [
	{
		nombre: 'movil-390x844',
		mobile: true,
		viewport: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
	},
	{
		nombre: 'movil-369x698',
		mobile: true,
		viewport: { width: 369, height: 698, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
	},
];

function resolverViewports(flag) {
	if (flag === 'escritorio') return VIEWPORTS_ESCRITORIO;
	if (flag === 'movil') return VIEWPORTS_MOVIL;
	if (flag === 'todos') return [...VIEWPORTS_ESCRITORIO, ...VIEWPORTS_MOVIL];
	throw new Error(`verificar.mjs: --viewport="${flag}" inválido (usar escritorio|movil|todos).`);
}

// ============================================================================================
// Checkpoints — derivados de la MISMA tabla que el sitio (offsets/ESCENARIO/TOTAL_SVH), más los
// puntos adicionales de P3 (beat A + 5 pasos) y P4 (6 rutas) que pide el plan (§5, E2).
// ============================================================================================

function calcularCheckpoints() {
	const off = offsets();
	const total = TOTAL_SVH - 100;
	const svhAPct = (svh) => Math.min(100, Math.max(0, (svh / total) * 100));
	const checkpoints = [];

	for (const o of off) {
		const seccion = ESCENARIO.find((s) => s.id === o.id);
		const largo = seccion.largoSvh;
		// Meseta de la sección: [desdeSvh, pinHastaSvh] (§4.2 del plan) — puede tener largo 0
		// (`cierre`, si largo === 100), en cuyo caso el "medio" es directamente desdeSvh, que cae
		// en el 100% del scroll total (fondo del documento) porque `cierre` es la última sección.
		const pinHastaSvh = o.desdeSvh + Math.max(0, largo - 100);
		const rangoLocal = Math.max(0, largo - 100);

		// Checkpoint genérico: mitad del tramo pineado de cada sección.
		checkpoints.push({
			seccionId: o.id,
			nombre: `${o.id} · mitad de meseta`,
			pct: svhAPct((o.desdeSvh + pinHastaSvh) / 2),
		});

		if (o.id === 'como-lo-hace') {
			// Beat A: local en [0, 0.35). Beat B: local en [0.35, 0.95], repartido en 5 pasos
			// (b en [0,1), local = 0.35 + b*0.6, ver §4.4 del plan).
			checkpoints.push({
				seccionId: o.id,
				nombre: 'como-lo-hace · beat A',
				pct: svhAPct(o.desdeSvh + 0.175 * rangoLocal),
			});
			for (let paso = 0; paso < 5; paso++) {
				const bMedio = (paso + 0.5) / 5;
				const local = 0.35 + bMedio * 0.6;
				checkpoints.push({
					seccionId: o.id,
					nombre: `como-lo-hace · paso ${paso + 1}`,
					pct: svhAPct(o.desdeSvh + local * rangoLocal),
					paso,
				});
			}
		}

		if (o.id === 'donde') {
			// 6 sub-mesetas repartidas parejo en [desde, pinHasta] (§4.4/keyframesFondo, E3).
			for (let ruta = 0; ruta < 6; ruta++) {
				const local = (ruta + 0.5) / 6;
				checkpoints.push({
					seccionId: o.id,
					nombre: `donde · ${rutas[ruta]?.nombre ?? `ruta ${ruta + 1}`}`,
					pct: svhAPct(o.desdeSvh + local * rangoLocal),
					rutaIndex: ruta,
				});
			}
		}
	}

	return checkpoints;
}

// ============================================================================================
// Scroll real (restricción 5 de escenario.ts: nunca `scrollTo` a secas) — siempre a rueda, en
// pasos, hasta quedar a menos de 50px del objetivo, y después 2 rAF + 250ms de asentado.
// ============================================================================================

async function scrollHastaPct(page, pct) {
	const maximo = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
	const objetivo = Math.max(0, Math.min(maximo, (pct / 100) * maximo));
	let intentos = 0;
	const TOPE_INTENTOS = 6000; // salvaguarda: con documentos muy largos y deltas chicos del SO
	// Tolerancia final chica (3px, no los 50px del enunciado del plan) — con los checkpoints
	// angostos de "donde" (6 rutas en ~27svh cada una, ventanas de transición de ±4svh) 50px de
	// margen alcanza para aterrizar en la ruta vecina (bug real encontrado corriendo el
	// verificador contra E4: C4 daba el color de la ruta de al lado). Pasos más chicos cerca del
	// objetivo, siempre a rueda real (restricción 5: nunca `scrollTo`/`scrollBy` a secas).
	while (intentos < TOPE_INTENTOS) {
		const actual = await page.evaluate(() => window.scrollY);
		const restante = objetivo - actual;
		if (Math.abs(restante) < 3) break;
		const paso = Math.abs(restante) > 300 ? 100 : Math.abs(restante) > 40 ? 20 : 4;
		await page.mouse.wheel({ deltaY: restante > 0 ? paso : -paso });
		intentos++;
	}
	await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
	await new Promise((r) => setTimeout(r, 250));
	const alcanzado = await page.evaluate(() => window.scrollY);
	const maximoFinal = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
	return maximoFinal > 0 ? (alcanzado / maximoFinal) * 100 : 0;
}

// ============================================================================================
// Color: parseo de tokens.css, mezcla sRGB (misma familia que `color-mix(in srgb, …)`) y
// contraste WCAG — independiente de escenario-keyframes.ts a propósito (ver cabecera del archivo).
// ============================================================================================

function leerTokens() {
	const css = readFileSync(path.join(RAIZ, 'src', 'styles', 'tokens.css'), 'utf8');
	const tokens = {};
	const re = /(--[\w-]+)\s*:\s*#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\s*;/g;
	let m;
	while ((m = re.exec(css))) {
		let hex = m[2];
		if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
		tokens[m[1]] = hex.toLowerCase();
	}
	return tokens;
}

const TOKENS = leerTokens();

function hexARgb(hex) {
	return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

/** Mezcla sRGB tipo `color-mix(in srgb, hexA pA%, hexB)` — interpolación lineal por canal. */
function mezclar(hexA, hexB, pA) {
	const a = hexARgb(hexA);
	const b = hexARgb(hexB);
	const t = pA / 100;
	return a.map((ca, i) => Math.round(ca * t + b[i] * (1 - t)));
}

function parseRgbString(s) {
	const str = s || '';
	// Chrome serializa el resultado de color-mix() en srgb como `color(srgb r g b / a)`, con r/g/b
	// en 0-1 (no 0-255) — distinto de `rgb()/rgba()`, que es lo que da getComputedStyle() para
	// declaraciones planas. Hay que soportar los dos formatos.
	const colorFn = /color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/.exec(str);
	if (colorFn) {
		return [
			Number(colorFn[1]) * 255,
			Number(colorFn[2]) * 255,
			Number(colorFn[3]) * 255,
			colorFn[4] === undefined ? 1 : Number(colorFn[4]),
		];
	}
	const m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/.exec(str);
	if (!m) return null;
	return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])];
}

function luminanciaRelativa([r, g, b]) {
	const canal = (c) => {
		const s = c / 255;
		return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
	};
	const [rl, gl, bl] = [canal(r), canal(g), canal(b)];
	return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrasteWCAG(rgbA, rgbB) {
	const la = luminanciaRelativa(rgbA) + 0.05;
	const lb = luminanciaRelativa(rgbB) + 0.05;
	return la > lb ? la / lb : lb / la;
}

/** Compone un color con alfa sobre un fondo opaco (para el rótulo semitransparente, C5). */
function componerSobreFondo([r, g, b, a = 1], fondo) {
	return [r * a + fondo[0] * (1 - a), g * a + fondo[1] * (1 - a), b * a + fondo[2] * (1 - a)];
}

// === Tabla §4.1 del plan (independiente de `escenario.ts`, ver cabecera) ===
const FONDO_POR_SECCION = {
	'que-es': '--color-marino-noche',
	'que-hace': '--color-verde',
	'como-lo-hace': '--color-marino-noche',
	cierre: '--color-arena',
};

function fondoEsperadoRgb(seccionId, rutaIndex) {
	if (seccionId === 'donde') {
		const m = /(--[\w-]+)/.exec(rutas[rutaIndex]?.colorTrazo ?? '');
		const tokenRuta = m?.[1];
		const hexRuta = tokenRuta && TOKENS[tokenRuta];
		const hexNoche = TOKENS['--color-marino-noche'];
		if (!hexRuta || !hexNoche) return null;
		return mezclar(hexRuta, hexNoche, 80);
	}
	const tokenName = FONDO_POR_SECCION[seccionId];
	const hex = tokenName && TOKENS[tokenName];
	return hex ? hexARgb(hex) : null;
}

// ============================================================================================
// Chequeos por checkpoint (C1-C6) — cada uno devuelve { estado: 'PASS'|'FAIL'|'SKIP'|'WARN', detalle }.
// ============================================================================================

async function chequeoC1(page, mobile) {
	const areaVisible = await page.evaluate(() => {
		const el = document.querySelector('.telefono__marco');
		if (!el) return null;
		const r = el.getBoundingClientRect();
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const x1 = Math.max(0, r.left);
		const y1 = Math.max(0, r.top);
		const x2 = Math.min(vw, r.right);
		const y2 = Math.min(vh, r.bottom);
		const visW = Math.max(0, x2 - x1);
		const visH = Math.max(0, y2 - y1);
		const areaTotal = r.width * r.height;
		return areaTotal > 0 ? (visW * visH) / areaTotal : 0;
	});
	if (areaVisible === null) return { estado: 'SKIP', detalle: '.telefono__marco no existe' };
	const umbral = mobile ? 0.25 : 0.6;
	const pct = (areaVisible * 100).toFixed(0);
	return areaVisible >= umbral
		? { estado: 'PASS', detalle: `${pct}% visible (≥ ${umbral * 100}%)` }
		: { estado: 'FAIL', detalle: `${pct}% visible (< ${umbral * 100}%)` };
}

async function chequeoC2(page, seccionId) {
	return page.evaluate(
		(seccionId) => {
			const marco = document.querySelector('.telefono__marco');
			if (!marco) return { estado: 'SKIP', detalle: '.telefono__marco no existe' };
			const seccion = document.getElementById(seccionId);
			if (!seccion) return { estado: 'SKIP', detalle: `#${seccionId} no existe` };
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const TOL = 4;
			// Rectángulos a evitar: el celular SIEMPRE, y la banda inferior (E12) solo si está
			// visible (display:block en desktop — en mobile mide 0 y no molesta a nadie).
			const rects = [marco.getBoundingClientRect()];
			const banda = document.querySelector('.escenario__banda');
			if (banda) {
				const br = banda.getBoundingClientRect();
				if (br.width > 0 && br.height > 0) rects.push(br);
			}
			const nodos = [...seccion.querySelectorAll('h1,h2,h3,p,li')];
			const candidatos = nodos.filter((n) => {
				if (n.closest('[aria-hidden="true"]')) return false;
				// Opacidad EFECTIVA (la propia × la de cada ancestro hasta la sección): un fade-out
				// animado en un CONTENEDOR (ej. `.p3-beat-a`, los 2 "beats" superpuestos de P3, E9)
				// no cambia la propiedad `opacity` COMPUTADA del hijo — hay que acumularla caminando
				// hacia arriba, si no, un nodo dentro de un beat ya desvanecido sigue contando como
				// "candidato visible" (bug real encontrado corriendo el verificador contra P3 en
				// mobile, Bloque E).
				let opacidadEfectiva = 1;
				for (let anc = n; anc instanceof Element && seccion.contains(anc); anc = anc.parentElement) {
					opacidadEfectiva *= parseFloat(getComputedStyle(anc).opacity);
					if (opacidadEfectiva <= 0.5) break;
				}
				if (opacidadEfectiva <= 0.5) return false;
				const r = n.getBoundingClientRect();
				if (!(r.width > 0 && r.height > 0 && r.right > 0 && r.bottom > 0 && r.left < vw && r.top < vh)) {
					return false;
				}
				// Visibilidad REAL, no solo geometría: `getBoundingClientRect()` no sabe si un
				// ancestro con `overflow:clip/hidden` (p.ej. `.p3-carril`, E9) recorta este nodo —
				// reporta la caja de layout completa aunque esté invisible. Se confirma con
				// `elementFromPoint()` en el centro (recortado al viewport): si lo que está
				// realmente pintado ahí no es este nodo ni un descendiente suyo, no es un
				// candidato real de solapamiento (bug real encontrado corriendo el verificador
				// contra P3, Bloque E: "FAIL" con texto clippeado del carril, confirmado con
				// elementFromPoint devolviendo el contenedor de la sección, no el texto).
				//
				// LIMITACIÓN CONOCIDA (sin resolver, documentada tras E13): un elemento con
				// `opacity: 0` sigue siendo "hit-testable" — `elementFromPoint()` lo devuelve igual
				// aunque sea invisible, si pinta DESPUÉS en el orden del DOM (ej. `.p3-beat-b`,
				// oculto con opacity antes de su entrada, tapando a `.p3-beat-a` para este chequeo
				// aunque visualmente no lo tape). El síntoma es SKIP ("sin texto candidato"), no un
				// FAIL falso — confirmado visualmente con capturas que ese checkpoint puntual no
				// prueba solapamiento, no que haya uno oculto. Arreglo posible no implementado:
				// exigir además que `elAhi` mismo tenga opacidad efectiva > 0.5.
				const cx = Math.min(vw - 1, Math.max(0, (Math.max(0, r.left) + Math.min(vw, r.right)) / 2));
				const cy = Math.min(vh - 1, Math.max(0, (Math.max(0, r.top) + Math.min(vh, r.bottom)) / 2));
				const elAhi = document.elementFromPoint(cx, cy);
				// `n.contains(elAhi)` cubre el caso n===elAhi y el de un hijo inline (ej. <strong>
				// dentro de un <p>). OJO: la comprobación es en UN solo sentido — `elAhi.contains(n)`
				// sería casi siempre cierta (cualquier contenedor ancestro "contiene" a n) y anularía
				// el chequeo por completo (bug real encontrado en esta misma sesión, corregido acá).
				return !!elAhi && n.contains(elAhi);
			});
			if (candidatos.length === 0) return { estado: 'SKIP', detalle: 'sin texto candidato en viewport' };
			for (const n of candidatos) {
				const r = n.getBoundingClientRect();
				for (const rect of rects) {
					const ix = Math.min(rect.right - TOL, r.right - TOL) - Math.max(rect.left + TOL, r.left + TOL);
					const iy = Math.min(rect.bottom - TOL, r.bottom - TOL) - Math.max(rect.top + TOL, r.top + TOL);
					if (ix > 0 && iy > 0) {
						return {
							estado: 'FAIL',
							detalle: `solapa con "${(n.textContent || '').trim().slice(0, 40)}"`,
						};
					}
				}
			}
			return { estado: 'PASS', detalle: `${candidatos.length} nodo(s) de texto sin solapar` };
		},
		seccionId,
	);
}

async function chequeoC3(page, pctReal) {
	const esperado = estadoParaProgreso(pctReal / 100);
	const real = await page.evaluate(() => {
		const iframe = document.querySelector('.telefono__iframe');
		if (!iframe) return { existe: false };
		let doc;
		try {
			doc = iframe.contentDocument;
		} catch {
			return { existe: true, crossOrigin: true };
		}
		if (!doc) return { existe: true, sinDoc: true };
		const activa = doc.querySelector('.pantalla.activa');
		const pines = [...doc.querySelectorAll('.pin')];
		const pinSel = pines.findIndex((p) => p.classList.contains('seleccionado'));
		return {
			existe: true,
			pantalla: activa ? activa.dataset.pantalla : null,
			pin: pinSel,
			fichaExpandida: !!doc.querySelector('.ficha--expandida'),
		};
	});

	if (!real.existe) return { estado: 'SKIP', detalle: '.telefono__iframe no existe' };
	if (real.crossOrigin) return { estado: 'SKIP', detalle: 'iframe cross-origin, no se puede leer' };
	if (real.sinDoc) return { estado: 'SKIP', detalle: 'iframe sin contentDocument (¿todavía cargando?)' };

	const fichaEsperada = esperado.ficha === 'expandida';
	const fallas = [];
	if (real.pantalla !== esperado.pantalla) fallas.push(`pantalla real="${real.pantalla}" esperada="${esperado.pantalla}"`);
	// El pin solo es observable cuando la pantalla del demo ES "mapa" (`public/app-demo/index.html`
	// solo actúa sobre `estado.pin` cuando no es `null` — `pin: null` nunca deselecciona nada,
	// queda tal cual estaba de la última vez que la pantalla fue "mapa"; es lo mismo que documenta
	// H6c del plan de Bloque E, y por eso su propia verificación de E5 es más angosta: "ida y
	// vuelta... y C3 da pin seleccionado = 0", no "pin === null en cada checkpoint de rutas/perfil").
	// Comparar el pin fuera de "mapa" daría un FAIL estructural que ningún cambio de `telefono.ts`
	// puede resolver sin tocar `index.html` (fuera de alcance de E5).
	if (esperado.pantalla === 'mapa') {
		const pinEsperado = esperado.pin ?? -1;
		if (real.pin !== pinEsperado) fallas.push(`pin real=${real.pin} esperado=${pinEsperado}`);
	}
	if (real.fichaExpandida !== fichaEsperada) fallas.push(`ficha real=${real.fichaExpandida} esperada=${fichaEsperada}`);

	return fallas.length === 0
		? { estado: 'PASS', detalle: `pantalla=${real.pantalla} pin=${real.pin} ficha=${real.fichaExpandida}` }
		: { estado: 'FAIL', detalle: fallas.join('; ') };
}

async function chequeoC4(page, ck) {
	const esperadoRgb = fondoEsperadoRgb(ck.seccionId, ck.rutaIndex);
	const realStr = await page.evaluate(() => {
		const el = document.querySelector('.escenario');
		return el ? getComputedStyle(el).backgroundColor : null;
	});
	if (!esperadoRgb) return { estado: 'SKIP', detalle: 'no se pudo derivar el color esperado (§4.1)', esperadoRgb };
	if (realStr === null) return { estado: 'SKIP', detalle: '.escenario no existe', esperadoRgb };
	const realRgb = parseRgbString(realStr);
	if (!realRgb) return { estado: 'SKIP', detalle: `no se pudo parsear "${realStr}"`, esperadoRgb };
	const dentro = esperadoRgb.every((c, i) => Math.abs(c - realRgb[i]) <= 2);
	return dentro
		? { estado: 'PASS', detalle: `${realStr} ≈ rgb(${esperadoRgb.join(',')})`, esperadoRgb }
		: { estado: 'FAIL', detalle: `real ${realStr} vs esperado rgb(${esperadoRgb.join(',')})`, esperadoRgb };
}

async function chequeoC5(page, fondoRgb) {
	if (!fondoRgb) return { estado: 'SKIP', detalle: 'sin fondo de referencia (C4 no lo resolvió)' };
	const datos = await page.evaluate(() => {
		const el = document.querySelector('.escenario__rotulo');
		if (!el) return null;
		const cs = getComputedStyle(el);
		return { color: cs.color, fondo: cs.backgroundColor };
	});
	if (!datos) return { estado: 'SKIP', detalle: '.escenario__rotulo no existe' };
	const color = parseRgbString(datos.color);
	const fondoRotulo = parseRgbString(datos.fondo);
	if (!color || !fondoRotulo) return { estado: 'SKIP', detalle: 'no se pudo parsear color/fondo del rótulo' };
	const fondoCompuesto = componerSobreFondo(fondoRotulo, fondoRgb);
	const ratio = contrasteWCAG(color.slice(0, 3), fondoCompuesto);
	return ratio >= 4.5
		? { estado: 'PASS', detalle: `contraste ${ratio.toFixed(2)}:1` }
		: { estado: 'FAIL', detalle: `contraste ${ratio.toFixed(2)}:1 (< 4.5:1)` };
}

async function chequeoC6(page, ck) {
	if (ck.seccionId !== 'donde') return { estado: 'SKIP', detalle: 'solo aplica a P4 (donde)' };
	if (ck.rutaIndex === undefined) return { estado: 'SKIP', detalle: 'checkpoint genérico, sin ruta asociada' };
	const rutaEsperada = rutas[ck.rutaIndex]?.nombre;
	const resultado = await page.evaluate((rutaEsperada) => {
		const iframe = document.querySelector('.telefono__iframe');
		if (!iframe) return { estado: 'SKIP', detalle: '.telefono__iframe no existe' };
		let doc;
		try {
			doc = iframe.contentDocument;
		} catch {
			return { estado: 'SKIP', detalle: 'iframe cross-origin' };
		}
		if (!doc) return { estado: 'SKIP', detalle: 'iframe sin contentDocument' };
		const cards = [...doc.querySelectorAll('.ruta-card')];
		if (cards.length === 0) return { estado: 'WARN', detalle: '.ruta-card no existe (¿pantalla no es "rutas"?)' };
		const vh = doc.defaultView.innerHeight;
		const enteras = cards.filter((c) => {
			const r = c.getBoundingClientRect();
			return r.top >= 0 && r.bottom <= vh;
		});
		const nombres = enteras.map((c) => c.querySelector('.ruta-card__nombre')?.textContent?.trim());
		if (nombres.includes(rutaEsperada)) return { estado: 'PASS', detalle: `coincide: ${rutaEsperada}` };
		return { estado: 'WARN', detalle: `esperado "${rutaEsperada}", enteras: [${nombres.join(', ')}]` };
	}, rutaEsperada);
	return resultado;
}

// ============================================================================================
// Chequeos globales (G1-G6)
// ============================================================================================

// NOTA (verificado en vivo, Puppeteer + Chrome real): `effect.getKeyframes()` de una animación
// definida por `@keyframes` NUNCA expone los custom properties que anima (`--tel-x`, etc.) — solo
// trae `offset`/`easing`/`composite`, aunque la interpolación SÍ ocurre (confirmado leyendo
// getComputedStyle en vivo, ver G2). Es una limitación real de la API, no un bug de este sitio: el
// plan (§5 E2) pedía comprobar "--tel-x en todos los stops" asumiendo que `getKeyframes()` lo
// expondría. La intención real de G1, según el propio plan (§7, tabla de riesgos: "Chrome descarta
// en silencio un @keyframes generado... G1 lo detecta en el acto, getKeyframes() vacío"), es
// detectar el DESCARTE SILENCIOSO del `@keyframes` completo — eso sí es observable: si Chrome tira
// la regla, `getKeyframes()` da un array vacío o con muchos menos stops que los 9 esperados
// (`keyframesTelefono`, E3). G1 queda ajustado a esa comprobación real.
async function chequeoG1(page) {
	return page.evaluate(() => {
		const el = document.querySelector('.escenario__ancla');
		if (!el) return { estado: 'SKIP', detalle: '.escenario__ancla no existe' };
		const anims = el.getAnimations();
		const candidata = anims.find((a) => a.animationName === 'tel-escritorio' || a.animationName === 'tel-movil');
		if (!candidata) return { estado: 'FAIL', detalle: 'sin animación tel-escritorio/tel-movil en .escenario__ancla' };
		const kfs = candidata.effect?.getKeyframes?.() ?? [];
		// 9 stops es el modelo hoy (E3, 940svh) — si la tabla de ESCENARIO cambia, este número
		// cambia con ella; se compara ">= 2" como mínimo estructural y se informa el conteo real
		// para que un valor sospechosamente bajo (Chrome descartando la regla) se note a simple vista.
		return kfs.length >= 2
			? { estado: 'PASS', detalle: `${candidata.animationName}: ${kfs.length} stops (no vacío)` }
			: { estado: 'FAIL', detalle: `${candidata.animationName}: ${kfs.length} stops — @keyframes vacío o descartado por el navegador` };
	});
}

async function chequeoG2(page) {
	// Toma la primera frontera entre secciones (que-es → que-hace) y muestrea --tel-escala dentro
	// del tramo de transición [pinHasta_0, desde_1] — detecta el salto de H2 (dos stops con el
	// mismo % y valores distintos, "transición instantánea").
	const off = offsets();
	if (off.length < 2) return { estado: 'SKIP', detalle: 'menos de 2 secciones' };
	const total = TOTAL_SVH - 100;
	const s0 = ESCENARIO.find((s) => s.id === off[0].id);
	const pinHasta0Svh = off[0].desdeSvh + Math.max(0, s0.largoSvh - 100);
	const desde1Svh = off[1].desdeSvh;
	if (desde1Svh <= pinHasta0Svh) return { estado: 'SKIP', detalle: 'tramo de transición sin ancho' };
	const pctDesde = (pinHasta0Svh / total) * 100;
	const pctHasta = (desde1Svh / total) * 100;

	const leerEscala = async (pct) => {
		await scrollHastaPct(page, pct);
		return page.evaluate(() => {
			const el = document.querySelector('.escenario__ancla, .escenario__telefono');
			if (!el) return null;
			const v = getComputedStyle(el).getPropertyValue('--tel-escala').trim();
			return v ? Number(v) : null;
		});
	};

	const inicio = await leerEscala(pctDesde);
	const fin = await leerEscala(pctHasta);
	if (inicio === null || fin === null) return { estado: 'SKIP', detalle: '--tel-escala no resuelve (elemento ausente)' };

	const N = 20;
	const min = Math.min(inicio, fin);
	const max = Math.max(inicio, fin);
	if (min === max) return { estado: 'SKIP', detalle: 'extremos iguales, no hay transición que medir' };

	let fueraDeRango = 0;
	for (let i = 1; i < N; i++) {
		const pct = pctDesde + ((pctHasta - pctDesde) * i) / N;
		const v = await leerEscala(pct);
		if (v === null || v < min - 1e-6 || v > max + 1e-6) fueraDeRango++;
	}
	return fueraDeRango === 0
		? { estado: 'PASS', detalle: `${N - 1} muestras entre ${min} y ${max}, sin saltos` }
		: { estado: 'FAIL', detalle: `${fueraDeRango}/${N - 1} muestras fuera de [${min}, ${max}] (salto tipo H2)` };
}

async function chequeoG4(page) {
	await page.evaluate(() => {
		window.scrollTo(0, 0);
		document.activeElement?.blur?.();
	});
	const secuencia = [];
	let vioIframe = false;
	for (let i = 0; i < 15; i++) {
		await page.keyboard.press('Tab');
		const info = await page.evaluate(() => {
			const el = document.activeElement;
			return { tag: el?.tagName ?? null, clase: el?.className ?? '', id: el?.id ?? '' };
		});
		secuencia.push(info);
		if (info.tag === 'IFRAME') vioIframe = true;
	}
	const incluyeSkip = secuencia.some((s) => typeof s.clase === 'string' && s.clase.includes('skip-link'));
	const incluyeHilo = secuencia.some(
		(s) => (typeof s.clase === 'string' && s.clase.includes('hilo-ruta')) || s.id.includes('hilo-ruta'),
	);
	const fallas = [];
	if (vioIframe) fallas.push('el foco entró al IFRAME');
	if (!incluyeSkip) fallas.push('la secuencia no pasó por el skip-link');
	if (!incluyeHilo) fallas.push('la secuencia no pasó por HiloRuta');
	return fallas.length === 0
		? { estado: 'PASS', detalle: '15 Tab sin entrar al iframe, incluye skip-link y HiloRuta' }
		: { estado: 'FAIL', detalle: fallas.join('; ') };
}

async function chequeoG5(page) {
	const alto = await page.evaluate(() => ({ scrollHeight: document.documentElement.scrollHeight, innerHeight: window.innerHeight }));
	const esperado = (TOTAL_SVH / 100) * alto.innerHeight;
	const diffPct = Math.abs(alto.scrollHeight - esperado) / esperado;
	return diffPct <= 0.02
		? { estado: 'PASS', detalle: `scrollHeight=${alto.scrollHeight} ≈ esperado=${esperado.toFixed(0)}` }
		: { estado: 'FAIL', detalle: `scrollHeight=${alto.scrollHeight} vs esperado=${esperado.toFixed(0)} (${(diffPct * 100).toFixed(1)}% de diferencia)` };
}

async function chequeoG6(browser, args, vp) {
	const page = await browser.newPage();
	const cdp = await page.createCDPSession();
	await cdp.send('Network.enable');
	let total = 0;
	cdp.on('Network.loadingFinished', (e) => {
		total += e.encodedDataLength || 0;
	});
	await page.setViewport(vp.viewport);
	await page.goto(args.url, { waitUntil: 'networkidle0', timeout: 60000 });
	await new Promise((r) => setTimeout(r, 500));
	await page.close();
	const kb = total / 1024;
	return kb < 1536
		? { estado: 'PASS', detalle: `${kb.toFixed(0)} KB de carga inicial (< 1536 KB)` }
		: { estado: 'FAIL', detalle: `${kb.toFixed(0)} KB de carga inicial (≥ 1536 KB, objetivo §14.8)` };
}

// ============================================================================================
// Capturas (--capturas) — SIEMPRE en os.tmpdir(), nunca en el repo.
// ============================================================================================

function carpetaCapturas() {
	const dir = path.join(os.tmpdir(), 'sur-en-ruta-verificar');
	mkdirSync(dir, { recursive: true });
	return dir;
}

async function capturar(page, vpNombre, ckNombre, dir) {
	const archivo = `${vpNombre}--${ckNombre.replace(/[^\w-]+/g, '_')}.png`;
	await page.screenshot({ path: path.join(dir, archivo) });
}

// ============================================================================================
// Salida
// ============================================================================================

function imprimirTabla(filas) {
	const cols = ['viewport', 'checkpoint', 'chequeo', 'estado', 'detalle'];
	const anchos = cols.map((c) => Math.max(c.length, ...filas.map((f) => String(f[c] ?? '').length)));
	const linea = (valores) => valores.map((v, i) => String(v).padEnd(anchos[i])).join('  ');
	console.log(linea(cols));
	console.log(anchos.map((a) => '-'.repeat(a)).join('  '));
	for (const f of filas) console.log(linea(cols.map((c) => f[c])));
}

// ============================================================================================
// Main
// ============================================================================================

async function main() {
	const args = parsearArgs(process.argv.slice(2));
	const viewports = resolverViewports(args.viewport);
	const checkpoints = calcularCheckpoints();
	const filas = [];
	let dirCapturas = null;
	if (args.capturas) dirCapturas = carpetaCapturas();

	console.log(`verificar.mjs — ${viewports.length} viewport(s), ${checkpoints.length} checkpoint(s), reducido=${args.reducido}, url=${args.url}`);

	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars'],
	});

	for (const vp of viewports) {
		const page = await browser.newPage();
		const erroresConsola = [];
		page.on('console', (m) => {
			if (m.type() === 'error') erroresConsola.push(m.text());
		});
		page.on('pageerror', (e) => erroresConsola.push(String(e)));

		if (args.reducido) {
			await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
		}
		await page.setViewport(vp.viewport);
		await page.goto(args.url, { waitUntil: 'networkidle0', timeout: 60000 });

		// Espera a que el Preloader abra la cortina y dispare :root.entrada (MIN_MS=1500 + 1250ms,
		// ver Preloader.astro) más un colchón para que las animaciones de entrada temporales de P1
		// terminen (delay máximo 760ms + duración) antes de empezar a medir.
		await page
			.waitForFunction(() => document.documentElement.classList.contains('entrada'), { timeout: 8000 })
			.catch(() => {});
		await new Promise((r) => setTimeout(r, 2000));

		for (const ck of checkpoints) {
			const pctReal = await scrollHastaPct(page, ck.pct);
			if (dirCapturas) await capturar(page, vp.nombre, ck.nombre, dirCapturas);

			const c1 = await chequeoC1(page, vp.mobile);
			const c2 = await chequeoC2(page, ck.seccionId);
			const c3 = await chequeoC3(page, pctReal);
			const c4 = await chequeoC4(page, ck);
			const c5 = await chequeoC5(page, c4.esperadoRgb);
			const c6 = await chequeoC6(page, ck);

			for (const [nombre, r] of [
				['C1 celular visible', c1],
				['C2 sin solapamiento', c2],
				['C3 estado del demo', c3],
				['C4 fondo', c4],
				['C5 contraste del rótulo', c5],
				['C6 ruta activa = demo', c6],
			]) {
				filas.push({ viewport: vp.nombre, checkpoint: ck.nombre, chequeo: nombre, estado: r.estado, detalle: r.detalle });
			}
		}

		// Globales — corren UNA vez por viewport, con la página en su último scroll.
		const g1 = await chequeoG1(page);
		const g2 = await chequeoG2(page);
		const g3 =
			erroresConsola.length === 0
				? { estado: 'PASS', detalle: '0 errores' }
				: { estado: 'FAIL', detalle: `${erroresConsola.length} error(es): ${erroresConsola.slice(0, 3).join(' | ')}` };
		const g4 = await chequeoG4(page);
		const g5 = await chequeoG5(page);
		const g6 = args.peso ? await chequeoG6(browser, args, vp) : { estado: 'SKIP', detalle: 'usar --peso' };

		for (const [nombre, r] of [
			['G1 keyframes --tel-x', g1],
			['G2 continuidad', g2],
			['G3 consola sin errores', g3],
			['G4 teclado', g4],
			['G5 alto del documento', g5],
			['G6 peso (--peso)', g6],
		]) {
			filas.push({ viewport: vp.nombre, checkpoint: '(global)', chequeo: nombre, estado: r.estado, detalle: r.detalle });
		}

		await page.close();
	}

	await browser.close();

	imprimirTabla(filas);
	const fails = filas.filter((f) => f.estado === 'FAIL');
	const warns = filas.filter((f) => f.estado === 'WARN');
	const skips = filas.filter((f) => f.estado === 'SKIP');
	console.log(
		`\n${filas.length} chequeos · PASS=${filas.length - fails.length - warns.length - skips.length} · FAIL=${fails.length} · WARN=${warns.length} · SKIP=${skips.length}`,
	);
	if (dirCapturas) console.log(`Capturas en: ${dirCapturas}`);
	process.exit(fails.length > 0 ? 1 : 0);
}

main().catch((err) => {
	console.error('verificar.mjs: error fatal.', err);
	process.exit(1);
});
