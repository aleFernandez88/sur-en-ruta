// Renderiza showcase.html a mp4 + webm (celular girando + recorrido de la app), 1080x1920, 10s.
// Uso:  npm i   (una vez)  →  con `npx astro dev --host` corriendo:  node render.mjs
import puppeteer from 'puppeteer';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, globSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

const URL = process.env.SHOWCASE_URL
  || 'http://localhost:4321/sur-en-ruta/app-demo/showcase.html?manual';

// ffmpeg: PATH primero; si no, el binario que instala `winget install Gyan.FFmpeg`.
function findFfmpeg() {
  if (process.env.FFMPEG) return process.env.FFMPEG;
  try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); return 'ffmpeg'; } catch {}
  const wg = path.join(process.env.LOCALAPPDATA || '', 'Microsoft/WinGet/Packages');
  const hit = globSync('Gyan.FFmpeg*/**/bin/ffmpeg.exe', { cwd: wg });
  if (hit[0]) return path.join(wg, hit[0]);
  throw new Error('ffmpeg no encontrado. Instalá con: winget install Gyan.FFmpeg  (o seteá $FFMPEG)');
}
const FFMPEG = findFfmpeg();

const FPS = 30;
const DUR = 10;                       // seg
const FRAMES = FPS * DUR;             // 300
const VW = 540, VH = 960, DSF = 2;    // → capturas de 1080x1920

const OUT_DIR = path.join(HERE, 'frames');
const OUT_MP4 = path.join(HERE, 'sur-en-ruta-app-showcase.mp4');

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: VW, height: VH, deviceScaleFactor: DSF });

console.log('cargando', URL);
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });

// esperar a que la escena marque listo
await page.waitForFunction('window.__ready === true', { timeout: 30000 });

// esperar a que las fotos de las rutas dentro del iframe terminen de cargar
await page.waitForFunction(() => {
  const f = document.getElementById('app');
  const d = f && f.contentDocument;
  if (!d) return false;
  const imgs = [...d.images];
  const bgs = [...d.querySelectorAll('.ruta-card__foto,.ruta-teaser__foto')];
  return imgs.every(i => i.complete) && bgs.length > 0;
}, { timeout: 30000 });
await new Promise(r => setTimeout(r, 800)); // colchón para decode de imágenes de fondo

console.log('renderizando', FRAMES, 'frames...');
for (let i = 0; i < FRAMES; i++) {
  const t = (i / FPS);
  await page.evaluate((t) => window.setSceneTime(t), t);
  await new Promise(r => setTimeout(r, 16));
  await page.screenshot({
    path: path.join(OUT_DIR, `f${String(i).padStart(4, '0')}.png`),
    type: 'png',
  });
  if (i % 30 === 0) console.log(`  ${i}/${FRAMES}`);
}

await browser.close();

console.log('ensamblando mp4 con ffmpeg...');
execFileSync(FFMPEG, [
  '-y',
  '-framerate', String(FPS),
  '-i', path.join(OUT_DIR, 'f%04d.png'),
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '18',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  OUT_MP4,
], { stdio: 'inherit' });

// versión webm (VP9) por si la quiere más liviana para web
const OUT_WEBM = OUT_MP4.replace(/\.mp4$/, '.webm');
execFileSync(FFMPEG, [
  '-y',
  '-framerate', String(FPS),
  '-i', path.join(OUT_DIR, 'f%04d.png'),
  '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '32',
  '-pix_fmt', 'yuv420p',
  OUT_WEBM,
], { stdio: 'inherit' });

console.log('\nlisto:');
console.log(' ', OUT_MP4);
console.log(' ', OUT_WEBM);
