import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import path from 'path';

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on(
        'file:preprocessor',
        vitePreprocessor(path.resolve('cypress', './vite.config.ts')),
      )
    },
    fileServerFolder: 'public'
  }
});
