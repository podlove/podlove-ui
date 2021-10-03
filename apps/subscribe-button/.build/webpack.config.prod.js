const { output, resolve, rules, plugins, projectPaths, optimization } = require('@podlove/build')

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
    '@podlove/components': projectPaths.packages.components,
    '@podlove/clients': projectPaths.packages.clients
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
      rules.mustache()
    ],
  },

  plugins: [
    plugins.vue(),
    plugins.css(),
    plugins.minifyCss(),
    plugins.version({ version: pkg.version, name: pkg.name }),
    plugins.env({ MODE: 'production', BASE, SCRIPTS: ['button'], STYLES: ['button'], VERSION: pkg.version })
  ]
}
