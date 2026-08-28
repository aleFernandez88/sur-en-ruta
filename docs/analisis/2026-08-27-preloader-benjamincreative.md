# Análisis — preloader de benjamincreative.me (referencia para el de Sur en Ruta)

**Fecha:** 2026-08-27
**Método:** navegación + inspección de DOM/CSS y del JSON de animaciones de Framer con Claude in
Chrome. La **entrada** se capturó bien; la **salida** (cómo se retira el panel) NO se pudo ver —
en el navegador automatizado el preloader se quedó colgado sin desmontarse (espera una señal —
probablemente el `ready` de la escena WebGL de Unicorn Studio — que en ese contexto no llega).

---

## Qué es (stack)

- Sitio hecho con **Framer**. El preloader es un componente de Framer (`div.framer-1euzf18-container`).
- Usa **Unicorn Studio** (`unicornstudio.js`, WebGL) — el fondo naranja no es plano, tiene una
  textura/shader muy sutil animada.
- **Sin GSAP, sin Lenis, sin Locomotive, sin jQuery.** Las animaciones son las "Appear
  Animations" nativas de Framer (spring / tween con `framer-motion` por debajo).

## Cómo se ve

- Panel **fijo a pantalla completa**, `position: fixed`, `z-index: 10`.
- Color: **`#FB4617` al ~95% de opacidad** (un naranja bermellón fuerte).
- Contenido centrado, en blanco:
  - Wordmark **"Benjamin"** (sans-serif, grande) con un **"®"** en superíndice arriba a la derecha.
  - Debajo, subtítulo **"Digital Product Designer"** (más chico, ~81% opacidad).
  - Una **hairline horizontal de ancho completo** a la altura de la línea de base del wordmark
    (divisor sutil del layout).
- El stage que contiene el wordmark tiene `overflow: hidden` — recorta lo que se sale.

## La animación de entrada (del JSON de Framer, valores exactos)

Tres piezas, escalonadas:

| Pieza | `initial` | `animate` | Curva |
|---|---|---|---|
| Wordmark "Benjamin" | `scale: 3.5`, `opacity: 1` | `scale: 1` | tween con `ease` + `duration` |
| "®" (superíndice) | `opacity: 0.001`, `y: -15` | `opacity: 1`, `y: 0` | spring (damping/mass/stiffness) |
| Subtítulo | `opacity: 0.001`, `y: +25`, `scale: 0.6` | `opacity: 0.9`, `y: 0`, `scale: 1` | spring |

**Lectura visual:** la palabra arranca **gigante (3.5×)** — tan grande que solo se ve la "B"
llenando el centro, medio fantasma — y **se encoge hasta su tamaño real**, quedando nítida. Al
mismo tiempo el "®" cae desde arriba y el subtítulo sube desde abajo agrandándose. Todo en ~1 s.

## La salida (NO capturada — inferida)

El panel no se desmontó en la prueba. El patrón típico de este estilo (y lo más probable acá):
cuando la página está lista, el panel naranja **se desliza/wipe hacia arriba** (o hace un
`clip-path` que se cierra hacia arriba, o un simple fade) en ~0.6–0.8 s, descubriendo el contenido
que ya estaba montado debajo. **A confirmar por Ale abriéndolo en su Chrome normal** — el
navegador automatizado no sirvió para esta parte.

---

## Adaptación para Sur en Ruta — IMPLEMENTADO 2026-08-27

`src/components/Preloader.astro` (renderizado en `Base.astro`, primer hijo de `<body>`). Verificado
en el navegador.

**Ajustes que pidió Ale sobre la v1** (la v1 era un panel único que subía + lockup RENAMU/Sur en Ruta):

1. **Salida en dos bandas.** El fondo se parte en dos bandas horizontales de 50vh: la de arriba
   sube (`translateY(-100%)`), la de abajo baja (`translateY(100%)`) — cortina que se abre en
   vertical, descubriendo el Hero. Igual que el sitio de referencia (que hace lo mismo, aunque no
   se pudo captar en vivo).
2. **Texto partido por la costura.** Fuera "RENAMU". El **título "SUR EN RUTA"** (Lora, caps,
   tracking) vive en la banda de arriba y se va con ella; el **eslogan** vive en la banda de
   abajo y se va con ella.
3. **Eslogan: "Conecta. Ordena. Potencia."** — textual del mazo de Ana (fuente válida). Es una
   constante (`ESLOGAN`) al tope del componente, fácil de cambiar si Ana define otra.

- Fondo: **`--color-marino` (`#0f2b4d`)** — Ale pidió probar el azul de la paleta en vez de la
  terracota (2026-08-27). Cambiar la variable en `.preloader__banda` para volver a terracota.
- Título en **Italiana** (fuente del logotipo, `--fuente-marca` — ver identidad-visual § Tipografía).
- Entrada 100 % CSS `@keyframes`: título `scale 2.3 → 1` (ease), eslogan `opacity 0 + y:10 → .85`
  con delay 0.25 s.
- Retiro por JS vanilla (~15 líneas, inline, sin dependencias): `Promise.all([load, fonts.ready])`
  + piso **600 ms** → `class is-fuera` → las bandas transicionan (`0.72s`) → `display:none`.
- **Red de seguridad:** `@keyframes preloader-failsafe` apaga todo a los **5 s** si el JS falla.
- **`prefers-reduced-motion`:** sin escala ni cortina, solo un fade corto.

**Pendiente de afinar con Ale** (no bloqueante): piso de 600 ms (~1.3 s total, se puede subir);
tamaño/tracking del título; separación título↔eslogan respecto de la costura; el eslogan real.

### Propuesta original (referencia)

Mismo esqueleto, con nuestra identidad:

- Panel `position: fixed`, `inset: 0`, `z-index` alto. Color de fondo: **`--color-marino`**
  (`#0f2b4d`) como opción sobria, o **`--color-terracota`** (`#c55a3a`) si querés el golpe de
  color fuerte estilo Benjamin. (El naranja de ellos ≈ nuestra terracota, más saturada.)
- Contenido centrado: **"Sur en Ruta"** en **Lora** (la fuente que ya cargamos) + un tagline
  chico debajo en Source Sans (pendiente cuál — "RENAMU" / o nada, el eslogan está sin cerrar
  con Ana). Isotipo opcional arriba.
- Entrada: wordmark de `scale ~2.5 → 1` con ease; tagline `opacity 0 + y:20 → 1` con un pelín de
  delay. 100% CSS (`@keyframes` + `animation`), sin `framer-motion`.
- Salida: al terminar de cargar (`window.load` + fuentes vía `document.fonts.ready`, con un
  mínimo de ~600 ms para que no "parpadee" en conexiones rápidas), el panel hace
  `transform: translateY(-100%)` con easing → descubre el Hero. JS vanilla mínimo
  (`IntersectionObserver` no hace falta acá; alcanza `Promise.all([load, fonts.ready])` + timeout).
- `prefers-reduced-motion`: sin scale ni slide, solo un fade corto del panel.
- Detalle a cuidar: el Hero ya tiene su propio Ken Burns + la señal "seguí el recorrido" — el
  preloader tiene que entregar el Hero ya "armado", no competir con él. Probablemente el panel
  se va y el Hero aparece tal cual (sin re-animar su contenido), o con un stagger muy sutil.

**Costo:** un componente `Preloader.astro` + ~30 líneas de CSS + ~15 de JS vanilla en `Base.astro`.
Nada de dependencias nuevas.

---

Ver también `docs/decisiones/identidad-visual.md` y `docs/analisis/2026-08-27-sesion-identidad-y-portada.md`.
