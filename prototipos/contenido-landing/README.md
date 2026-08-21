# Borrador de contenido de la landing — Sur en Ruta

Herramienta interna y **descartable** para revisar con Ana el copy propuesto de las 5 secciones
de la landing de inversores, separado del diseño (que todavía no está decidido — ver
`prototipos/identidad/`).

## Cómo se abre

Doble click en `index.html`. Archivo único, sin dependencias, sin conexión a internet.

## Qué muestra

El contenido de `docs/landing-inversores-contenido.md`, en las 5 secciones que fija el plan
(`Hero → Problema/Oportunidad → El sistema → Rutas → Inversión`), con tipografía y color
genéricos a propósito: esto no es la identidad visual, es el mensaje.

Los dos huecos de contenido que todavía faltan (los 6 componentes de sistema sin nombrar, y el
equivalente en USD sin contrastar contra el BCU) están marcados en el propio HTML con una nota
visible, no escondidos.

## Por qué es descartable

Una vez que el contenido esté cerrado, se carga en `src/data/` y en los componentes de sección
de la landing real (Astro). Este archivo no se actualiza después de esa carga y no se linkea
desde la landing.

## Restricción de publicación

**`prototipos/` no se publica nunca.** Igual que `prototipos/identidad/`, queda fuera del
build de la landing por definición.
