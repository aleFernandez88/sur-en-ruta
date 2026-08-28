# CLAUDE.md — Sur en Ruta (landing de inversores)

> **Este repo NO es la app ni la plataforma de Sur en Ruta.** La app (registro de viajeros y
> vehículos, mapa de puntos, Pasaporte digital, Sello, integración con privados) es una etapa
> posterior y, cuando exista, será un repo aparte. **Nada de eso se implementa acá.**

## 1. Qué es este repo

La **landing informativa** de Sur en Ruta, dirigida a **público general** (no solo inversores).
Mucho show visual, comprensión inmediata. Es una pieza de comunicación/publicidad: muestra qué se
llegaría a alcanzar con la app y el sistema RENAMU. **No es una propuesta de inversión** — nada de
negocio, presupuesto ni modelo económico se publica acá; ese detalle se conversa cara a cara
cuando haga falta.

**Estructura — actualizada 2026-08-27:** Ale decidió seguir el mazo de Ana (`Presentacion Sur en
Ruta RENAMU.pdf`, 10 páginas) **página por página** — ~10 pantallas de la "cinta" horizontal, no
5. Pantalla 0 = hero propio ("El país entero, en una sola red"); Pantallas 1–9 mapean 1:1 a las
páginas 2–10 del mazo, con su copy literal. Ver `docs/landing-contenido.md` (spec) y
`docs/comparativa-mazo-vs-landing.md` (transcripción + comparación). Incluye la pantalla "¿Qué es
RENAMU / Sur en Ruta?" (pág. 3) — es una **diferenciación** RENAMU/Sur en Ruta, no una explicación
al detalle del aparato institucional, así que no choca con el pivot de audiencia.

**Libertad sobre los templates del mazo (actualizado 2026-08-28):** el mazo de Ana (y cualquier
otro material que entregue como referencia) se sigue **como guía**, no como plantilla obligatoria.
Tenemos libertad total para modificar cualquier aspecto de diseño/layout de esas páginas —
tipografía, color, composición, qué elementos se replican o se descartan — si lo consideramos
necesario para la landing. Esto no afecta la regla de contenido (§6): los números y nombres siguen
saliendo solo de los documentos fuente, no se inventan.

> **Nota histórica:** hasta el 2026-08-25 este repo era una landing dirigida específicamente a
> inversores, con una sección de presupuesto/inversión. El 2026-08-26 Ana pidió el pivot de
> arriba tras revisar el contenido. Ver `docs/planes/2026-08-26-pivot-audiencia-general.md` para
> el detalle completo del cambio.

## 2. Qué NO es este repo

- No es la app/plataforma completa (mapa consultable, registro de viajeros y vehículos, Pasaporte
  de Ruta digital, Sello Viajero Responsable, valoraciones, reservas, panel de métricas). Eso es
  **otro repo**, de una etapa posterior.
- No tiene alta de privados ni onboarding de comercios — **sigue sin tenerlo** tras el pivot de
  audiencia: hablarle a "todo público" es comunicación/publicidad, no un flujo transaccional de
  registro.
- No tiene dossier ni CTA de inversión — se eliminó con el pivot del 2026-08-26 (antes existía
  como pieza aparte; hoy no hay dossier accesible desde la landing en esta etapa).

## 3. Stack

**Astro** estático (SSG), **sin backend, sin login, sin base de datos**. CSS propio con custom
properties, mapa en SVG inline propio (sin Leaflet ni Mapbox). Deploy = subir el contenido de
`dist/` (nunca `src/`, `node_modules/`, `docs/` ni `prototipos/`).

**Animación — regla actualizada 2026-08-26:** CSS nativo sigue siendo la primera opción
(`animation-timeline`, `@property`+`counter()`, etc. — así está hecho `HiloRuta` hoy). **JS
vanilla está habilitado cuando sea necesario y se use de forma óptima** — sin librerías de
animación (nada de GSAP, Framer Motion, Locomotive Scroll ni equivalentes; `IntersectionObserver`,
`requestAnimationFrame` y la Web Animations API nativa alcanzan). Esta restricción existía porque,
en la etapa anterior del proyecto, todavía no había una dirección de diseño concreta — ahora sí la
hay: Ale pidió acercar el lenguaje visual de la landing al de `bertani.net` (scroll-scrub con fondo
pineado, texto que pasa de fantasma a sólido atado al progreso del scroll, chrome fijo lateral,
reveals por sección) sin copiarlo literalmente. Ver el análisis completo de esos efectos y qué es
replicable en CSS puro vs. qué necesita JS en la conversación/memoria del proyecto — el plan de
ajustes concretos se define uno a uno con Ale, no de una vez.

## 4. Regla de moneda (textual, no se resume)

Todo monto del documento de propuesta está en **pesos uruguayos (UYU)**. En la landing la moneda
se escribe siempre explícita (`$U` o `UYU`), **nunca `$` a secas**: la audiencia incluye
inversores extranjeros y la diferencia con USD es de **~40x**. Un `$1.050.000` a secas se lee como
dólares y es el error que arruina la pieza.

## 5. Nota sobre el NDA

Existe un Acuerdo de Confidencialidad firmado el **22/06/2026** entre Ana Garcia (Parte
Reveladora) y Alejandro David Fernández (Parte Receptora), cuyas cláusulas 2, 3 y 8 tratan como
confidencial el modelo de negocio y el plan económico. Ale lo dio por cubierto por su
contratación **full-time** desde el 2026-08-12 (antes era proveedor externo por proyecto
individual) — el documento firmado sigue vigente tal cual, lo que destraba la publicación es el
criterio de Ale sobre el cambio de marco contractual, no un documento nuevo.

**Ante la duda sobre publicar un dato nuevo del modelo de negocio, se pregunta a Ale antes de
publicarlo.**

## 6. Fuente de contenido

Dos documentos son fuente válida de contenido (ninguno vive en este repo, ambos en `Downloads` —
ver `docs/planes/` y la memoria del proyecto para el detalle): el documento de propuesta original
(`Activa turismo propuesta.pdf`) y, desde el pivot de audiencia del 2026-08-26 (ver
`docs/planes/2026-08-26-pivot-audiencia-general.md`), el mazo de referencia que armó Ana
(`Presentacion Sur en Ruta RENAMU.pdf`). Regla: **todo número o nombre en la landing sale de
alguno de estos dos documentos; lo que no está en ninguno de los dos no se inventa.**

## 7. Regla de honestidad sobre tracción

Prohibido mostrar métricas de tracción (puntos adheridos, viajeros registrados, descargas,
contadores tipo "+120 puntos en la red"). Hoy son cero — el relevamiento territorial, la
señalética y el registro de viajeros son justamente lo que la Etapa 1 va a financiar, no algo ya
hecho — y el destinatario de esta landing hace due diligence.

## 8. `prototipos/` no se publica

`prototipos/` (incluida la herramienta de identidad visual) es material interno y descartable. El
deploy sube **solo** `dist/`; `prototipos/` y `docs/` nunca llegan a producción.

## 9. Convenciones heredadas del grupo

- Comentarios y documentación en **español**.
- Rutas siempre **absolutas** en lo que se reporta.
- Ramas `feat/…` y `fix/…` desde `main` para cambios en curso; esta primera entrega va directo en
  `main` porque el repo nace vacío.
- **Ningún agente deploya.** El deploy a producción (con backup y verificación) lo ejecuta Ale.
