/** @type {import('tailwindcss').Config} */

import safelist from './safelist.js';

export default {
  content: [
    './src/**/*.{vue,html}',
    '../../packages/components/src/**/*.vue',
    '../../apps/subscribe-button/src/**/*.vue',
    '../../apps/player/src/**/*.vue',
    '../../apps/web-player/src/**/*.html'
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
