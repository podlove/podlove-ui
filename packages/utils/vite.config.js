import path from 'path'
import { defineConfig } from 'vite'

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
  'sandbox',
  'search',
  'throttle',
  'time',
  'url',
  'useragent'
]

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: entries.reduce(
        (result, entry) => ({
          ...result,
          [entry]: path.resolve(__dirname, 'src', `${entry}.js`)
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
})
