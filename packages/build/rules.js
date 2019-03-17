const autoprefixer = require('autoprefixer')
const cssClean = require('postcss-clean')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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

const mustache = () => ({
  test: /\.html$/,
  loader: 'mustache-loader?minify'
})

const vueStyles = ({ includePaths = [], prod = false } = {}) => ({
  test: /\.scss$/,
  use: [
    {
      loader: prod ? MiniCssExtractPlugin.loader : 'vue-style-loader'
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
      options: { includePaths }
    }
  ]
})

const scss = ({ includePaths = [] } = {}) => ({
  test: /\.scss$/,
  use: [
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
  vue,
  javascript,
  images,
  vueStyles,
  fonts,
  pug,
  scss,
  mustache
}
