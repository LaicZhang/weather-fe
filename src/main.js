import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import api from "./api";
import request from "./util/request";
import storage from "./util/storage";
import hasAction from './directive/has-action'
// import * as echarts from 'echarts'


const app = createApp(App)
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
// app.config.globalProperties.$api = api
// app.config.globalProperties.$store = store

app.directive('has',hasAction)

app.use(ElementPlus, { size: "small", locale: zhCn, });
app.use(router)
app.use(store)
// app.use(echarts)

console.log('env', import.meta.env)

app.mount('#app')