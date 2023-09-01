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
      entry: {
        main: path.resolve(__dirname, 'src', 'main.ts'),
        share: path.resolve(__dirname, 'share.html')
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].css`
      }
    }
  },
  plugins: [vue(), useDynamicPublicPath()],
  resolve
}

const developmentConfig = {
  build: {
    lib: {
      formats: ['es'],
      entry: {
        main: path.resolve(__dirname, 'src', 'main.ts'),
        share: path.resolve(__dirname, 'share.html')
      }
    }
  },
  server: {
    port: 9000
  },
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
