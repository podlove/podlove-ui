const { rules, plugins } = require('@podlove/build')

module.exports = {
  mode: 'production',

  entry: {
    index: './src/index.js',
    types: './src/types.js'
  },

  output: {
    libraryTarget: 'umd',
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
