const { output, resolve, devServer, rules, plugins } = require('@podlove/player-build')

module.exports = {
  mode: 'development',

  entry: {
    main: './main.js',
    example: './example.js'
  },
  output: output(),
  resolve: resolve({
    styles: './src/styles',
    store: './src/store'
  }),

  devtool: 'inline-source-map',
  devServer: devServer({ port: 9000, contentBase: './dist' }),

  module: {
    rules: [
      rules.vue(),
      rules.javascript(),
      rules.images(),
      rules.styles('dev'),
      rules.fonts(),
      rules.pug()
    ]
  },

  plugins: [
    plugins.vue(),
    plugins.base('.'),
    plugins.jarvis(1337),
    plugins.bundleAnalyzer(),
    plugins.hmr(),
    ...plugins.html({
      files: [{
        filename: 'index.html', template: './index.html'
      }]
    }),
    plugins.env('development')
  ]
}
