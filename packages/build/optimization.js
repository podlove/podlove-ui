module.exports = ({ vendors = [], runtimeChunk } = {}) => ({
  ...(runtimeChunk
    ? {
        runtimeChunk: {
          name: runtimeChunk
        }
      }
    : {}),
  splitChunks: {
    cacheGroups: {
      vendor: {
        test(mod) {
          // Only node_modules are needed
          if (!mod.context.includes('node_modules')) {
            return false
          }

          // But not node modules that contain these key words in the path
          if (vendors.concat(vendors).some(str => mod.context.includes(str))) {
            return false
          }

          return true
        },
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
