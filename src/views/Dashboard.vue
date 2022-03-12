<template>
  <div v-loading="!isLoaded" class="dashboard-page">
    <!-- <Test/> -->
    <!-- <ScreenPage/> -->
    <Layout v-if="isLoaded" />
  </div>
  <div @click="toPageHome">
    <backToSvg :text="text" />
  </div>
</template>

<script>
// import Test from '@/components/echarts/Test';
import { getAllDataListApi } from '../api'
import storage from '../util/storage'
import Layout from './dashborad/Layout.vue'
import backToSvg from '@/components/backTo/backToSvg'
// import ScreenPage from '@/components/echarts/ScreenPage.vue';
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
    }
  },
  async created() {
    await this.getAllDataList()
    console.log('Dashboard created')
  },
  mounted() {
    if (storage.getItem('userInfo'))
      this.text = '前往后台'

    console.log('Dashboard mounted')
  },
  methods: {
    toPageHome() {
      console.log('dashboard router=>', router)
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
      const weatherData = JSON.parse(window.localStorage.getItem('weatherData'))
      const ms = new Date() - new Date(weatherData?.queryTime)
      console.log('ms=>', ms)
      if (
        weatherData
          && weatherData.realTime.week === this.today(new Date())
          && ms < 600000
      ) {
        console.log('localWeatherData', weatherData)
        this.isLoaded = true
      }
      else {
        res = await getAllDataListApi()
        window.localStorage.setItem('weatherData', JSON.stringify(res.result))
        console.log('newWeatherData', res)
        this.isLoaded = true
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
