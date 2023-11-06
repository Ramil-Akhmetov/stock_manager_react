import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      template: 'treemap',
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyse.html',
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  define: {
    __API__: JSON.stringify('http://localhost:8000/api'),
    __IS_DEV__: JSON.stringify(true),
  },
});
