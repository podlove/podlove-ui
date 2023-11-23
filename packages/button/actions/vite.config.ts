import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const entries = [
  'finish-card',
  'lifecycle',
  'list',
  'overlay',
  'runtime',
  'types'
];

export default defineConfig({
  plugins: [dts({ entryRoot: '../actions/src'})],
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
