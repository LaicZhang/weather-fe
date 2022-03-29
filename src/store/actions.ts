import { getIpApi, getLocationApi, noticeCountApi } from '../api'

export default {
  async getNoticeCount({ commit }: any) {
    const { userInfo } = JSON.parse(localStorage.getItem('userInfo') as any)
    const userId = userInfo.userId
    const { count } = await noticeCountApi({ userId })
    commit('setNoticeCount', count)
  },
  async getIp({ commit }: any) {
    const { ip } = await getIpApi()
    commit('setIp', ip)
  },
  async getLocation({ commit }: any) {
    const { location } = await getLocationApi()
    commit('setLocation', location)
  },
}
