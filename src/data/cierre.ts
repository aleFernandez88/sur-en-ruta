/**
 * cierre.ts — contenido de P5 · Cierre (`cierre`), última de las 5 secciones. Titular y kicker son
 * texto de spot libre (CLAUDE.md §6). El nombre de la marca NO va en el titular: aparece una sola
 * vez, como logo, sobre el propio celular.
 *
 * CTA (D1): la app todavía no existe, así que no se puede decir "descargala". Se muestra «Muy
 * pronto» y una invitación a consultar por WhatsApp. Mientras `whatsapp.numero` sea `null`, el build
 * NO renderiza el botón (nunca llega a producción un botón sin destino) — solo bajo `astro dev` se
 * ve un hueco marcado. Cuando haya número: formato internacional sin `+` ni espacios, ej.
 * '59899123456'.
 */

export const kicker = 'Muy pronto';

export const titular = 'Tu próximo viaje ya tiene ruta.';

/** Línea de apoyo bajo el botón. */
export const apoyo = 'La app está en desarrollo.';

export interface WhatsApp {
	/** Número en formato internacional, solo dígitos. `null` = todavía no hay número. */
	numero: string | null;
	/** Texto del botón. */
	texto: string;
	/** Mensaje precargado en el chat. */
	mensaje: string;
}

export const whatsapp: WhatsApp = {
	numero: '59899277669',
	texto: 'Consultanos por WhatsApp',
	mensaje: 'Hola, quiero saber más sobre Sur en Ruta.',
};

/**
 * Encuestas (Google Forms), una por público. Cada tarjeta muestra un QR (escaneable desde otro
 * dispositivo) que además es un enlace clickeable; en móvil se ven solo como botones.
 * Los QR son SVG estáticos generados desde estas mismas URLs (`src/assets/qr/<id>.svg`): si cambia
 * una URL hay que regenerar su QR.
 */
export const encuestas = {
	titulo: 'Ayudanos a trazar la ruta.',
	bajada: 'Respondé una breve encuesta y ayudanos a diseñar la app con quienes la van a usar.',
	/** Instrucción sobre las tarjetas: el QR se escanea o se toca. */
	instruccion: 'Escaneá el código o tocalo para responder.',
	/** Versión móvil: ahí el QR no se ve, solo hay botones. */
	instruccionMovil: 'Tocá para responder.',
	formularios: [
		{ id: 'extranjeros', etiqueta: 'Viajero extranjero', url: 'https://forms.gle/cfc3UXKegGsodcNV8' },
		{ id: 'uruguayos', etiqueta: 'Viajero uruguayo', url: 'https://forms.gle/dithVeToxnTUZm4P8' },
		{ id: 'establecimientos', etiqueta: 'Establecimiento', url: 'https://forms.gle/QbfHUDRxxirKftZDA' },
	],
};

/** Enlace `wa.me` o `null` si todavía no hay número. */
export function enlaceWhatsApp(w: WhatsApp = whatsapp): string | null {
	return w.numero ? `https://wa.me/${w.numero}?text=${encodeURIComponent(w.mensaje)}` : null;
}
