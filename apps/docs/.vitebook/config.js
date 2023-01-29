import { clientPlugin, defineConfig } from '@vitebook/client/node'
import { vueMarkdownPlugin } from '@vitebook/markdown-vue/node'
import { vuePlugin } from '@vitebook/vue/node'
import { defaultThemePlugin } from '@vitebook/theme-default/node'

import path from 'path'

const player = path.resolve(__dirname, '../../../../apps/player/src')

export default defineConfig({
  include: ['src/**/*.md', 'src/**/*.story.vue'],
  plugins: [
    vueMarkdownPlugin(),
    vuePlugin({ appFile: 'App.vue' }),
    clientPlugin(),
    defaultThemePlugin(),
  ],
  site: {
    title: 'UI Docs',
    description: '',
    /** @type {(import('@vitebook/theme-default/node').DefaultThemeConfig} */
    theme: {}
  },
  alias: {
    '@podlove/components': path.resolve(__dirname, '../../../../packages/components/src/components/'),
    '@podlove/player-actions': path.resolve(__dirname, '../../../../packages/player/actions/'),
    '@podlove/utils': path.resolve(__dirname, '../../../../packages/utils/src'),
    '@podlove/player': player,
  },
  vite: {
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    }
  }
})
