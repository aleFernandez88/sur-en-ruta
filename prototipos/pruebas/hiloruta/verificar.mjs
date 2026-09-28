// verificar.mjs — herramienta de verificación de HiloRuta tras el Bloque E, E14.
// docs/planes/2026-09-23-bloque-e-secciones-chrome.md §5, E14.
//
// Corre Puppeteer contra el dev server REAL (`npx astro dev --host`, puerto 4321) y comprueba la
// navegación (click en la barra y en el menú de pantalla completa), el tratamiento mobile ("solo
// el botón", D-G de §11.3) y que el pintado celeste del hilo llegue a cada nodo exactamente en el
// `desdePct` de su sección (la misma tabla que usa HiloRuta.astro, `offsets()` de escenario.ts —
// nunca una copia reescrita a mano que podría desincronizarse).
//
// No entra en el harness general de `prototipos/pruebas/escenario/verificar.mjs` a propósito: ese
// harness prueba CHECKPOINTS DE SCROLL (celular/fondo/contraste en un % dado), esto prueba
// NAVEGACIÓN POR CLICK (llegar a un id, abrir/cerrar el menú) — son dos formas de interactuar con
// la página lo bastante distintas como para no forzarlas al mismo modelo de "checkpoint".
//
// Uso (con `npx astro dev --host` corriendo):
//   node prototipos/pruebas/hiloruta/verificar.mjs [--url=http://localhost:4321/sur-en-ruta/]

import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(HERE, '..', '..', '..');

// Puppeteer vive en el tooling interno del render del app-demo (prototipos/app-demo/render/), no
// en package.json de la raíz (mismo criterio que prototipos/pruebas/escenario/verificar.mjs).
const require = createRequire(path.join(RAIZ, 'prototipos', 'app-demo', 'render', 'package.json'));
const puppeteer = require('puppeteer');

const aUrl = (...partes) => pathToFileURL(path.join(RAIZ, ...partes)).href;
const { offsets } = await import(aUrl('src', 'lib', 'escenario.ts'));
const { recorrido } = await import(aUrl('src', 'data', 'recorrido.ts'));

function parsearArgs(argv) {
	const args = { url: 'http://localhost:4321/sur-en-ruta/' };
	for (const a of argv) {
		if (a.startsWith('--url=')) args.url = a.slice('--url='.length);
	}
	return args;
}
const args = parsearArgs(process.argv.slice(2));

const off = offsets();
const resultados = [];
const ok = (nombre, cond, detalle) => resultados.push({ nombre, ok: !!cond, detalle });

async function irYEsperarEntrada(page, viewport) {
	await page.setViewport(viewport);
	await page.goto(args.url, { waitUntil: 'networkidle0' });
	await page
		.waitForFunction(() => document.documentElement.classList.contains('entrada'), { timeout: 8000 })
		.catch(() => {});
	await new Promise((r) => setTimeout(r, 1500));
}

async function esperarScrollEstable(page) {
	let anterior = -1;
	let estable = 0;
	for (let i = 0; i < 40 && estable < 3; i++) {
		await new Promise((r) => setTimeout(r, 100));
		const actual = await page.evaluate(() => window.scrollY);
		estable = actual === anterior ? estable + 1 : 0;
		anterior = actual;
	}
}

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

// === 1) Click en cada parada de la barra (desktop 1440×900): scrollY se estabiliza y el top de
//    la sección destino cae dentro de 2px del tope del viewport. ===
{
	const page = await browser.newPage();
	await irYEsperarEntrada(page, { width: 1440, height: 900 });

	for (const p of recorrido) {
		// page.click (no .evaluate + .click()): el <a> vive dentro de <svg> (SVGAElement, sin método
		// .click() como HTMLAnchorElement), y un dispatchEvent sintético no dispara la navegación
		// nativa del ancla (los navegadores solo la disparan para eventos "trusted"). page.click
		// simula un clic real vía CDP, que sí cuenta como trusted.
		await page.click(`.hilo-ruta-parada-link[href="#${p.id}"]`);
		await esperarScrollEstable(page);
		const top = await page.evaluate((id) => document.getElementById(id)?.getBoundingClientRect().top, p.id);
		ok(`desktop barra → ${p.id}`, Math.abs(top) < 2, `top=${top?.toFixed(2)}`);
	}
	await page.close();
}

// === 2) Lo mismo abriendo el menú y clickeando cada link; además el menú se cierra (el bug del
//    menú, resuelto en E14: antes el click no hacía nada porque .hz-track ya no existía). ===
{
	const page = await browser.newPage();
	await irYEsperarEntrada(page, { width: 1440, height: 900 });

	for (const p of recorrido) {
		await page.evaluate(() => document.querySelector('.hilo-ruta-menu-boton')?.click());
		await new Promise((r) => setTimeout(r, 100));
		const abiertoAntes = await page.evaluate(() =>
			document.getElementById('hilo-ruta-menu')?.classList.contains('hilo-ruta-menu--abierta'),
		);
		await page.click(`.hilo-ruta-menu a[href="#${p.id}"]`);
		await esperarScrollEstable(page);
		const top = await page.evaluate((id) => document.getElementById(id)?.getBoundingClientRect().top, p.id);
		// Cierre en dos tiempos (~520ms de animación por letra + colchón) antes de comprobar.
		await new Promise((r) => setTimeout(r, 700));
		const cerrado = await page.evaluate(
			() => !document.getElementById('hilo-ruta-menu')?.classList.contains('hilo-ruta-menu--abierta'),
		);
		ok(
			`desktop menú → ${p.id}`,
			abiertoAntes && Math.abs(top) < 2 && cerrado,
			`abiertoAntes=${abiertoAntes} top=${top?.toFixed(2)} cerrado=${cerrado}`,
		);
	}
	await page.close();
}

// === 3) Mobile 390×844: "solo el botón" (D-G de §11.3) — <svg> oculto, botón visible y sin pisar
//    el titular de P1 (mismo criterio que C2 del harness de escenario). ===
{
	const page = await browser.newPage();
	await irYEsperarEntrada(page, { width: 390, height: 844 });

	const info = await page.evaluate(() => {
		const svg = document.querySelector('.hilo-ruta-svg');
		const boton = document.querySelector('.hilo-ruta-menu-boton');
		const svgVisible = svg ? getComputedStyle(svg).display !== 'none' : null;
		const botonVisible = boton ? getComputedStyle(boton).display !== 'none' && boton.getBoundingClientRect().width > 0 : null;
		const botonRect = boton?.getBoundingClientRect();
		const titular = document.querySelector('.p1-titular, h1');
		const titularRect = titular?.getBoundingClientRect();
		let pisa = false;
		if (botonRect && titularRect) {
			pisa = !(
				botonRect.right < titularRect.left ||
				botonRect.left > titularRect.right ||
				botonRect.bottom < titularRect.top ||
				botonRect.top > titularRect.bottom
			);
		}
		return { svgVisible, botonVisible, botonRect, titularRect, pisa };
	});
	ok('mobile: svg oculto', info.svgVisible === false, JSON.stringify(info.svgVisible));
	ok('mobile: botón visible', info.botonVisible === true, JSON.stringify(info.botonRect));
	ok('mobile: botón no pisa titular de P1', !info.pisa, JSON.stringify({ boton: info.botonRect, titular: info.titularRect }));
	await page.close();
}

// === 4) El pintado celeste llega al nodo k en el desdePct de la sección k. ===
{
	const page = await browser.newPage();
	await irYEsperarEntrada(page, { width: 1440, height: 900 });

	const stops = await page.evaluate(() => {
		const el = document.querySelector('.hilo-ruta-mascara-trazo');
		const anim = el?.getAnimations()[0];
		return anim?.effect?.getKeyframes()?.map((k) => k.offset) ?? null;
	});
	const esperados = off.map((o) => o.desdePct / 100);
	const encontrados = esperados.every((e) => stops?.some((s) => Math.abs(s - e) < 0.002));
	ok(
		'hilo-ruta-pintar tiene stop en cada desdePct',
		encontrados,
		`stops=${JSON.stringify(stops)} esperados=${JSON.stringify(esperados)}`,
	);
	await page.close();
}

// === 5) G4 teclado: el botón y los 5 links son alcanzables por Tab, sin entrar nunca al iframe. ===
{
	const page = await browser.newPage();
	await irYEsperarEntrada(page, { width: 1440, height: 900 });

	const clases = [];
	for (let i = 0; i < 20; i++) {
		await page.keyboard.press('Tab');
		const cls = await page.evaluate(() => {
			const a = document.activeElement;
			return a ? `${a.tagName}.${Array.from(a.classList).join('.')}` : null;
		});
		clases.push(cls);
	}
	const tocaBoton = clases.some((c) => c && c.includes('hilo-ruta-menu-boton'));
	const tocaIframe = clases.some((c) => c && c.toLowerCase().includes('iframe'));
	ok('G4: Tab alcanza el botón de HiloRuta', tocaBoton, JSON.stringify(clases));
	ok('G4: Tab nunca entra al iframe', !tocaIframe, JSON.stringify(clases));
	await page.close();
}

await browser.close();

const fails = resultados.filter((r) => !r.ok);
for (const r of resultados) {
	console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.nombre}  ${r.detalle ?? ''}`);
}
console.log(`\n${resultados.length} chequeos · PASS=${resultados.length - fails.length} · FAIL=${fails.length}`);
if (fails.length > 0) process.exitCode = 1;
