/**
 * isotipo-piezas.ts — el isotipo «Bandera» en línea, con cada <path> como una pieza que entra desde
 * un lugar distinto y se arma en su sitio (el gesto de P1; acá lo reusa el celular en P5).
 *
 * Cada pieza lleva `--dx/--dy/--rot` (unidades del viewBox / grados) y `--d` (retardo en ms); el CSS
 * de quien lo use decide cuándo se arma. Índices = orden de los 19 paths del SVG (0 carrocería,
 * 1-3/13/16 detalles del motorhome, 4 y 6 ruta, 5/7/9 colina y pasto, 8/14 sol, 10 pin, 11/12
 * ruedas, 15/17/18 pájaros). Las piezas con tipo `pin` rebotan al asentarse.
 */
const PIEZAS: Record<number, [number, number, number, number, string?]> = {
	5: [-1500, 300, 0, 0],
	7: [1500, -300, 0, 90],
	4: [-1400, -200, 0, 160],
	6: [1500, 100, 0, 240],
	9: [-1800, 700, 0, 330],
	8: [0, -1300, 0, 420],
	14: [0, -1300, 0, 440],
	0: [1600, 300, 0, 520],
	1: [1500, 200, 0, 640],
	2: [1500, 200, 0, 660],
	3: [1500, 200, 0, 680],
	13: [0, 900, 0, 700],
	16: [0, 900, 0, 720],
	11: [-500, 900, -540, 820],
	12: [500, 900, 540, 860],
	10: [0, -1500, 0, 1000, 'pin'],
	15: [1200, -800, 0, 1120],
	17: [1200, -800, 0, 1140],
	18: [1200, -800, 0, 1160],
};

/** Interior del SVG con cada path convertido en `<path class="{prefijo}-pieza" style="--dx…">`. */
export function isotipoPiezas(svgRaw: string, prefijo: string): string {
	let n = -1;
	const interior = (svgRaw.match(/<svg[^>]*>([\s\S]*)<\/svg>/) ?? [])[1] ?? '';
	return interior.replace(/<path /g, () => {
		n += 1;
		const [dx, dy, rot, d, tipo] = PIEZAS[n] ?? [0, 0, 0, 0];
		return `<path class="${prefijo}-pieza${tipo ? ` ${prefijo}-pieza--${tipo}` : ''}" style="--dx:${dx};--dy:${dy};--rot:${rot};--d:${d}ms" `;
	});
}
