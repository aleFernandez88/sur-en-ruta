/**
 * rutas.ts — las 6 rutas temáticas de Sur en Ruta.
 *
 * CÁSCARA VACÍA (2026-08-21): el tipado está cerrado, pero el array queda vacío a propósito.
 * Los datos reales ya están redactados en docs/landing-inversores-contenido.md, pero cargarlos es
 * un paso aparte que todavía no toca — ver docs/planes/2026-08-20-landing-inversores.md, paso 8.
 */

export interface RutaTematica {
  /** Nombre de la ruta temática (ej. Vino, Oceánica, Termal). */
  nombre: string;
  /** Descripción de una línea. */
  descripcion: string;
  /** Color de trazo sobre el mapa SVG (hex). PROVISORIO hasta la identidad definitiva. */
  colorTrazo: string;
  /** Sección del documento de propuesta de donde sale este dato. */
  fuente: string;
}

// Ejemplo de shape esperado (comentado — no es dato real, solo referencia de forma):
// { nombre: 'Nombre de ruta', descripcion: 'Una línea.', colorTrazo: '#000000', fuente: 'secc. 4.4' }

export const rutas: RutaTematica[] = [];
