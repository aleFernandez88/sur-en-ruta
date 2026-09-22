/**
 * rutas.ts — las 6 rutas temáticas de Sur en Ruta (P4 · ¿Dónde lo hace?).
 *
 * Nombres, `bajada` y orden verificados contra el deck nuevo de Ana
 * (`docs/fuentes/deck-2026-09/pag-06-rutas.png`, "Rutas que cuentan Uruguay") — es la misma lista
 * canónica que ya usa `prototipos/app-demo` (alineada por decisión de Ale, 2026-09-03), ver
 * `docs/landing-contenido.md` § 3.
 *
 * `colorTrazo` apunta a los custom properties `--color-ruta-*` de src/styles/tokens.css (no hex
 * sueltos acá): cuando se revisen esos colores, se cambian en un solo archivo.
 *
 * `foto` queda en `null` a propósito: las 6 imágenes de `public/app-demo/rutas/` (2 generadas con
 * IA, 4 reales sin `FUENTE.md` ni licencia registrada) están bloqueadas hasta que Ale resuelva la
 * decisión D2 del plan (`docs/planes/2026-09-04-reescritura-index-p1-p5.md`, paso 13.2). Mientras
 * tanto, cada tarjeta de P4 se renderiza sin foto (fondo tintado + ícono).
 */

export interface RutaTematica {
	/** Nombre de la ruta temática (ej. Ruta del Vino, Ruta Oceánica). */
	nombre: string;
	/** Bajada corta de spot (deck, no el párrafo largo del PDF de propuesta). */
	bajada: string;
	/** Color de trazo/fondo tintado: referencia `var(--color-ruta-*)`, definida en src/styles/tokens.css. */
	colorTrazo: string;
	/** Ícono de `Icono.astro` para esta ruta. */
	icono: 'uva' | 'ola' | 'termal' | 'granja' | 'columnas' | 'montana';
	/** Ruta de la foto (relativa a `public/`) — `null` mientras la decisión D2 siga bloqueada. */
	foto: string | null;
}

export const rutas: RutaTematica[] = [
	{
		nombre: 'Ruta del Vino',
		bajada: 'Bodegas, gastronomía y paisaje productivo',
		colorTrazo: 'var(--color-ruta-vino)',
		icono: 'uva',
		foto: null,
	},
	{
		nombre: 'Ruta Oceánica',
		bajada: 'Costa, pueblos, mar y naturaleza',
		colorTrazo: 'var(--color-ruta-oceanica)',
		icono: 'ola',
		foto: null,
	},
	{
		nombre: 'Ruta Termal',
		bajada: 'Bienestar, descanso y servicios',
		colorTrazo: 'var(--color-ruta-termal)',
		icono: 'termal',
		foto: null,
	},
	{
		nombre: 'Ruta Rural',
		bajada: 'Estancias, productores y vida de campo',
		colorTrazo: 'var(--color-ruta-rural)',
		icono: 'granja',
		foto: null,
	},
	{
		nombre: 'Ruta Patrimonial y Cultural',
		bajada: 'Historia, identidad y pueblos',
		colorTrazo: 'var(--color-ruta-patrimonial)',
		icono: 'columnas',
		foto: null,
	},
	{
		nombre: 'Ruta de Naturaleza y Aventura',
		bajada: 'Sierras, lagunas y aire libre',
		colorTrazo: 'var(--color-ruta-naturaleza)',
		icono: 'montana',
		foto: null,
	},
];
