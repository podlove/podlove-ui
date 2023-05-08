import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true, entryRoot: '../clients' }), svgr()],
  build: {
    lib: {
      formats: ['es'],
      entry: {
        types: './src/types',
        index: './src/index'
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].mjs',
        chunkFileNames: `[name].[hash].mjs`
      }
    }
  },
  resolve: {
    extensions: ['.mjs', '.ts', '.svg']
  }
});
