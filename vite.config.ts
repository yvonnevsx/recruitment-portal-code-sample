import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Vite does not expose .env values on process.env inside the config, so load them explicitly
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    css: {
      devSourcemap: true,
    },
    server: {
      port: 8000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL ? `https://${env.VITE_API_URL}` : 'https://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@features': path.resolve(__dirname, './src/features'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@utils': path.resolve(__dirname, './src/utils'),
      },
    },
  };
});
