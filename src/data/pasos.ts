/**
 * pasos.ts — los 5 pasos del bloque B de P3 · ¿Cómo lo hace? ("Cómo funciona la red").
 *
 * Copy literal, ya idéntico entre `src/pages/index.astro` (versión vieja, líneas 275-301) y
 * `docs/landing-contenido.md` § P3 bloque B — se copia tal cual, no se redacta de nuevo. Fuente:
 * `docs/fuentes/deck-2026-09/pag-04-como-funciona.png`.
 */

export interface Paso {
	icono: string;
	titulo: string;
	frase: string;
}

export const pasos: Paso[] = [
	{
		icono: 'ubicacion',
		titulo: 'Encontrá puntos y rutas',
		frase: 'La red te muestra dónde parar y qué hay cerca.',
	},
	{
		icono: 'planificar',
		titulo: 'Planificá tu recorrido',
		frase: 'Cada punto informa servicios, horarios y condiciones.',
	},
	{
		icono: 'servicios',
		titulo: 'Accedé a servicios y experiencias',
		frase: 'El viaje se vuelve más fácil, seguro y memorable.',
	},
	{
		icono: 'sello',
		titulo: 'Sumá sellos y beneficios',
		frase: 'Cada parada se transforma en una experiencia con historia.',
	},
	{
		icono: 'naturaleza',
		titulo: 'Viajá de forma responsable',
		frase: 'Las buenas prácticas fortalecen el cuidado y la convivencia.',
	},
];

export const PASOS_FUENTE = 'docs/fuentes/deck-2026-09/pag-04-como-funciona.png';
