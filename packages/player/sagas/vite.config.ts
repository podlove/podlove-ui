import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const entries = [
  'audio',
  'error',
  'keyboard',
  'playlist',
  'runtime',
  'tabs',
  'transcripts',
  'chapters',
  'files',
  'lifecycle',
  'progress',
  'share',
  'theme',
  'types',
  'components',
  'init',
  'play',
  'quantiles',
  'stepper',
  'timepiece',
  'visible-components'
];

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true, entryRoot: '../actions' })],
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
        entryFileNames: '[name].js',
        chunkFileNames: `[name].[hash].js`
      }
    }
  },
  resolve: {
    extensions: ['.mjs', '.ts']
  }
});
