// vite.config.ts

import react from '@vitejs/plugin-react'

import tsconfigPaths from 'vite-tsconfig-paths'

import { defaultExclude, defineConfig } from 'vitest/config'

const excludedFiles = [...defaultExclude, '**/**.d.**']

const coverageExcludedFiles = excludedFiles.concat('**/__tests__/**')

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  test: {
    environment: 'jsdom',

    setupFiles: './vitest.setup.ts',

    globals: true,

    reporters: ['html'],

    coverage: {
      provider: 'v8',

      reporter: ['text', 'lcov', 'html'],

      all: true,

      extension: ['.ts', '.tsx'],

      exclude: coverageExcludedFiles
    },

    exclude: excludedFiles
  }
})
