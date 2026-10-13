# Isotipo — origen

`isotipo-original.svg` — generado por Ale con Recraft AI el 2026-08-28, reproduciendo el isotipo
del board de identidad de Ana (`0796f631-…png`, sección "2. ISOTIPO": colina + ruta en S + pin +
camper + sol + pájaros). Es la referencia/original, no necesariamente la versión final — se ajusta
a partir de acá.

**Limpieza aplicada:** el archivo que entrega Recraft trae ~20 KB de metadata C2PA (procedencia/
"content credentials", un `<metadata>` con un manifest en base64) sin nada visual — se removió esa
etiqueta entera al traerlo al repo. El archivo original de Recraft no se guarda acá.

**Colores — recoloreado a los tokens reales el 2026-08-28.** Recraft había generado la imagen
mirando el board (píxeles), no los hex de `tokens.css` — se reemplazaron los 4 colores aproximados
por los tokens exactos (regla del proyecto: "se toma la etiqueta, no el píxel", ver
`docs/decisiones/identidad-visual.md`). Equivalencia aplicada:

| Color de Recraft (ya reemplazado) | Token real (`tokens.css`) | Rol |
|---|---|---|
| `#0C2E4E` | `--color-marino` `#0f2b4d` | Ruta, camper, estructura |
| `#4E5D2F` | `--color-verde` `#5a6b2e` | Colina, pasto |
| `#D5C3A8` | `--color-arena` `#e7dfc9` | Sol |
| `#C35A30` | `--color-terracota` `#c55a3a` | Pin |

El SVG ya tiene los hex de la derecha, no los de la izquierda.


## Variante «Bandera» (2026-10-13)

`isotipo-bandera.svg`: mismo isotipo con la paleta 4 del tablero de paletas (Ale la eligió para P1). Equivalencias: estructura `#0f2b4d`→`#1f4e8c`, colina `#5a6b2e`→`#6cace4`, pin `#c55a3a`→`#f2b705`, sol `#e7dfc9`→`#ffffff`. Son colores propuestos, todavía fuera de `tokens.css` y de `identidad-visual.md`; el original no se tocó.
