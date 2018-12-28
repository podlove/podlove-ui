
const autoprefixer = require('autoprefixer')
const cssClean = require('postcss-clean')

const { prepend } = require('./utils')

const vue = () => ({
  test: /\.vue$/,
  use: 'vue-loader'
})

const javascript = () => ({
  test: /\.js?$/,
  loader: 'babel-loader',
  exclude: [/node_modules/]
})

const images = prefix => ({
  test: /\.(png|jpg|gif|jpeg|svg)$/,
  loader: 'file-loader',
  options: {
    name: prepend('[name].[ext]?[hash]', prefix)
  }
})

const styles = ({ includePaths = [] } = {}) => ({
  test: /\.scss$/,
  use: [
    {
      loader: 'vue-style-loader'
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
      options: { includePaths }
    }
  ]
})

const pug = () => ({
  test: /\.pug$/,
  loader: 'pug-plain-loader'
})

const fonts = prefix => ({
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  loader: 'file-loader',
  options: {
    name: prepend('fonts/[name].[ext]?[hash]', prefix)
  }
})

module.exports = {
  vue, javascript, images, styles, fonts, pug
}
