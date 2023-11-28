import path from 'path';
import { UserConfigExport, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

import aliases from '../../.build/aliases';
import extensions from '../../.build/extensions';

const resolve = {
  extensions,
  aliases
};

const productionConfig: UserConfigExport = {
  publicDir: false,
  build: {
    lib: {
      formats: ['es'],
      entry: {
        main: path.resolve(__dirname, 'src', 'main.ts'),
        app: path.resolve(__dirname, 'src', 'app.ts'),
        share: path.resolve(__dirname, 'share.html')
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
  plugins: [vue(), dts({ entryRoot: '../player/src' })],
  resolve
};

const developmentConfig: UserConfigExport = {
  server: {
    port: 9000
  },
  plugins: [vue()],
  resolve
};

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return developmentConfig;
  } else {
    // command === 'build'
    return productionConfig;
  }
});
