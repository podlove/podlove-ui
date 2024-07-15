/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', '../../packages/components/src/**/*.vue'],
  theme: {
    colors: {
      primary: {
        100: 'rgb(var(--primary-color-100))',
        200: 'rgb(var(--primary-color-200))',
        300: 'rgb(var(--primary-color-300))',
        400: 'rgb(var(--primary-color-400))',
        500: 'rgb(var(--primary-color-500))',
        600: 'rgb(var(--primary-color-600))',
        700: 'rgb(var(--primary-color-700))',
        800: 'rgb(var(--primary-color-900))',
        900: 'rgb(var(--primary-color-900))'
      },
      complementary: {
        100: 'rgb(var(--complementary-color-100))',
        200: 'rgb(var(--complementary-color-200))',
        300: 'rgb(var(--complementary-color-300))',
        400: 'rgb(var(--complementary-color-400))',
        500: 'rgb(var(--complementary-color-500))',
        600: 'rgb(var(--complementary-color-600))',
        700: 'rgb(var(--complementary-color-700))',
        800: 'rgb(var(--complementary-color-800))',
        900: 'rgb(var(--complementary-color-900))'
      },
      gray: {
        100: 'rgb(var(--gray-color-100))',
        200: 'rgb(var(--gray-color-200))',
        300: 'rgb(var(--gray-color-300))',
        400: 'rgb(var(--gray-color-400))',
        500: 'rgb(var(--gray-color-500))',
        600: 'rgb(var(--gray-color-600))',
        700: 'rgb(var(--gray-color-700))',
        800: 'rgb(var(--gray-color-800))',
        900: 'rgb(var(--gray-color-900))'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    fontFamily: {
      sans: [
        'Roboto',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      mono: [
        'Roboto Mono',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace'
      ]
    },
    inset: {
      0: 0,
      auto: 'auto',
      100: '100%'
    },
    extend: {
      spacing: {
        96: '24rem',
        128: '32rem'
      },
      width: {
        app: '1024px'
      }
    }
  },
  variants: {
    visibility: ['responsive', 'hover', 'focus', 'group-hover']
  },
  plugins: []
};
