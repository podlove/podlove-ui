import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const entries = [
  'index',
  'actions',
  'audio',
  'video',
  'events',
  'props',
  'utils',
  'hls',
  'filters',
  'media',
  'connect'
];

export default ({ command }) =>
  defineConfig({
    publicDir: command === 'serve' ? 'public': false,
    plugins: [
      dts()
    ],
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
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    }
  });
