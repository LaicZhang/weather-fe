import axios from 'axios'
import request from '@/util/request'

// auth
export function loginApi(data = {}) {
  return request.post('/auth/login', data, { mock: false })
}
export function registerApi(data = {}) {
  return request.post('/auth/register', data, { mock: false })
}
export function changePasswordApi(data = {}) {
  return request.post('/auth/changePassword', data, { mock: false })
}
export function refreshApi(data = {}) {
  return request.post('/auth/refresh', data, { mock: false })
}

// 用户验证
export function sendCaptchaEmailApi(data = {}) {
  return request.post('/auth/captchaEmail', data, { mock: false })
}
export function sendCaptchaSmsApi(data = {}) {
  return request.post('/auth/captchaSms', data, { mock: false })
}
// 检查重复
export function checkRepeatApi(data = {}) {
  return request.post('/auth/checkRepeat', data, { mock: false })
}

// 获取当前角色的权限
export function menuPermissionApi(data = {}) {
  return request.get('/auth/getPermissionList', data, { mock: false })
}
// ip相关
export function getIpApi(data = {}) {
  return request.get('/auth/ip', data, { mock: false })
}
export function getLocationApi(data = {}) {
  return request.get('/auth/location', data, { mock: false })
}

// 通知管理
export function addNoticeApi(data = {}) {
  return request.post('/notices/add', data, { mock: false })
}
export function deleteNoticeApi(data = {}) {
  return request.post('/notices/delete', data, { mock: false })
}
export function updateNoticeApi(data = {}) {
  return request.post('/notices/update', data, { mock: false })
}
export function editNoticeApi(data = {}) {
  return request.post('/notices/edit', data, { mock: false })
}
export function noticeAllListApi(data = {}) {
  return request.get('/notices/all', data, { mock: false })
}
export function noticeListApi(data = {}) {
  return request.get('/notices/list', data, { mock: false })
}
export function noticeHaveReadApi(data = {}) {
  return request.post('/notices/haveRead', data, { mock: false })
}
export function noticeAllReadApi(data = {}) {
  return request.post('/notices/allRead', data, { mock: false })
}
export function noticeCountApi(data = {}) {
  return request.get('/notices/count', data, { mock: false })
}
export function checkRepeatNoticeApi(data = {}) {
  return request.get('/notices/checkRepeat', data, { mock: false })
}
// 推送管理
export function addPusherApi(data = {}) {
  return request.post('/pushers/add', data, { mock: false })
}
export function deletePusherApi(data = {}) {
  return request.post('/pushers/delete', data, { mock: false })
}
export function editPusherApi(data = {}) {
  return request.post('/pushers/edit', data, { mock: false })
}
export function pusherAllListApi(data = {}) {
  return request.get('/pushers/all', data, { mock: false })
}
export function pusherListApi(data = {}) {
  return request.get('/pushers/list', data, { mock: false })
}
export function immediatelyPushApi(data = {}) {
  return request.post('/pushers/immediatelyPush', data, { mock: false })
}
export function cancelPushApi(data = {}) {
  return request.get('/pushers/cancel', data, { mock: false })
}
// 推送设置管理
export function getPusherSettingsApi(data = {}) {
  return request.get('/pushers/getPusherSettings', data, { mock: false })
}
export function updatePusherSettingsApi(data = {}) {
  return request.post('/pushers/updatePusherSettings', data, { mock: false })
}

// 用户管理
export function userListApi(data = {}) {
  return request.get('/users/list', data, { mock: false })
}
export function userAllListApi(data = {}) {
  return request.get('/users/all/list', data, { mock: false })
}
export function addUserApi(data: any = {}) {
  data.action = 'add'
  return request.post('/users/operate', data, { mock: false })
}
export function editUserApi(data: any = {}) {
  data.action = 'edit'
  return request.post('/users/operate', data, { mock: false })
}
export function changeInfoApi(data = {}) {
  return request.post('/users/changeInfo', data, { mock: false })
}
export function getCaptchaEmailApi(data = {}) {
  return request.post('/users/captchaEmail', data, { mock: false })
}
export function getCaptchaSmsApi(data = {}) {
  return request.post('/users/captchaSms', data, { mock: false })
}
export function checkCaptchaApi(data = {}) {
  return request.post('/users/checkCaptcha', data, { mock: false })
}
export function getUserInfoApi(data = {}) {
  return request.get('/users/info', data, { mock: false })
}

// 删除单个或多个 `userIds:[userId,userId...]`
export function deleteUserApi(data = {}) {
  return request.post('/users/delete', data, { mock: false })
}

export function rolesAllListApi(data = {}) {
  return request.get('/roles/allList', data, { mock: false })
}

export function roleListApi(data = {}) {
  return request.get('/roles/list', data, { mock: false })
}

export function roleOperateApi(data = {}) {
  return request.post('/roles/operate', data, { mock: false })
}

export function rolePermissionApi(data = {}) {
  return request.post('/roles/update/permission', data, { mock: false })
}

// 数据展示管理
export function showDataApi(data = {}) {
  return request.get('/data/showData', data, { mock: false })
}
export function getWeatherListApi(data = {}) {
  return request.post('/data/weatherList', data, { mock: false })
}
export function getWeatherLikeApi(data = {}) {
  return request.get('/data/weatherLike', data, { mock: false })
}
// 数据获取管理
export function getDataApi(data = {}) {
  return request.get('/data/getData', data, { mock: false })
}

export function requestDataApi(data = {}) {
  return request.get('/data/request', data, { mock: false })
}

export function readConfigApi(data = {}) {
  return request.get('/data/readConfig', data, { mock: false })
}
export function writeConfigApi(data = {}) {
  return request.post('/data/writeConfig', data, { mock: false })
}

export function getAllDataListApi(data = {}) {
  return request.get('/data/getDataByIp', data, { mock: false })
}

export function getStackdataApi(data = {}) {
  return request.get('/data/stackData', data, { mock: false })
}

export function getIpInfoApi(data = {}) {
  return request.get('/data/getIpInfoByIp', data, { mock: false })
}

// 获取城市数据
// 1. 数据在哪里？laic-cdn
// 2. 何时获取？打开城市列表的时候，做个内存中缓存
// 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
export async function getCityList() {
  // 添加缓存，防止频繁加载列表数据
  if ((window as any).cityList) {
    // 缓存中已经存在数据了
    return (window as any).cityList
  }
  const ret = await axios.get('https://cdn.zyha.cn/area.json')
  // 给window对象添加了一个属性cityList
  if (ret.data)
    (window as any).cityList = ret.data

  // 把数据返回
  return ret.data
}
