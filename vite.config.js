import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  base: '/TSReact_test/',
  plugins: [
    react(),
    tsconfigPaths() // поддержка алиасов из tsconfig.json
  ],
  resolve: {
    alias: {
      '@': '/src', // алиас на папку src
    },
  },
  server: {
    port: 3000,
    open: true, // автоматически открывает браузер
  },
});
