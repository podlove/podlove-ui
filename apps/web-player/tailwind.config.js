export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
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
