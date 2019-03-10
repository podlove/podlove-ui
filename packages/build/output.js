const { resolve } = require('path')
const { prepend } = require('./utils')

module.exports = ({ path = 'dist/', prefix = '' } = {}) => ({
  path: resolve(path),
  filename: '[name].js',
  chunkFilename: prepend('[name].js', prefix)
})
