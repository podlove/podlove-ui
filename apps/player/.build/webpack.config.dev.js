const path = require('path')
const { version } = require('../package.json')
const { output, resolve, devServer, rules, plugins } = require('@podlove/build')
const componentAssets = path.resolve(__dirname, '..', '..', '..', 'packages', 'components' , 'src', 'components')

const tailwind = require('./tailwind.config')

module.exports = {
  mode: 'development',

  entry: {
    example: './example/example.js',
    bootstrap: './bootstrap.js'
  },
  output: output(),

  resolve: resolve({
    store: './src/store',
    '@podlove/components': componentAssets
  }),

  devtool: 'inline-source-map',
  devServer: devServer({ port: 9000, contentBase: './dist' }),

  module: {
    rules: [
      rules.vue(),
      rules.javascript(),
      rules.images(),
      rules.style.config(rules.style.test.postcss, [
        rules.style.loader.vue(),
        rules.style.loader.css(),
        rules.style.loader.postcss({
          plugins: [
            rules.style.postcss.plugins.tailwind(tailwind),
            rules.style.postcss.plugins.autoprefixer
          ]
        })
      ]),
      rules.style.config(rules.style.test.scss, [
        rules.style.loader.vue(),
        rules.style.loader.css(),
        rules.style.loader.postcss({
          plugins: [
            rules.style.postcss.plugins.clean,
            rules.style.postcss.plugins.autoprefixer
          ]
        }),
        rules.style.loader.sass()
      ]),
    ]
  },

  plugins: [
    plugins.vue(),
    plugins.base('.'),
    plugins.bundleAnalyzer(),
    plugins.hmr(),
    plugins.html({
      filename: 'index.html',
      template: './example/index.html'
    }),
    plugins.copy([
      { from: './example/test.html' },
      { from: './example/assets', to: 'assets' }
    ]),
    plugins.env({ mode: 'development', VERSION: version })
  ]
}
