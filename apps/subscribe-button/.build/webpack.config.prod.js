const path = require('path')
const { output, resolve, devServer, rules, plugins } = require('@podlove/build')
const componentAssets = path.resolve('./node_modules/@podlove/components/dist')

const version = require('../package').version

const BASE = `/`

module.exports = {
  mode: 'production',
  devtool: 'source-map',

  entry: {
    button: './src/subscribe-button.js',
    embed: './src/embed.js',
    'subscribe-button': './src/index.js'
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
    plugins.version(),
    plugins.env({ MODE: 'production', BASE, SCRIPTS: ['button'], STYLES: ['button'], VERSION: version })
  ]
}
