# Sur en Ruta — landing de inversores

Landing informativa de Sur en Ruta dirigida a posibles inversores. Ver `CLAUDE.md` para qué es
(y qué no es) este repo antes de tocar nada.

## Levantar en desarrollo

```
npm install
npm run dev
```

## Build de producción

```
npm run build
```

Genera `dist/`, que es lo único que se sube al hosting (lo ejecuta Ale, ver `CLAUDE.md`).

## Estructura

- `src/components/` — secciones y piezas reutilizables (`.astro`).
- `src/layouts/` — `Base.astro` (head, meta, OG, skip-link).
- `src/pages/` — `index.astro`.
- `src/styles/` — `tokens.css`, `base.css`.
- `src/data/` — contenido estructurado (componentes, rutas, niveles de punto, etapas, inversión,
  ferias).
- `src/assets/mapa/` — SVG de Uruguay + `FUENTE.md` de licencia.
- `src/assets/fonts/` — tipografías self-hosted.
- `public/` — favicon, `og-image.png`, `robots.txt`.
- `docs/planes/` — planes de este proyecto (arquitectura del trabajo, no del producto).
- `docs/fuentes/` — insumos verificados (documento de propuesta, exploración visual previa).
- `docs/decisiones/` — decisiones registradas (ej. identidad visual, cuando exista).

## `prototipos/`

Herramientas internas y descartables (ej. `prototipos/identidad/`, el comparador de paleta y
tipografía). **No se publican**: quedan fuera del build, el deploy sube solo `dist/`.
