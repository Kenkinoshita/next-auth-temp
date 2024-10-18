/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
    include: ['src/**/*.test.*'],
  },
  resolve: {
    alias: [
      { find: '@/', replacement: '/src/' },
      { find: '@shared/', replacement: '/shared/src/' },
    ],
  },
});
