# Licencias de las tipografías embebidas

Las 5 combinaciones tipográficas del prototipo usan 7 familias en total (`Archivo` e `Inter` se
repiten en más de un par). Las 7 están licenciadas bajo la **SIL Open Font License, versión 1.1
(OFL-1.1)**, que permite embeber, subsetear y redistribuir los archivos de fuente sin
restricciones para este uso (herramienta interna, no comercializada como fuente). Verificado
contra el repositorio oficial de Google Fonts (`google/fonts`), no asumido:

| Familia | Fuente verificada | Licencia |
|---|---|---|
| Newsreader | https://github.com/google/fonts/blob/main/ofl/newsreader/OFL.txt | OFL-1.1 |
| Archivo | https://github.com/google/fonts/blob/main/ofl/archivo/OFL.txt | OFL-1.1 |
| Fraunces | https://github.com/google/fonts/blob/main/ofl/fraunces/OFL.txt | OFL-1.1 |
| Inter | https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt | OFL-1.1 |
| Instrument Serif | https://github.com/google/fonts/blob/main/ofl/instrumentserif/OFL.txt | OFL-1.1 |
| Instrument Sans | https://github.com/google/fonts/blob/main/ofl/instrumentsans/OFL.txt | OFL-1.1 |
| Bricolage Grotesque | https://github.com/google/fonts/blob/main/ofl/bricolagegrotesque/OFL.txt | OFL-1.1 |

**Cómo se verificó:** se consultó, para cada familia, si existía `ofl/<familia>/OFL.txt` en el
repositorio oficial `google/fonts` (que es la fuente que también sirve `fonts.google.com`). Las 7
devolvieron `OFL.txt` — ninguna está bajo la carpeta `apache/` (que usan unas pocas familias de
Google Fonts, como Roboto o Material Symbols, bajo Apache 2.0). No se dio por sentado que "estar
en Google Fonts" implicara una licencia en particular.

## Qué se embebió

Cada familia se descargó desde el CDN oficial (`fonts.gstatic.com`, vía `fonts.googleapis.com`),
en formato `woff2`, quedándose solo con los subsets **`latin`** y **`latin-ext`** (el resto —
cirílico, griego, vietnamita, etc.— se descartó: el copy del hero no los necesita). Pesos
descargados: **400 y 700** para todas, salvo **Instrument Serif**, que en Google Fonts solo
existe en peso 400 (es una display serif de un solo peso; no tiene variante bold).

Los archivos se convirtieron a `base64` y se embebieron directo como `data:font/woff2;base64,…`
dentro de los `@font-face` de `index.html` — sin `<link>` externo, sin request de red. Esto es lo
que permite verificar "funciona sin internet" (ver paso 6 del plan, verificación).
