# render — video y capturas del app-demo

Herramienta interna (no se publica). A partir de `../showcase.html` genera:

- **`render.mjs`** → `sur-en-ruta-app-showcase.mp4` + `.webm` — el celular girando en 3D con el
  recorrido de la app (Mapa arriba → scroll → toca el teaser → push a Rutas → scroll). 10 s,
  1080×1920, loop de rotación.
- **`stills.mjs`** → `../capturas/*.png` — capturas planas del celular (de frente) de varias
  secciones. Editá el array `SHOTS` para agregar/cambiar.
- **`scrub.mjs`** → `../../../public/p1-scrub/f00.webp` … `f89.webp` — 90 frames del celular
  girando **con canal alfa** (misma escena que `render.mjs`, modo `?fondo=transparente`: sin el
  fondo horneado, solo celular + glow + sombra de piso) para el scroll-scrub de P1 en `<canvas>`
  (`src/components/pantallas/P1QueEs.astro`, `docs/planes/2026-09-04-...md` §15). El degradé de
  fondo lo pone el CSS de `.p1` — el celular "flota" sobre eso en vez de traer su propio fondo
  horneado (así no hay que hacer calzar dos degradés). **Cuesta ~2× más que sin alfa** (~82 KB/frame,
  ~7,4 MB el set — la máscara de transparencia se comprime aparte del color en WebP y domina el
  peso; bajar `quality` casi no ayuda). Ale lo aceptó igual el 2026-09-04 — ver el comentario grande
  en `scrub.mjs` para el detalle y el porqué de una medición anterior equivocada. **No usa ffmpeg**
  — la compresión WebP la hace `page.screenshot({type:'webp', omitBackground:true})` de Puppeteer.

## Setup (una vez)

```
cd prototipos/app-demo/render
npm i
```

Descarga puppeteer + su Chromium (~200 MB, no se versiona).

Para el **video** hace falta `ffmpeg`: `winget install Gyan.FFmpeg` (el script lo busca en el PATH
y, si no, en la carpeta de winget; o seteá `FFMPEG` con la ruta al binario).

## Uso

1. Levantar el dev server con host, desde la raíz del repo:
   ```
   npx astro dev --host
   ```
2. Video: `node render.mjs` — tarda ~7 min (300 frames + encode).
3. Capturas: `node stills.mjs` — rápido.
4. Scrub de P1: `node scrub.mjs` — rápido (~30 s, sin encode).

Los `.mp4`/`.webm` quedan en esta carpeta pero **no se versionan** (`.gitignore`). Copiar a
`Downloads/` o donde haga falta. Las **capturas sí se versionan** (`../capturas/`).

**Los frames de `scrub.mjs` (`public/p1-scrub/`) CONGELAN el estado de `../index.html`** — igual que
el video, si el mockup cambia (nombres de ruta, fotos, colores) hay que volver a correr `scrub.mjs`
para que P1 no muestre una versión vieja de la app. Al 2026-09-04 siguen **sin versionar** en el
repo público hasta que se resuelva la decisión D2/D7 del addendum del plan (¿se pueden publicar las
6 fotos de ruta que se ven en el recorrido, 2 de ellas generadas con IA?).

## Notas

- El movimiento y el scroll los maneja `window.setSceneTime(t)` / `window.setStill(opts)` en
  `showcase.html` — todo determinista, por eso el render frame-a-frame es reproducible.
- El contenido de pantalla es el mockup real (`../index.html`) dentro de un `<iframe>` — no hay
  nada generado con IA, es 100% fiel.
- **`../showcase.html` (la fuente) y `../../../public/app-demo/showcase.html` (la copia servida)
  hay que sincronizarlas A MANO tras cualquier edición** — no hay build ni symlink. Se olvidó una
  vez (2026-09-04): los scripts de acá (`render.mjs`, `stills.mjs`, `scrub.mjs`) siempre cargan la
  URL servida (`http://localhost:4321/.../app-demo/showcase.html`), así que un cambio sin
  sincronizar se genera con la versión VIEJA sin que ningún error lo avise. `cp` antes de
  regenerar cualquier cosa.
