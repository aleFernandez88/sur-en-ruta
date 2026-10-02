# Contenido de la landing — Sur en Ruta

**Reescritura completa 2026-09-03.** Reemplaza toda la versión anterior (landing mapeada 1:1 al
mazo de Ana, con RENAMU y la diferenciación institucional). Esa versión queda en el historial de
git. `docs/comparativa-mazo-vs-landing.md` quedó **obsoleto** (movido a
`docs/analisis/comparativa-mazo-vs-landing-OBSOLETO.md`).

---

## 1. Enfoque

La landing es un **spot publicitario de la app Sur en Ruta**. La app todavía no existe — por eso
se usan **maquetas falsas**: el demo de la app corriendo **en vivo** dentro del celular del
escenario (`public/app-demo/`, única fuente — se publica), más el video
`sur-en-ruta-app-showcase.mp4` y las capturas en `prototipos/app-demo/capturas/` (respaldo del
fallback N3). Ya **no existe** la secuencia de frames de scroll-scrub de P1.

- **Solo se habla de Sur en Ruta.** Cero menciones a RENAMU (ni el nombre, ni la diferenciación
  institucional, ni el aparato). La "red" que se nombra es la red propia de Sur en Ruta: sus
  puntos, rutas y servicios adheridos.
- **Mostrar rápido para retener al usuario.** No hay pantalla de hero previa: la P1 ya responde la
  primera pregunta y muestra el producto.
- **Tono de spot:** frases cortas, orientadas al beneficio, sin bajada institucional larga.

### Se mantiene del diseño base
**Escenario vertical** (`Escenario` + `Seccion`, secciones pineadas con scroll vertical; la línea
de tiempo sale de `src/lib/escenario.ts`, sin porcentajes calibrados a mano), Preloader, HiloRuta
lateral, **un gesto propio por pantalla** (no se repite el mismo), e identidad visual ya cerrada —
paleta (verde oliva `#5a6b2e` + celeste `#6cace4` + marino `#0f2b4d`), tipografías (Archivo display, Space Grotesk,
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

## 2. Estructura del escenario vertical

| # | id | Pregunta guía | Base |
|---|----|---------------|------|
| P1 | `que-es` | ¿Qué es Sur en Ruta? | identidad + pág. 07 |
| P2 | `que-hace` | ¿Qué hace? | pág. 08 |
| P3 | `como-lo-hace` | ¿Cómo lo hace? | pág. 07 + pág. 04 |
| P4 | `donde` | ¿Dónde lo hace? | pág. 06 |
| P5 | `cierre` | (CTA) | genérico, se ajusta al final |

Cada pantalla es una `<Seccion id="...">` (`src/components/pantallas/`). El orden y los nombres
salen de `src/data/recorrido.ts`; el largo de scroll de cada una, de `PRESUPUESTO_SVH` en
`src/lib/escenario.ts`. Sumar/quitar una pantalla = tocar `recorrido.ts` **y** `PRESUPUESTO_SVH`
(si falta uno, `ESCENARIO` tira error al arrancar).

**Presupuesto de scroll (Bloque E, 2026-09-23):** 940 svh en total.

| Sección | Largo (svh) | Pineada (largo − 100) |
|---------|-------------|-----------------------|
| P1 `que-es` | 160 | 60 |
| P2 `que-hace` | 160 | 60 |
| P3 `como-lo-hace` | 260 | 160 |
| P4 `donde` | 260 | 160 (≈27 svh por ruta) |
| P5 `cierre` | 100 | 0 (sin meseta: entra y el documento termina) |

---

## P1 · ¿Qué es Sur en Ruta?

**Arranque del escenario.** Responde la pregunta en el acto y muestra el producto.

- **Titular:** ¿Qué es Sur en Ruta?
- **Respuesta (copy propuesto):**
  > Una forma nueva de recorrer Uruguay: **por etapas, conectada, a tu ritmo.**
- **Bajada:** La app y la red que conecta a quien viaja con los puntos, servicios y rutas del país.
- **Marca:** "Explorá. Conectá. Viví."
- **Elemento visual:** el celular del escenario (chrome fijo, `Escenario.astro`) con el demo de la
  app **corriendo en vivo** (`public/app-demo/` dentro de un iframe). El rótulo "Vista conceptual
  de la app" es chrome permanente. Ya no hay canvas ni secuencia de frames.
- **Animación:**
  1. **Entrada TEMPORAL** (disparada por `:root.entrada`, sin scroll — P1 está en pantalla apenas
     carga): los 4 textos (titular, respuesta, bajada, marca) entran escalonados (120/300/460/610
     ms). Nada del contenido depende de scrollear (CLAUDE.md §1: "mostrar rápido para retener").
  2. **Permanencia SCROLL-DRIVEN** sobre el tramo pineado completo (`animation-timeline: --que-es`,
     `contain 0% contain 100%`): el velo de contraste se afloja y el bloque de texto se corre
     levemente — un plus mientras se lee. Ver `src/components/pantallas/P1QueEs.astro`.

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

- **Firma de pie:** URUGUAY — *conecta · ordena · potencia* (vive en la banda del escenario, ya no
  dentro de P2).
- **Animación (Bloque E, E8):** "dispersión desde el celular" — las 3 tarjetas salen de la posición
  del celular (a `x: 27%` en esta sección) con distancias decrecientes, y viajan a su fila final
  (escala + opacidad + traslado). En mobile suben desde abajo. Rangos `contain` 2-20 / 14-32 /
  26-44 %. Titular en blanco (`--color-texto-sobre-foto`, 5,87:1): marino sobre oliva da 2,43:1 y
  no se usa. Ver `src/components/pantallas/P2QueHace.astro`.

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

- **Cierre del bloque:** Tecnología, comunidad y comunicación al servicio del viaje. **Ahora se
  muestra** (hasta 2026-09-04 no se mostraba): aparece al final del beat A, antes del cruce.

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
- **Animación (Bloque E, E9):** dos beats superpuestos en la misma caja (`grid-area: 1/1`). Beat A
  (`contain 0%→35%`): las 4 herramientas se despliegan escalonadas. Cruce en `contain 30%→38%`: A
  sale con fade+translate y B entra. Beat B (`contain 32%→100%`): los 5 pasos viajan en un carril
  (`contain 40%→95%`) con su numeral 01-05 como hijo de cada tarjeta, y el cierre del bloque
  entra al final (`92%→100%`). El contenido va a la derecha en escritorio (celular a la
  izquierda, `x: −25%`) y arriba en mobile. Ver `src/components/pantallas/P3ComoLoHace.astro`.

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
- **Animación (Bloque E, E10):** "estado activo que rota". **Sin tarjetas**: el fondo es **color de
  ruta a pantalla completa** (lo pinta `Escenario.astro`) y los 6 bloques (nombre + bajada + ícono)
  están superpuestos; cada ruta ocupa una sub-meseta de 1/6 del tramo pineado (≈27 svh) y cambia
  por fade+translate. La primera arranca visible y la última termina visible. Índice de 6 puntos
  decorativo; los 6 bloques son un `<ul>` real accesible. Ver `src/components/pantallas/P4Donde.astro`.
- **Fotos:** `src/data/rutas.ts → foto` queda en `null` y **no tiene consumidor en la landing** (el
  color de ruta reemplazó a las fotos). D2 (licencia) queda solo dentro del demo.

---

## P5 · Cierre / CTA

**CTA genérico por ahora — se ajusta sobre el final del proyecto.**

La app todavía no existe, así que el CTA **no puede decir "descargala"**. Placeholder de trabajo:

- **Titular:** Sur en Ruta está en camino. (en `src/data/cierre.ts`, junto con `cta`)
- **Sub / acción:** [CTA genérico — "Muy pronto" / "Seguí el proyecto" / form de contacto — a definir]
- **CTA (D1):** `cierre.ts` tiene `cta: null`. En el build **no se renderiza ningún bloque de
  acción**; solo bajo `astro dev` se ve un hueco punteado "[CTA — a definir (D1)]", para no mover
  el layout el día que se resuelva.
- **Animación (Bloque E, E11):** sin meseta (100 svh), todo va sobre `animation-range: entry` de
  `--cierre`: el contenido se asienta (`entry 0%→80%`), el titular se "enciende" con un barrido de
  color vía `@property --p5-barrido` (`entry 20%→90%`) y el isotipo hace el "choque"
  (`entry 70%→100%`). Ver `src/components/pantallas/P5Cierre.astro`.

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

- **Pendientes del Bloque E (2026-09-23), ver plan §8:** iPhone real (T1-T6 en iOS, bloquea el
  deploy); D2 (licencia de fotos de ruta, antes del deploy); el demo carga Google Fonts de un
  tercero; el demo presenta como reales km por ruta y nombres de comercios inventados (lo revisa
  Ale); `public/img/oportunidad/` (4 fotos) sin uso pero publicado; prueba manual en Android real
  y Chrome con rueda real pendiente de Ale.
- **`app-demo`:** las 4 rutas ya están renombradas a la lista canónica de §3 y alineadas con
  `src/data/rutas.ts`. Sigue pendiente: conseguir fotos deployables (ver la corrección de §3 —
  decisión D2) y definir si la pantalla "Rutas" del demo muestra las 6 o un subconjunto.
- ~~**`src/pages/index.astro`:** hoy tiene 6 `<Pantalla>` con el contenido viejo (hero / portada /
  oportunidad / sistema-RENAMU / como-funciona / placeholder). Todo eso se reemplaza por P1–P5.~~ ✅
  reescrito completo el 2026-09-04 (`docs/planes/2026-09-04-reescritura-index-p1-p5.md`, pasos 1-12
  y 14) — P1-P5 en `src/components/pantallas/`, (2026-09-04) matemática de la cinta en `src/lib/cinta.ts`, borrada el 2026-09-23. El
  CTA de P5 (D1) y las fotos de P4 (D2) siguen bloqueados por Ale.
- ~~**`CLAUDE.md`:** §1, §2 y §6 están escritos alrededor de RENAMU + el mazo. Hay que reescribirlos
  con este enfoque.~~ ✅ ya reescritos (ver el propio `CLAUDE.md`, sin RENAMU, enfoque de spot).
- ~~`docs/comparativa-mazo-vs-landing.md`: obsoleto — archivar~~ ✅ movido a `docs/analisis/…-OBSOLETO.md` (2026-09-03).
- **P5 / CTA:** definir sobre el final — sigue pendiente (decisión D1 del plan de reescritura).
- **Animaciones de entrada:** una por pantalla, sin repetir — ✅ implementadas las 5 (ver §5
  Historial y la tabla de abajo).

---

## 5. Historial

- **2026-09-23** — Bloque E (`docs/planes/2026-09-23-bloque-e-secciones-chrome.md`): P1-P5 pasan a
  `<Seccion>` sobre el escenario vertical (presupuesto 940 svh, `src/lib/escenario.ts`), un gesto
  nuevo por pantalla (E7-E11), P3 muestra el cierre del bloque A, P4 pasa a color de ruta a
  pantalla completa sin tarjetas, P5 lee `src/data/cierre.ts`. Se borran la cinta (`cinta.ts`,
  `Pantalla`, `Lamina`, `SlidePlaceholder`) y la secuencia `p1-scrub`. Verde oliva `#5a6b2e`
  confirmado.
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
