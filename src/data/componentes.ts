/**
 * componentes.ts — los 6 componentes del sistema Sur en Ruta.
 *
 * CÁSCARA VACÍA (2026-08-21): el tipado está cerrado, pero el array queda vacío a propósito.
 * Los datos reales ya están redactados en docs/landing-inversores-contenido.md, pero cargarlos es
 * un paso aparte que todavía no toca — ver docs/planes/2026-08-20-landing-inversores.md, paso 8.
 */

export interface Componente {
  /** Nombre del componente del sistema. */
  nombre: string;
  /** Por qué importa, en una línea (no la descripción larga del PDF). */
  descripcion: string;
  /** Sección del documento de propuesta de donde sale este dato. */
  fuente: string;
}

// Ejemplo de shape esperado (comentado — no es dato real, solo referencia de forma):
// { nombre: 'Nombre del componente', descripcion: 'Por qué importa, una línea.', fuente: 'secc. 3-4' }

export const componentes: Componente[] = [];
