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
import * as echarts from 'echarts'
import VueLazyLoad from 'vue3-lazyload'


const app = createApp(App)
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$store = store

app.directive('has',hasAction)

app.use(ElementPlus, { size: "small", locale: zhCn, });
app.use(router)
app.use(store)
app.use(VueLazyLoad, {})
app.use(echarts)
app.use(Directives)

console.log('env', import.meta.env)

app.mount('#app')