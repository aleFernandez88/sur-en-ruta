# Contenido de la landing — Sur en Ruta / Proyecto RENAMU

**Reescritura 2026-08-27.** Ale decidió seguir el mazo de Ana (`Presentacion Sur en Ruta
RENAMU.pdf`, 10 páginas) **página por página**: ~10 pantallas de la "cinta" horizontal.
El copy de cada pantalla es el **literal del mazo** (transcrito en
`docs/comparativa-mazo-vs-landing.md` — el PDF no tiene capa de texto, transcripción a mano de los
renders, verificar contra la imagen antes de dar por final).

**Decisiones de Ale (2026-08-27):**
1. 10 pantallas (mazo 1:1), no 5.
2. Pantalla 1: los **4 chips del mazo** (Libertad · Naturaleza · Experiencias · Economía local),
   no los elementos del sistema.
3. **Entra** la pantalla "¿Qué es RENAMU / Sur en Ruta?" (pág. 3) — es diferenciación, no
   explicación al detalle.
4. **Van las frases de apoyo** por ítem (las que el mazo pone bajo cada título).

**Reglas que se mantienen** (`CLAUDE.md`): sin CTA transaccional; regla de honestidad sobre
tracción (los mockups de app se muestran como concepto, con rótulo tipo "Vista conceptual"); todo
número/nombre sale del mazo o del PDF de propuesta.

---

## Sistema visual del mazo (se replica, SVG inline propio)

- **Fondo claro cálido** = `--color-fondo` (`#f7f3ec`). Zona de contenido a la izquierda, con una
  **curva orgánica** que la separa de la foto.
- **Foto a la derecha** que sangra por el borde, con **corte en curva S**.
- **Footer ondulado navy** de borde a borde (a veces con verde debajo, textura de curvas de
  nivel, **línea de ruta punteada** con nodos, y una frase de cierre — a veces en pill navy).
- **Título** bicolor: primera parte navy, resto verde; mayúsculas; **subrayado verde corto**.
- **Eyebrow**: grilla de puntos (verde) + línea vertical punteada, arriba a la izquierda.
- **Isotipo** (colinas + ruta S + camper) flotando arriba a la derecha en la mayoría de láminas.
- **Foto-tarjetas**: redondeadas, blancas, sombra difusa, foto arriba + círculo de ícono + título
  + texto.
- Número de página abajo a la derecha (en la landing puede omitirse o volverse indicador de
  progreso).

Mecánica: cada pantalla es `<Pantalla completa>` (edge-to-edge) — el look del mazo necesita
full-bleed (footer y foto que sangran). Se pierde el "peek" de la tarjeta al 82%.

---

## Pantalla 0 — Portada (Hero) — **YA CONSTRUIDA, se mantiene**

No sigue el mazo: hero propio. Foto full-bleed + Ken Burns, y **una sola frase**:
> El país entero,
> en una sola red

(Work Sans 500, ~5rem, entrada escalonada.) Flecha en círculo a media altura (derecha).
El wordmark "RENAMU / SUR EN RUTA" y la bajada institucional del mazo **no** van acá.

---

## Pantalla 1 — "LA OPORTUNIDAD" (mazo pág. 2)

**Título:** LA (navy) · OPORTUNIDAD (verde)
**Subtítulo:** Una nueva forma de viajar necesita una nueva forma de organizarse

**Bloque 1** (ícono de gráfico creciente): **El turismo itinerante crece** porque combina
libertad, flexibilidad y contacto con el territorio.

**Bloque 2** (ícono de pin): **La oportunidad** está en ordenar la experiencia con información
clara, servicios identificados y buenas prácticas.

**4 chips** (ícono + label): Libertad · Naturaleza · Experiencias · Economía local

**Cierre** (ícono ⚠): **Sin una red organizada,** la experiencia pierde claridad, seguridad y
conexión con el destino.

**Visual:** foto (camper en ruta costera) sangrando por la derecha con corte S · footer ondulado ·
isotipo arriba a la derecha · stack de foto-mini a la derecha del mazo (faro, viñedo, cartel,
feria) — opcional, evaluar si recarga.

---

## Pantalla 2 — "¿Qué es RENAMU / Sur en Ruta?" (mazo pág. 3)

**Título:** ¿Qué es (navy) · RENAMU / (navy) Sur en Ruta? (verde)

**Dos nodos:**
- **RENAMU** (ícono de institución / frontón) — Marco territorial e institucional
- **SUR EN RUTA** (ícono de red / personas) — Plataforma de conexión, comunicación y experiencia
- (unidos por un ícono de eslabón)

**6 componentes numerados:**
1. Áreas habilitadas o recomendadas
2. Puntos Amigos
3. Sello Viajero Responsable
4. Rutas temáticas
5. Pasaporte de Ruta
6. App y sistema de medición

**Cierre:** Un sistema que conecta **viajeros, destinos, servicios y comunidad**.

**Visual:** más "esquema" que foto — nodos + línea de árbol hacia las 6 tarjetas. Footer ondulado
con "URUGUAY / CONECTA. ORDENA. POTENCIA."

---

## Pantalla 3 — "CÓMO FUNCIONA LA RED" (mazo pág. 4)

**Título:** CÓMO (navy) · FUNCIONA LA RED (verde)
**Subtítulo:** Una experiencia simple, organizada y conectada

**5 pasos** (número en círculo, navy/verde alternado; ícono; título; frase de apoyo):
1. **Encontrá puntos y rutas** — La red te muestra dónde parar y qué hay cerca.
2. **Planificá tu recorrido** — Cada punto informa servicios, horarios y condiciones.
3. **Accedé a servicios y experiencias** — El viaje se vuelve más fácil, seguro y memorable.
4. **Sumá sellos y beneficios** — Cada parada se transforma en una experiencia con historia.
5. **Viajá de forma responsable** — Las buenas prácticas fortalecen el cuidado y la convivencia.

**Cierre:** Una red que **organiza el viaje y potencia los destinos**.

**Visual:** timeline horizontal de 5 pasos (línea punteada uniéndolos) · tira de fotos abajo ·
footer ondulado "URUGUAY / CONECTA. ORDENA. POTENCIA."

---

## Pantalla 4 — "PUNTOS QUE HACEN FUNCIONAR LA RED" (mazo pág. 5)

**Título:** PUNTOS QUE (navy) · HACEN FUNCIONAR LA RED (verde)
**Subtítulo:** La red se apoya en espacios, servicios y alianzas reales

**3 foto-tarjetas** (foto + ícono + título + frase):
- **Áreas habilitadas o recomendadas** — Espacios públicos o privados preparados para recibir
  viajeros.
- **Puntos Amigos** — Comercios y emprendimientos que suman valor al recorrido.
- **Servicios clave** — Agua, descarga, electricidad, residuos, gastronomía, información y
  asistencia.

**Cierre** (ícono personas): No todos los puntos deben ser iguales; **lo importante es que estén
bien identificados y conectados**.

**Visual:** 3 tarjetas grandes · footer ondulado con línea de ruta punteada.

---

## Pantalla 5 — "RUTAS QUE CUENTAN URUGUAY" (mazo pág. 6)

**Título:** RUTAS QUE (navy) · CUENTAN (verde) · URUGUAY (verde) — 3 líneas
**Subtítulo:** Experiencias temáticas para descubrir el país a otro ritmo

**6 foto-tarjetas** (foto + ícono + nombre + descripción de una línea):
- **Ruta del Vino** — bodegas, gastronomía y paisaje productivo
- **Ruta Oceánica** — costa, pueblos, mar y naturaleza
- **Ruta Termal** — bienestar, descanso y servicios
- **Ruta Rural** — estancias, productores y vida de campo
- **Ruta Patrimonial y Cultural** — historia, identidad y pueblos
- **Ruta de Naturaleza y Aventura** — sierras, lagunas y aire libre

**Cierre:** Cada ruta **conecta** puntos, servicios, paisajes y experiencias.

**Visual:** grilla 3×2 de foto-tarjetas · isotipo arriba a la derecha · footer con la frase de
cierre.
**Rótulo de honestidad:** "Rutas propuestas. El relevamiento territorial es parte de las próximas
etapas." (se mantiene de la versión anterior — la idea sigue aplicando aunque no esté en el mazo).
**Datos:** `src/data/rutas.ts` ya tiene las 6 rutas — usar las descripciones **de una línea del
mazo** (las de arriba), no los párrafos largos del PDF de propuesta.

---

## Pantalla 6 — "HERRAMIENTAS QUE CONECTAN LA EXPERIENCIA" (mazo pág. 7)

**Título:** HERRAMIENTAS (navy) · QUE CONECTAN / (verde) LA EXPERIENCIA (verde)

**4 ítems** (ícono + título + frase):
- **App Sur en Ruta** — mapa, puntos, servicios y rutas
- **Pasaporte de Ruta** — una forma de viajar por etapas y sumar historias
- **Sello Viajero Responsable** — buenas prácticas y confianza dentro de la red
- **Señalética e identidad** — puntos reconocibles, información clara y presencia territorial

**Cierre** (ícono personas): **Tecnología, comunidad y comunicación** al servicio del viaje.

**Visual:** los 4 ítems a la izquierda · **mockup de app** (teléfono) + pasaporte + sticker del
Sello a la derecha, sobre foto de fondo. El mockup lleva **rótulo "Vista conceptual de la app"**
(regla de honestidad). Copy del mockup (del mazo): "SUR EN RUTA / Explorá. Conectá. Viví." ·
"Cerca tuyo" (Alojamientos · Gastronomía · Servicios · Atractivos) · "Rutas destacadas" · "Ruta
del Atlántico / Naturaleza y dunas costeras / 120 km" · nav: Explorar · Rutas · Pasaporte · Perfil.

---

## Pantalla 7 — "UNA RED QUE BENEFICIA A TODOS" (mazo pág. 8)

**Título:** UNA RED QUE (navy) · BENEFICIA A TODOS (verde)

**3 columnas** (foto + ícono + título + 3 bullets):
- **Para el viajero** — Información clara · Paradas mejor identificadas · Más confianza y mejores
  experiencias
- **Para comercios y privados** — Más visibilidad · Nuevos clientes · Integración simple a una red
  turística
- **Para el territorio** — Circulación ordenada · Activación de economías locales · Mejor conexión
  entre destinos

**Cierre** (ícono red): La red transforma el paso del viajero en **valor para cada lugar**.

**Visual:** 3 columnas con foto arriba · footer ondulado "URUGUAY / CONECTA. ORDENA. POTENCIA."

---

## Pantalla 8 — "URUGUAY, CENTRO REGIONAL PARA EL VIAJERO ITINERANTE EXTRANJERO" (mazo pág. 9)

**Título:** URUGUAY, (navy) · CENTRO REGIONAL (verde) · PARA EL VIAJERO ITINERANTE EXTRANJERO (navy)
**Subtítulo:** Una puerta de entrada ordenada para recorrer Sudamérica

**Mapa de Sudamérica** con 3 callouts:
- **BRASIL** — Conexión natural y cultural
- **ARGENTINA** — Puente terrestre y cultural
- **PATAGONIA** — Puerta a paisajes icónicos

**3 tarjetas numeradas:**
1. **UBICACIÓN ESTRATÉGICA** — Entre Brasil y Argentina, con distancias amigables y gran
   diversidad de paisajes.
2. **BASE SEGURA Y CONECTADA** — Ideal para iniciar, pausar o finalizar recorridos por el sur del
   continente.
3. **SERVICIOS COMPLEMENTARIOS** — Guardería, mantenimiento, equipamiento, información y
   experiencias locales.

**Cierre** (pill navy, ícono personas): Uruguay puede pasar de ser un país de paso a un **destino
preparado y memorable**.

**Visual:** mapa de Sudamérica (SVG propio, o silueta simple) con líneas punteadas a los 3
destinos · foto-collage con corte diagonal a la derecha · footer "URUGUAY / CONECTA. ORDENA.
POTENCIA."

---

## Pantalla 9 — "URUGUAY, PREPARADO PARA UNA NUEVA FORMA DE VIAJAR" (mazo pág. 10) — cierre

**Título:** URUGUAY, (navy) · PREPARADO PARA UNA NUEVA FORMA DE VIAJAR (verde)
**Subtítulo:** Una visión país para el turismo itinerante

**Cuerpo:** **RENAMU / Sur en Ruta** propone una red que le da al viajero razones para detenerse,
recorrer, consumir, recomendar y volver.

**4 íconos:** Conectar destinos · Ordenar la experiencia · Activar economías locales · Mostrar
Uruguay desde sus rutas

**Cierre general de la landing** (footer navy, ícono personas): Una red para viajar mejor y
mostrar un Uruguay **más conectado**.

**Visual:** isotipo grande dentro de un círculo a la derecha, sobre foto · footer ondulado navy
"URUGUAY / CONECTA. ORDENA. POTENCIA." **Sin CTA.**

---

## Regla de extensión

El techo de ~120 palabras visibles es **por pantalla**. Ninguna de las 10 lo supera con este
reparto (el mazo ya está pensado como slides). Si al construir una no entra cómoda, se recorta
frase de apoyo antes que partir la pantalla.

---

## Pendientes de implementación

1. **Piezas visuales reutilizables** (SVG inline): curva orgánica del fondo, footer ondulado
   (con línea de ruta punteada + frase), corte S de la imagen, eyebrow de puntos, isotipo.
2. **Íconos**: `src/components/Icono.astro` ya tiene la mayoría (`medicion`, `ubicacion`,
   `puntos-amigos`, `sello`, `app`, `pasaporte`, `senaletica`, `agua`, `acampada`, `institucional`,
   `montana`, `uva`, `ola`, `termal`, `granja`, `columnas`, `ruta`, `servicios`, `base-conectada`,
   `confiable`, `area`, `camper`). Falta chequear cobertura fina por pantalla y agregar los que
   falten (ej. "gráfico creciente" para el bloque 1 de Pantalla 1, "warning" para el cierre).
3. **Isotipo en SVG** — no existe todavía (solo el wordmark Italiana). Hace falta para el chrome
   de las láminas. Dibujar uno simple (colinas + ruta S + camper + pin).
4. **Imágenes** — placeholders con el corte S; se cambian cuando haya fotos reales de Verzet Group.
5. `src/data/componentes.ts` / `inversion.ts` / `etapas.ts` / `ferias.ts` — revisar qué se reusa
   y qué se da de baja.
6. `Sistema.astro` / `Inversion.astro` / `Problema.astro` viejos — reemplazar por los componentes
   de pantalla nuevos.

Ver también `docs/comparativa-mazo-vs-landing.md`, `docs/decisiones/identidad-visual.md`,
`docs/planes/2026-08-26-pivot-audiencia-general.md`.
