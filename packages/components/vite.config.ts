import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'happy-dom'
  },
  build: {
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src', 'components', 'main.ts')
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        entryFileNames: 'podlove-ui-components.mjs',
        chunkFileNames: `[name].[hash].mjs`
      }
    }
  },
  plugins: [vue(), dts({ insertTypesEntry: true }), cssInjectedByJsPlugin()],
  resolve: {
    extensions: ['.ts', '.vue'],
    alias: {
      defaults: path.resolve(__dirname, './src/defaults')
    }
  }
});
