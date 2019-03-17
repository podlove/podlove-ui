const { output, resolve, devServer, rules, plugins } = require('@podlove/build')

module.exports = {
  mode: 'development',

  entry: {
    main: './player.js',
    example: './example.js'
  },
  output: output(),

  resolve: resolve({
    styles: './src/styles',
    store: './src/store',
    directives: './src/directives'
  }),

  devtool: 'inline-source-map',
  devServer: devServer({ port: 9000, contentBase: './dist' }),

  module: {
    rules: [
      rules.vue(),
      rules.javascript(),
      rules.images(),
      rules.vueStyles({ prod: false }),
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
    plugins.env({ mode: 'development' })
  ]
}
