/// <reference types="histoire" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { HstVue } from '@histoire/plugin-vue';

import path from 'path';

export default defineConfig({
  // Example build config for a component library
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/main.ts'),
      name: 'histoire-kit',
      fileName: (format) => `histoire-kit.${format}.js`
    },

    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue']
    }
  },

  server: {
    hmr: {
      clientPort: process.env.CODESPACES ? 443 : undefined
    }
  },

  plugins: [
    vue()
  ],

  histoire: {
    plugins: [HstVue()],

    setupFile: './src/histoire.setup.ts',
    storyMatch: ['./src/stories/**/*.story.vue'],
    storyIgnored: ['**/node_modules/**']
  }
});
