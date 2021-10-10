const pkg = require('../package')
const { output, resolve, rules, plugins, projectPaths } = require('@podlove/build')

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

  optimization: { moduleIds: 'named', chunkIds: 'named', splitChunks: { cacheGroups: { default: false } } },

  resolve: resolve({
    '@podlove/player': projectPaths.apps.player,
    '@podlove/subscribe-button': projectPaths.apps.subscribeButton
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
    plugins.version({
      name: pkg.name,
      version: pkg.version
    }),
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
        from: projectPaths.apps.player,
        to: `${pkg.version}/player`
      },
      {
        from: projectPaths.apps.subscribeButton,
        to: `${pkg.version}/button`
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
      params: {
        baseHref: `${pkg.version}/player/`
      }
    })
  ]
}
