<template>
  <div v-loading="!isLoaded" class="dashboard-page">
    <Layout v-if="isLoaded" />
  </div>
  <div @click="toPageHome">
    <backToSvg :text="text" />
  </div>
</template>

<script>
import { getAllDataListApi } from '../api'
import storage from '../util/storage'
import store from '../store'
import router from '../router'
import Layout from './dashboard/Layout.vue'
import backToSvg from '@/components/backTo/backToSvg'
export default {
  name: 'Dashboard',
  components: {
    // Test,
    // ScreenPage,
    backToSvg,
    Layout,
  },
  data() {
    return {
      text: '前往登陆',
      isLoaded: false,
      currentRoute: {},
      ip: '',
    }
  },
  async created() {
    this.getUrlIp()
    await this.getAllDataList()
  },
  mounted() {
    if (storage.getItem('userInfo'))
      this.text = '前往后台'
  },
  methods: {
    getUrlIp() {
      this.currentRoute = router.currentRoute.value
      this.ip = this.currentRoute.query.ip
    },
    toPageHome() {
      router.push('/')
    },
    today(date) {
      // 判断今天是星期几
      const day = date.getDay()
      const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      return week[day]
    },
    async getAllDataList() {
      let res = {}
      let weatherData
      if (window.localStorage.getItem('weatherData') === undefined) {
        res = await getAllDataListApi({ ip: this.ip })
        const data = window.localStorage.setItem('weatherData', JSON.stringify(res.result))
        store.commit('setWeatherData', data)
        console.log('newWeatherData', res)
        this.isLoaded = true
        return
      }
      if (
        weatherData
        && weatherData.queryTime !== null && weatherData.queryTime !== undefined
          && weatherData.realTime.week === this.today(new Date())
          && (new Date() - new Date(weatherData?.queryTime)) < 600000
      ) {
        store.commit('setWeatherData', weatherData)
        console.log('localWeatherData', weatherData)
        this.isLoaded = true
      }
      else {
        res = await getAllDataListApi({ ip: this.ip })
        const data = window.localStorage.setItem('weatherData', JSON.stringify(res.result))
        store.commit('setWeatherData', data)
        console.log('newWeatherData', res)
        this.isLoaded = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-page {
  height: 100vh;
  color: #F2F6FC;
}
</style>
