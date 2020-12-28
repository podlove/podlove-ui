const webpack = require('webpack')

const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const revision = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()
  .trim()
const { prepend } = require('./utils')

const vue = () => new VueLoaderPlugin()

const css = ({ filename = '[name].css', prefix = '' } = {}) =>
  new MiniCssExtractPlugin({
    filename: prepend(filename, prefix)
  })

const minifyCss = () => new OptimizeCSSAssetsPlugin({})

const base = input =>
  new webpack.DefinePlugin({
    BASE: JSON.stringify(input)
  })

const version = inserts => {
  const banner = {
    creation: new Date().toISOString(),
    revision,
    ...(inserts || {})
  }

  return new webpack.BannerPlugin({
    banner: Object.keys(banner)
      .reduce((result, key) => [...result, `${key}: ${banner[key]}`], [])
      .join(' ')
  })
}

const html = ({ filename, template, chunks, exclude, base, files, sort, inject, params }) =>
  new HtmlWebpackPlugin({
    filename,
    template,
    chunksSortMode: sort || 'none',
    chunks,
    ...(base ? { base } : {}),
    files,
    inject: inject || true,
    excludeChunks: exclude,
    ...(params ? { templateParameters: params } : {})
  })

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

const copy = (patterns = [], options = {}) => new CopyPlugin({ patterns, options })

const friendlyErrors = () => new FriendlyErrorsPlugin()

const serviceWorkerCache = config => new SWPrecachePlugin(config)

module.exports = {
  vue,
  css,
  minifyCss,
  version,
  base,
  html,
  bundleAnalyzer,
  hmr,
  env,
  copy,
  friendlyErrors,
  serviceWorkerCache
}
