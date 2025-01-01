import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import * as child from 'child_process';

const commitHash = child.execSync('git rev-parse --short HEAD').toString().trim();

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  vite: {
    define: {
      'import.meta.env.VITE_COMMIT_HASH': JSON.stringify(commitHash)
    }
  },
  integrations: [vue({ appEntrypoint: '/src/app' }), tailwind()]
});
