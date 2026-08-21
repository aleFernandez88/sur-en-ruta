/**
 * componentes.ts — los 6 componentes del sistema Sur en Ruta.
 *
 * Nombres y descripciones verificados contra el documento de propuesta original
 * (`Activa turismo propuesta.pdf`, secc. 3 y 4.1-4.6) el 2026-08-21. Antes de esta fecha
 * el array estaba vacío: el plan confirmaba la cantidad (6) pero no los nombres.
 *
 * Ojo: esto carga el DATO, no el copy de la sección 3 de la landing (Sistema.astro) — ese
 * componente sigue con placeholders TODO a propósito hasta que se cargue el contenido completo,
 * ver docs/planes/2026-08-20-landing-inversores.md, paso 11.
 */

export interface Componente {
  /** Nombre del componente del sistema. */
  nombre: string;
  /** Por qué importa, en una línea (no la descripción larga del PDF). */
  descripcion: string;
  /** Sección del documento de propuesta de donde sale este dato. */
  fuente: string;
}

export const componentes: Componente[] = [
  {
    nombre: 'Áreas habilitadas o recomendadas',
    descripcion: 'Espacios reconocidos por la red, de básicos a experienciales, sin exigir la misma inversión a todos.',
    fuente: 'secc. 4.1',
  },
  {
    nombre: 'Puntos Amigos',
    descripcion: 'Comercios y servicios que activan la economía local sin exigir grandes inversiones para sumarse.',
    fuente: 'secc. 4.2',
  },
  {
    nombre: 'Sello Viajero Responsable',
    descripcion: 'Certifica buenas prácticas del viajero y da confianza a privados y al Estado.',
    fuente: 'secc. 4.3',
  },
  {
    nombre: 'Rutas temáticas',
    descripcion: 'Seis circuitos que ordenan el recorrido y distribuyen turismo hacia zonas menos tradicionales.',
    fuente: 'secc. 4.4',
  },
  {
    nombre: 'Pasaporte de Ruta',
    descripcion: 'Sellos coleccionables por parada que dan visibilidad a comercios chicos y generan pertenencia.',
    fuente: 'secc. 4.5',
  },
  {
    nombre: 'App y sistema de medición',
    descripcion: 'Conecta toda la red en un mapa y convierte el movimiento turístico en datos para planificar.',
    fuente: 'secc. 4.6',
  },
];
