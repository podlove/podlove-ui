module.exports = () => ({
  runtimeChunk: {
    name: 'runtime'
  },
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /node_modules/,
        name: 'vendor',
        chunks: 'initial',
        enforce: true
      },
      styles: {
        name: 'styles',
        test: /\.(s?css|vue)$/,
        chunks: 'all',
        enforce: true,
        minChunks: 1
      }
    }
  }
})
