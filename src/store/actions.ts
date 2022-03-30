import { getIpApi, getLocationApi, getWeatherLikeApi, noticeCountApi } from '../api'

const localUserInfo = localStorage.getItem('userInfo') || '{}'
const { userInfo } = JSON.parse(localUserInfo as any)
const userId = userInfo?.userId

export default {
  async getNoticeCount({ commit }: any) {
    if (userId) {
      const { count } = await noticeCountApi({ userId })
      commit('setNoticeCount', count)
    }
  },
  async getIp({ commit }: any) {
    const { ip } = await getIpApi({ userId })
    commit('setIp', ip)
  },
  async getLocation({ commit }: any) {
    const { location } = await getLocationApi({ userId })
    commit('setLocation', location)
  },
  async getCondition({ commit }: any) {
    const { condition } = await getWeatherLikeApi()
    commit('setCondition', condition)
  },
}
