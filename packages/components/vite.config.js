import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import aliases from '../../.build/aliases'
import extensions from '../../.build/extensions'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'happy-dom'
  },
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
    extensions,
    alias: {
      defaults: path.resolve(__dirname, './src/defaults'),
      ...aliases
    }
  }
})
