/**
 * etapas.ts — las 3 etapas del modelo económico (Validación / Expansión territorial inicial /
 * Consolidación nacional básica).
 *
 * Nombres y descripciones verificados contra el documento de propuesta original
 * (`Activa turismo propuesta.pdf`, secc. 11, 11.3, 11.4 y 11.5) el 2026-08-24.
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

export const etapas: Etapa[] = [
  {
    nombre: 'Validación del sistema',
    descripcion: 'Demostrar que el sistema funciona en escala piloto: primeros privados, primera comunidad, primera medición real.',
    montoUYU: 1050000,
    orden: 1,
    fuente: 'secc. 11.3',
  },
  {
    nombre: 'Expansión territorial inicial',
    descripcion: 'Pasar del piloto a una red inicial visible: más puntos, corredores ordenados y primeras métricas de comportamiento.',
    montoUYU: null,
    orden: 2,
    fuente: 'secc. 11.4',
  },
  {
    nombre: 'Consolidación nacional básica',
    descripcion: 'Consolidar una red nacional básica, con presencia en los principales corredores turísticos del país.',
    montoUYU: null,
    orden: 3,
    fuente: 'secc. 11.5',
  },
];
