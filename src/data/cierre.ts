/**
 * cierre.ts — contenido de P5 · Cierre (`cierre`), última de las 5 secciones. El titular es texto
 * de spot, literal aprobado (`docs/landing-contenido.md` § P5). El CTA sigue bloqueado por Ale
 * (decisión D1, `docs/planes/2026-09-04-reescritura-index-p1-p5.md` §9): la app no existe, así que
 * el CTA no puede decir "descargala".
 *
 * Mientras `cta` sea `null`, `P5Cierre.astro` NO renderiza ningún bloque de acción en build (nunca
 * llega a producción un botón sin acción) — solo bajo `astro dev` se ve un hueco marcado, para que
 * el layout no cambie el día que D1 se resuelva y se complete este archivo.
 */

export const titular = 'Sur en Ruta está en camino.';

export interface CTA {
	/** Texto del botón. Nunca "Descargá la app" — la app todavía no existe (regla D1). */
	texto: string;
	href: string;
	/** Línea de apoyo opcional debajo del botón (ej. "La app está en desarrollo", §14.4). */
	apoyo?: string;
}

export const cta: CTA | null = null;
