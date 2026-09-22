// Servidor mínimo (sin dependencias) para abrir index.htm de esta carpeta y, a la vez, dejar el
// <iframe> de adentro en el MISMO origen que /sur-en-ruta/app-demo/ del dev server de Astro.
//
// Por qué hace falta esto y no alcanza con `npx astro dev --host` solo: el dev server de Astro
// intercepta cualquier request de NAVEGACIÓN (Accept: text/html) que no matchee una ruta suya y
// devuelve su propio 404 — incluso para un archivo que sí existe en disco fuera de `public/` o
// `src/pages/` (verificado en vivo: curl sin headers de navegador sirve el archivo por el
// passthrough estático de Vite, pero el mismo request con Accept: text/html, como hace cualquier
// navegador real al abrir la URL, da 404). Como `prototipos/` nunca puede vivir en `public/` ni en
// `src/pages/` (CLAUDE.md §8 — eso lo metería en `dist/` y lo publicaría), esta página no puede
// sumarse a esos dos árboles. La alternativa es este proxy: sirve el archivo desde un puerto
// aparte y reenvía `/sur-en-ruta/app-demo/*` al dev server real, así el iframe queda same-origin
// con esta página (indispensable para T5, que necesita leer/tocar el DOM de adentro del iframe).
//
// Uso: 1) `npx astro dev --host` desde la raíz del repo (deja 4321 arriba)
//      2) `node servidor.mjs` desde esta carpeta (deja 4322 arriba)
//      3) abrir http://<ip-de-la-compu>:4322/ en el celular (misma red Wi-Fi)

import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PUERTO = 4322;
const ASTRO_HOST = 'localhost';
const ASTRO_PUERTO = 4321;

const TIPOS = {
  '.htm': 'text/html; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8',
};

const servidor = http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.htm' : req.url;

  // reenvía todo lo de la app (mockup real) al dev server de Astro, tal cual llega
  if (url.startsWith('/sur-en-ruta/')) {
    const proxyReq = http.request(
      { host: ASTRO_HOST, port: ASTRO_PUERTO, path: url, method: req.method, headers: req.headers },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
        proxyRes.pipe(res);
      }
    );
    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('No se pudo contactar al dev server de Astro en :' + ASTRO_PUERTO + ' — ¿está corriendo `npx astro dev --host`? (' + err.message + ')');
    });
    req.pipe(proxyReq);
    return;
  }

  // el resto: archivos de esta misma carpeta, sin salir de ella
  const archivo = path.normalize(path.join(DIR, url));
  if (!archivo.startsWith(DIR) || !existsSync(archivo) || !statSync(archivo).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('No encontrado: ' + url);
    return;
  }
  const ext = path.extname(archivo);
  res.writeHead(200, { 'Content-Type': TIPOS[ext] || 'application/octet-stream' });
  createReadStream(archivo).pipe(res);
});

servidor.listen(PUERTO, '0.0.0.0', () => {
  console.log('Prueba iframe 3D arriba en http://localhost:' + PUERTO + '/');
  console.log('Para abrir desde el celular: misma red Wi-Fi + IP de la compu (ver `astro dev --host`) : ' + PUERTO);
});
