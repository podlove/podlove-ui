const path = require('path')

const { output, resolve, devServer, rules, plugins } = require('@podlove/build')

const version = require('../package').version
const playerAssets = path.resolve('./node_modules/@podlove/player/dist')

const BASE = `//cdn.podlove.org/web-player/`

module.exports = {
  mode: 'production',

  entry: {
    embed: './src/embed.js',
    share: './src/share.js',
    'extensions/external-events': './src/extensions/external-events.js'
  },

  output: output(),

  resolve: resolve({
    '@podlove/player': playerAssets
  }),

  module: {
    rules: [rules.javascript(), rules.scss(), rules.mustache()]
  },

  plugins: [
    plugins.html({
      files: {
        styles: ['styles'],
        scripts: ['vendor', 'styles', 'runtime', 'player']
      },
      filename: 'share.html',
      template: '!!mustache-loader!./src/lib/share.mustache',
      exclude: ['embed', 'extensions/external-events'],
      base: BASE
    }),
    plugins.version(),
    plugins.env({ MODE: 'cdn', BASE, SCRIPTS: ['vendor', 'styles', 'runtime', 'player', 'bootstrap'], STYLES: ['styles'] }),
    plugins.copy([
      {
        from: playerAssets,
        to: `${version}/`
      }
    ])
  ]
}
