/**
 * ferias.ts — las 4 ferias internacionales mencionadas como canal de captación.
 *
 * CÁSCARA VACÍA (2026-08-21): el tipado está cerrado, pero el array queda vacío a propósito.
 * Los datos reales ya están redactados en docs/landing-inversores-contenido.md, pero cargarlos es
 * un paso aparte que todavía no toca — ver docs/planes/2026-08-20-landing-inversores.md, paso 8.
 */

export interface Feria {
  /** Nombre de la feria. */
  nombre: string;
  /** Ciudad donde se realiza. */
  ciudad: string;
  /** País donde se realiza. */
  pais: string;
  /** Sección del documento de propuesta de donde sale este dato. */
  fuente: string;
}

// Ejemplo de shape esperado (comentado — no es dato real, solo referencia de forma):
// { nombre: 'Nombre de la feria', ciudad: 'Ciudad', pais: 'País', fuente: 'secc. 6.2' }

export const ferias: Feria[] = [];
