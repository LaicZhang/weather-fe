import { noticeCountApi } from '../api'

export default {
  async getNoticeCount({ commit }) {
    const { userInfo } = JSON.parse(localStorage.getItem('userInfo'))
    const userId = userInfo.userId
    const count = await noticeCountApi({ userId })
    commit('setNoticeCount', count)
  },
}
