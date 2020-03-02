const path = require('path')
const { output, resolve, rules, plugins, optimization } = require('@podlove/build')
const componentAssets = path.resolve('./node_modules/@podlove/components/dist')

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
            rules.style.postcss.plugins.tailwind({
              theme: {
                screens: {
                  mobile: { min: '0px', max: '599px' },
                  tablet: '600px',
                  desktop: '950px'
                }
              }
            }),
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
    plugins.version(),
    plugins.base('.'),
    plugins.env('production')
  ]
}
