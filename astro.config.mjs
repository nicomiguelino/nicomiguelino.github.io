import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/lib/site.ts';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

export default defineConfig({
  site: SITE_URL,

  compressHTML: true,

  markdown: {
    shikiConfig: { theme: 'css-variables' },
  },

  integrations: [sitemap(), mdx()],

  vite: {
    plugins: [tailwindcss()],
  },
});
