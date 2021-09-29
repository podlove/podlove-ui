const path = require('path')
const { output, resolve, rules, plugins } = require('@podlove/build')
const componentAssets = path.resolve('./node_modules/@podlove/components/dist')
const pkg = require('../package')
const BASE = `//cdn.podlove.org/subscribe-button/`

module.exports = {
  mode: 'production',

  entry: {
    embed: './src/embed.js'
  },
  output: output(),

  resolve: resolve({
    theme: './src/theme',
    store: './src/store',
    directives: './src/directives',
    '@podlove/components': componentAssets
  }),

  module: {
    rules: [
      rules.vue(),
      rules.javascript(),
      rules.images(),
      rules.vueStyles({ prod: true }),
      rules.mustache()
    ]
  },

  plugins: [
    plugins.vue(),
    plugins.css(),
    plugins.minifyCss(),
    plugins.version({ version: pkg.version, name: pkg.name }),
    plugins.env({ MODE: 'production', BASE, SCRIPTS: ['button'], STYLES: ['button'], VERSION: pkg.version })
  ]
}
