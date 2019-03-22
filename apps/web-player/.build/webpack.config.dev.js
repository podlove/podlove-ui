const fs = require('fs')
const path = require('path')

const { output, resolve, devServer, rules, plugins } = require('@podlove/build')

const version = require('../package').version
const playerAssets = path.resolve('./node_modules/@podlove/player/dist')

const BASE = `${version}/`

module.exports = {
  mode: 'development',

  entry: {
    embed: './src/embed.js'
  },
  output: output(),

  resolve: resolve({
    '@podlove/player': playerAssets
  }),

  devtool: 'inline-source-map',
  devServer: devServer({ port: 9000, contentBase: './dist' }),

  module: {
    rules: [rules.javascript(), rules.scss(), rules.mustache()]
  },

  plugins: [
    plugins.hmr(),
    ...plugins.html({
      files: [
        {
          filename: 'index.html',
          template: './example/example.html'
        }
      ]
    }),
    plugins.env({ MODE: 'development', BASE, SCRIPTS: ['vendor', 'styles', 'runtime', 'player'], STYLES: ['styles'] }),
    plugins.copy([
      {
        from: `./node_modules/@podlove/player/dist`,
        to: BASE
      },
      {
        from: './example/example.json'
      },
      {
        from: './example/transcripts.json'
      },
      {
        from: './example/chapters.json'
      }
    ])
  ]
}
