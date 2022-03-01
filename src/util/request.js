import axios from "axios";
import config from "../config";
import router from "../router";
import storage from "../util/storage";
import { ElMessage } from "element-plus";

const TOKEN_INVALID = "Token认证失败，请重新登录";
const NETWORK_ERROR = "网络请求异常，请稍后重试";

const baseURL = config.baseURL;

const service = axios.create({
  baseURL,
  timeout: 3000,
});

// 请求拦截
service.interceptors.request.use((req) => {
  const headers = req.headers;
  const userInfo = storage.getItem("userInfo");
  if (!headers.Authorization) {
    headers.Authorization = "Bearer " + userInfo.token;
  }
  return req;
});
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code === 200) {
    return data;
  } else if (code === 500001) {
    ElMessage.error({ message: TOKEN_INVALID });
    setTimeout(() => {
      router.push({ name: "login" });
    }, 1500);
    return Promise.reject(TOKEN_INVALID);
  } else {
    const message = msg || NETWORK_ERROR;
    ElMessage.error({ message });
    return Promise.reject(message);
  }
});
/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
 function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
      options.params = options.data;
  }
  let isMock = config.mock;
  if (typeof options.mock != 'undefined') {
      isMock = options.mock;
  }
  if (config.env === 'production') {
      service.defaults.baseURL = config.baseApi
  } else {
      service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  return service(options)
}
// 支持 request.get ...
["get", "post", "put", "delete", "patch"].forEach((method) => {
  request[method] = (url, data, options) => {
    return request({
      url,
      data,
      method,
      ...options,
    });
  };
});
export default request;
