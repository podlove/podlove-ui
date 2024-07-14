import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import vue from '@astrojs/vue';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  // adapter: node({
  //   mode: 'standalone'
  // }),
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [vue({ appEntrypoint: '/src/app' }), tailwind()]
});
