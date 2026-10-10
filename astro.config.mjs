// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages de proyecto (no de usuario): sirve desde /sur-en-ruta/, no desde la raíz.
  // PROVISORIO: cuando surenruta.uy tenga hosting definitivo (plan, paso 14), site/base cambian.
  site: 'https://alefernandez88.github.io',
  base: '/sur-en-ruta/',
  vite: {
    build: {
      // lightningcss (el minificador por defecto de Vite 8) fusiona `animation` + `animation-timeline`
      // en el shorthand `animation: … scroll(root)`, que Chrome rechaza entero: en el `dist/` ninguna
      // animación atada al scroll corría (celular fijo, tarjetas sin entrada). esbuild las deja
      // separadas. Verificado 2026-10-09 contra Chrome 154.
      cssMinify: 'esbuild',
    },
  },
});
