# Contenido de la landing — Sur en Ruta

**Reescritura completa 2026-09-03.** Reemplaza toda la versión anterior (landing mapeada 1:1 al
mazo de Ana, con RENAMU y la diferenciación institucional). Esa versión queda en el historial de
git. `docs/comparativa-mazo-vs-landing.md` quedó **obsoleto** (movido a
`docs/analisis/comparativa-mazo-vs-landing-OBSOLETO.md`).

---

## 1. Enfoque

La landing es un **spot publicitario de la app Sur en Ruta**. La app todavía no existe — por eso
se usan **maquetas falsas** (el prototipo `prototipos/app-demo/` + el video
`sur-en-ruta-app-showcase.mp4` + las capturas en `prototipos/app-demo/capturas/` + la secuencia de
90 frames en `public/p1-scrub/` que usa P1 para su scroll-scrub, ver §15 del plan de addendum).

- **Solo se habla de Sur en Ruta.** Cero menciones a RENAMU (ni el nombre, ni la diferenciación
  institucional, ni el aparato). La "red" que se nombra es la red propia de Sur en Ruta: sus
  puntos, rutas y servicios adheridos.
- **Mostrar rápido para retener al usuario.** No hay pantalla de hero previa: la P1 ya responde la
  primera pregunta y muestra el producto.
- **Tono de spot:** frases cortas, orientadas al beneficio, sin bajada institucional larga.

### Se mantiene del diseño base
Cinta horizontal (scroll-como-slide), Preloader, HiloRuta lateral, **una animación de entrada
propia por pantalla** (no se repite la misma), e identidad visual ya cerrada — paleta (verde
`#356a2c` + celeste `#6cace4` + marino `#0f2b4d`), tipografías (Archivo display, Space Grotesk,
Lora + Source Sans 3), íconos SVG propios. Ver `docs/decisiones/identidad-visual.md`.

### Reglas de contenido vigentes
- **Moneda:** todo monto se escribe con moneda explícita (`$U` o `UYU`, nunca `$` a secas). No
  aparece ningún monto en estas 4 pantallas, pero la regla rige.
- **Honestidad sobre tracción:** prohibido mostrar métricas de adopción (puntos adheridos,
  viajeros registrados, descargas, contadores tipo "+120 puntos"). Hoy son cero.
- **Fuente de datos:** los nombres propios (rutas, herramientas) y cualquier dato duro salen de
  documento fuente. El texto de spot (titulares, bajadas, frases de cierre) se puede redactar
  libre.

### Fuente de contenido
PDF nuevo de Ana, **4 páginas** — guardadas en `docs/fuentes/deck-2026-09/`:
- `pag-06-rutas.png` — "Rutas que cuentan Uruguay"
- `pag-07-herramientas.png` — "Herramientas que conectan la experiencia"
- `pag-08-beneficia-a-todos.png` — "Una red que beneficia a todos"
- `pag-04-como-funciona.png` — "Cómo funciona la red"

Se toman como **guía de info, no como plantilla**: se extrae lo necesario, no se replica el layout.

---

## 2. Estructura de la cinta

| # | id | Pregunta guía | Base |
|---|----|---------------|------|
| P1 | `que-es` | ¿Qué es Sur en Ruta? | identidad + pág. 07 |
| P2 | `que-hace` | ¿Qué hace? | pág. 08 |
| P3 | `como-lo-hace` | ¿Cómo lo hace? | pág. 07 + pág. 04 |
| P4 | `donde` | ¿Dónde lo hace? | pág. 06 |
| P5 | `cierre` | (CTA) | genérico, se ajusta al final |

Cada pantalla es un `<Pantalla completa>`. Al sumar/quitar pantallas se toca `N_PANTALLAS` en
`src/pages/index.astro` y la parada correspondiente en `HiloRuta.astro` (`recorrido`).

---

## P1 · ¿Qué es Sur en Ruta?

**Arranque de la cinta.** Responde la pregunta en el acto y muestra el producto.

- **Titular:** ¿Qué es Sur en Ruta?
- **Respuesta (copy propuesto):**
  > Una forma nueva de recorrer Uruguay: **por etapas, conectada, a tu ritmo.**
- **Bajada:** La app y la red que conecta a quien viaja con los puntos, servicios y rutas del país.
- **Marca:** "Explorá. Conectá. Viví."
- **Elemento visual — rediseñado 2026-09-04 (addendum de scroll-scrub):** full-bleed, no panel
  lateral. Una secuencia de **90 frames WebP** (`public/p1-scrub/`, generados por
  `prototipos/app-demo/render/scrub.mjs` a partir de la misma escena `showcase.html`) dibujada en
  `<canvas>` y atada al scroll — el celular gira y el recorrido de la app avanza cuadro a cuadro
  mientras el usuario scrollea, **no** en loop automático. Detalle técnico completo en
  `docs/planes/2026-09-04-reescritura-index-p1-p5.md` §15.
- **Animación — implementada 2026-09-04, ajustada el mismo día tras probarla en vivo, dos
  mecanismos:**
  1. **Entrada TEMPORAL** (disparada por `:root.entrada`, sin scroll — P1 se centra en 0%, sin
     tramo de aproximación): "cortina desde el centro" — la escena se enciende (opacity+scale), el
     titular hace wipe de `clip-path` centro→afuera, la respuesta sube con fade, y **las 4 líneas
     de texto (titular, respuesta, bajada, marca) más el rótulo "Vista conceptual de la app" entran
     todas acá, escalonadas** — nada del contenido de P1 depende de scrollear. *(Ajuste: el diseño
     original tenía la bajada y la marca reveladas recién con scroll, "como quien lee mientras mira
     el recorrido" — probado en vivo no funcionaba: violaba la regla de más peso de esta pantalla,
     CLAUDE.md §1 "mostrar rápido para retener". Se sacó.)*
  2. **Permanencia SCROLL-DRIVEN, tramo `0%→8%` de `--hz-progreso`** (con P1 ya centrada — no es
     una entrada): el scrub del canvas avanza con el scroll; el velo de contraste se afloja y el
     bloque de texto se corre levemente hacia el final del tramo — un plus mientras se lee, nunca
     algo de lo que dependa ver el contenido. De 8% a 14% queda un colchón: el scrub se congela en
     el último frame. Ver `src/components/pantallas/P1QueEs.astro`.

---

## P2 · ¿Qué hace?

**Base:** pág. 08 — "Una red que beneficia a todos".

- **Titular:** Una red que beneficia a todos
- **Idea central / cierre:**
  > La red transforma **el paso del viajero en valor para cada lugar.**
- **Tres bloques (para quién):**

  | Bloque | Ítems |
  |--------|-------|
  | **Para el viajero** | Información clara · Paradas mejor identificadas · Más confianza y mejores experiencias |
  | **Para los comercios y privados** | Más visibilidad · Nuevos clientes · Integración simple a una red turística |
  | **Para el territorio** | Circulación ordenada · Activación de economías locales · Mejor conexión entre destinos |

- **Firma de pie:** URUGUAY — *conecta · ordena · potencia*.
- **Animación de entrada — implementada 2026-09-04:** "las 3 columnas convergen" — columna
  izquierda y derecha entran desde ±45% en X, la del medio desde abajo; único movimiento en X de
  toda la cinta. Los 3 ítems de cada columna se descubren con un wipe vertical, uno por columna. El
  cierre subraya con una regla verde que se dibuja izquierda→derecha. Ver
  `src/components/pantallas/P2QueHace.astro`.

---

## P3 · ¿Cómo lo hace?

**Base:** pág. 07 (herramientas) + pág. 04 (los 5 pasos). **Dos bloques dentro de la misma
pantalla.**

### Bloque A — Las herramientas
- **Titular:** Herramientas que conectan la experiencia
- **Idea:** *Con herramientas que trabajan juntas.*

  | Herramienta | Qué es |
  |-------------|--------|
  | **App Sur en Ruta** | Mapa, puntos, servicios y rutas |
  | **Pasaporte de Ruta** | Una forma de viajar por etapas y sumar historias |
  | **Sello Viajero Responsable** | Buenas prácticas y confianza dentro de la red |
  | **Señalética e identidad** | Puntos reconocibles, información clara y presencia en el territorio |

- **Cierre del bloque:** Tecnología, comunidad y comunicación al servicio del viaje.

### Bloque B — Cómo funciona, paso a paso
- **Subtítulo:** Una experiencia simple, organizada y conectada.

  | # | Paso | Frase |
  |---|------|-------|
  | 01 | Encontrá puntos y rutas | La red te muestra dónde parar y qué hay cerca. |
  | 02 | Planificá tu recorrido | Cada punto informa servicios, horarios y condiciones. |
  | 03 | Accedé a servicios y experiencias | El viaje se vuelve más fácil, seguro y memorable. |
  | 04 | Sumá sellos y beneficios | Cada parada se transforma en una experiencia con historia. |
  | 05 | Viajá de forma responsable | Las buenas prácticas fortalecen el cuidado y la convivencia. |

- **Cierre del bloque:** Una red que organiza el viaje y potencia los destinos.
- **Animación de entrada — implementada 2026-09-04:** dos gestos distintos, uno por bloque. Bloque
  A ("4 paneles que se despliegan"): cada tarjeta gira en X desde -78° (perspectiva + rotación), en
  tira horizontal compacta. Bloque B: patrón trasladado de la vieja Pantalla 4 (ruta ondulada que
  se dibuja + nodos numerados que hacen pop + tarjetas que suben). Ver
  `src/components/pantallas/P3ComoLoHace.astro`.

---

## P4 · ¿Dónde lo hace?

**Base:** pág. 06 — "Rutas que cuentan Uruguay".

- **Titular:** Rutas que cuentan Uruguay
- **Bajada:** Experiencias temáticas para descubrir el país a otro ritmo.
- **Las 6 rutas temáticas** (lista canónica — ver §3):

  | Ruta | Bajada |
  |------|--------|
  | **Ruta del Vino** | Bodegas, gastronomía y paisaje productivo |
  | **Ruta Oceánica** | Costa, pueblos, mar y naturaleza |
  | **Ruta Termal** | Bienestar, descanso y servicios |
  | **Ruta Rural** | Estancias, productores y vida de campo |
  | **Ruta Patrimonial y Cultural** | Historia, identidad y pueblos |
  | **Ruta de Naturaleza y Aventura** | Sierras, lagunas y aire libre |

- **Cierre:** Cada ruta conecta puntos, servicios, paisajes y experiencias.
- **Animación de entrada — implementada 2026-09-04:** "las 6 rutas se van trazando" — cada tarjeta
  se descubre con un wipe horizontal izquierda→derecha (como un trazo de ruta avanzando), y el
  titular hace *tracking-in* (letter-spacing que se cierra). Único wipe horizontal por tarjeta y
  única animación tipográfica de toda la cinta. Ver `src/components/pantallas/P4Donde.astro`.

---

## P5 · Cierre / CTA

**CTA genérico por ahora — se ajusta sobre el final del proyecto.**

La app todavía no existe, así que el CTA **no puede decir "descargala"**. Placeholder de trabajo:

- **Titular:** Sur en Ruta está en camino.
- **Sub / acción:** [CTA genérico — "Muy pronto" / "Seguí el proyecto" / form de contacto — a definir]
- **Animación de entrada — implementada 2026-09-04 (titular sin CTA todavía, ver arriba):** "el
  hilo llega y el cierre se enciende" — único gesto de zoom-out de toda la cinta (el bloque de
  contenido arranca en `scale(1.1)` y se asienta), el titular se "enciende" con un barrido de color
  (gradient-text animado), y el isotipo hace el mismo "choque" que ya usaba la vieja Pantalla 1. Ver
  `src/components/pantallas/P5Cierre.astro`.

---

## 3. Rutas temáticas — lista canónica

Fuente: pág. 06 del PDF nuevo. **Esta es la lista única**: la usa la P4 de la landing **y** la
pantalla "Rutas" del `app-demo` (nombres alineados por decisión de Ale, 2026-09-03).

| # | Nombre | Bajada | Foto sugerida (app-demo) |
|---|--------|--------|--------------------------|
| 1 | Ruta del Vino | Bodegas, gastronomía y paisaje productivo | viñedo / bodega (falta) |
| 2 | Ruta Oceánica | Costa, pueblos, mar y naturaleza | `oceanica.jpg` (ex `atlantico.jpg`, laguna costera de Rocha) |
| 3 | Ruta Termal | Bienestar, descanso y servicios | termas (falta) |
| 4 | Ruta Rural | Estancias, productores y vida de campo | `rural.jpg` (campo con tranquera — foto que había quedado sin usar) |
| 5 | Ruta Patrimonial y Cultural | Historia, identidad y pueblos | `patrimonial.jpg` (ex `pueblos.jpg`, Colonia) |
| 6 | Ruta de Naturaleza y Aventura | Sierras, lagunas y aire libre | `naturaleza.jpg` (ex `sierras.jpg`, colinas + laguna) |

`faros.jpg` (faro de Cabo Polonio) **queda sin uso directo** — no hay "Ruta de los Faros" en la
lista nueva. Se puede reservar como refuerzo de la Ruta Oceánica.

**Corrección 2026-09-04 — ya no faltan 2 fotos, el problema es otro y es peor.** Las 6 imágenes
existen (`public/app-demo/rutas/` y `prototipos/app-demo/rutas/`), pero **no son deployables tal
cual**: `vino.jpg` y `termal.jpg` están **generadas con IA** (Pollinations, ver el commit `0bd39f5`)
y las otras 4 son fotos reales **sin `FUENTE.md` ni licencia registrada**. Publicarlas en una
pantalla que dice "rutas que **cuentan** Uruguay" es la decisión **D2** de
`docs/planes/2026-09-04-reescritura-index-p1-p5.md` (paso 13.2), todavía sin resolver con Ale.
Hasta que se resuelva, `src/data/rutas.ts` tiene `foto: null` y P4 se renderiza sin foto (fondo
tintado + ícono).

---

## 4. Pendientes / notas de implementación

- **`app-demo`:** las 4 rutas ya están renombradas a la lista canónica de §3 y alineadas con
  `src/data/rutas.ts`. Sigue pendiente: conseguir fotos deployables (ver la corrección de §3 —
  decisión D2) y definir si la pantalla "Rutas" del demo muestra las 6 o un subconjunto.
- ~~**`src/pages/index.astro`:** hoy tiene 6 `<Pantalla>` con el contenido viejo (hero / portada /
  oportunidad / sistema-RENAMU / como-funciona / placeholder). Todo eso se reemplaza por P1–P5.~~ ✅
  reescrito completo el 2026-09-04 (`docs/planes/2026-09-04-reescritura-index-p1-p5.md`, pasos 1-12
  y 14) — P1-P5 en `src/components/pantallas/`, matemática de la cinta en `src/lib/cinta.ts`. El
  CTA de P5 (D1) y las fotos de P4 (D2) siguen bloqueados por Ale.
- ~~**`CLAUDE.md`:** §1, §2 y §6 están escritos alrededor de RENAMU + el mazo. Hay que reescribirlos
  con este enfoque.~~ ✅ ya reescritos (ver el propio `CLAUDE.md`, sin RENAMU, enfoque de spot).
- ~~`docs/comparativa-mazo-vs-landing.md`: obsoleto — archivar~~ ✅ movido a `docs/analisis/…-OBSOLETO.md` (2026-09-03).
- **P5 / CTA:** definir sobre el final — sigue pendiente (decisión D1 del plan de reescritura).
- **Animaciones de entrada:** una por pantalla, sin repetir — ✅ implementadas las 5 (ver §5
  Historial y la tabla de abajo).

---

## 5. Historial

- **2026-09-04** — `src/pages/index.astro` reescrito con P1-P5 reales
  (`docs/planes/2026-09-04-reescritura-index-p1-p5.md`, pasos 1-12 y 14). Componente por pantalla
  en `src/components/pantallas/`, matemática de la cinta centralizada en `src/lib/cinta.ts`, cada
  pantalla con su animación de entrada propia (ver §§ P1-P5 arriba). Limpieza del código muerto del
  enfoque de inversores (`Hero`/`Sistema`/`Problema`/`Rutas`/`Inversion`/`MapaPlaceholder`/
  `Marcador`.astro y sus data files). Siguen bloqueados por Ale: el CTA de P5 (D1), las fotos de P4
  (D2) y el video de P1 (D4) — P1 usa la captura plana `01-mapa-inicio.png` mientras tanto.
- **2026-09-03** — reescritura completa. Pivot a spot de la app, 4 preguntas guía, sin RENAMU,
  sin mapeo al mazo. Los 5 pasos de "Cómo funciona la red" entran en P3. Nombres de ruta del
  `app-demo` se alinean a la lista del deck. CTA genérico provisorio.
- **2026-08-27** — (anterior, descartada) landing mapeada 1:1 al mazo de Ana, 10 pantallas, con
  RENAMU. Ver historial de git.
