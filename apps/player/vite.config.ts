import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { useDynamicPublicPath } from 'vite-plugin-dynamic-publicpath'
import aliases from '../../.build/aliases'
import extensions from '../../.build/extensions'

const resolve = {
  extensions,
  alias: {
    ...aliases,
    store: path.resolve(__dirname, './src/store')
  }
}

const productionConfig = {
  build: {
    lib: {
      formats: ['es', 'umd'],
      entry: path.resolve(__dirname, 'src', 'main.js'),
      fileName: () => `player.[format].js`,
      name: 'PodlovePlayer'
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].[format].js',
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].css`
      }
    }
  },
  plugins: [vue(), useDynamicPublicPath()],
  resolve
}

const developmentConfig = {
  server: {
    port: 9000
  },
  plugins: [vue(), useDynamicPublicPath()],
  resolve
}

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return developmentConfig
  } else {
    // command === 'build'
    return productionConfig
  }
})
