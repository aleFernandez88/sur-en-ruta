/**
 * etapas.ts — las 3 etapas del modelo económico (Validación / Expansión territorial inicial /
 * Consolidación nacional básica).
 *
 * CÁSCARA VACÍA (2026-08-21): el tipado está cerrado, pero el array queda vacío a propósito.
 * Los datos reales ya están redactados en docs/landing-inversores-contenido.md, pero cargarlos es
 * un paso aparte que todavía no toca — ver docs/planes/2026-08-20-landing-inversores.md, paso 8.
 *
 * Regla del plan (verificada contra el PDF, secc. 11.4 y 11.5): el documento NO publica montos
 * para la Etapa 2 ni la Etapa 3. El campo `montoUYU` va `null` en esos casos — nunca un valor
 * estimado.
 */

export interface Etapa {
  /** Nombre de la etapa. */
  nombre: string;
  /** Descripción de una línea. */
  descripcion: string;
  /** Monto en UYU. `null` cuando el documento no publica cifra para esa etapa (Etapas 2 y 3). */
  montoUYU: number | null;
  /** Posición en el timeline, 1 = primera. */
  orden: number;
  /** Sección del documento de propuesta de donde sale este dato. */
  fuente: string;
}

// Ejemplo de shape esperado (comentado — no es dato real, solo referencia de forma):
// { nombre: 'Validación', descripcion: 'Una línea.', montoUYU: 1050000, orden: 1, fuente: 'secc. 11' }
// { nombre: 'Expansión territorial inicial', descripcion: 'Una línea.', montoUYU: null, orden: 2, fuente: 'secc. 11.4' }

export const etapas: Etapa[] = [];
