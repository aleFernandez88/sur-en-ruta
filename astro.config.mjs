// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages de proyecto (no de usuario): sirve desde /sur-en-ruta/, no desde la raíz.
  // PROVISORIO: cuando surenruta.uy tenga hosting definitivo (plan, paso 14), site/base cambian.
  site: 'https://alefernandez88.github.io',
  base: '/sur-en-ruta/',
});
