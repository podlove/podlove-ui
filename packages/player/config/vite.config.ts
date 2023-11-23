/// <reference types="vitest" />
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts']
  },
  build: {
    lib: {
      formats: ['es'],
      entry: './src/index.ts'
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].mjs'
      }
    }
  },
  plugins: [dts()],
  resolve: {
    extensions: ['.ts']
  },

})
