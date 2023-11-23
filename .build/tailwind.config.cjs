module.exports = {
  theme: {
    extend: {
      screens: {
        mobile: { min: '0px', max: '599px' },
        tablet: '600px',
        desktop: '950px'
      }
    }
  },
  content: ['./src/**/*.{html,js,vue}']
}
