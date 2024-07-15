import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      formats: ['es'],
      entry: {
        parser: './src/parser.ts'
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
    extensions: ['.js']
  }
});
