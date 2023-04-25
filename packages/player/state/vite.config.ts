/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const entries = [
  'audio',
  'lifecycle',
  'subscribe-button',
  'tabs',
  'transcripts',
  'timepiece',
  'theme',
  'show',
  'runtime',
  'reference',
  'quantiles',
  'playstate',
  'playlist',
  'network',
  'media',
  'last-action',
  'ghost',
  'files',
  'error',
  'episode',
  'embed',
  'driver',
  'contributors',
  'content',
  'components',
  'chapters',
  'channels'
];

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts']
  },
  plugins: [dts()],
  build: {
    lib: {
      formats: ['es'],
      entry: entries.reduce(
        (result, entry) => ({
          ...result,
          [entry]: path.resolve(__dirname, 'src', entry)
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
