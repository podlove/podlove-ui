const path = require('path')
const { output, resolve, devServer, rules, plugins } = require('@podlove/build')
const componentAssets = path.resolve('./node_modules/@podlove/components/dist')

const BASE = `/`

module.exports = {
  mode: 'development',

  entry: {
    main: './src/subscribe-button.js',
    embed: './src/embed.js'
    // example: './example/example.js'
  },
  output: output(),

  resolve: resolve({
    theme: './src/theme',
    store: './src/store',
    directives: './src/directives',
    '@podlove/components': componentAssets
  }),

  devtool: 'inline-source-map',
  devServer: devServer({ port: 9000, contentBase: './dist' }),

  module: {
    rules: [
      rules.vue(),
      rules.javascript(),
      rules.images(),
      rules.vueStyles({ prod: false }),
      rules.mustache()
    ]
  },

  plugins: [
    plugins.vue(),
    plugins.jarvis(1337),
    plugins.bundleAnalyzer(),
    plugins.hmr(),
    plugins.env({ MODE: 'development', BASE, SCRIPTS: ['main'], STYLES: [] }),
    plugins.html({
      filename: 'index.html',
      template: './example/index.html'
    }),
    plugins.html({
      filename: 'embed.html',
      template: './example/embed.html',
      chunks: ['embed']
    }),
    plugins.env({ mode: 'development' })
  ]
}
