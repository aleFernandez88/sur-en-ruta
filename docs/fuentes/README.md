# Fuente original de paletas — 2026-08-13

`Sur en Ruta - Paletas (standalone).html` es una copia **sin modificar**, byte a byte, de:

`C:\Users\zhuki\Downloads\Sur en Ruta - Paletas (standalone).html`

- **Fecha del archivo original:** 2026-08-13 (según metadata del sistema de archivos).
- **Qué es:** un comparador estático de 4 paletas de color aplicadas al mismo hero de Sur en
  Ruta, con una sola combinación tipográfica fija (Archivo + Newsreader). No tiene selector ni
  permite combinar paleta con tipografía — de ahí nace el prototipo interactivo en
  `<repo>\prototipos\identidad\`.
- **Por qué está acá:** hasta el 2026-08-20 este archivo vivía suelto en `Downloads`, fuera de
  cualquier repo y de cualquier memoria del grupo. Es la fuente de verdad de los 4 pares de hex
  por paleta y del copy real del hero, y un borrado accidental de la carpeta de descargas se
  los hubiera llevado. Se copia acá para que quede versionado.
- **Formato del archivo:** es un "bundle" autocontenido (formato de export de artifact) donde el
  HTML/CSS real y las tipografías embebidas viajan codificados dentro de dos `<script>` de tipo
  `__bundler/manifest` y `__bundler/template`, y se reconstruyen en el DOM al cargar la página
  con JavaScript. No es HTML plano legible línea por línea — abrirlo con doble click en un
  navegador para verlo renderizado.

## Hex reales extraídos (verificados contra el archivo, no contra el plan)

El plan original (`sur-en-ruta-2026-08-20-prototipo-identidad.md`, paso 5) traía una agrupación
**presunta** de hex por paleta, explícitamente marcada "a confirmar contra el archivo". Se
confirmó abriendo el `template` del bundle y leyendo el markup real de cada hero. Dos cosas
importantes que se corrigieron respecto a la presunción del plan:

1. **Los nombres que aparecen impresos en el propio archivo no coinciden con los nombres que el
   plan usa para las 4 paletas.** En el archivo, los rótulos on-page son "Ruta Nocturna" (1A,
   petróleo+amarillo), "Salitre" (1B, papel+cobalto+teja), "Basalto" (1C, grafito+salvia+cobre) y
   "Termas" (1D, violeta+turquesa+arena). El plan llama a esas mismas cuatro paletas —por su
   **descripción textual**, que sí coincide 1 a 1 y es lo verificado— "Señal", "Cal", "Mineral" y
   "Ruta Nocturna" respectivamente. Es decir, el archivo usa "Ruta Nocturna" para la paleta
   petróleo+amarillo y el plan usa ese mismo nombre para la paleta violeta+turquesa+arena. Se
   siguió el criterio del plan (nombres por descripción) porque es la decisión ya tomada por el
   Arquitecto; los rótulos on-page del archivo original no se usan en el prototipo nuevo.
2. **El hex de "arena" que trae el plan como referencia (`#EFE9DE`) no es el que usa esa paleta.**
   `#EFE9DE` es "Caliza", un color de la paleta Señal (1A). El arena real de la paleta Ruta
   Nocturna (1D) es `#F1E9DC` — un hex muy parecido pero distinto. Se usó el real.

| Paleta (nombre del plan) | Fondo | Tinta | Acento | Superficie |
|---|---|---|---|---|
| **Señal** | `#081E24` (Noche) | `#EFE9DE` (Caliza) | `#EEB63C` (Señal) | `#10333D` (Azul Ruta) |
| **Cal** | `#F3F1EC` (Papel) | `#101820` (Tinta) | `#E0533D` (Teja) | `#163FBF` (Cobalto) |
| **Mineral** | `#1E1D1B` (Basalto) | `#E8E4D9` (Cal, nombre de color) | `#C1653C` (Cobre) | `#A9BFA5` (Salvia) * |
| **Ruta Nocturna** | `#3B2E5A` (Violeta Termal) | `#F1E9DC` (Arena) | `#18AE9E` (Mineral, nombre de color) | `#1F1830` (Noche) * |

\* **Nota:** en Mineral y en Ruta Nocturna el hero original no usa un 4º color de superficie
netamente distinto (a diferencia de Señal y Cal, donde la barra superior del mock-up usa un color
de marca bien diferenciado del fondo). En esos dos casos se tomó, de los colores que sí figuran
en la leyenda de swatches de esa paleta pero no se usan en el hero, el que mejor cumple el rol de
superficie/elevación: Salvia para Mineral y Noche para Ruta Nocturna. Es una decisión del
Ejecutor, documentada acá porque el plan delegó explícitamente esta extracción ("eso se saca del
archivo, no de este plan").
