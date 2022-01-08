import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import request from './utils/request'

const app = createApp(App)
app.config.globalProperties.$request = request
console.log('env', import.meta.env)
app.use(ElementPlus)
app.use(router)
app.mount('#app')