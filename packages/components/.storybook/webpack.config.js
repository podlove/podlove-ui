const path = require('path')
const autoprefixer = require('autoprefixer')
const cssClean = require('postcss-clean')

const base = path.resolve(__dirname, '..', 'src')

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                cssClean({
                  inline: ['none']
                }),
                autoprefixer()
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: { sassOptions: { includePaths: [path.resolve(base, 'theme')] } }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(base, 'components'),
      icons: path.resolve(base, 'icons'),
      defaults: path.resolve(base, 'defaults.js'),
      theme: path.resolve(base, 'theme'),
      '@': base
    }
  }
}
