# Contenido de la landing — Sur en Ruta

**Reescritura completa 2026-09-03.** Reemplaza toda la versión anterior (landing mapeada 1:1 al
mazo de Ana, con RENAMU y la diferenciación institucional). Esa versión queda en el historial de
git. `docs/comparativa-mazo-vs-landing.md` queda **obsoleto**.

---

## 1. Enfoque

La landing es un **spot publicitario de la app Sur en Ruta**. La app todavía no existe — por eso
se usan **maquetas falsas** (el prototipo `prototipos/app-demo/` + el video
`sur-en-ruta-app-showcase.mp4` + las capturas en `prototipos/app-demo/capturas/`).

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
PDF nuevo de Ana, **4 páginas** (capturas en `docs/fuentes/` / carpeta de referencia):
- pág. 06 — "Rutas que cuentan Uruguay"
- pág. 07 — "Herramientas que conectan la experiencia"
- pág. 08 — "Una red que beneficia a todos"
- pág. 04 — "Cómo funciona la red"

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
- **Elemento visual:** el **video del celular** (`sur-en-ruta-app-showcase.mp4`) — celular sobre
  fondo marino, girando, con el recorrido de la app. Puede ir en loop.
- **Animación de entrada:** por definir (distinta a las demás). El video ya aporta movimiento, así
  que la entrada del texto puede ser sobria.

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
- **Animación de entrada:** por definir (distinta).

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
- **Animación de entrada:** por definir (distinta). Los 5 pasos piden una entrada escalonada al
  ritmo del scroll (patrón que ya existe en el proyecto).

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
- **Animación de entrada:** por definir (distinta).

---

## P5 · Cierre / CTA

**CTA genérico por ahora — se ajusta sobre el final del proyecto.**

La app todavía no existe, así que el CTA **no puede decir "descargala"**. Placeholder de trabajo:

- **Titular:** Sur en Ruta está en camino.
- **Sub / acción:** [CTA genérico — "Muy pronto" / "Seguí el proyecto" / form de contacto — a definir]

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

**Faltan 2 fotos:** Ruta del Vino y Ruta Termal.

---

## 4. Pendientes / notas de implementación

- **`app-demo`:** renombrar las 4 rutas actuales (Atlántico / Faros / Sierras y Lagunas / Pueblos
  del Interior) a la lista canónica de §3. Definir si la pantalla "Rutas" del demo muestra las 6 o
  un subconjunto. Conseguir las 2 fotos que faltan (Vino, Termal). El teaser "Rutas destacadas" de
  la pantalla Mapa también hay que ajustarlo.
- **`src/pages/index.astro`:** hoy tiene 6 `<Pantalla>` con el contenido viejo (hero / portada /
  oportunidad / sistema-RENAMU / como-funciona / placeholder). Todo eso se reemplaza por P1–P5.
- **`CLAUDE.md`:** §1, §2 y §6 están escritos alrededor de RENAMU + el mazo. Hay que reescribirlos
  con este enfoque.
- **`docs/comparativa-mazo-vs-landing.md`:** obsoleto — archivar o borrar.
- **P5 / CTA:** definir sobre el final.
- **Animaciones de entrada:** una por pantalla, sin repetir. Se definen una a una con Ale.

---

## 5. Historial

- **2026-09-03** — reescritura completa. Pivot a spot de la app, 4 preguntas guía, sin RENAMU,
  sin mapeo al mazo. Los 5 pasos de "Cómo funciona la red" entran en P3. Nombres de ruta del
  `app-demo` se alinean a la lista del deck. CTA genérico provisorio.
- **2026-08-27** — (anterior, descartada) landing mapeada 1:1 al mazo de Ana, 10 pantallas, con
  RENAMU. Ver historial de git.
