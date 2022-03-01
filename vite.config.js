import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

let server={}
if(import.meta.PROD){
  console.log('production')
  server={
    host:'weather.laiczhang.com',
    proxy:{
      "/api":{
        target:"http://139.155.29.130/:9000",
        // changeOrigin: true,
        // secure: true,
      }
    }
  }
}else{
  console.log('dev')
  server={
    host:'localhost',
    port:8000,
    proxy:{
      "/api":{
        target:"http://localhost:9000",
        // changeOrigin: true,
        // secure: true,
      }
    }
  }
}

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
        charset: false,
        additionalData: `
          @import '@/assets/scss/mixin.scss';
          @import '@/assets/scss/comm.scss';
          @import '@/assets/scss/variable.scss';`,
      },
      // https://github.com/vitejs/vite/issues/5833
      postcss:{
        plugins:[
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: atRule => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
  },
  server,
  
  // optimizeDeps: {
  //   include: [
  //     "pinia",
  //     "vue-i18n",
  //     "lodash-es",
  //     "@vueuse/core",
  //     "@iconify/vue",
  //     "element-plus/lib/locale/lang/en",
  //     "element-plus/lib/locale/lang/zh-cn",
  //     "vxe-table/lib/locale/lang/zh-CN",
  //     "vxe-table/lib/locale/lang/en-US"
  //   ],
  //   exclude: ["@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"]
  // },
  build: {
    sourcemap: false,
    brotliSize: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    minify: false
  },
  plugins: [vue()],
  // base:'/weather-visualization-front-2/'
  base: '/'
})
