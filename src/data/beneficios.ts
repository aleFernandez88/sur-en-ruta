/**
 * beneficios.ts — los 3 bloques de "Una red que beneficia a todos" (P2 · ¿Qué hace?).
 *
 * Copy literal de `docs/landing-contenido.md` § P2 (a su vez del deck nuevo de Ana,
 * `docs/fuentes/deck-2026-09/pag-08-beneficia-a-todos.png`) — no redactado de nuevo.
 */

export interface BloqueBeneficio {
	/** Para quién es este bloque (viajero / comercios y privados / territorio). */
	titulo: string;
	/** Ícono de `Icono.astro` para este bloque. */
	icono: 'viajeros' | 'economia-local' | 'base-conectada';
	/** Los 3 ítems del bloque, copy literal del deck. */
	items: string[];
	/** Página fuente. */
	fuente: string;
}

export const beneficios: BloqueBeneficio[] = [
	{
		titulo: 'Para el viajero',
		icono: 'viajeros',
		items: ['Información clara', 'Paradas mejor identificadas', 'Más confianza y mejores experiencias'],
		fuente: 'docs/fuentes/deck-2026-09/pag-08-beneficia-a-todos.png',
	},
	{
		titulo: 'Para los comercios y privados',
		icono: 'economia-local',
		items: ['Más visibilidad', 'Nuevos clientes', 'Integración simple a una red turística'],
		fuente: 'docs/fuentes/deck-2026-09/pag-08-beneficia-a-todos.png',
	},
	{
		titulo: 'Para el territorio',
		icono: 'base-conectada',
		items: ['Circulación ordenada', 'Activación de economías locales', 'Mejor conexión entre destinos'],
		fuente: 'docs/fuentes/deck-2026-09/pag-08-beneficia-a-todos.png',
	},
];
