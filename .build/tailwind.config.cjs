module.exports = {
  theme: {
    extend: {
      screens: {
        mobile: { min: '0px', max: '599px' },
        tablet: '600px',
        desktop: '950px'
      },
      colors: {
        podlove: {
          primary: 'rgb(var(--podlove-color-primary) / <alpha-value>)',
          secondary: 'rgb(var(--podlove-color-secondary) / <alpha-value>)',
          'secondary-dark': 'rgb(var(--podlove-color-secondary-dark) / <alpha-value>)',
          'secondary-light': 'rgb(var(--podlove-color-secondary-light) / <alpha-value>)',
          shade: 'rgb(var(--podlove-color-shade) / <alpha-value>)'
        }
      }
    }
  },
  content: ['./src/**/*.{html,js,vue}']
}
