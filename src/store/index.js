import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import storage from '@/util/storage'
const state = {
  userInfo: storage.getItem('userInfo') || {},
  menuList: storage.getItem('menuList') || [],
  actionList: storage.getItem('actionList') || [],
  weatherData: storage.getItem('weatherData') || {},
  leaveCount: 0,
  theme: 'chalk',
  imgUrl: 'https://cdn.zyha.cn/',
}
const getters = {}
export default createStore({
  state,
  getters,
  mutations,
  actions,
})
