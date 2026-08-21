# CLAUDE.md — Sur en Ruta (landing de inversores)

> **Este repo NO es la app ni la plataforma de Sur en Ruta.** La app (registro de viajeros y
> vehículos, mapa de puntos, Pasaporte digital, Sello, integración con privados) es una etapa
> posterior y, cuando exista, será un repo aparte. **Nada de eso se implementa acá.**

## 1. Qué es este repo

La **landing informativa** de Sur en Ruta, dirigida a **posibles inversores**. Hasta 5 secciones,
mucho show visual, comprensión inmediata. No le habla al comercio ni al viajero: le habla a quien
tiene que decidir si invertir en la Etapa 1 del proyecto.

## 2. Qué NO es este repo

- No es la app/plataforma completa (mapa consultable, registro de viajeros y vehículos, Pasaporte
  de Ruta digital, Sello Viajero Responsable, valoraciones, reservas, panel de métricas). Eso es
  **otro repo**, de una etapa posterior.
- No tiene alta de privados ni onboarding de comercios.
- No es la landing de captación de viajeros (otro público, otro mensaje, otra página).

## 3. Stack

**Astro** estático (SSG), **sin backend, sin login, sin base de datos**. CSS propio con custom
properties, animaciones CSS nativas (sin GSAP ni Framer Motion), mapa en SVG inline propio (sin
Leaflet ni Mapbox). Deploy = subir el contenido de `dist/` (nunca `src/`, `node_modules/`, `docs/`
ni `prototipos/`).

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

El documento de propuesta está copiado en `docs/fuentes/`. Regla: **todo número o nombre en la
landing sale del documento; lo que no está en el documento no se inventa.**

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
