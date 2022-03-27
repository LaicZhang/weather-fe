const env = import.meta.env.MODE || 'production'
const EnvConfig: any = {
  development: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
  },
  production: {
    baseApi: 'https://weather-api.zyha.cn/api',
    mockApi: '/',
  },
  test: {
    baseApi: '/',
    mockApi: '/',
  },
}

export default {
  namespace: 'userInfo',
  env,
  mock: false,
  ...EnvConfig[env],
}
