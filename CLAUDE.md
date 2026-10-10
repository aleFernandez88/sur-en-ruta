# CLAUDE.md — Sur en Ruta (landing / spot de la app)

> **Este repo NO es la app ni la plataforma de Sur en Ruta.** La app (registro de viajeros y
> vehículos, mapa de puntos, Pasaporte digital, Sello, integración con privados) es una etapa
> posterior y, cuando exista, será un repo aparte. **Nada de eso se implementa acá** — la app se
> muestra con maquetas falsas.

## 1. Qué es este repo

La **landing de Sur en Ruta**: un **spot publicitario de la app**, dirigido a público general.
Mucho show visual, comprensión inmediata. La app **todavía no existe** — se muestra con **maquetas
falsas**: el demo vivo en `public/app-demo/` (corre dentro del celular del escenario) + su video
`sur-en-ruta-app-showcase.mp4` + las capturas en `prototipos/app-demo/capturas/`. **No es una propuesta de inversión** — nada de negocio,
presupuesto ni modelo económico se publica acá.

**Solo se habla de Sur en Ruta.** No se menciona **RENAMU** (ni el nombre, ni el marco
institucional, ni la diferenciación RENAMU / Sur en Ruta). La "red" que se nombra es la red propia
de Sur en Ruta: sus puntos, rutas y servicios.

**Estructura (2026-09-23):** escenario vertical con secciones pineadas (scroll vertical, el celular
fijo como chrome). **Sin hero de apertura** — mostrar rápido para
retener. Las primeras 4 pantallas responden 4 preguntas guía: **¿qué es? / ¿qué hace? / ¿cómo lo
hace? / ¿dónde lo hace?** (las rutas turísticas entran en la 4ª). P5 = CTA. El detalle de
contenido, pantalla por pantalla, vive en **`docs/landing-contenido.md`** (fuente única del
contenido).

**Se mantiene** el andamiaje visual construido antes del pivot: escenario vertical (`Escenario` +
`Seccion`), Preloader, **un gesto propio por pantalla** (no se repite), e identidad visual cerrada (ver `docs/decisiones/identidad-visual.md`).

> **Nota histórica:** hasta el 2026-08-25 esto era una landing para inversores con sección de
> presupuesto. El 2026-08-26 Ana pidió el pivot a público general
> (`docs/planes/2026-08-26-pivot-audiencia-general.md`). Entre el 2026-08-27 y el 2026-09-02 el
> contenido se mapeó 1:1 al mazo `Presentacion Sur en Ruta RENAMU.pdf` (con RENAMU). El 2026-09-03
> Ale **canceló ese enfoque**: pasa a spot de la app, sin RENAMU, guiado por 4 páginas de un mazo
> nuevo. La comparativa del mazo viejo quedó en
> `docs/analisis/comparativa-mazo-vs-landing-OBSOLETO.md`; el detalle en el historial de
> `docs/landing-contenido.md`.

## 2. Qué NO es este repo

- **No es la app / plataforma completa** (mapa consultable, registro de viajeros y vehículos,
  Pasaporte de Ruta digital, Sello Viajero Responsable, valoraciones, reservas, panel de métricas).
  Eso es **otro repo**, de una etapa posterior. Acá solo hay **maquetas** para el spot.
- **No menciona RENAMU** — ni el marco institucional, ni la diferenciación RENAMU / Sur en Ruta.
- **No tiene alta de privados ni onboarding de comercios** — es comunicación/publicidad, no un
  flujo transaccional de registro.
- **No tiene dossier ni CTA de inversión** — se eliminó con el pivot de audiencia del 2026-08-26.

## 3. Stack

**Astro** estático (SSG), **sin backend, sin login, sin base de datos**. CSS propio con custom
properties, mapa en SVG inline propio (sin Leaflet ni Mapbox). Deploy = subir el contenido de
`dist/` (nunca `src/`, `node_modules/`, `docs/` ni `prototipos/`).

**Línea de tiempo:** el presupuesto de scroll de cada sección y todo el cálculo de offsets salen de
`src/lib/escenario.ts` (fuente única, hoy 940 svh). **No** se calibran porcentajes a mano en los
componentes: se derivan de ahí.

**Animación — regla actualizada 2026-08-26:** CSS nativo sigue siendo la primera opción
(`animation-timeline`, `@property`+`counter()`, etc. — así están hechas las secciones hoy). **JS
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

Desde el pivot del 2026-09-03 (ver `docs/landing-contenido.md` §1), el contenido de las 4 pantallas
guía se apoya en **4 páginas de un mazo nuevo de Ana**, guardadas en `docs/fuentes/deck-2026-09/`:
"Rutas que cuentan Uruguay", "Herramientas que conectan la experiencia", "Una red que beneficia a
todos", "Cómo funciona la red". Se usan **como guía de info, no como plantilla**: se extrae lo
necesario, no se replica el layout.

Reglas:
- Los **nombres propios** (rutas temáticas, herramientas) y cualquier **dato duro** salen de
  documento fuente — el mazo nuevo, o el PDF de propuesta original (`Activa turismo propuesta.pdf`,
  en `Downloads`) para datos que no estén en el mazo.
- El **texto de spot** (titulares, bajadas, frases de cierre) se puede redactar libre.
- Lo que no esté en ninguna fuente y no sea texto de spot **no se inventa** — se pregunta a Ale.

El mazo viejo (`Presentacion Sur en Ruta RENAMU.pdf`, con RENAMU) **ya no es fuente** — quedó
descartado con el pivot.

## 7. Regla de honestidad sobre tracción

Prohibido mostrar métricas de tracción (puntos adheridos, viajeros registrados, descargas,
contadores tipo "+120 puntos en la red"). Hoy son cero — el relevamiento territorial, la
señalética y el registro de viajeros son justamente lo que la Etapa 1 va a financiar, no algo ya
hecho — y el destinatario de esta landing hace due diligence.

## 8. `prototipos/` no se publica

`prototipos/` (incluida la herramienta de identidad visual) es material interno y descartable. El
deploy sube **solo** `dist/`; `prototipos/` y `docs/` nunca llegan a producción.

**Excepción: `public/app-demo/` sí se publica.** Desde la Opción 3 "Demo viva"
(`docs/planes/2026-09-22-recomposicion-ui-vertical.md` §14.2.b), el mockup de la app dejó de ser
un prototipo descartable — corre en vivo dentro del celular en las 5 pantallas, así que es un
asset de producción. `public/app-demo/` es su **única fuente** (`index.html`, `showcase.html`,
los SVG, `rutas/`); `prototipos/app-demo/` quedó reducido a `render/` (tooling interno) y
`capturas/` (salida de ese tooling + respaldo del fallback N3 de §14.1), sin duplicar nada.

## 9. Convenciones heredadas del grupo

- Comentarios y documentación en **español**.
- Rutas siempre **absolutas** en lo que se reporta.
- Ramas `feat/…` y `fix/…` desde `main` para cambios en curso; esta primera entrega va directo en
  `main` porque el repo nace vacío.
- **Ningún agente deploya.** El deploy a producción (con backup y verificación) lo ejecuta Ale.
