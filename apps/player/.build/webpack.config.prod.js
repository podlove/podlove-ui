const pkg = require('../package.json')
const { output, resolve, rules, plugins, projectPaths, optimization } = require('@podlove/build')

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
    '@podlove/components': projectPaths.packages.components
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
      rules.style.config(rules.style.test.scss, [
        rules.style.loader.minify(),
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
    plugins.css(),
    plugins.bundleAnalyzer(),
    plugins.minifyCss(),
    plugins.version({ name: pkg.name, version: pkg.version }),
    plugins.base('.'),
    plugins.env('production')
  ]
}
