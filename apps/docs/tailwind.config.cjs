module.exports = {
  content: [
    './src/**/*.vue',
    './src/**/*.story.vue',
    '../../packages/components/src/**/*.vue',
    '../../apps/subscribe-button/src/**/*.vue',
    '../../apps/player/src/**/*.{vue,html}'
  ],
  plugins: [],
  theme: {
    screens: {
      mobile: { min: '0px', max: '599px' },
      tablet: '600px',
      desktop: '950px'
    }
  },
  maxHeight: {
    tab: '455px'
  }
}
