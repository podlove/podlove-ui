import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

import aliases from '../../.build/aliases';
import extensions from '../../.build/extensions';

const resolve = {
  extensions,
  aliases
};

const productionConfig = {
  build: {
    lib: {
      formats: ['es'],
      entry: {
        main: path.resolve(__dirname, 'src', 'main.ts'),
        app: path.resolve(__dirname, 'src', 'app.ts')
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].mjs',
        chunkFileNames: `[name].[hash].mjs`,
        assetFileNames: `[name].css`
      }
    }
  },
  plugins: [
    vue(),
    dts({ entryRoot: '../subscribe-button/src' }), svgr()
  ],
  resolve
};

const developmentConfig = {
  server: {
    port: 9000
  },
  plugins: [vue()],
  resolve
}

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return developmentConfig
  } else {
    // command === 'build'
    return productionConfig
  }
})
