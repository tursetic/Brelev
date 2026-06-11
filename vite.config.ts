import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // ★★★ 아래 base 설정은 절대로 허가 없이 지우지 마세요! github 배포와 관련 있습니다.
  base: '/Brelev/', 
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
