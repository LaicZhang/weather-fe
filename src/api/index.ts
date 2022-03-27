import axios from 'axios'
import request from '@/util/request'

// auth
export const loginApi = (data = {}) => {
  return request.post('/auth/login', data, { mock: false })
}
export const registerApi = (data = {}) => {
  return request.post('/auth/register', data, { mock: false })
}
export const changePasswordApi = (data = {}) => {
  return request.post('/auth/changePassword', data, { mock: false })
}
export const refreshApi = (data = {}) => {
  return request.post('/auth/refresh', data, { mock: false })
}

// 用户验证
export const sendCaptchaEmailApi = (data = {}) => {
  return request.post('/auth/captchaEmail', data, { mock: false })
}
export const sendCaptchaSmsApi = (data = {}) => {
  return request.post('/auth/captchaSms', data, { mock: false })
}
// 检查重复
export const checkRepeatApi = (data = {}) => {
  return request.post('/auth/checkRepeat', data, { mock: false })
}

// 获取当前角色的权限
export const menuPermissionApi = (data = {}) => {
  return request.get('/auth/getPermissionList', data, { mock: false })
}
// ip相关
export const getIpApi = (data = {}) => {
  return request.get('/auth/ip', data, { mock: false })
}
export const getLocationApi = (data = {}) => {
  return request.get('/auth/location', data, { mock: false })
}

export const getDictApi = (item = '', data = {}) => {
  return request.get(`/dict?item=${item}`, data, { mock: false })
}

// 通知管理
export const addNoticeApi = (data = {}) => {
  return request.post('/notices/add', data, { mock: false })
}
export const deleteNoticeApi = (data = {}) => {
  return request.post('/notices/delete', data, { mock: false })
}
export const updateNoticeApi = (data = {}) => {
  return request.post('/notices/update', data, { mock: false })
}
export const editNoticeApi = (data = {}) => {
  return request.post('/notices/edit', data, { mock: false })
}
export const noticeAllListApi = (data = {}) => {
  return request.get('/notices/all', data, { mock: false })
}
export const noticeListApi = (data = {}) => {
  return request.get('/notices/list', data, { mock: false })
}
export const noticeHaveReadApi = (data = {}) => {
  return request.post('/notices/haveRead', data, { mock: false })
}
export const noticeCountApi = (data = {}) => {
  return request.get('/notices/count', data, { mock: false })
}

// 推送管理
export const addPusherApi = (data = {}) => {
  return request.post('/pushers/add', data, { mock: false })
}
export const deletePusherApi = (data = {}) => {
  return request.post('/pushers/delete', data, { mock: false })
}
export const editPusherApi = (data = {}) => {
  return request.post('/pushers/edit', data, { mock: false })
}
export const pusherAllListApi = (data = {}) => {
  return request.get('/pushers/all', data, { mock: false })
}
export const pusherListApi = (data = {}) => {
  return request.get('/pushers/list', data, { mock: false })
}
export const immediatelyPushApi = (data = {}) => {
  return request.post('/pushers/immediatelyPush', data, { mock: false })
}
// 推送设置管理
export const getPusherSettingsApi = (data = {}) => {
  return request.get('/pushers/getPusherSettings', data, { mock: false })
}
export const updatePusherSettingsApi = (data = {}) => {
  return request.post('/pushers/updatePusherSettings', data, { mock: false })
}

// 用户管理
export const userListApi = (data = {}) => {
  return request.get('/users/list', data, { mock: false })
}
export const userAllListApi = (data = {}) => {
  return request.get('/users/all/list', data, { mock: false })
}
export const addUserApi = (data = {}) => {
  data.action = 'add'
  return request.post('/users/operate', data, { mock: false })
}
export const editUserApi = (data = {}) => {
  data.action = 'edit'
  return request.post('/users/operate', data, { mock: false })
}
export const changeInfoApi = (data = {}) => {
  return request.post('/users/changeInfo', data, { mock: false })
}
export const getCaptchaEmailApi = (data = {}) => {
  return request.post('/users/captchaEmail', data, { mock: false })
}
export const getCaptchaSmsApi = (data = {}) => {
  return request.post('/users/captchaSms', data, { mock: false })
}
export const checkCaptchaApi = (data = {}) => {
  return request.post('/users/checkCaptcha', data, { mock: false })
}

// 删除单个或多个 `userIds:[userId,userId...]`
export const deleteUserApi = (data = {}) => {
  return request.post('/users/delete', data, { mock: false })
}

export const rolesAllListApi = (data = {}) => {
  return request.get('/roles/allList', data, { mock: false })
}

export const roleListApi = (data = {}) => {
  return request.get('/roles/list', data, { mock: false })
}

export const roleOperateApi = (data = {}) => {
  return request.post('/roles/operate', data, { mock: false })
}

export const rolePermissionApi = (data = {}) => {
  return request.post('/roles/update/permission', data, { mock: false })
}

// 数据展示管理
export const showDataApi = (data = {}) => {
  return request.get('/data/showData', data, { mock: false })
}
export const getWeatherListApi = (data = {}) => {
  return request.post('/data/WeatherList', data, { mock: false })
}
// 数据获取管理
export const getDataApi = (data = {}) => {
  return request.get('/data/getData', data, { mock: false })
}

export const requestDataApi = (data = {}) => {
  return request.get('/data/request', data, { mock: false })
}

export const getAllDataListApi = (data = {}) => {
  return request.get('/data/getDataByIp', data, { mock: false })
}

export const getStackdataApi = (data = {}) => {
  return request.get('/data/stackData', data, { mock: false })
}

export const getIpInfoApi = (data = {}) => {
  return request.get('/data/getIpInfoByIp', data, { mock: false })
}

// 获取城市数据
// 1. 数据在哪里？laic-cdn
// 2. 何时获取？打开城市列表的时候，做个内存中缓存
// 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
export const getCityList = async() => {
  // 添加缓存，防止频繁加载列表数据
  if (window.cityList) {
    // 缓存中已经存在数据了
    return window.cityList
  }
  const ret = await axios.get('https://cdn.zyha.cn/area.json')
  // 给window对象添加了一个属性cityList
  if (ret.data)
    window.cityList = ret.data

  // 把数据返回
  return ret.data
}
