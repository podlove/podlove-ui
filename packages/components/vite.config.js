import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      formats: ['es', 'umd'],
      entry: path.resolve(__dirname, 'src', 'components', 'main.js'),
      name: 'PodloveUiComponents',
      fileName: (format) => `podlove-ui-components.${format}.js`,
      type: 'modules'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      defaults: path.resolve(__dirname, './src/defaults')
    }
  }
})
