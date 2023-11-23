import path from 'path';
import { UserConfigExport, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import aliases from '../../.build/aliases';
import extensions from '../../.build/extensions';

const resolve = {
  extensions,
  aliases
};

const productionConfig: UserConfigExport = {
  build: {
    lib: {
      formats: ['es'],
      entry: {
        main: path.resolve(__dirname, 'src', 'main.ts'),
        share: path.resolve(__dirname, 'share.html')
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].css`
      }
    }
  },
  plugins: [vue()],
  resolve
};

const developmentConfig: UserConfigExport = {
  server: {
    port: 9000
  },

  plugins: [vue()],
  resolve
};

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return developmentConfig;
  } else {
    // command === 'build'
    return productionConfig;
  }
});
