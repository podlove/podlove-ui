/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      primary: {
        100: 'var(--primary-color-100)',
        200: 'var(--primary-color-200)',
        300: 'var(--primary-color-300)',
        400: 'var(--primary-color-400)',
        500: 'var(--primary-color-500)',
        600: 'var(--primary-color-600)',
        700: 'var(--primary-color-700)',
        800: 'var(--primary-color-900)',
        900: 'var(--primary-color-900)'
      },
      secondary: {
        100: 'var(--secondary-color-100)',
        200: 'var(--secondary-color-200)',
        300: 'var(--secondary-color-300)',
        400: 'var(--secondary-color-400)',
        500: 'var(--secondary-color-500)',
        600: 'var(--secondary-color-600)',
        700: 'var(--secondary-color-700)',
        800: 'var(--secondary-color-800)',
        900: 'var(--secondary-color-900)'
      },
      complementary: {
        100: 'var(--complementary-color-100)',
        200: 'var(--complementary-color-200)',
        300: 'var(--complementary-color-300)',
        400: 'var(--complementary-color-400)',
        500: 'var(--complementary-color-500)',
        600: 'var(--complementary-color-600)',
        700: 'var(--complementary-color-700)',
        800: 'var(--complementary-color-800)',
        900: 'var(--complementary-color-900)'
      },
      gray: {
        100: 'var(--gray-color-100)',
        200: 'var(--gray-color-200)',
        300: 'var(--gray-color-300)',
        400: 'var(--gray-color-400)',
        500: 'var(--gray-color-500)',
        600: 'var(--gray-color-600)',
        700: 'var(--gray-color-700)',
        800: 'var(--gray-color-800)',
        900: 'var(--gray-color-900)'
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
