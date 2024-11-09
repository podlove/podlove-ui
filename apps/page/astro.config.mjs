import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({}),
  integrations: [vue({ appEntrypoint: '/src/app' }), tailwind()]
});
