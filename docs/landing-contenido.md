# Contenido de la landing — Sur en Ruta / Proyecto RENAMU

**Fecha:** 2026-08-26 (reescritura completa — este archivo se llamaba
`landing-inversores-contenido.md` y tenía la estructura vieja, orientada a inversores, con
presupuesto y timeline de etapas. Ana pidió el pivot de audiencia el 2026-08-26: ver
`docs/planes/2026-08-26-pivot-audiencia-general.md` para el análisis completo y las respuestas.)

**Para qué es esto:** borrador de copy por sección (texto solo, sin HTML/CSS) para la landing ya
reescrita como pieza de comunicación/publicidad de alcance general — **no** una propuesta de
inversión. Muestra qué se llegaría a alcanzar con la app y el sistema RENAMU. Sin negocio, sin
presupuesto, sin dossier.

**Estructura:** 5 secciones — Introducción → Problema/Oportunidad (+ Sello Viajero Responsable)
→ Mapa y servicios (cómo funciona la app) → Rutas temáticas y Pasaporte → Centro regional para
el viajero extranjero.

**Fuente de contenido (regla del `CLAUDE.md`, sección 6):** todo sale de dos documentos —
el PDF de propuesta original (`Activa turismo propuesta.pdf`) y el mazo de referencia que armó
Ana (`Presentacion Sur en Ruta RENAMU.pdf`, 10 páginas) — ninguno vive en este repo. Cada bloque
cita de cuál sale.

**Regla de honestidad (sigue vigente, sección 7 del `CLAUDE.md`):** cero métricas de tracción
inventadas. Las capturas de app que muestra el mazo de Ana (mapa con pines, rutas destacadas) se
presentan en la landing como **concepto/visión de producto**, no como red ya cargada.

**Sin CTA transaccional:** la landing es 100% informativa por ahora (confirmado por Ana,
2026-08-26). Ninguna sección pide una acción (ni contacto, ni dossier, ni formulario).

**Mecánica de transición — actualizado 2026-08-26 (tarde):** el slide horizontal cambia de
mecánica. Ale pidió un efecto tipo "hoja que tapa y descubre" (inspirado en un sitio de
referencia) — probado y confirmado en `prototipos/transicion-sweep/index.html`: las pantallas
**impares quedan quietas** (1, 3, 5), las **pares actúan como una hoja** que entra desde la
derecha tapando a la impar anterior y sigue de largo hasta salir del todo por la izquierda,
descubriendo a la impar siguiente — todo atado 1 a 1 al scroll, sin JS (CSS puro con un
scroll-timeline con nombre, misma técnica que ya usa `HiloRuta`). Por esta mecánica, **la
cantidad total de pantallas tiene que ser impar** (siempre arranca y termina en una quieta).

**Decisión de reparto (2026-08-26): 5 pantallas, sin partir ninguna** — se descartó la opción de
partir Problema/Oportunidad y Mapa y servicios en 2 cada una (que hubiera dado 7). Los 5 temas de
abajo mapean 1 a 1 a las 5 pantallas, en este rol:

| # | Pantalla | Tema | Rol |
|---|---|---|---|
| 1 | Hero | Introducción | Quieta |
| 2 | Problema/Oportunidad + Sello | — | Hoja |
| 3 | Mapa y servicios | Cómo funciona la app | Quieta |
| 4 | Rutas + Pasaporte | — | Hoja |
| 5 | Centro Regional | — | Quieta |

Esto obligó a **recortar** el contenido de la sección 2 (que antes estaba pensado como 2a/2b,
~200 palabras entre las dos) a una sola pantalla — ver la versión recortada más abajo.

---

## 1. Hero — Introducción — pantalla "quieta"

**Eyebrow:** RENAMU · Sur en Ruta

**Titular:** El país entero, en una sola red.
*(mazo de Ana, pág. 1 — coincide literal con el titular que ya estaba escrito antes del pivot.)*

**Bajada:** Una red para ordenar y potenciar el turismo itinerante en Uruguay — conecta
viajeros, territorios, servicios y experiencias. *(mazo, pág. 1)*

**Sin barra de datos ancla ni CTA.** La versión anterior tenía una barra con "Piloto: Maldonado ·
90 días" y "6 componentes de sistema" — eran datos pensados para due diligence de inversor. Se
sacan: son detalle operativo, no algo que un visitante general necesite en el primer vistazo. El
Hero queda solo con eyebrow + titular + bajada, sobre la foto real ya cargada
(`src/assets/hero/`) — el visual no cambia, solo el texto que lo acompaña.

---

## 2. Problema y Oportunidad (+ Sello Viajero Responsable) — pantalla "hoja"

*(mazo, pág. 2 "La oportunidad", pág. 5 "Puntos que hacen funcionar la red", pág. 8 "Una red que
beneficia a todos". Nota de Ana: "acá me parece calza lo de Viajero responsable".)*

**Recortado a una sola pantalla (2026-08-26)** — la versión anterior (2a/2b, ver historial más
abajo) tenía ~200 palabras entre dos bloques; con 5 pantallas fijas esta sección entra en una
sola, ~90 palabras. Se sacrifican detalle: las 3 columnas "quién se beneficia" y las 4 palabras
sueltas de "pilares" (Libertad/Naturaleza/Experiencias/Economía local) — la idea que transmitían
queda condensada en el cuerpo.

**Titular:** Una nueva forma de viajar necesita una nueva forma de organizarse.

**Cuerpo:** El turismo itinerante crece porque combina libertad, flexibilidad y contacto con el
territorio. La oportunidad está en ordenar esa experiencia: espacios habilitados, comercios
aliados y buenas prácticas compartidas.

**3 íconos cortos:** Áreas habilitadas · Puntos Amigos · Sello Viajero Responsable.

**Sello Viajero Responsable (mención conceptual, no el flujo completo):** un sello que reconoce a
quienes viajan con compromiso, respeto y buenas prácticas. *(El flujo completo de "cómo
obtenerlo", el certificado digital y el QR — pág. 8 del mazo — quedan para la experiencia dentro
del producto, no para la landing; a confirmar con Ana, ver pregunta 3 del plan.)*

**Línea de cierre:** Sin una red organizada, la experiencia pierde claridad y confianza.

<details>
<summary>Historial: versión anterior en 2 pantallas (2a/2b), descartada el 2026-08-26</summary>

**2a. La oportunidad** — Titular "Una nueva forma de viajar necesita una nueva forma de
organizarse", cuerpo sobre libertad/flexibilidad/contacto con el territorio, 4 pilares
(Libertad · Naturaleza · Experiencias · Economía local).

**2b. Puntos que hacen funcionar la red + Sello** — Titular "La red se apoya en espacios,
servicios y alianzas reales", 3 tarjetas (Áreas habilitadas, Puntos Amigos, Servicios clave),
mención del Sello, y 3 columnas "quién se beneficia" (viajero / comercios / territorio, del mazo
pág. 8).

</details>

---

## 3. Mapa y servicios — cómo funciona la app — pantalla "quieta"

*(mazo, pág. 7 "Herramientas que conectan la experiencia" — mockups de pantalla: mapa con
pines, "Cerca tuyo", "Rutas destacadas".)*

**Titular:** Una experiencia simple, organizada y conectada.

**4 herramientas:**
1. **App Sur en Ruta** — mapa, puntos, servicios y rutas en un solo lugar.
2. **Pasaporte de Ruta** — una forma de viajar por etapas y sumar historias.
3. **Sello Viajero Responsable** — buenas prácticas y confianza dentro de la red *(ya
   desarrollado en la sección 2 — acá va solo el ícono + una línea, sin repetir el bloque
   completo).*
4. **Señalética e identidad** — puntos reconocibles, información clara y presencia territorial.

**5 pasos de uso (del mazo, "Cómo funciona la red"):** Encontrá puntos y rutas → Planificá tu
recorrido → Accedé a servicios y experiencias → Sumá sellos y beneficios → Viajá de forma
responsable.

**Rótulo obligatorio en las capturas de pantalla (regla de honestidad — sección 7 del
`CLAUDE.md`):** algo visible tipo "Vista conceptual de la app" o equivalente — los pines y rutas
que se ven en el mockup son ejemplo de producto, no datos reales cargados. *(Redacción exacta a
definir en implementación; el punto no negociable es que no se lea como red ya operativa.)*

**Línea de cierre:** Una red que organiza el viaje y potencia los destinos.

---

## 4. Rutas temáticas y Pasaporte — pantalla "hoja"

*(mazo, pág. 6 "Rutas que cuentan Uruguay" — mismas 6 rutas que ya estaban cargadas en
`src/data/rutas.ts`, sin cambios de fondo.)*

**Titular:** Rutas que cuentan Uruguay.

**Bajada:** Experiencias temáticas para descubrir el país a otro ritmo.

**Las 6 rutas (sin cambios respecto al contenido anterior):**
1. **Ruta del Vino** — bodegas, gastronomía y paisaje productivo.
2. **Ruta Oceánica** — costa, pueblos, mar y naturaleza.
3. **Ruta Termal** — bienestar, descanso y servicios.
4. **Ruta Rural** — estancias, productores y vida de campo.
5. **Ruta Patrimonial y Cultural** — historia, identidad y pueblos.
6. **Ruta de Naturaleza y Aventura** — sierras, lagunas y aire libre.

**Rótulo obligatorio en pantalla (se mantiene de la versión anterior — sigue aplicando, mismo
motivo):** Rutas propuestas. El relevamiento territorial es parte de las próximas etapas.

**Tie-in con Pasaporte de Ruta:** cada ruta se recorre por etapas, sumando sellos al Pasaporte —
conecta esta sección con la herramienta ya presentada en la sección 3.

**Línea de cierre:** Cada ruta conecta puntos, servicios, paisajes y experiencias.

---

## 5. Centro regional para el viajero extranjero — pantalla "quieta"

*(mazo, pág. 9 "Uruguay, centro regional para el viajero itinerante extranjero" y pág. 10,
cierre del mazo — contenido enteramente nuevo respecto a la versión de inversores, que acá tenía
presupuesto/etapas/ferias internacionales. Reemplaza esa sección por completo.)*

**Titular:** Uruguay, centro regional para el viajero itinerante extranjero.

**Bajada:** Una puerta de entrada ordenada para recorrer Sudamérica.

**3 pilares:**
1. **Ubicación estratégica** — entre Brasil y Argentina, con distancias amigables y gran
   diversidad de paisajes.
2. **Base segura y conectada** — ideal para iniciar, pausar o finalizar recorridos por el sur
   del continente.
3. **Servicios complementarios** — guardería, mantenimiento, equipamiento, información y
   experiencias locales.

**Línea de cierre de la sección:** Uruguay puede pasar de ser un país de paso a un destino
preparado y memorable.

**Cierre general de la landing (del mazo, pág. 10 — remata el mensaje, no pide ninguna
acción):** Una red para viajar mejor y mostrar un Uruguay más conectado.

---

## Regla de extensión (se mantiene del plan anterior)

Ninguna sección debería superar las ~120 palabras visibles por pantalla. Si un bloque no entra,
se recorta o se separa en 2 slides (como ya pasó con Sistema/Rutas en la migración a slide
horizontal) — no se agranda el límite.

---

## Resumen de lo que falta para cerrar el contenido real

1. **Confirmar con Ana** cómo se muestra el Sello Viajero Responsable (mención conceptual acá
   propuesta, vs. el flujo completo de certificado/QR del mazo) y la redacción exacta del rótulo
   de "vista conceptual" en los mockups de app (preguntas 3 y 6 del plan, sección 6.1).
2. **Mecánica de transición: ya resuelta.** 5 pantallas fijas (impar/quieta, par/hoja, ver tabla
   más arriba), probada en `prototipos/transicion-sweep/index.html` — falta portarla a
   `src/`, reemplazando el esqueleto de slide horizontal actual (`HzSlide`, snap simple).
3. **Componentes y datos a tocar:** `src/data/inversion.ts`, `etapas.ts`, `ferias.ts` quedan sin
   uso (o se borran); `componentes.ts` se reparte entre la sección 2 y la sección 3;
   `Inversion.astro` se reemplaza por un componente nuevo para la sección 5 (ej.
   `CentroRegional.astro`); `Sistema.astro` se reescribe angosto a "Mapa y servicios";
   `HiloRuta.astro` sigue oculto (comentado en `Base.astro`) desde el 2026-08-26 mientras se
   define esta mecánica nueva — falta decidir si vuelve, cambia de forma, o se descarta.
4. La identidad visual (paleta + tipografía) sigue en manos del prototipo — no depende de este
   contenido para escribirse, pero sí condiciona el diseño final de cada sección.

Ver también `docs/planes/2026-08-26-pivot-audiencia-general.md` y la memoria
`proyecto-renamu-landing-inversores` del proyecto.
