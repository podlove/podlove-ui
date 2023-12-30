/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const entries = [
  'chapters',
  'color',
  'detect',
  'dom',
  'helper',
  'keyboard',
  'localstorage',
  'location',
  'math',
  'predicates',
  'request',
  'search',
  'time',
  'url',
  'useragent',
  'promise'
];

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'happy-dom'
  },
  plugins: [dts()],
  build: {
    lib: {
      formats: ['es'],
      entry: entries.reduce(
        (result, entry) => ({
          ...result,
          [entry]: path.resolve(__dirname, 'src', `${entry}.ts`)
        }),
        {}
      )
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
