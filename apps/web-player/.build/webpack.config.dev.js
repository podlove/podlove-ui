const { output, resolve, devServer, rules, plugins, projectPaths } = require('@podlove/build')

const version = require('../package').version

module.exports = {
  mode: 'development',

  entry: {
    embed: './src/embed.js',
    share: './src/share.js',
    'extensions/external-events': './src/extensions/external-events.js'
  },
  output: output(),

  resolve: resolve({
    '@podlove/player': projectPaths.apps.player,
    '@podlove/subscribe-button': projectPaths.apps.subscribeButton
  }),

  devtool: 'source-map',
  devServer: devServer({ port: 9000, contentBase: './dist' }),

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
      rules.html()
    ]
  },

  plugins: [
    plugins.hmr(),
    plugins.html({
      filename: 'index.html',
      template: './example/example.html',
      inject: 'head',
      sort: 'manual',
      scriptLoading: 'blocking',
      chunks: ['embed', 'extensions/external-events']
    }),
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
        baseHref: `${version}/player/`
      }
    }),
    plugins.env({
      MODE: 'development',
      BASE: '/',
      PLAYER_SCRIPTS: ['vendor', 'styles', 'bootstrap'],
      BUTTON_SCRIPTS: ['vendor', 'styles', 'list'],
      PLAYER_STYLES: ['styles'],
      BUTTON_STYLES: ['styles']
    }),
    plugins.copy([
      {
        from: projectPaths.apps.player,
        to: `${version}/player/`
      },
      {
        from: projectPaths.apps.subscribeButton,
        to: `${version}/button/`
      },
      {
        from: './example/episode.json'
      },
      {
        from: './example/config.json'
      },
      {
        from: './example/transcripts.json'
      },
      {
        from: './example/chapters.json'
      },
      {
        from: './example/playlist.json'
      },
      { from: './example/assets', to: 'assets' },
      { from: './example/test', to: 'test' }
    ])
  ]
}
