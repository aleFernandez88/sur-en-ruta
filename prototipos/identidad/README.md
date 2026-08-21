# Prototipo de identidad — Sur en Ruta

Herramienta interna y **descartable** para que Ana decida, mirándola con Ale, una paleta de
color y un par tipográfico para Sur en Ruta. No es un avance de la landing.

## Cómo se abre

Doble click en `index.html`. Es un único archivo autocontenido: no necesita servidor, no
necesita conexión a internet, no tiene dependencias. Se puede copiar solo (sin esta carpeta) a
cualquier otro lugar —el escritorio, un pendrive, adjunto de mail— y va a funcionar igual.

## Qué se está decidiendo

- **Paleta de color:** 4 opciones relevadas del comparador del 13/08
  (`Señal`, `Cal`, `Mineral`, `Ruta Nocturna`) más una 5ª editable en vivo ("Nueva") con 4
  `<input type="color">` (Fondo, Tinta, Acento, Superficie).
- **Par tipográfico:** 5 combinaciones candidatas (ver tabla abajo).
- Un control auxiliar de **escala del titular** (0,8× a 1,4×), para ver cómo se comporta cada
  tipografía a distintos tamaños de titular sin cambiar nada más.

Todo cambia **en vivo, sin recargar la página** — el panel de abajo solo reescribe variables CSS
(`--color-fondo`, `--color-tinta`, `--color-acento`, `--color-superficie`, `--fuente-titular`,
`--fuente-texto`, `--escala-titular`).

## Qué **no** se está decidiendo acá

- El logo ni la marca gráfica (no existen todavía; el hero se muestra sin logo, a propósito).
- El copy del hero. El texto es el real (con sus tildes y su "ñ") porque hace falta para juzgar
  la tipografía, no porque esté cerrado.
- La disposición, el contenido, las fotos ni el SEO de la landing — todo eso es del otro plan
  (`sur-en-ruta-2026-08-20-landing-inversores.md`), que **arranca después** de esta decisión.
- Nada se persiste: no hay `localStorage` ni backend. El estado elegido viaja en el **hash de la
  URL** (`#paleta=…&fuentes=…&escala=…`), así que cerrar la pestaña sin copiar la elección la
  pierde (salvo que se haya guardado la URL con el hash).

## Los 5 pares tipográficos

| # | Titulares | Texto / UI | Tono |
|---|---|---|---|
| 1 | Newsreader | Archivo | El par ya explorado el 13/08. Referencia. |
| 2 | Fraunces | Inter | Editorial con más carácter. |
| 3 | Instrument Serif | Instrument Sans | Máxima coherencia serif/sans de una misma familia. |
| 4 | Bricolage Grotesque | Inter | El más "producto digital" del set. |
| 5 | Archivo | Archivo | Todo sans, tono señalética/institucional. |

Las 7 familias (`Archivo` e `Inter` se repiten) están embebidas en `woff2`, subset `latin` +
`latin-ext`, pesos 400 y 700 únicamente (los que usa este hero). Licencias en `LICENCIAS.md` de
esta misma carpeta.

## Cómo se registra la elección

- **Botón "Copiar la elección"** deja en el portapapeles una línea de texto con la fecha, el
  nombre de la paleta, sus 4 hex, y las dos tipografías con su rol (titulares / texto). Pensado
  para pegar directo en un chat.
- El **hash de la URL** siempre refleja el estado actual, así que se puede guardar/mandar la URL
  completa y reabrirla exactamente como quedó (funciona también para la paleta "Nueva": el hash
  lleva sus 4 colores).
- Una vez que la decisión esté tomada, se registra en
  `<repo>\docs\decisiones\identidad-visual.md` (paso 10 del plan) — ese archivo, no este
  prototipo, es el que consume el plan de la landing para sus tokens de diseño.

## Por qué es descartable

Esta carpeta existe para una única reunión de decisión. Una vez que `identidad-visual.md` tiene
la elección registrada, este prototipo queda solo como **antecedente** — no se actualiza, no se
mantiene, no se linkea desde la landing.

## Restricción de publicación

**`prototipos/` no se publica nunca.** No es parte del sitio. El deploy de la landing sube
únicamente `dist/` (la carpeta de build de Astro); `prototipos/` queda fuera de ese build por
definición, y no debe agregarse a él bajo ninguna circunstancia. Es una herramienta interna de
un solo uso — no corresponde que quede expuesta en producción.

## Restricciones duras del archivo (verificadas)

Cero requests de red (ni fuentes, ni analytics, ni imágenes externas — verificado con DevTools →
Network y también recargando con la red cortada), cero dependencias externas, cero
`localStorage`, un solo archivo (~1,3 MB, casi todo tipografías embebidas en base64).
