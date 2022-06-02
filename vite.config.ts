import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import Icons from 'unplugin-icons/vite'
import viteStylelint from '@amatlash/vite-plugin-stylelint'

const environment = process.env.NODE_ENV || 'development'

let server = {}
if (environment === 'development') {
  server = {
    cors: true,
    host: '0.0.0.0',
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        // secure: true
      },
    },
  }
}
else {
  server = {
    cors: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://weather-api.zyha.cn',
        changeOrigin: true,
        // secure: true
      },
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        devSourceMap: true,
      },
      scss: {
        charset: false,
        additionalData: `
          @import '@/assets/scss/mixin.scss';
          @import '@/assets/scss/comm.scss';
          @import '@/assets/scss/variable.scss';`,
      },
      // https://github.com/vitejs/vite/issues/5833
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule: any) => {
                if (atRule.name === 'charset')
                  atRule.remove()
              },
            },
          },
        ],
      },
    },
  },
  server,
  optimizeDeps: {
    include: [
      'echarts',
      'vuex',
      //     "pinia",
      //     "vue-i18n",
      // "lodash-es",
      '@vueuse/core',
      //     "@iconify/vue",
      //     "element-plus/lib/locale/lang/en",
      'element-plus/es/locale/lang/zh-cn',
      //     "vxe-table/lib/locale/lang/zh-CN",
      //     "vxe-table/lib/locale/lang/en-US"
    ],
    // exclude: ["@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"]
  },
  build: {
    sourcemap: false,
    brotliSize: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    minify: false,
    rollupOptions: {
      output: {
      //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //   chunkFileNames: (chunkInfo) => {
      //     const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
      //     const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
      //     return `js/${fileName}/[name].[hash].js`
        manualChunks(id) {
          if (id.includes('node_modules') && id.includes('element'))
            return 'element'

          else if (id.includes('node_modules') && (id.includes('echarts')))
            return 'echarts'

          else if (id.includes('node_modules') && id.includes('vue'))
            return 'vue'

          else if (id.includes('node_modules'))
            return 'vendor'
        },
      },
    },
  },
  plugins: [
    vue(),
    // chunkSplitPlugin({
    // strategy: 'unbundle',
    // }),
    Icons({ autoInstall: true, compiler: 'vue3' }),
    visualizer(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteStylelint({
      // 对某些文件排除检查
      exclude: /windicss|node_modules/,
    }),
  ],
  // base:'/weather-fe/'
  // base: './'
})
