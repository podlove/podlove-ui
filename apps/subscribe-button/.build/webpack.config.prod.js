const path = require('path')
const { output, resolve, rules, plugins, optimization } = require('@podlove/build')
const componentAssets = path.resolve('./node_modules/@podlove/components/dist')
const clientAssets = path.resolve('./node_modules/@podlove/clients/dist')

const pkg = require('../package')

const BASE = `/`

module.exports = {
  mode: 'production',
  devtool: 'source-map',

  entry: {
    embed: './embed.js',
    list: './list'
  },
  output: output(),

  optimization: optimization(),

  resolve: resolve({
    theme: './src/theme',
    store: './src/store',
    directives: './src/directives',
    components: './src/components',
    screens: './src/screens',
    '@podlove/components': componentAssets,
    '@podlove/clients': clientAssets
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
    plugins.css(),
    plugins.minifyCss(),
    plugins.version({ version: pkg.version, name: pkg.name }),
    plugins.env({ MODE: 'production', BASE, SCRIPTS: ['button'], STYLES: ['button'], VERSION: pkg.version })
  ]
}
