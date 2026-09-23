# Verificador del escenario vertical (Bloque E, E2)

Herramienta interna, no se publica (`prototipos/` nunca llega a `dist/`).

Uso, con `npx astro dev --host` corriendo desde la raíz del repo:

```
node prototipos/pruebas/escenario/verificar.mjs [--viewport=escritorio|movil|todos] [--reducido] [--capturas] [--peso] [--url=http://localhost:4321/sur-en-ruta/]
```

Los checkpoints y el estado esperado del demo salen de `src/lib/escenario.ts` y `src/lib/telefono.ts`
en vivo (Node 24, type stripping, sin compilar). El color esperado de fondo (C4/C5) es una copia
independiente de la tabla §4.1 del plan — compara el sitio contra la especificación, no contra su
propia implementación. Detalle completo de cada chequeo en
`docs/planes/2026-09-23-bloque-e-secciones-chrome.md` §5, E2.

## Línea de base (2026-09-23, antes de E3-E6)

Corrida `--viewport=escritorio` contra el estado previo a este bloque (Pantalla/Lamina/cinta.ts,
`ESTADOS` PLACEHOLDER en `Escenario.astro`, presupuesto 800svh): **324 chequeos · PASS=101 ·
FAIL=116 · WARN=9 · SKIP=98**. Confirmado:

- **C4 fondo: FAIL sistemático.** `.escenario` hoy no tiene `background` propio (vive en cada
  `.escenario__fondo` hijo, con `var(--color-fondo)` placeholder) — `getComputedStyle` da
  `rgba(0,0,0,0)` en los 17 checkpoints. Es el mismo síntoma que documenta §1.2 del plan.
- **C2 sin solapamiento: FAIL en la mayoría de los checkpoints** (`donde` y `cierre` sobre todo,
  con `Pantalla`/`hz-tarjeta` sin el layout de `.seccion__caja`).
- **Hallazgos que el plan no adelantaba, y que el verificador sí detecta:**
  - **C3 (estado del demo): FAIL sistemático** — el iframe queda con `pin=0` mientras
    `estadoParaProgreso` espera `pin=null` (`-1`) en `que-es`/`cierre`. Coincide con H6c ("`pin:
    null` no cambia nada").
  - **G5 (alto del documento): FAIL** — `scrollHeight` real (~3000px) no se acerca al esperado
    por `TOTAL_SVH` (~7-8000px): las `<Pantalla>` viejas no usan `--largo`/`Seccion.astro`.
  - **G1: SKIP** (`.escenario__ancla` no existe todavía, se agrega en E4).
- **G2, G3, G4: PASS** ya en la línea de base (continuidad de `--tel-escala` sin saltos en la
  única animación que existe hoy, consola limpia, teclado sin entrar al iframe).

Confirma que el verificador detecta el problema real que motivó el Bloque E (§2 del plan), sin
falsos PASS. Corridas de humo hechas también con `--viewport=movil` (216 chequeos, mismo patrón),
`--reducido` (sin crashear, G2 pasa a SKIP por "extremos iguales" con `animation:none`) y
`--capturas`/`--peso` (mecanismos verificados, capturas y CDP funcionando, siempre fuera del
repo). Detalle completo de la corrida en el reporte de E2.
