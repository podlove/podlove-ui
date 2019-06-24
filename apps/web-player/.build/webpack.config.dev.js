const path = require('path')

const { output, resolve, devServer, rules, plugins } = require('@podlove/build')

const version = require('../package').version
const playerAssets = path.resolve('./node_modules/@podlove/player/dist')

const BASE = `/`

module.exports = {
  mode: 'development',

  entry: {
    embed: './src/embed.js',
    share: './src/share.js',
    'extensions/external-events': './src/extensions/external-events.js'
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
    plugins.html({
      filename: 'index.html',
      template: './example/example.html',
      exclude: ['share']
    }),
    plugins.html({
      filename: 'test.html',
      template: './example/test.html',
      exclude: ['share', 'extensions/external-events']
    }),
    plugins.html({
      files: {
        styles: ['styles'],
        scripts: ['vendor', 'styles', 'runtime', 'bootstrap']
      },
      filename: 'share.html',
      template: '!!mustache-loader!./src/lib/share.mustache',
      exclude: ['embed', 'extensions/external-events'],
      base: `${BASE}${version}/`
    }),
    plugins.env({ MODE: 'development', BASE, SCRIPTS: ['vendor', 'styles', 'runtime', 'bootstrap'], STYLES: ['styles'] }),
    plugins.copy([
      {
        from: playerAssets,
        to: `${version}/`
      },
      {
        from: './example/example.json'
      },
      {
        from: './example/transcripts.json'
      },
      {
        from: './example/chapters.json'
      },
      {
        from: './example/example.jpg'
      },
      { from: './example/assets', to: 'assets' }
    ])
  ]
}
