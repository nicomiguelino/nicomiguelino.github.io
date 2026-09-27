import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/lib/site.ts';

import tailwindcss from '@tailwindcss/vite';

function pagefindDev() {
  const mimeTypes = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.wasm': 'application/wasm',
  };
  return {
    name: 'pagefind-dev',
    hooks: {
      'astro:server:setup': ({ server }) => {
        const pagefindDir = fileURLToPath(new URL('./dist/pagefind', import.meta.url));
        server.middlewares.use('/pagefind', async (req, res, next) => {
          const requestPath = (req.url ?? '/').split('?')[0];
          const filePath = path.join(pagefindDir, requestPath);
          if (!filePath.startsWith(pagefindDir + path.sep)) return next();
          try {
            const data = await readFile(filePath);
            const type = mimeTypes[path.extname(filePath)] ?? 'application/octet-stream';
            res.setHeader('Content-Type', type);
            res.end(data);
          } catch {
            next();
          }
        });
      },
    },
  };
}

export default defineConfig({
  site: SITE_URL,

  compressHTML: true,

  markdown: {
    shikiConfig: { theme: 'css-variables' },
  },

  integrations: [sitemap(), pagefindDev()],

  vite: {
    plugins: [tailwindcss()],
  },
});
