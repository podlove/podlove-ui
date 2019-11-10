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
    plugins.base('.'),
    plugins.jarvis(1337),
    plugins.bundleAnalyzer(),
    plugins.hmr(),
    plugins.html({
      filename: 'index.html',
      template: './example/index.html'
    }),
    plugins.copy([
      { from: './example/test.html' },
      { from: './example/assets', to: 'assets' },
      { from: './example/episodes', to: 'episodes'},
      { from: './example/transcripts.json' }
    ]),
    plugins.env({ mode: 'development' })
  ]
}
