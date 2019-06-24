module.exports = ({ contentBase = 'dist/', port = 8080 }) => ({
  historyApiFallback: true,
  noInfo: false,
  overlay: true,
  inline: true,
  hot: true,
  disableHostCheck: true,
  host: '0.0.0.0',
  contentBase,
  port
})
