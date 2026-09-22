/**
 * herramientas.ts — las 4 herramientas del bloque A de P3 · ¿Cómo lo hace?
 *
 * Copy literal de `docs/landing-contenido.md` § P3 bloque A (a su vez del deck nuevo de Ana,
 * `docs/fuentes/deck-2026-09/pag-07-herramientas.png`) — no redactado de nuevo.
 */

export interface Herramienta {
	nombre: string;
	/** Qué es, en una línea. Copy literal del deck. */
	que: string;
	/** Ícono de `Icono.astro`. */
	icono: 'app' | 'pasaporte' | 'sello' | 'senaletica';
}

export const herramientas: Herramienta[] = [
	{ nombre: 'App Sur en Ruta', que: 'Mapa, puntos, servicios y rutas', icono: 'app' },
	{
		nombre: 'Pasaporte de Ruta',
		que: 'Una forma de viajar por etapas y sumar historias',
		icono: 'pasaporte',
	},
	{
		nombre: 'Sello Viajero Responsable',
		que: 'Buenas prácticas y confianza dentro de la red',
		icono: 'sello',
	},
	{
		nombre: 'Señalética e identidad',
		que: 'Puntos reconocibles, información clara y presencia en el territorio',
		icono: 'senaletica',
	},
];

export const HERRAMIENTAS_FUENTE = 'docs/fuentes/deck-2026-09/pag-07-herramientas.png';
