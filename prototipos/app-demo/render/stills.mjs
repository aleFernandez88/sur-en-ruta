// Capturas planas del celular (1080x1920) de varias secciones del app-demo, con el mismo template.
// Uso:  npm i   (una vez)  →  con `npx astro dev --host` corriendo:  node stills.mjs
// Editá SHOTS para agregar/cambiar secciones. Salen en ../capturas/.
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const URL = 'http://localhost:4321/sur-en-ruta/app-demo/showcase.html?manual';
const OUT = path.join(HERE, '..', 'capturas');
mkdirSync(OUT, { recursive: true });

// pantalla + posición de scroll (0..1) + opcional pin/ficha del mapa
const SHOTS = [
  { name: '01-mapa-inicio',   opts: { screen: 'mapa',   scroll: 0 } },
  { name: '02-mapa-punto',    opts: { screen: 'mapa',   scroll: 0.52, pin: 2, ficha: 'expandida' } },
  { name: '03-mapa-cercatuyo',opts: { screen: 'mapa',   scroll: 1 } },
  { name: '04-rutas',         opts: { screen: 'rutas',  scroll: 0 } },
  { name: '05-rutas-scroll',  opts: { screen: 'rutas',  scroll: 1 } },
  { name: '06-perfil',        opts: { screen: 'perfil', scroll: 0 } },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 540, height: 960, deviceScaleFactor: 2 }); // capturas 1080x1920

await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
await page.waitForFunction('window.__ready === true', { timeout: 30000 });
await page.waitForFunction(() => {
  const f = document.getElementById('app');
  return f && f.contentDocument && [...f.contentDocument.images].every(i => i.complete);
}, { timeout: 30000 });
await new Promise(r => setTimeout(r, 600));

for (const s of SHOTS) {
  await page.evaluate((o) => window.setStill(o), s.opts);
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT, `${s.name}.png`), type: 'png' });
  console.log('  ', s.name);
}

await browser.close();
console.log('listo →', OUT);
