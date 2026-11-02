/**
 * p3-pasos.ts — tramos de scroll del Beat B de P3 (los 5 pasos de "Cómo funciona la red").
 *
 * Fuente ÚNICA de dos consumidores que tienen que cambiar de paso en el MISMO punto de scroll:
 *   - `P3ComoLoHace.astro` (láminas, nodos y @keyframes, generados a partir de esto), y
 *   - `telefono.ts` (qué pantalla del demo se ve dentro del celular en cada paso).
 *
 * Todo en % del tramo pineado de la sección `como-lo-hace` (el mismo que usa `animation-range:
 * contain`, 0-100). El Beat A ocupa 0–44% y sale en 44–52% (ver P3ComoLoHace.astro); el Beat B
 * arranca en `B_INICIO` y reparte los pasos en tramos iguales hasta `B_FIN`; el último se queda
 * hasta el final de la sección.
 */

/** Dónde arranca el paso 1 (el Beat B ya terminó de entrar, 44–52%). */
export const B_INICIO = 52;
/** Dónde termina el reparto parejo (el último paso se queda hasta 100%). */
export const B_FIN = 96;
/** Cantidad de pasos (tiene que coincidir con `pasos.ts`). */
export const PASOS_N = 5;
/** Ancho (en % de scroll) del cruce entre un paso y el siguiente: uno sale mientras el otro entra. */
export const CRUCE = 3;

/** Frontera entre el paso k-1 y el k (el centro del cruce). `FRONTERAS[0]` = inicio, `FRONTERAS[N]` = fin. */
export const FRONTERAS: number[] = Array.from(
	{ length: PASOS_N + 1 },
	(_, i) => B_INICIO + ((B_FIN - B_INICIO) * i) / PASOS_N,
);

/** Punto donde el paso k se ve completo y quieto (el centro de su tramo): destino del click en su nodo. */
export const CENTROS: number[] = Array.from(
	{ length: PASOS_N },
	(_, k) => Number(((FRONTERAS[k] + FRONTERAS[k + 1]) / 2).toFixed(2)),
);

/** Índice del paso activo para un progreso local (0-100) dentro de `como-lo-hace`, o `-1` si todavía
 * está en el Beat A. El paso cambia en el CENTRO del cruce (igual que las láminas). */
export function pasoActivo(local100: number): number {
	if (local100 < B_INICIO) return -1;
	let k = 0;
	for (let i = 1; i < PASOS_N; i++) if (local100 >= FRONTERAS[i]) k = i;
	return k;
}
