const path = require('path')
const { output, resolve, rules, plugins, optimization } = require('@podlove/build')
const pkg = require('../package.json')
const componentAssets = path.resolve('./node_modules/@podlove/components/dist')

const tailwind = require('./tailwind.config')

module.exports = {
  mode: 'production',

  entry: {
    bootstrap: './bootstrap.js'
  },

  output: output(),

  optimization: optimization(),

  devtool: 'source-map',

  resolve: resolve({
    store: './src/store',
    '@podlove/components': componentAssets
  }),

  module: {
    rules: [
      rules.vue(),
      rules.javascript(),
      rules.images(),
      rules.style.config(rules.style.test.postcss, [
        rules.style.loader.minify(),
        rules.style.loader.css(),
        rules.style.loader.postcss({
          plugins: [
            rules.style.postcss.plugins.tailwind(tailwind),
            rules.style.postcss.plugins.autoprefixer
          ]
        })
      ]),
      rules.pug()
    ]
  },

  plugins: [
    plugins.vue(),
    plugins.css(),
    plugins.bundleAnalyzer(),
    plugins.minifyCss(),
    plugins.version({ name: pkg.name, version: pkg.version }),
    plugins.base('.'),
    plugins.env('production')
  ]
}
