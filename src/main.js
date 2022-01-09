import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import request from './utils/request'
import storage from './utils/storage'
import api from './api'

const app = createApp(App)
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$api = api
console.log('env', import.meta.env)
app.use(ElementPlus)
app.use(router)
app.mount('#app')