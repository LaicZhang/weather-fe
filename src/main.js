import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import request from "./util/request";
import storage from "./util/storage";
import hasAction from './directive/has-action'
import Directives from './directive/index';
import './assets/font/iconfont.css'
import * as echarts from 'echarts'
import * as Icons from '@element-plus/icons-vue'
// import echarts from 'echarts'
// import SocketService from '@/util/socket_service'
// import axios from 'axios'

const app = createApp(App)

// 对服务端进行websocket的连接
// SocketService.Instance.connect()
// 其他的组件  this.$socket
// app.config.globalProperties.$socket = SocketService.Instance
// axios.defaults.baseURL = 'http://127.0.0.1:9000/api/'
// 将axios挂载到Vue的原型对象上
// 在别的组件中 this.$http
// app.config.globalProperties.$http = axios
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$store = store

// 注册Icons 全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
  })

app.directive('has',hasAction)

app.use(ElementPlus, { size: "small", locale: zhCn, });
app.use(router)
app.use(store)
app.use(echarts)
app.use(Directives)

console.log('env', import.meta.env)

app.mount('#app')