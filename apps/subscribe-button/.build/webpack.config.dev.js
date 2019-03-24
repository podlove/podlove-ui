const { output, resolve, devServer, rules, plugins } = require('@podlove/build')

module.exports = {
  mode: 'development',

  entry: {
    main: './subscribe-button.js'
    // example: './example/example.js'
  },
  output: output(),

  resolve: resolve({
<<<<<<< HEAD
    theme: './src/theme',
=======
    styles: './src/styles',
>>>>>>> Add basic subscribe button folder
    store: './src/store',
    directives: './src/directives'
  }),

  devtool: 'inline-source-map',
  devServer: devServer({ port: 9000, contentBase: './dist' }),

  module: {
<<<<<<< HEAD
    rules: [
      rules.vue(),
      rules.javascript(),
      rules.images(),
      rules.vueStyles({ prod: false }),
      rules.pug()
    ]
=======
    rules: [rules.vue(), rules.javascript(), rules.images(), rules.vueStyles({ prod: false }), rules.pug()]
>>>>>>> Add basic subscribe button folder
  },

  plugins: [
    plugins.vue(),
    plugins.base('.'),
    plugins.jarvis(1337),
    plugins.bundleAnalyzer(),
    plugins.hmr(),
<<<<<<< HEAD
    plugins.html({
      filename: 'index.html',
      template: './example/index.html'
=======
    ...plugins.html({
      files: [
        {
          filename: 'index.html',
          template: './example/index.html'
        }
      ]
>>>>>>> Add basic subscribe button folder
    }),
    plugins.env({ mode: 'development' })
  ]
}
