import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/geoserver': {
        target: 'https://eledata.koelsa.or.kr',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
