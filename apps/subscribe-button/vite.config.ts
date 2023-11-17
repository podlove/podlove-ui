import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import EnvironmentPlugin from 'vite-plugin-environment';

import { version } from './package.json';

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
      entry: path.resolve(__dirname, 'src', 'main.ts'),
      fileName: () => `subscribe-button.[format].js`
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].css`
      }
    }
  },
  plugins: [
    vue(),
    EnvironmentPlugin({
      NODE_ENV: 'production',
      MODE: 'production',
      VERSION: version
    })
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
