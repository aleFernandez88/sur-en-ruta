/**
 * inversion.ts — los 8 rubros de la Etapa 1 del plan de inversión.
 *
 * Montos verificados contra el documento de propuesta original (`Activa turismo propuesta.pdf`,
 * secc. 11.3, tabla "Inversión estimada — Etapa 1") el 2026-08-24. Los porcentajes están
 * calculados a partir de esos montos (monto / 1.050.000 × 100, redondeado a 1 decimal) — no son
 * un dato textual del PDF. Por redondeo por rubro, la suma de los 8 porcentajes visibles puede
 * quedar en 100,1% en vez de 100,0% exacto; es el mismo redondeo ya usado en
 * docs/landing-inversores-contenido.md y no se fuerza a cerrar artificialmente.
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

export const rubrosInversion: RubroInversion[] = [
  {
    rubro: 'Desarrollo web / plataforma inicial / app MVP',
    montoUYU: 550000,
    porcentaje: 52.4,
    moneda: 'UYU',
    fuente: 'secc. 11.3',
  },
  {
    rubro: 'Señalética inicial para puntos piloto',
    montoUYU: 140000,
    porcentaje: 13.3,
    moneda: 'UYU',
    fuente: 'secc. 11.3',
  },
  {
    rubro: 'Pasaporte de sellos, revista y materiales impresos',
    montoUYU: 100000,
    porcentaje: 9.5,
    moneda: 'UYU',
    fuente: 'secc. 11.3',
  },
  {
    rubro: 'Relevamiento territorial y diagnóstico (viáticos)',
    montoUYU: 70000,
    porcentaje: 6.7,
    moneda: 'UYU',
    fuente: 'secc. 11.3',
  },
  {
    rubro: 'Comunicación, redes, fotografía y audiovisual',
    montoUYU: 70000,
    porcentaje: 6.7,
    moneda: 'UYU',
    fuente: 'secc. 11.3',
  },
  {
    rubro: 'Asesoramiento legal, técnico y administrativo',
    montoUYU: 60000,
    porcentaje: 5.7,
    moneda: 'UYU',
    fuente: 'secc. 11.3',
  },
  {
    rubro: 'Fondo de contingencia',
    montoUYU: 50000,
    porcentaje: 4.8,
    moneda: 'UYU',
    fuente: 'secc. 11.3',
  },
  {
    rubro: 'Branding, diseño gráfico e identidad visual',
    montoUYU: 10000,
    porcentaje: 1.0,
    moneda: 'UYU',
    fuente: 'secc. 11.3',
  },
];

export const totalEtapa1UYU = 1050000;

// Referencia dimensional de uy.dolarapi.com (venta), tomada el 2026-08-20 — NO es la fuente
// oficial. Antes de publicar, contrastar contra el BCU (ver plan, punto f.3) y actualizar
// `fuente` en consecuencia.
export const equivalenteUSDEtapa1: EquivalenteUSD = {
  valor: 25400,
  tipoDeCambio: 41.4,
  fecha: '2026-08-20',
  fuente: 'uy.dolarapi.com (referencia dimensional, contrastar contra BCU antes de publicar)',
};
