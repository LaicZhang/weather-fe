<script>
import { defineComponent } from 'vue'
import { getAllDataListApi } from '../api'
import store from '../store'
import router from '../router'
import Layout from './dashboard/Layout.vue'
import backToSvg from '@/components/backTo/backToSvg.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    BackToSvg: backToSvg,
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
  created() {
    this.getUrlIp()
    this.getAllDataList()
  },
  mounted() {
    if (store.state.userInfo.userId)
      this.text = '前往后台'
  },
  methods: {
    getUrlIp() {
      this.currentRoute = router.currentRoute.value
      this.ip = this.currentRoute.query.ip
    },
    toPageHome() {
      // router.push('/')
      router.go(-1)
    },
    async getAllDataList() {
      const res = await getAllDataListApi({ ip: this.ip })
      store.commit('setWeatherData', res.result)
      this.isLoaded = true
    },
  },
})
</script>

<template>
  <div v-loading="!isLoaded" class="dashboard-page">
    <Layout v-if="isLoaded" />
  </div>
  <div @click="toPageHome">
    <BackToSvg :text="text" />
  </div>
</template>

<style lang="scss" scoped>
.dashboard-page {
  height: 100vh;
  color: #F2F6FC;
}
</style>
