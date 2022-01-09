import axios from "axios";
import config from "../config";
import router from "../router";
import { ElMessage } from "element-plus";

const TOKEN_INVALID = "token认证失败，请重新登录";
const NETWORK_ERROR = "网络错误，请稍后再试";

// 创建axios实例，并配置默认请求头
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 5000,
})

// 请求拦截
service.interceptors.request.use(
    (req) => {
        // TO-DO
        const headers = req.headers;
        if(!headers.Authorization) {
            headers.Authorization='';
        }
        return req;
    }
)

// 响应拦截
service.interceptors.response.use(
    (res) => {
        // TO-DO
        const { code, data, msg} = res.data;
        if(code == '200'){
            return data;
        }else if(code == '40001'){
            ElMessage.error(TOKEN_INVALID);
            setTimeout(() => {
            router.push('/login');
            }, 5000);
            return Promise.reject(TOKEN_INVALID);
        }else{
            ElMessage.error(msg || NETWORK_ERROR);
            return Promise.reject(msg);
        }
    }
)

function request(options){
    options.method = options.method || 'post';
    if(options.method.toLowerCase() === 'get' || options.method.toLowerCase() === 'post'){
        options.params = options.data;
    }
    if(typeof options.mock !== 'undefined'){
        config.mock = options.mock;
    }
    if(config.env === "production"){
        service.defaults.baseURL = config.baseApi;
    }else{
        service.defaults.baseURL = config.mock? config.mockApi: config.baseApi;
    }
    return service(options)
}

['get', 'post', 'put', 'delete'].forEach(method => {
    request[method] = (url, data, options) => request({
        url,
        method,
        data,
        ...options
    })
})

export default request;