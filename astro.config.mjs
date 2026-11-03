// @ts-check
import { defineConfig } from 'astro/config';

// `site` y `base` salen de variables de entorno para poder servir el mismo código desde:
//   - Hostinger (dominio raíz, hoy el dominio temporal y luego surenruta.uy): SITE_URL / BASE_PATH sin definir → base '/'.
//   - GitHub Pages de proyecto (deploy.yml, solo manual): define BASE_PATH='/sur-en-ruta/'.
// Cuando el dominio definitivo esté conectado, poner SITE_URL=https://surenruta.uy en el workflow de deploy.
const site = process.env.SITE_URL || undefined;
const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
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
