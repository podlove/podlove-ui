import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { useDynamicPublicPath } from 'vite-plugin-dynamic-publicpath'
import aliases from '../../.build/aliases'
import extensions from '../../.build/extensions'

const resolve = {
  extensions,
  aliases
}

const productionConfig = {
  build: {
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src', 'main.js'),
      fileName: () => `player.[format].js`
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
