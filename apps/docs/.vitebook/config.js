import { clientPlugin, defineConfig } from '@vitebook/client/node'
import { vueMarkdownPlugin } from '@vitebook/markdown-vue/node'
import { vuePlugin } from '@vitebook/vue/node'
import { defaultThemePlugin } from '@vitebook/theme-default/node'

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
  vite: {
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    }
  }
})
