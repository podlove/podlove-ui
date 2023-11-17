const path = require('path');
const config = require('../../.build/postcss.config.cjs');

module.exports = {
  ...config,
  plugins: {
    ...config.plugins,
    tailwindcss: { config: path.resolve(__dirname, './tailwind.config.cjs') }
  }
};
