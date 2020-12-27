const path = require('path')
const { output, resolve, devServer, rules, plugins } = require('@podlove/build')
const componentAssets = path.resolve('./node_modules/@podlove/components/dist')
const clientAssets = path.resolve('./node_modules/@podlove/clients/dist')

const version = require('../package').version
const BASE = `/`

module.exports = {
  mode: 'development',

  entry: {
    list: './list.js',
    embed: './embed.js'
  },
  output: output(),

  resolve: resolve({
    theme: './src/theme',
    store: './src/store',
    components: './src/components',
    screens: './src/screens',
    '@podlove/components': componentAssets,
    '@podlove/clients': clientAssets
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
                  mobile: '340px',
                  tablet: '720px',
                  desktop: '950px'
                }
              }
            }),
            rules.style.postcss.plugins.autoprefixer
          ]
        })
      ]),
      rules.mustache()
    ]
  },

  plugins: [
    plugins.vue(),
    plugins.bundleAnalyzer(),
    plugins.hmr(),
    plugins.env({ MODE: 'development', BASE, SCRIPTS: ['button'], STYLES: [], VERSION: version }),
    plugins.html({
      filename: 'index.html',
      template: './example/index.html'
    }),
    plugins.html({
      filename: 'list.html',
      template: './example/list.html',
      chunks: ['list']
    }),
    plugins.html({
      filename: 'embed.html',
      template: './example/embed.html',
      chunks: ['embed']
    }),
    plugins.env({ mode: 'development' })
  ]
}
