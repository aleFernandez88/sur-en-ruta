# render — video y capturas del app-demo

Herramienta interna (no se publica). A partir de `../showcase.html` genera:

- **`render.mjs`** → `sur-en-ruta-app-showcase.mp4` + `.webm` — el celular girando en 3D con el
  recorrido de la app (Mapa arriba → scroll → toca el teaser → push a Rutas → scroll). 10 s,
  1080×1920, loop de rotación.
- **`stills.mjs`** → `../capturas/*.png` — capturas planas del celular (de frente) de varias
  secciones. Editá el array `SHOTS` para agregar/cambiar.

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

Los `.mp4`/`.webm` quedan en esta carpeta pero **no se versionan** (`.gitignore`). Copiar a
`Downloads/` o donde haga falta. Las **capturas sí se versionan** (`../capturas/`).

## Notas

- El movimiento y el scroll los maneja `window.setSceneTime(t)` / `window.setStill(opts)` en
  `showcase.html` — todo determinista, por eso el render frame-a-frame es reproducible.
- El contenido de pantalla es el mockup real (`../index.html`) dentro de un `<iframe>` — no hay
  nada generado con IA, es 100% fiel.
