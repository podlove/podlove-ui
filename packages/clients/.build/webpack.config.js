const { rules, plugins } = require('@podlove/build')

module.exports = {
  mode: 'production',

  entry: {
    index: './src/index.js',
    types: './src/types.js'
  },

  output: {
    library: 'components',
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },

  devtool: 'source-map',

  module: {
    rules: [
      rules.javascript(),
      rules.url()
    ]
  },

  plugins: [plugins.env({ mode: 'production' })]
}
