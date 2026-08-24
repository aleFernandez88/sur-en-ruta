/**
 * ferias.ts — las 4 ferias internacionales mencionadas como canal de captación.
 *
 * Nombres, ciudades y países verificados contra el documento de propuesta original
 * (`Activa turismo propuesta.pdf`, secc. 6.2 "Difusión internacional") el 2026-08-24.
 */

export interface Feria {
  /** Nombre de la feria. */
  nombre: string;
  /**
   * Ciudad donde se realiza. Vacío cuando el documento no la nombra (ver ExpoRodantear:
   * el PDF solo dice "Argentina", sin ciudad — no se inventa una).
   */
  ciudad?: string;
  /** País donde se realiza. */
  pais: string;
  /** Sección del documento de propuesta de donde sale este dato. */
  fuente: string;
}

export const ferias: Feria[] = [
  {
    nombre: 'Caravan Salon Düsseldorf',
    ciudad: 'Düsseldorf',
    pais: 'Alemania',
    fuente: 'secc. 6.2',
  },
  {
    nombre: 'Salón Internacional del Caravaning',
    ciudad: 'Barcelona',
    pais: 'España',
    fuente: 'secc. 6.2',
  },
  {
    nombre: 'ExpoRodantear',
    pais: 'Argentina',
    fuente: 'secc. 6.2',
  },
  {
    nombre: 'Expo Motorhome',
    ciudad: 'Curitiba',
    pais: 'Brasil',
    fuente: 'secc. 6.2',
  },
];
