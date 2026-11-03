import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site, published on GitHub Pages at https://www.werove.in
export default defineConfig({
  site: 'https://www.werove.in',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
