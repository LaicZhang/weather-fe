import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import storage from '@/util/storage'

const state = {
  userInfo: storage.getItem('userInfo') || {},
  menuList: storage.getItem('menuList') || [],
  actionList: storage.getItem('actionList') || [],
  weatherData: storage.getItem('weatherData') || {},
  noticeCount: '0',
  theme: 'chalk',
  BASE_CDN_URL: 'https://cdn.zyha.cn/',
  UPLOAD_CDN_URL: 'https://cdn.zyha.cn/public/upload/',
  SVG_CDN_URL: 'https://cdn.zyha.cn/svg/',
  ip: '',
  location: '',
  condition: '',
}
const getters = {}
export default createStore({
  state,
  getters,
  mutations,
  actions,
})
