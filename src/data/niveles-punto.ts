/**
 * niveles-punto.ts — los 4 niveles de punto de la red (básico, de servicio, amigo, experiencial).
 *
 * Nombres y descripciones verificados contra el documento de propuesta original
 * (`Activa turismo propuesta.pdf`, secc. 11.2 — "Criterio territorial: un punto de servicio cada
 * 90 km") el 2026-08-24. Las descripciones son casi literales del PDF: es la definición que da
 * la propuesta de cada nivel, no una reformulación editorial.
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

export const nivelesPunto: NivelPunto[] = [
  {
    nombre: 'Punto básico',
    descripcion: 'Lugar seguro, señalizado, con normas, registro y presencia en el mapa.',
    orden: 1,
    fuente: 'secc. 11.2',
  },
  {
    nombre: 'Punto de servicio',
    descripcion: 'Suma agua, descarga, electricidad básica o servicios complementarios.',
    orden: 2,
    fuente: 'secc. 11.2',
  },
  {
    nombre: 'Punto amigo',
    descripcion: 'Comercio o emprendimiento que recibe al viajero con beneficios, sellos o experiencias.',
    orden: 3,
    fuente: 'secc. 11.2',
  },
  {
    nombre: 'Punto experiencial',
    descripcion: 'Estancia, bodega, restaurante, atractivo turístico o emprendimiento local que agrega valor al viaje.',
    orden: 4,
    fuente: 'secc. 11.2',
  },
];
