const { rules, plugins } = require('@podlove/build')
const pkg = require('../package.json');

module.exports = {
  mode: 'production',

  entry: './src/index.jsx',

  output: {
    filename: 'index.js',
    library: pkg.name,
    libraryTarget: "commonjs2"
  },

  devtool: 'source-maps',

  module: {
    rules: [rules.javascript()]
  },

  plugins: [plugins.env({ mode: 'production' })]
}
