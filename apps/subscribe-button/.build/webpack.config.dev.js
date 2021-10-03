const { output, resolve, devServer, rules, plugins, projectPaths } = require('@podlove/build')

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
    '@podlove/components': projectPaths.packages.components,
    '@podlove/clients': projectPaths.packages.clients
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
        }),
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
