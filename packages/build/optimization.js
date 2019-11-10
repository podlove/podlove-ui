module.exports = (exclude = []) => ({
  runtimeChunk: {
    name: 'runtime'
  },
  splitChunks: {
    cacheGroups: {
      vendor: {
        test(mod) {
          // Only node_modules are needed
          if (!mod.context.includes('node_modules')) {
            return false
          }
          // But not node modules that contain these key words in the path
          if (exclude.some(str => mod.context.includes(str))) {
            console.log(mod.context)
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
