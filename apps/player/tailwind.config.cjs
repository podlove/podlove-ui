module.exports = {
  content: [
    './src/**/*.{vue,html}',
    '../../packages/components/src/**/*.vue',
    '../subscribe-button/src/**/*.vue'
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
  }
};
