/**
 * rutas.ts — las 6 rutas temáticas de Sur en Ruta.
 *
 * Nombres y descripciones verificados contra el documento de propuesta original
 * (`Activa turismo propuesta.pdf`, secc. 4.4) el 2026-08-24: condensan a una línea los dos
 * párrafos que trae el PDF por ruta, sin agregar contenido que no esté ahí.
 *
 * `colorTrazo` apunta a los custom properties `--color-ruta-*` de src/styles/tokens.css (no hex
 * sueltos acá): cuando se revisen esos colores, se cambian en un solo archivo.
 */

export interface RutaTematica {
  /** Nombre de la ruta temática (ej. Vino, Oceánica, Termal). */
  nombre: string;
  /** Descripción de una línea. */
  descripcion: string;
  /**
   * Color de trazo sobre el mapa SVG: referencia `var(--color-ruta-*)`, definida en
   * src/styles/tokens.css. PROVISORIO hasta la identidad definitiva
   * (docs/decisiones/identidad-visual.md, paso 13 del plan) — son 6 valores distinguibles
   * entre sí, no una decisión de marca.
   */
  colorTrazo: string;
  /** Sección del documento de propuesta de donde sale este dato. */
  fuente: string;
}

export const rutas: RutaTematica[] = [
  {
    nombre: 'Ruta del Vino',
    descripcion: 'Conecta bodegas, viñedos, experiencias gastronómicas, alojamientos rurales y Puntos Amigos en paisajes productivos.',
    colorTrazo: 'var(--color-ruta-vino)',
    fuente: 'secc. 4.4',
  },
  {
    nombre: 'Ruta Oceánica',
    descripcion: 'Integra playas, pueblos costeros, faros, puertos, marinas y gastronomía de mar a lo largo de la costa.',
    colorTrazo: 'var(--color-ruta-oceanica)',
    fuente: 'secc. 4.4',
  },
  {
    nombre: 'Ruta Termal',
    descripcion: 'Vincula el corredor termal con servicios, comercios y experiencias de bienestar, con potencial en temporada media y baja.',
    colorTrazo: 'var(--color-ruta-termal)',
    fuente: 'secc. 4.4',
  },
  {
    nombre: 'Ruta Rural',
    descripcion: 'Promueve estancias, productores locales, pueblos pequeños, ferias y gastronomía casera fuera de los circuitos masificados.',
    colorTrazo: 'var(--color-ruta-rural)',
    fuente: 'secc. 4.4',
  },
  {
    nombre: 'Ruta Patrimonial y Cultural',
    descripcion: 'Integra ciudades históricas, museos, arquitectura, fiestas locales y artesanos que cuentan a Uruguay desde su historia.',
    colorTrazo: 'var(--color-ruta-patrimonial)',
    fuente: 'secc. 4.4',
  },
  {
    nombre: 'Ruta de Naturaleza y Aventura',
    descripcion: 'Conecta sierras, lagunas, áreas protegidas, senderos y actividades náuticas para el viajero que busca experiencias al aire libre.',
    colorTrazo: 'var(--color-ruta-naturaleza)',
    fuente: 'secc. 4.4',
  },
];
