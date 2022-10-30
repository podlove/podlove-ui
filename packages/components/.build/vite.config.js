const path = require('path');
const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, '..', 'src', 'components', 'main.js'),
      name: 'PodloveUiComponents',
      fileName: (format) => `podlove-ui-components.${format}.js`,
      type: 'modules'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
});
