import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { useDynamicPublicPath } from 'vite-plugin-dynamic-publicpath'
import EnvironmentPlugin from 'vite-plugin-environment'

import { version } from './package.json'

import alias from '../../.build/aliases'
import extensions from '../../.build/extensions'

const resolve = {
  extensions,
  alias
}

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src', 'subscribe-button.js')
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `subscribe-button.css`
      }
    }
  },
  plugins: [
    vue(),
    useDynamicPublicPath(),
    EnvironmentPlugin({
      NODE_ENV: 'production',
      MODE: 'production',
      VERSION: version
    })
  ],
  resolve
})
