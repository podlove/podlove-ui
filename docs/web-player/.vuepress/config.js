const CopyPlugin = require('copy-webpack-plugin')

const base = process.env.BASE || '/'

module.exports = {
  title: 'Podlove Web Player 5',
  base,
  description: 'The fast, flexible and responsive podcast player powered by podlove meta data.',
  theme: 'millidocs',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['script', { type: 'text/javascript', src: `embed.js` }],
    ['script', { type: 'text/javascript', src: `extensions/external-events.js` }]
  ],
  markdown: {
    anchor: {
      permalink: false,
      permalinkBefore: false
    }
  },
  chainWebpack: config => {
    config.plugin('copy').use(CopyPlugin, [
      {
        patterns: [
          { from: `./node_modules/@podlove/web-player/dist` },
          { from: `./.vuepress/public` },
          {
            from: `./.vuepress/public/fixtures/config.json`,
            to: `./fixtures/config.json`,
            transform(content) {
              return JSON.stringify({
                ...JSON.parse(content.toString('utf8')),
                base
              })
            }
          }
        ]
      }
    ])
  },
  configureWebpack: config => {
    config.devServer = {
      https: true
    }
  }
}
