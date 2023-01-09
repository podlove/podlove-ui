module.exports = {
  content: ['./src/**/*.vue', './src/**/*.story.vue', './.vitebook/App.vue'],
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
