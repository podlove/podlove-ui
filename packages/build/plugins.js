const webpack = require('webpack')

const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackAutoInject = require('webpack-auto-inject-version')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Jarvis = require('webpack-jarvis')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const { prepend } = require('./utils')

const vue = () => new VueLoaderPlugin()

const css = ({ filename = '[name].css', prefix = '' } = {}) =>
  new MiniCssExtractPlugin({
    filename: prepend(filename, prefix)
  })

const minifyCss = () => new OptimizeCSSAssetsPlugin({})

const version = () => new WebpackAutoInject({ SILENT: true })

const base = input =>
  new webpack.DefinePlugin({
    BASE: JSON.stringify(input)
  })

const html = ({ filename, template, chunks, exclude, base, files, sort, inject }) =>
  new HtmlWebpackPlugin({
    filename,
    template,
    chunksSortMode: sort || 'none',
    chunks,
    base,
    files,
    inject: inject || true,
    excludeChunks: exclude
  })

const jarvis = (port = 1337) => new Jarvis({ port })

const bundleAnalyzer = () =>
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false
  })

const hmr = () => new webpack.HotModuleReplacementPlugin()

const env = (data = {}) =>
  new webpack.DefinePlugin(
    Object.keys(data).reduce(
      (result, key) =>
        Object.assign({}, result, {
          [key]: JSON.stringify(data[key])
        }),
      {}
    )
  )

const copy = (patterns = []) => new CopyPlugin(patterns)

const friendlyErrors = () => new FriendlyErrorsPlugin()

const serviceWorkerCache = config => new SWPrecachePlugin(config)

module.exports = {
  vue,
  css,
  minifyCss,
  version,
  base,
  html,
  jarvis,
  bundleAnalyzer,
  hmr,
  env,
  copy,
  friendlyErrors,
  serviceWorkerCache
}
