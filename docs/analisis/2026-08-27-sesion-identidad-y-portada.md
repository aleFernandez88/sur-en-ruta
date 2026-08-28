# Análisis / bitácora — sesión 2026-08-27: identidad visual + portada

Registro de lo trabajado y decidido esta sesión. No es un plan de acción (eso vive en
`docs/planes/`) ni la fuente de verdad de cada decisión (esa vive en `docs/decisiones/`) — es el
resumen de por dónde pasó la sesión, para retomar sin releer todo el chat.

---

## 1. Identidad de color — cerrada

- **Fuente:** primero se extrajo la paleta del mazo de Ana (`Presentacion Sur en Ruta RENAMU.pdf`,
  render con PyMuPDF + muestreo pixel a pixel). Después Ale pasó **4 boards de identidad** (concept
  boards generados, en `Downloads`) y confirmó que **esos mandan** sobre el mazo para el color.
- **Diferencia clave:** el navy coincide en ambas fuentes; los boards traen **verde OLIVA**
  (`#5a6b2e`) en vez del verde bosque del mazo, y suben **terracota + arena a roles plenos** de
  la paleta.
- **Aplicado en:** `src/styles/tokens.css` (capa de color, ya no `PROVISORIO`) + `src/styles/base.css`
  (viñeta radial del fondo "blanco manchado").
- **Detalle completo:** `docs/decisiones/identidad-visual.md`.

Paleta: `--color-marino #0f2b4d` · `--color-verde #5a6b2e` (oliva) · `--color-terracota #c55a3a` ·
`--color-arena #e7dfc9` · `--color-fondo #f7f3ec` · `--color-superficie #ffffff` ·
`--color-tinta #1e2a38`.

---

## 2. Íconos — v1 armada

- **`src/components/Icono.astro`** — 23 glifos de línea, grilla 24×24, trazo 1.7, `currentColor`,
  2ª tinta opcional (`data-acento`). Dibujados usando los boards de guía, sin copiarlos.
- **`src/components/Marcador.astro`** — pin de mapa (gota de color + glifo blanco, reusa `Icono`).
- **`prototipos/iconos/index.html`** — catálogo descartable para revisar.
- Todavía no se consumen en ninguna sección.
- **A refinar en 2ª pasada:** `senaletica` (poste débil), `acampada` (parece triángulo de
  peligro), glifo de `camper` dentro del marcador chico.

---

## 3. Estructura de la landing — se levanta la rigidez

- **Se elimina la regla "exactamente 5 pantallas, sin partir ninguna".** La mecánica "cinta" no
  tiene tope de cantidad (verificado: nada hardcodea `5`).
- El techo de ~120 palabras pasa a ser **por pantalla**, no por sección. Una sección puede ocupar
  2+ pantallas — se decide al implementarla, sobre todo para subir el nivel de "show" visual.
- **Renumeración:** el Hero pasa a ser **Sección 0 · Portada** (intro sin datos). Contenido
  numerado 1–4: Problema/Oportunidad → Mapa y servicios → Rutas/Pasaporte → Centro Regional.
- **Idea descartada:** agregar una 5ª sección al final (cierre/manifiesto) — Ale dijo "dejémoslo
  así", solo se abre la puerta a partir secciones sobre la marcha.
- **Aplicado en:** `docs/landing-contenido.md` (headers renumerados, tabla nueva, "Regla de
  extensión" reescrita) + `src/pages/index.astro` (etiquetas + comentario).

---

## 4. Tipografía — cerrada

- Los boards piden "serif institucional para títulos" + "sans limpia para textos", sin nombrar
  familias. Se identificó el tipo por la forma de las letras y se eligieron equivalentes libres:
  **Lora** (títulos) + **Source Sans 3** (cuerpo), self-hosted.
- **Aplicado en:** `src/assets/fonts/*.woff2` (5 archivos, ~180 KB, licencia SIL OFL) +
  `src/styles/fuentes.css` (`@font-face`) + `Base.astro` (import) + `tokens.css` (tokens
  `--fuente-*`, ya no `PROVISORIO`).
- **Detalle + alternativas descartadas:** `docs/decisiones/identidad-visual.md` § Tipografía.

### 4b. Fuente del logotipo — Italiana (2026-08-27, más tarde)

Ale localizó la fuente real del logo: **Passenger Display Semibold** (Indian Type Foundry, **de
pago**, Didone de alto contraste). Eligió **Italiana** (Google Fonts, SIL OFL) como equivalente
libre — misma familia visual, **un solo peso 400, estática**. Se self-hosteó
(`italiana-latin.woff2`, 10 KB) y se agregó el token **`--fuente-marca`**, aplicado SOLO donde
"Sur en Ruta" es marca: título del preloader + eyebrow del Hero. NO para texto ni títulos de
sección (a tamaño chico se pierde). El eyebrow del Hero quedó un poco delicado sobre la foto —
pendiente de decidir si se agranda, o vuelve a la sans y Italiana queda solo para el wordmark
grande.

---

## 5. Sección 0 · Portada (Hero) — rehecha

`src/components/Hero.astro` reescrito con la identidad nueva:
- Titular en **Lora** 600, anclado abajo-izquierda, ~2 líneas.
- **Regla corta terracota** + eyebrow "RENAMU · SUR EN RUTA" (mismo gesto que los títulos de
  sección de los boards).
- Velo de contraste en degradé (marino profundo abajo-izquierda, foto limpia arriba-derecha).
- Señal **"SEGUÍ EL RECORRIDO →"** al pie (chevron a la derecha porque la "cinta" avanza en
  horizontal, con nudge sutil).
- Ken Burns un poco más lento y sobrio que antes (28 s / escala 1.08).
- Copy sin cambios (sale de `docs/landing-contenido.md` Sección 0).

**Verificado en el navegador** (dist servido bajo el base path `/sur-en-ruta/`). Build OK.

**Pendiente que NO es de esta sesión:** la foto `src/assets/hero/ruta-placeholder.jpg` sigue
siendo la muestra provisoria — tiene relieve de fondo que no es de Uruguay, sin camper en cuadro,
licencia sin verificar. Ver `src/assets/hero/FUENTE.md`. No deployar así.

---

## 5b. Preloader — armado y cerrado

`src/components/Preloader.astro` (en `Base.astro`). Inspirado en benjamincreative.me (análisis
aparte en `docs/analisis/2026-08-27-preloader-benjamincreative.md` — sitio Framer + Unicorn
Studio). Estado final tras varias vueltas con Ale:

- **Fondo `--color-marino` (`#0f2b4d`)** — se probó terracota primero, Ale se quedó con el azul.
- **Salida en dos bandas horizontales:** la de arriba sube, la de abajo baja (cortina vertical)
  descubriendo el Hero. El **título "SUR EN RUTA"** (Italiana, `--fuente-marca`) va en la banda de
  arriba; el **eslogan "Conecta. Ordena. Potencia."** (constante `ESLOGAN`, textual del mazo de
  Ana) en la de abajo. Cada texto se va con su banda. Sin "RENAMU".
- Entrada 100 % CSS: título `scale 2.4→1`, eslogan fade + rise.
- **Hold de 1,5 s** (`MIN_MS = 1500`) con fondo + letras antes de abrir la cortina.
- Retiro por JS vanilla: `Promise.all([window load, document.fonts.ready])` + `MIN_MS` →
  `class is-fuera` → bandas transicionan (0.72 s) → `display:none`.
- Red de seguridad `@keyframes` a los 5 s si el JS falla; fade en `prefers-reduced-motion`.
- Verificado en navegador. Sin dependencias nuevas.

## 5c. Sección 0 · Portada — copy + entrada + tipografía (2026-08-27, tarde)

**Estado final: al mínimo.** Se sacaron el eyebrow y el titular grande en Lora. Queda **solo la
frase de encuadre** (2 líneas, `<span class="hero-linea">` dentro de `<h1 class="hero-frase">`),
con el texto **"El país entero, / en una sola red"** (que antes era el titular). El texto que
estuvo antes en la bajada ("Una red para ordenar y potenciar… conecta viajeros…") ya no está —
se integra en la Sección 1 (nota en `docs/landing-contenido.md`).

- **Fuente de la frase: Work Sans** (nuevo token `--fuente-display`). Ale comparó en vivo Lora /
  Source Sans / Inter / Work Sans y eligió Work Sans. Self-hosteada (`work-sans-latin.woff2` +
  `-ext`, variable). Inter se probó y se descartó — sus `.woff2` y `@font-face` se borraron.
- **Tamaño: `clamp(2.5rem, 1.2rem + 4.5vw, 5rem)`**, peso **400**, `line-height: 1.04`,
  `white-space: nowrap` (2 líneas fijas), `.hero-contenido` a `min(94vw, 62rem)`.
- **Entrada escalonada** (`.hero-entra` fade-up): línea 1 → línea 2, ~150 ms de stagger.
  Disparada por `:root.entrada` que pone `Preloader.astro` **~1,25 s** después de abrir la
  cortina (pausa deliberada con la foto sola antes de que suba el texto).
- **Señal de "seguí"**: se sacó el texto "Seguí el recorrido"; quedó una **flecha grande dentro
  de un círculo** (~3.25–4.25rem, borde blanco translúcido + `backdrop-filter`), a **media
  altura** sobre el borde derecho, con el nudge sutil. Apunta a la derecha (la "cinta" avanza
  horizontal).
- Verificado por estilos computados (el navegador automatizado quedó con viewport en 0 px y no
  renderiza — la revisión visual la hace Ale en su Chrome).
- Robustez: `Base.astro` agrega `:root.js` antes de pintar (sin JS → todo visible, sin animación)
  y un failsafe que pone `:root.entrada` a los 4,5 s por si el preloader no dispara. Reduced-motion:
  sin animación.
- Verificado en navegador (el settle final es correcto; el navegador automatizado renderiza el
  stagger con lag, revisar en un Chrome normal para ver la cadencia real).

## 5d. Estructura de 10 pantallas + arranque del shell (noche)

- **Decisión:** seguir el mazo de Ana (10 páginas) **1:1** — ~10 pantallas de la "cinta", no 5.
  Pantalla 0 = hero propio; Pantallas 1–9 = páginas 2–10 del mazo con copy literal. 4 chips del
  mazo en Pantalla 1, entra "¿Qué es RENAMU/Sur en Ruta?", van las frases de apoyo.
- **`docs/comparativa-mazo-vs-landing.md`** — transcripción verbatim de las 10 páginas del mazo
  (el PDF no tiene capa de texto) + comparación mano a mano contra lo que teníamos. Conclusión:
  lo que habíamos escrito **ya era casi todo el copy literal del mazo**, solo condensado.
- **`docs/landing-contenido.md`** — reescrito entero como spec de las 10 pantallas.
- **`CLAUDE.md`** § 1 — actualizado (ya no "hasta 5 secciones").
- **Primer intento de replicar todo el diseño del mazo → REVERTIDO.** Ale: "no salió nada bien",
  mejor **parte por parte, guiado por él**. Se borraron los componentes de ese intento.
- **Rearmado incremental — cerrado el día en el paso 2:** `src/components/Lamina.astro` con
  (1) fondo claro full-screen + (2) footer navy con **borde ondulado continuo** (spec exacta de
  Ale: BASE 100px en la costura, una subida y una bajada, corte a media subida → engancha con la
  siguiente pantalla; seno entero por pantalla). Aprobado ("impecable").
- Detalle técnico + gotcha del navegador automatizado en la memoria `proyecto-renamu-slide-horizontal`.

## 6. Estado de git al cierre (sin pushear — lo hace Ale)

Modificados: `CLAUDE.md`, `docs/landing-contenido.md`, `src/components/Hero.astro`,
`src/layouts/Base.astro`, `src/pages/index.astro`, `src/styles/base.css`, `src/styles/tokens.css`.
Nuevos: `docs/decisiones/`, `docs/analisis/` (este + preloader), `docs/comparativa-mazo-vs-landing.md`,
`prototipos/iconos/`, `src/assets/fonts/`, `src/components/Icono.astro`,
`src/components/Marcador.astro`, `src/components/Preloader.astro`, `src/components/Lamina.astro`,
`src/styles/fuentes.css`.

---

## 7. Próximos pasos

1. **Contenido de la Sección 0 · Portada** — el siguiente tema que pidió Ale (cerró el preloader
   acá). El copy actual sale de `docs/landing-contenido.md` § 0; falta ver qué quiere ajustar
   (copy, layout, la foto, el eyebrow con Italiana, etc.).
2. Cargar el copy real de la **Sección 1 (Problema/Oportunidad + Sello)** en un componente, con
   los tokens y los íconos (`area`, `puntos-amigos`, `sello`). Partir en 2 pantallas si pide aire.
3. Seguir sección por sección (2, 3, 4).
4. 2ª pasada de refinamiento de íconos.
5. Pendientes de fondo: confirmar con Ana el nivel de detalle del Sello y el rótulo "vista
   conceptual"; decidir el futuro de `HiloRuta` (comentado en `Base.astro`); reemplazar la foto
   del Hero por la real de Verzet Group.
