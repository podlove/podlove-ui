const path = require('path')
const { entry, output, resolve, rules, plugins, optimization } = require('@podlove/build')
const componentAssets = path.resolve('./node_modules/@podlove/components/dist')

module.exports = {
  mode: 'production',

  entry: {
    player: './player.js',
    bootstrap: './bootstrap.js'
  },

  output: output(),

  optimization: optimization(),

  resolve: resolve({
    styles: './src/styles',
    store: './src/store',
    directives: './src/directives',
    '@podlove/components': componentAssets
  }),

  module: {
    rules: [rules.vue(), rules.javascript(), rules.images(), rules.vueStyles({ prod: true }), rules.pug()]
  },

  plugins: [
    plugins.vue(),
    plugins.css(),
    plugins.minifyCss(),
    plugins.version(),
    plugins.base('.'),
    plugins.env('production')
  ]
}
