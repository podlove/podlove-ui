const path = require('path')

const { output, resolve, rules, plugins } = require('@podlove/build')

const version = require('../package').version
const playerAssets = path.resolve('./node_modules/@podlove/player/dist')
const subscribeButtonAssets = path.resolve('./node_modules/@podlove/subscribe-button/dist')

const BASE = `//cdn.podlove.org/web-player/5.x/`

module.exports = {
  mode: 'production',

  entry: {
    embed: './src/embed.js',
    share: './src/share.js',
    polyfills: './src/polyfills.js',
    'extensions/external-events': './src/extensions/external-events.js'
  },

  output: output(),

  optimization: { namedModules: true, namedChunks: true, splitChunks: { cacheGroups: { default: false } } },

  resolve: resolve({
    '@podlove/player': playerAssets,
    '@podlove/subscribe-button': subscribeButtonAssets
  }),

  module: {
    rules: [
      rules.javascript(),
      rules.style.config(rules.style.test.scss, [
        rules.style.loader.css(),
        rules.style.loader.postcss({
          plugins: [
            rules.style.postcss.plugins.clean,
            rules.style.postcss.plugins.autoprefixer
          ]
        }),
        rules.style.loader.sass()
      ]),
      rules.mustache(),
      rules.html({
        minimize: true
      })
    ]
  },

  plugins: [
    plugins.version(),
    plugins.env({
      MODE: 'cdn',
      BASE,
      PLAYER_SCRIPTS: ['vendor', 'styles', 'bootstrap'],
      BUTTON_SCRIPTS: ['vendor', 'styles', 'list'],
      PLAYER_STYLES: ['styles'],
      BUTTON_STYLES: ['styles']
    }),
    plugins.copy([
      {
        from: playerAssets,
        to: `${version}/player`
      },
      {
        from: subscribeButtonAssets,
        to: `${version}/button`
      }
    ]),
    plugins.html({
      files: {
        styles: ['styles'],
        scripts: ['vendor', 'styles', 'bootstrap']
      },
      filename: 'share.html',
      template: '!!mustache-loader!./src/player/share.mustache',
      exclude: ['embed', 'extensions/external-events'],
      root: '',
      base: `${version}/player/`
    })
  ]
}
