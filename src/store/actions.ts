import { getIpApi, getLocationApi, getWeatherLikeApi, noticeCountApi } from '../api'

const { userInfo } = JSON.parse(localStorage.getItem('userInfo') as any)
const userId = userInfo.userId

export default {
  async getNoticeCount({ commit }: any) {
    const { count } = await noticeCountApi({ userId })
    commit('setNoticeCount', count)
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
