// probar-modelo.mjs — prueba unitaria (sin navegador) del modelo de datos del escenario vertical
// (Bloque E, E3). docs/planes/2026-09-23-bloque-e-secciones-chrome.md §5, E3.
//
// Lee tokens.css con `fs` (no `?raw`, eso es de Vite/Astro) y llama a las funciones puras de
// escenario.ts / escenario-keyframes.ts directo — Node 24 hace type stripping de `.ts` sin
// compilar. Imprime los 4 keyframes generados y corre los asserts del plan.
//
// Uso: node prototipos/pruebas/escenario/probar-modelo.mjs

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(HERE, '..', '..', '..');
const aUrl = (...partes) => pathToFileURL(path.join(RAIZ, ...partes)).href;

const { offsets, ESCENARIO, TOTAL_SVH } = await import(aUrl('src', 'lib', 'escenario.ts'));
const { recorrido } = await import(aUrl('src', 'data', 'recorrido.ts'));
const { parsearTokens, keyframesTelefono, keyframesFondo, keyframesGlow } = await import(
	aUrl('src', 'lib', 'escenario-keyframes.ts')
);

let fallas = 0;
function assert(cond, mensaje) {
	if (cond) {
		console.log(`  OK   ${mensaje}`);
	} else {
		console.error(`  FAIL ${mensaje}`);
		fallas++;
	}
}
function cerca(a, b, tolerancia) {
	return Math.abs(a - b) <= tolerancia;
}

console.log('=== escenario.ts ===');
console.log('TOTAL_SVH =', TOTAL_SVH);
console.log('ESCENARIO =', ESCENARIO);

const off = offsets();
console.log('\noffsets():');
for (const o of off) console.log(' ', o);

console.log('\n=== Asserts (probar-modelo.mjs, E3) ===');

assert(TOTAL_SVH === 940, `TOTAL_SVH === 940 (da ${TOTAL_SVH})`);
assert(cerca(off.at(-1).desdePct, 100, 1e-6), `offsets().at(-1).desdePct === 100 (da ${off.at(-1).desdePct})`);

// Fronteras esperadas, §4.2 del plan (±0.01 punto porcentual).
const FRONTERAS_ESPERADAS = {
	'que-es': 13.095,
	'que-hace': 32.143,
	'como-lo-hace': 63.095,
	donde: 94.048,
};
for (const [id, esperado] of Object.entries(FRONTERAS_ESPERADAS)) {
	const o = off.find((x) => x.id === id);
	assert(
		o && o.fronteraPct !== null && cerca(o.fronteraPct, esperado, 0.01),
		`frontera de "${id}" ≈ ${esperado}% (da ${o?.fronteraPct})`,
	);
}
const cierre = off.find((o) => o.id === 'cierre');
assert(cierre && cierre.fronteraPct === null, `"cierre" no tiene frontera siguiente (fronteraPct === null)`);

assert(
	JSON.stringify(off.map((o) => o.id)) === JSON.stringify(recorrido.map((r) => r.id)),
	'los ids de offsets() coinciden con recorrido.map(r => r.id)',
);

// keyframesTelefono('escritorio'): 9 stops (P1 aporta 2, las 3 secciones del medio 2 c/u = 6,
// "cierre" aporta 1 porque desde === pinHasta ahí) — ver el comentario grande de la función.
const kfTelEscritorio = keyframesTelefono('escritorio');
const stopsTelEscritorio = (kfTelEscritorio.match(/%\s*\{/g) || []).length;
console.log('\nkeyframesTelefono("escritorio"):\n' + kfTelEscritorio);
assert(stopsTelEscritorio === 9, `keyframesTelefono("escritorio") tiene 9 stops (da ${stopsTelEscritorio})`);

const kfTelMovil = keyframesTelefono('movil');
console.log('\nkeyframesTelefono("movil"):\n' + kfTelMovil);
const rotacionesMovil = [...kfTelMovil.matchAll(/--tel-rot:\s*(-?[\d.]+)deg/g)].map((m) => Number(m[1]));
assert(
	rotacionesMovil.every((r) => r === 0),
	`keyframesTelefono("movil") nunca trae --tel-rot ≠ 0deg (móvil no rota) (valores: ${rotacionesMovil.join(', ')})`,
);

// Tokens: color-verde tiene que dar #5a6b2e (confirma E1).
const tokensCss = readFileSync(path.join(RAIZ, 'src', 'styles', 'tokens.css'), 'utf8');
const tokens = parsearTokens(tokensCss);
assert(tokens['--color-verde'] === '#5a6b2e', `parsearTokens() da --color-verde = #5a6b2e (da ${tokens['--color-verde']})`);

const kfFondo = keyframesFondo(tokens);
console.log('\nkeyframesFondo():\n' + kfFondo);

const kfGlow = keyframesGlow();
console.log('\nkeyframesGlow():\n' + kfGlow);

// Un token inexistente tiene que tirar error.
try {
	const tokensRotos = { ...tokens };
	delete tokensRotos['--color-verde'];
	keyframesFondo(tokensRotos);
	console.error('  FAIL un token inexistente (--color-verde borrado) NO tiró error');
	fallas++;
} catch {
	console.log('  OK   un token inexistente tira error (keyframesFondo con --color-verde borrado)');
}

console.log(`\n${fallas === 0 ? 'TODO OK' : `${fallas} FALLA(S)`}`);
process.exit(fallas === 0 ? 0 : 1);
