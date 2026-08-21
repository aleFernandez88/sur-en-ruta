/**
 * niveles-punto.ts — los 4 niveles de punto de la red (básico, de servicio, amigo, experiencial).
 *
 * CÁSCARA VACÍA (2026-08-21): el tipado está cerrado, pero el array queda vacío a propósito.
 * Los datos reales ya están redactados en docs/landing-inversores-contenido.md, pero cargarlos es
 * un paso aparte que todavía no toca — ver docs/planes/2026-08-20-landing-inversores.md, paso 8.
 */

export interface NivelPunto {
  /** Nombre del nivel (básico, de servicio, amigo, experiencial). */
  nombre: string;
  /** Descripción de una línea. */
  descripcion: string;
  /** Posición en la escalera ascendente, 1 = más bajo. */
  orden: number;
  /** Sección del documento de propuesta de donde sale este dato. */
  fuente: string;
}

// Ejemplo de shape esperado (comentado — no es dato real, solo referencia de forma):
// { nombre: 'Básico', descripcion: 'Una línea.', orden: 1, fuente: 'secc. 11.2' }

export const nivelesPunto: NivelPunto[] = [];
