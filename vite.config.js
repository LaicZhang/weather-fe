import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: {
      "@": "/src",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@/assets/scss/mixin.scss';
          @import '@/assets/scss/comm.scss';
          @import '@/assets/scss/variable.scss';`,
      },
    },
  },
  server:{
    host:'localhost',
    port:8000,
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        changeOrigin: true,
      }
    }
  },
  plugins: [vue()]
})
