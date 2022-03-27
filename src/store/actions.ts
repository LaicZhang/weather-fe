import { noticeCountApi } from '../api'

export default {
  async getNoticeCount({ commit }: any) {
    const { userInfo } = JSON.parse(localStorage.getItem('userInfo') as any)
    const userId = userInfo.userId
    const { count } = await noticeCountApi({ userId })
    commit('setNoticeCount', count)
  },
}
