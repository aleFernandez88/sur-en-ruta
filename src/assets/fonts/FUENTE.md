# Fuentes self-hosted

| Archivo | Familia | Rol | Token |
|---|---|---|---|
| `italiana-latin.woff2` | Italiana (400, estática) | **solo el logotipo / nombre de marca** | `--fuente-marca` |
| `archivo-latin.woff2` + `-ext` | Archivo (variable 100–900) | enunciados a tamaño display (hoy: frase de la Portada) | `--fuente-display` |
| `lora-latin.woff2` + `-ext` + `-italic` | Lora (variable 400–700) | títulos de sección, cifras | `--fuente-titular` |
| `source-sans-3-latin.woff2` + `-ext` | Source Sans 3 (variable) | cuerpo, bajadas, UI, labels | `--fuente-texto` |

**Origen:** Google Fonts (`fonts.gstatic.com`). Italiana/Lora/Source Sans 3 bajadas el 2026-08-27;
Archivo bajada el 2026-08-28 (reemplaza a Work Sans, bajada y descartada el mismo día).
**Licencia:** SIL Open Font License 1.1 — uso comercial y redistribución permitidos, incluido
servir los `.woff2` desde nuestro propio dominio. No requiere atribución visible en la página.

**Por qué estas:** ver `docs/decisiones/identidad-visual.md` § Tipografía. Elegidas para acercarse
a lo que muestran los boards de identidad ("serif institucional" + "sans limpia").

**Cómo se cargan:** `@font-face` en `src/styles/fuentes.css`, importado en `src/layouts/Base.astro`.
Vite las hashea y las copia a `dist/_astro/` en el build.

**Si se cambian las familias:** reemplazar los `.woff2` acá, actualizar `fuentes.css` (nombres +
unicode-range) y los tokens `--fuente-*` en `tokens.css`. Nada más las referencia.
