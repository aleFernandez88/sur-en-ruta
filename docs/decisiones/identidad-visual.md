# Decisión: identidad de color de la landing

**Fecha:** 2026-08-27
**Estado:** vigente — sistema de color final salvo pedido de cambio de Ana.
**Aplica en:** `src/styles/tokens.css` (capa de color), `src/styles/base.css` (viñeta del fondo).

---

## Origen

El 2026-08-27 Ale pasó **4 boards de identidad** (concept boards, no manual de marca entregado —
son piezas generadas, texto deforme en varios lugares, mockups decorativos). Viven en `Downloads`,
no en el repo:

| Board | Contenido |
|---|---|
| `2ed70217-…png` | Aplicaciones de marca (redes, web, app, señalética, credencial, merch) + fila de **8 marcadores de mapa** (Institucional, Confiable, Territorial, Moderna, Agua, Acampada, Servicios, Áreas de servicio) |
| `0796f631-…png` | **"BRANDING SUR EN RUTA — Sistema de identidad visual"**: paleta nombrada de 5, tipografía (serif títulos / sans texto), tono de marca, set de 7 íconos de línea, eslogan "Uruguay en movimiento" |
| `f1d7503b-…png` | **Sello Viajero Responsable**: sello circular con laurel, 3 variantes (color / 1 tinta azul / 1 tinta verde), 5 íconos de significado, usos |
| `57bb0e28-…png` | Flujo de la app (certificado de motorhome, 9 pasos) + arquitectura de sub-marcas: RENAMU (institucional) / SUR EN RUTA (app viajero) / VÍA SUR (comunidad complementaria) |

**Decisión de Ale (pregunta directa, 2026-08-27): los boards mandan sobre el mazo de Ana para el
color.** El navy coincide en ambas fuentes; la diferencia real es que los boards traen **verde
oliva** (no el verde bosque del mazo) y suben **terracota + arena a roles plenos** de la paleta
(no "uso mínimo"). Antes de esta decisión, `tokens.css` tenía cargada la extracción del mazo —
quedó reemplazada.

Los valores adoptados son los **hex declarados en los boards** (láminas 2 y 3, ambas los listan
igual). El render de las láminas deriva un poco de esos hex (ruido de generación) — se toma la
etiqueta, no el píxel.

---

## Paleta

### Sistema de marca — 5 colores nombrados

| Token | Valor | Nombre en el board | Rol |
|---|---|---|---|
| `--color-marino` | `#0f2b4d` | Azul institucional | **Primario.** Estructura, títulos, franjas macizas, trazos de ícono. |
| `--color-marino-profundo` | `#0a2036` | — (derivado) | Círculos de ícono macizos, franjas inferiores. |
| `--color-verde` | `#5a6b2e` | Verde territorio | **Acento.** OLIVA, no verde bosque. Wordmark "SUR EN RUTA", 2º color de títulos, palabras resaltadas, dots. |
| `--color-verde-vivo` | `#8c9c50` | — (derivado) | Oliva levantado, solo sobre fondo oscuro y para resaltar palabras. |
| `--color-terracota` | `#c55a3a` | Terracota acento | Marcadores de mapa "territorial", detalles, pin del logo. |
| `--color-arena` | `#e7dfc9` | Arena | Superficies tintadas, marcadores "moderna"/"áreas", "sol" del isotipo. Es tinte, no color de texto. |

Alias de compatibilidad (componentes ya escritos los consumen — no romper):
`--color-acento` → `--color-marino` · `--color-acento-verde` → `--color-verde`.

### Fondo y superficies

| Token | Valor | Uso |
|---|---|---|
| `--color-fondo` | `#f7f3ec` | Fondo de toda la página. Off-white cálido de tono arena diluido, "blanco manchado" — **no** blanco puro. Coherente con el ground de los boards. |
| `--color-fondo-halo` | `#fdfbf6` | Un punto más claro. Solo `base.css`, para una viñeta radial muy sutil. |
| `--color-superficie` | `#ffffff` | Tarjetas/paneles. **Blanco puro** (los boards listan Blanco `#FFFFFF` como color de superficie) — el contraste tarjeta-blanca / fondo-cálido es parte del look. |
| `--color-superficie-borde` | `#e8e1d2` | Hairline con matiz arena para esas tarjetas. |

### Tinta (texto)

| Token | Valor | Uso |
|---|---|---|
| `--color-tinta` | `#1e2a38` | Texto principal. Negro con matiz azul marino, nunca negro puro. |
| `--color-tinta-suave` | `#59636e` | Texto secundario, bajadas, epígrafes. |

---

## Fondo "manchado" — cómo está implementado

`base.css` pinta el `body` con `--color-fondo` + un `radial-gradient` a `--color-fondo-halo`
(elipse amplia, centrada arriba, `background-attachment: fixed`). Deliberadamente sutil: se nota
en los márgenes que dejan las tarjetas al 82 % (mecánica "cinta") y detrás de las tarjetas blancas.

---

## Contraste (verificado)

- `--color-tinta` sobre `--color-fondo`: ~13:1 — OK AAA.
- `--color-marino` sobre `--color-fondo`: ~11:1 — OK para títulos y texto.
- `--color-verde` (`#5a6b2e`) sobre `--color-fondo`: ~5:1 — OK para títulos y acento; para cuerpo usar `--color-tinta`, el verde para destacar palabras.
- `--color-terracota` sobre `--color-fondo`: ~3.8:1 — solo elementos grandes / íconos, **no texto de cuerpo**.
- `--color-arena`: es tinte de superficie, nunca texto.

---

## Iconografía (de los boards, a construir en SVG propio)

Ale confirmó que los íconos se arman en SVG nosotros mirando los boards. Estilo: **línea, 2 tintas
(marino + oliva), trazo parejo, geométrico**. Catálogo visto en los boards:

- **Genéricos** (board 2): pernocte (camper), acampada (carpa + pinos), ruta (camino sinuoso),
  agua (gota), descarga (dump station), guardería (casa + personas), app (teléfono).
- **Marcadores de mapa** (board 1): forma de gota/escudo con glifo blanco — Institucional
  (columnas), Confiable (escudo + check), Territorial (pin, en terracota), Moderna (barras, en
  arena), Agua (gota, en marino), Acampada (carpa + árbol), Servicios (surtidor, en terracota),
  Áreas de servicio (casa, en arena).
- **Sello Viajero Responsable** (board 3): sello circular con laurel + texto en anillo
  (`textPath`), 3 variantes de tinta. Íconos de significado: hoja (compromiso ambiental), camino
  (buen camino), check (buenas prácticas), gota (agua), camper (viaje en motorhome).

---

## Tipografía (definida 2026-08-27)

Los boards no nombran familias — solo piden **"serif institucional para títulos"** + **"sans
serif limpia para textos"**. Se identificó el *tipo* por la forma de las letras en las láminas
(serif de contraste moderado con serifas abracketadas para títulos; humanista neutra para cuerpo)
y se eligieron equivalentes libres, self-hosted:

| Rol | Familia | Token | Por qué |
|---|---|---|---|
| **Logotipo / nombre de marca** ("Sur en Ruta" donde aparece como marca: preloader) | **Italiana** | `--fuente-marca` | 2026-08-27, elección de Ale. La fuente real del logo es **Passenger Display Semibold** (Indian Type Foundry, **de pago**) — Didone de alto contraste. Italiana es la Didone libre (SIL OFL) más cercana. **Un solo peso (400), estática.** NO para texto ni títulos de sección. |
| **Enunciados a tamaño display** (hoy: la frase de la Portada, "El país entero, en una sola red") | **Archivo** | `--fuente-display` | 2026-08-28, en reemplazo de Work Sans. Ale trajo como referencia "Neue Haas Grotesk Text Pro" (Monotype, de pago, no self-hosteable); se comparó en vivo contra Schibsted Grotesk y Public Sans (grotescas libres, descartadas). Grotesca de alto contraste. Variable. (Work Sans, la elección del 27/8, se había comparado contra Lora / Source Sans / Inter.) |
| Títulos de sección, cifras | **Lora** | `--fuente-titular` | Serif de contraste moderado, serifas con bracket, cálida. Variable (400–700). |
| Cuerpos, bajadas, UI, labels | **Source Sans 3** | `--fuente-texto` | Humanista, muy legible, neutra. Variable. |

- Archivos: `src/assets/fonts/*.woff2` (subsets latin + latin-ext, bajados de Google Fonts,
  **licencia SIL OFL** — libre comercial y redistribuible). ~190 KB en total, 6 archivos
  (incluye `italiana-latin.woff2`, ~10 KB).
- `@font-face` en `src/styles/fuentes.css` (importado primero en `Base.astro`). `font-display: swap`.
- Tokens en `tokens.css`: `--fuente-marca: 'Italiana', …` · `--fuente-titular: 'Lora', …` ·
  `--fuente-texto: 'Source Sans 3', …`.
- **Alternativas a Passenger/Italiana** si se revisa: Playfair Display 600 (más soporte, variable),
  Bodoni Moda 600 (más severa), Cormorant (misma vibe que Italiana pero con familia de pesos),
  GFS Didot, Instrument Serif. Para títulos de sección: Fraunces / Source Serif 4 / Spectral.
- Nota: el mazo de Ana usaba un **sans geométrico pesado** para los títulos — los boards mandan
  (serif), decisión ya tomada con Ale.
- **Eslogan / tagline.** Los boards dicen "Uruguay en movimiento"; el mazo de Ana dice "Conecta.
  Ordena. Potencia." / "Una red para ordenar y potenciar el turismo itinerante". Es copy, lo
  define Ana (regla `CLAUDE.md` §6). No se tocó ningún texto de la landing por esto.
- **Sub-marcas** (RENAMU / SUR EN RUTA / VÍA SUR). VÍA SUR aparece solo en el board 4 y no en el
  mazo ni en el PDF de propuesta — no se usa en la landing sin confirmación de Ana.
- **Colores por ruta temática** (`--color-ruta-*`). Asignación propia, retuneada para armonizar.

---

Ver también `docs/planes/2026-08-26-pivot-audiencia-general.md` y `docs/landing-contenido.md`.
