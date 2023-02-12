const path = require('path');

module.exports = {
  plugins: {
    'postcss-color-mod-function': {},
    tailwindcss: { config: path.resolve(__dirname, './tailwind.config.cjs') },
    autoprefixer: {}
  }
};
