// Genera la secuencia de frames para el scroll-scrub de P1 (docs/planes/2026-09-04-...md §15):
// 90 WebP de 900x1350 en public/p1-scrub/, dibujados en <canvas> y avanzados por scroll real —
// no un <video> (el mp4 real solo tiene keyframes en los frames 1 y 251 de 300, ver §15.2, así
// que seekearlo se ve a saltos). Sin ffmpeg: la compresión la hace page.screenshot({type:'webp'}).
//
// Uso: con `npx astro dev --host` corriendo desde la raíz del repo:  node scrub.mjs
//
// IMPORTANTE — mantenimiento: estos frames CONGELAN el estado de public/app-demo/ (nombres de
// ruta, fotos, colores). Si ese mockup cambia, hay que volver a correr este script — es lo mismo
// que ya pasó una vez con el mp4 (commit 0bd39f5, "Video pendiente de regenerar"). FRAMES está
// duplicado a propósito en src/lib/cinta.ts (P1_SCRUB_FRAMES) — son dos lados de un límite de
// proceso (este script corre en Node suelto, cinta.ts se importa en el build de Astro) y no se
// pueden importar entre sí. La verificación V12 del plan es la que detecta la desincronización.
import puppeteer from 'puppeteer';
import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, '..', '..', '..');

// ?fondo=transparente (2026-09-04, pedido de Ale): los frames NO llevan el fondo horneado — se
// capturan con canal alfa (omitBackground más abajo) y el degradé lo pone el CSS de .p1
// (P1QueEs.astro), el mismo que ya tiene el video. Así el celular flota de verdad sobre lo que
// haya detrás, sin depender de que dos degradés calcen.
//
// COSTO REAL, medido 2026-09-04 (día del cambio) — CORRIGE una medición anterior mal hecha de
// esta misma sesión que decía "pesa casi igual que sin alfa": ese resultado salía de un bug real
// (public/app-demo/showcase.html no estaba sincronizado con prototipos/, y por separado html/body
// tenían su propio background opaco sin apagar — el "canal alfa" que medía en realidad daba 255
// en toda la imagen, o sea NO era transparente). Con los dos bugs corregidos (ver más abajo y el
// historial de prototipos/app-demo/showcase.html), el peso real de la transparencia es:
//   quality 80 → 7,38 MB   |   quality 72 → 6,71 MB   |   quality 55 → 6,24 MB
// Bajar `quality` casi no ayuda: en WebP con alfa, la máscara de transparencia se comprime aparte
// del color y domina el peso — no hay forma barata de que esto entre en el presupuesto original
// de 3,6 MB (que sí cumplía la versión CON fondo horneado, ~3,4 MB). Ale decidió el 2026-09-04
// mantener la transparencia igual (se ve mejor, el costo es aceptable) — no bajar `CALIDAD` para
// "arreglar" el peso, es una compensación que no funciona (ver arriba).
const URL = process.env.SHOWCASE_URL
  || 'http://localhost:4321/sur-en-ruta/app-demo/showcase.html?manual&fondo=transparente';

const FRAMES = 90;                    // ← tiene que coincidir con P1_SCRUB_FRAMES de src/lib/cinta.ts
const DUR = 10;                       // duración de la escena (igual que en showcase.html)
// Subido de DSF 1.5 (900x1350) a 2 (1200x1800) el 2026-09-04 — Ale reportó que se veía pixelado en
// un spot publicitario. Medido: ~102 KB/frame (~9 MB el set), +37% sobre la resolución anterior —
// el peso escala mucho menos que los píxeles porque la máscara de alfa es sobre todo zonas planas.
const VW = 600, VH = 900, DSF = 2;    // → frames de 1200x1800
const CALIDAD = 80;                   // WebP quality — la más alta probada; bajarla no reduce el peso de forma significativa (ver comentario de arriba)

const OUT_DIR = path.join(REPO_ROOT, 'public', 'p1-scrub');

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: VW, height: VH, deviceScaleFactor: DSF });

console.log('cargando', URL);
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });

await page.waitForFunction('window.__ready === true', { timeout: 30000 });

// esperar a que las fotos de las rutas dentro del iframe terminen de cargar — idéntico a render.mjs
await page.waitForFunction(() => {
  const f = document.getElementById('app');
  const d = f && f.contentDocument;
  if (!d) return false;
  const imgs = [...d.images];
  const bgs = [...d.querySelectorAll('.ruta-card__foto,.ruta-teaser__foto')];
  return imgs.every(i => i.complete) && bgs.length > 0;
}, { timeout: 30000 });
await new Promise(r => setTimeout(r, 800)); // colchón para decode de imágenes de fondo

console.log('generando', FRAMES, 'frames webp...');
let totalBytes = 0;
for (let i = 0; i < FRAMES; i++) {
  const t = (i / FRAMES) * DUR;   // ver plan §15.3: i/FRAMES, no i/(FRAMES-1) — t=10s == t=0s
  await page.evaluate((t) => window.setSceneTime(t), t);
  await new Promise(r => setTimeout(r, 16));
  const filePath = path.join(OUT_DIR, `f${String(i).padStart(2, '0')}.webp`);
  const buf = await page.screenshot({ path: filePath, type: 'webp', quality: CALIDAD, omitBackground: true });
  totalBytes += buf.length;
  if (i % 15 === 0) console.log(`  ${i}/${FRAMES}`);
}

await browser.close();

const totalKB = (totalBytes / 1024).toFixed(1);
const avgKB = (totalBytes / FRAMES / 1024).toFixed(1);
console.log('\nlisto:', OUT_DIR);
console.log(`  ${FRAMES} frames, ${totalKB} KB total, ${avgKB} KB/frame promedio`);
// El tope de 3,6 MB del plan original era para la versión CON fondo horneado (sin alfa), a
// 900x1350. Con transparencia real a 1200x1800 el costo esperado es ~10,3 MB — Ale lo aceptó el
// 2026-09-04 tras ver los números (subir resolución porque se veía pixelado). Este aviso queda
// solo para detectar un cambio inesperado, no para "corregir" bajando CALIDAD (no funciona, ver
// arriba) ni la resolución sin que Ale lo pida.
if (totalBytes > 12 * 1024 * 1024) {
  console.log('  ⚠ más pesado de lo esperado (>12 MB) — algo cambió respecto del 2026-09-04, revisar.');
}
