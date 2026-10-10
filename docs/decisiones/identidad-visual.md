# Decisión: identidad de color de la landing

**Fecha:** 2026-08-27
**Estado:** vigente — sistema de color final salvo pedido de cambio de Ana.
**Aplica en:** `src/styles/tokens.css` (capa de color), `src/styles/base.css` (viñeta del fondo).
**Revisado:** 2026-10-09 — alineado con el código real.

> **Nota 2026-09-23 (Bloque E) — D-A resuelto.** El oliva `#5a6b2e` queda **confirmado** como verde
> de marca. `--color-verde-vivo` (`#8c9c50`) es solo para acento sobre fondo oscuro. El isotipo
> **volvió al oliva**. El marino sobre oliva **no se usa** como combinación de texto (2,43:1, no
> pasa ni AA de texto grande); sobre oliva va texto blanco (`--color-texto-sobre-foto`, 5,87:1).

> **Revisión 2026-10-09.** La decisión de identidad (paleta de 5, roles tipográficos, íconos de
> 2 tintas) sigue vigente sin cambios; se corrigió el documento como referencia técnica para que
> coincida con `tokens.css`: fondo real `#f1f0ee`, tabla de contraste recalculada, tokens
> `--color-celeste` / `--color-marino-noche` / `--fuente-fina` documentados, fuentes reales, íconos
> hechos, y se aclara que el sello circular con laurel **no existe**. Las menciones a la "cinta" y
> al mazo con RENAMU son historia: hoy el escenario es vertical.

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

Tokens adicionales (existen en `tokens.css`, no vienen de los boards):

| Token | Valor | Uso |
|---|---|---|
| `--color-celeste` | `#6cace4` | Referencia Pantone 279 C (franja de la bandera). Color de "progreso ya recorrido" en HiloRuta, sobre el marino de base. |
| `--color-marino-noche` | `#050b14` | Azul casi negro, más oscuro que `--color-marino-profundo`. Nació para el degradé del footer de la lámina del mazo viejo. |
| `--color-texto-sobre-foto` | `#ffffff` | Texto sobre foto y sobre fondos oliva/oscuros. |
| `--color-velo-foto` | `#000000` | Velo translúcido para garantizar contraste del texto sobre foto. |
| `--color-ruta-*` | vino `#7a3540` · oceánica `#2f5d78` · termal `#bf6b3a` · rural `#6b7d3a` · patrimonial `#75607f` · naturaleza `#3d7a5c` | Un color por ruta temática (asignación propia). |

Alias de compatibilidad (componentes ya escritos los consumen — no romper):
`--color-acento` → `--color-marino` · `--color-acento-verde` → `--color-verde`.

### Fondo y superficies

| Token | Valor | Uso |
|---|---|---|
| `--color-fondo` | `#f1f0ee` | Fondo base de la página. Gris cálido muy claro, "blanco manchado" — **no** blanco puro. Original `#f7f3ec` (leía demasiado beige), ajustado a mano por Ale el 2026-08-28. Hoy cada sección pinta su propio fondo sobre el escenario fijo; este es el de base. |
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
(elipse amplia, centrada arriba, `background-attachment: fixed`). Deliberadamente sutil. Desde el
escenario vertical, el fondo que se ve lo pinta `.escenario` (`Escenario.astro`, capa fija con un
fondo por sección en cross-fade); el del `body` queda detrás y solo asoma en el fallback.

---

## Contraste (verificado)

Recalculado 2026-10-09 con los valores reales (fórmula WCAG 2.x):

| Par | Ratio | Veredicto |
|---|---|---|
| `--color-tinta` sobre `--color-fondo` | 12,77:1 | AAA |
| `--color-marino` sobre `--color-fondo` | 12,52:1 | AAA — títulos y texto |
| `--color-tinta-suave` sobre `--color-fondo` | 5,37:1 | AA — texto secundario |
| `--color-verde` (`#5a6b2e`) sobre `--color-fondo` | 5,15:1 | AA — títulos y acento; para cuerpo, `--color-tinta` |
| `--color-verde` sobre `--color-superficie` (blanco) | 5,87:1 | AA |
| Blanco (`--color-texto-sobre-foto`) sobre `--color-verde` | 5,87:1 | AA — **combinación para texto sobre oliva** |
| `--color-verde-vivo` sobre `--color-marino-profundo` | 5,49:1 | AA — acento sobre fondo oscuro |
| `--color-terracota` sobre `--color-fondo` | 3,76:1 | solo elementos grandes / íconos, **no texto de cuerpo** |
| `--color-marino` sobre `--color-verde` | 2,43:1 | **No pasa** (ni 3:1) — prohibido como texto |

`--color-arena` es tinte de superficie, nunca texto.

---

## Iconografía (de los boards, SVG propio)

**Ya construido:** `src/components/Icono.astro` tiene ~33 íconos de línea (grilla 24×24, trazo 1,7,
una tinta `currentColor` + 2ª tinta opcional en las piezas `data-acento`). Los marcadores de mapa
viven en el demo (`public/app-demo/`). **No existe** el sello circular con laurel y texto en anillo
del board 3 — solo hay un ícono `sello` simple (medalla con check). El catálogo de abajo es lo que
mostraban los boards, no lo que hay hecho.

Estilo: **línea, 2 tintas
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
| Nombres de sección del menú de HiloRuta | **Space Grotesk** (300) | `--fuente-fina` | 2026-08-28. Grotesca fina que complementa a Archivo sin ser la misma familia. Uso puntual; no reemplaza ningún rol cerrado el 27/8. |
| Títulos de sección, cifras | **Lora** | `--fuente-titular` | Serif de contraste moderado, serifas con bracket, cálida. Variable (400–700). |
| Cuerpos, bajadas, UI, labels | **Source Sans 3** | `--fuente-texto` | Humanista, muy legible, neutra. Variable. |

- Archivos: `src/assets/fonts/*.woff2` (subsets latin + latin-ext, bajados de Google Fonts,
  **licencia SIL OFL** — libre comercial y redistribuible). 10 archivos, ~282 KB en total
  (Archivo, Italiana, Lora + itálica, Source Sans 3 y Space Grotesk; ver `FUENTE.md` en esa carpeta).
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
- **Sub-marcas** (RENAMU / SUR EN RUTA / VÍA SUR). Desde el pivot del 2026-09-03 la landing **no
  menciona RENAMU** (`CLAUDE.md` §1). VÍA SUR aparece solo en el board 4 y no en el mazo ni en el
  PDF de propuesta — no se usa sin confirmación de Ana.
- **Colores por ruta temática** (`--color-ruta-*`). Asignación propia, retuneada para armonizar.

---

Ver también `docs/planes/2026-08-26-pivot-audiencia-general.md` y `docs/landing-contenido.md`.
