import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { useDynamicPublicPath } from 'vite-plugin-dynamic-publicpath'

const resolve = {
  extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  alias: {
    '@podlove/utils': path.resolve(__dirname, '../../packages/utils/src'),
    '@podlove/components': path.resolve(__dirname, '../../packages/components/src/components'),
    '@podlove/button-actions': path.resolve(__dirname, '../../packages/button/actions'),
    '@podlove/player-actions': path.resolve(__dirname, '../../packages/player/actions'),
    '@podlove/player-config': path.resolve(__dirname, '../../packages/player/config'),
    '@podlove/player-sagas': path.resolve(__dirname, '../../packages/player/sagas'),
    '@podlove/player-state': path.resolve(__dirname, '../../packages/player/state'),
    store: path.resolve(__dirname, './src/store')
  }
}

const productionConfig = {
  build: {
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src', 'bootstrap.js'),
      fileName: () => `bootstrap.js`
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
  server: {
    port: 9000
  },
  plugins: [vue(), useDynamicPublicPath()],
  resolve,
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        test: path.resolve(__dirname, 'test.html')
      }
    }
  }
}

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return developmentConfig
  } else {
    // command === 'build'
    return productionConfig
  }
})
