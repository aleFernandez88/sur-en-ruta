/**
 * marca.ts — pone el nombre de la marca en su tipografía.
 *
 * Regla de identidad (docs/decisiones/identidad-visual.md): "Sur en Ruta", donde aparece como
 * nombre de la marca, va SIEMPRE en `--fuente-marca` (Italiana) — nunca en la fuente del texto
 * donde está escrito. `conMarca()` envuelve cada aparición en `<span class="marca">` (estilo global
 * en base.css) para usar con `set:html`. El texto de entrada es contenido propio del repo, no
 * input de usuarios.
 */
export const NOMBRE_MARCA = 'Sur en Ruta';

export function conMarca(texto: string): string {
	return texto.split(NOMBRE_MARCA).join(`<span class="marca">${NOMBRE_MARCA}</span>`);
}
