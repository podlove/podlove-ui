const path = require('path')
const glob = require('glob')
const { resolve, rules, plugins } = require('@podlove/build')

const base = path.resolve(__dirname, '..', 'src')

const entries = glob
  .sync('components/**/index.js', { cwd: base })
  .map(component => ({
    name: component.split('/')[1],
    file: component
  }))
  .reduce(
    (results, component) => ({
      ...results,
      [component.name]: component.file
    }),
    {
      index: path.resolve(base, 'components', 'main.js')
    }
  )

module.exports = {
  mode: 'production',

  entry: entries,

  output: {
    library: 'components',
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },

  resolve: resolve({
    components: path.resolve(base, 'components'),
    icons: path.resolve(base, 'icons'),
    defaults: path.resolve(base, 'defaults.js'),
    theme: path.resolve(base, 'theme'),
    '@': base
  }),

  devtool: 'source-maps',

  module: {
    rules: [
      rules.vue(),
      rules.javascript(),
      rules.images(),
      rules.style.config(rules.style.test.scss, [
        rules.style.loader.vue(),
        rules.style.loader.css(),
        rules.style.loader.postcss({
          plugins: [
            rules.style.postcss.plugins.clean,
            rules.style.postcss.plugins.autoprefixer
          ]
        }),
        rules.style.loader.sass({ includePaths: [path.resolve(base, 'theme')] })
      ]),
      rules.fonts()
    ]
  },

  plugins: [plugins.vue(), plugins.env({ mode: 'production' })]
}
