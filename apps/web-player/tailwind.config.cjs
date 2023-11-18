const safelist = require('./safelist.cjs');

module.exports = {
  content: [
    './src/**/*.{vue,html}',
    '../../packages/components/src/**/*.vue',
    '../../apps/subscribe-button/src/**/*.vue',
    '../../apps/player/src/**/*.vue',
    '../../apps/web-player/**/*.html'
  ],
  theme: {
    colors: {},
    screens: {
      mobile: { min: '0px', max: '599px' },
      tablet: '600px',
      desktop: '950px'
    },
    inset: {
      0: 0,
      auto: 'auto',
      8: '2rem'
    }
  },
  safelist
};