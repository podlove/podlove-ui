/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const entries = [
  'chapters',
  'components',
  'error',
  'keyboard',
  'lifecycle',
  'media-session',
  'player',
  'playlist',
  'quantiles',
  'runtime',
  'stepper',
  'transcripts',
  'version',
  'middleware',
  'helper'
];

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'happy-dom'
  },
  plugins: [dts({ insertTypesEntry: true, entryRoot: '../sagas' })],
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
    extensions: ['.mjs', '.ts']
  }
});
