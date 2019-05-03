const path = require('path')
const { output, resolve, devServer, rules, plugins } = require('@podlove/build')
const componentAssets = path.resolve('./node_modules/@podlove/components/dist')

module.exports = {
  mode: 'development',

  entry: {
    example: './example/example.js',
    bootstrap: './bootstrap.js'
  },
  output: output(),

  resolve: resolve({
    styles: './src/styles',
    store: './src/store',
    directives: './src/directives',
    '@podlove/components': componentAssets
  }),

  devtool: 'inline-source-map',
  devServer: devServer({ port: 9000, contentBase: './dist' }),

  module: {
    rules: [rules.vue(), rules.javascript(), rules.images(), rules.vueStyles({ prod: false }), rules.pug()]
  },

  plugins: [
    plugins.vue(),
    plugins.base('.'),
    plugins.jarvis(1337),
    plugins.bundleAnalyzer(),
    plugins.hmr(),
    plugins.html({
      filename: 'index.html',
      template: './example/index.html'
    }),
    plugins.html({
      filename: 'test.html',
      template: './example/index.html',
      chunks: ['bootstrap']
    }),
    plugins.copy([
      { from: './example/assets', to: 'assets' }
    ]),
    plugins.env({ mode: 'development' })
  ]
}
