const { resolve } = require('path')
const { prepend } = require('./utils')

module.exports = ({ path = 'dist/', publicPath, prefix = '' } = {}) => ({
  path: resolve(path),
  filename: '[name].js',
  chunkFilename: prepend('[name].js', prefix),
  publicPath
})
