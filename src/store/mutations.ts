import storage from '@/util/storage'

export default {
  setUserInfo(state: any, userInfo: any) {
    state.userInfo = userInfo
    storage.setItem('userInfo', userInfo)
  },
  setMenuList(state: any, list: any) {
    state.menuList = list
    storage.setItem('menuList', list)
  },
  setActionList(state: any, list: any) {
    state.actionList = list
    storage.setItem('actionList', list)
  },
  setWeatherData(state: any, data: any) {
    state.weatherData = data
    storage.setItem('weatherData', data)
  },
  // setLeaveCount(state, count) {
  //   state.leaveCount = count
  // },
  setNoticeCount(state: any, count: number | string) {
    state.noticeCount = count
  },
  setIp(state: any, ip: string) {
    state.ip = ip
  },
  setLocation(state: any, location: string) {
    state.location = location
  },
  setCondition(state: any, condition: string) {
    state.condition = condition
  },
  changeTheme(state: any) {
    if (state.theme === 'chalk')
      state.theme = 'vintage'
    else
      state.theme = 'chalk'
  },
}
