const path = require('path')
const { rules, plugins } = require('@podlove/build')

const resolve = filename => path.resolve(__dirname, '..', `${filename}.js`)
const entries = [
  'chapters',
  'color',
  'detect',
  'dom',
  'helper',
  'keyboard',
  'localstorage',
  'location',
  'math',
  'predicates',
  'request',
  'sandbox',
  'search',
  'throttle',
  'time',
  'url',
  'useragent'
]

module.exports = {
  mode: 'production',

  entry: entries.reduce(
    (result, entry) => ({
      ...result,
      [entry]: resolve(entry)
    }),
    {}
  ),

  output: {
    library: 'utils',
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },

  devtool: 'source-map',

  module: {
    rules: [rules.javascript()]
  },

  plugins: [plugins.env({ mode: 'production' })]
}
