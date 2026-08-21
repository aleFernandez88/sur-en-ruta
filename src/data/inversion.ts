/**
 * inversion.ts — los 8 rubros de la Etapa 1 del plan de inversión.
 *
 * CÁSCARA VACÍA (2026-08-21): el tipado está cerrado, pero el array queda vacío a propósito.
 * Los datos reales ya están redactados en docs/landing-inversores-contenido.md, pero cargarlos es
 * un paso aparte que todavía no toca — ver docs/planes/2026-08-20-landing-inversores.md, paso 8.
 *
 * Regla de moneda (ver CLAUDE.md): el campo `moneda` es OBLIGATORIO en cada rubro y lo usa el
 * componente al renderizar, para que sea imposible imprimir un `$` sin moneda al lado de un
 * monto. Todo monto de este archivo está en pesos uruguayos (UYU), nunca dólares.
 */

export interface RubroInversion {
  /** Nombre del rubro (ej. "Desarrollo web / plataforma inicial / app MVP"). */
  rubro: string;
  /** Monto en pesos uruguayos. */
  montoUYU: number;
  /** Porcentaje del total de la Etapa 1 que representa este rubro. */
  porcentaje: number;
  /** Moneda del monto. Obligatorio: nunca se imprime un `$` sin este campo al lado. */
  moneda: 'UYU';
  /** Sección del documento de propuesta de donde sale este dato. */
  fuente: string;
}

export interface EquivalenteUSD {
  /** Valor aproximado en dólares del total de la Etapa 1. */
  valor: number;
  /** Tipo de cambio (venta) usado para la conversión. */
  tipoDeCambio: number;
  /** Fecha de la cotización usada, en formato ISO (YYYY-MM-DD). */
  fecha: string;
  /** Fuente de la cotización. Antes de publicar, contrastar contra el BCU (ver plan, punto f.3). */
  fuente: string;
}

// Ejemplo de shape esperado (comentado — no es dato real, solo referencia de forma):
// { rubro: 'Nombre del rubro', montoUYU: 550000, porcentaje: 52.4, moneda: 'UYU', fuente: 'secc. 11.3' }

export const rubrosInversion: RubroInversion[] = [];

// Placeholder: se completa contrastando contra el BCU antes de publicar (ver plan, punto f.3).
// Ejemplo de shape esperado (comentado — no es dato real):
// { valor: 25400, tipoDeCambio: 41.4, fecha: '2026-08-20', fuente: 'uy.dolarapi.com (referencia dimensional, contrastar contra BCU antes de publicar)' }
export const equivalenteUSDEtapa1: EquivalenteUSD | null = null;
