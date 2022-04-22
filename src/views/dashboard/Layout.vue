<template>
  <div class="layout-page">
    <div class="grid-container">
      <div class="header">
        <div class="city-name">
          {{ city }}
          <el-icon :size="20" style="cursor: pointer;" color="#409EFC" @click="shareCurrentWeather">
            <share />
          </el-icon>
        </div>
      </div>
      <div class="content">
        <div class="middle-container">
          <div class="middle" />
        </div>
        <div class="left">
          <line-marker />
        </div>
        <div class="right">
          <!-- <life-index /> -->
          <bar1 />
        </div>
        <div class="bottom">
          <area-stack />
        </div>
      </div>
      <div class="sidebar">
        <Radar />
        <!-- <weather-info /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core'
import Radar from '../echarts/Radar.vue'
import Bar1 from '../echarts/Bar1.vue'
import LineMarker from '@/views/echarts/LineMarker.vue'
import AreaStack from '@/views/echarts/AreaStack.vue'
import { getIpApi, getIpInfoApi } from '@/api'
import { addShareApi } from '@/api/share'
import router from '@/router'
import store from '@/store'

const city = ref('')
const currentRoute = window.location.href
const shareForeUrl = currentRoute.replace('dashboard', 'gallery')

const getIp = async() => {
  const { ip } = await getIpApi()
  store.commit('setIp', ip)
}
const shareCurrentWeather = async() => {
  const data = await addShareApi({
    ip: store.state.ip,
    userId: store.state.userInfo.userId,
  })
  if (data) {
    const { copy } = useClipboard()
    copy(`${shareForeUrl}?shareId=${data.shareId}`)
    ElMessage.success('分享链接已复制到剪切板，快去分享吧')
  }
  else {
    ElMessage.error('分享失败，请稍后再试')
  }
}
const getLocationByIp = async() => {
  const currentRoute = router.currentRoute.value
  const ip = currentRoute.query.ip
  const { result } = await getIpInfoApi({ ip })
  city.value = (`${result.att}天气可视化`).replace(/,/g, '')
}
onMounted(() => {
  getIp()
  getLocationByIp()
})
</script>

<style lang="less" scoped>
.city-name {
  font-size: 25px;
  line-height: 50px;
  color: #303133;
}
  .grid-container {
    height: 100vh;
    text-align: center;
    padding: 20px;
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    background: #F2F6FC;
    grid-template-areas:
      'header header header header header'
      'sidebar content content content content'
      'footer footer footer footer footer';
    grid-template-rows: 50px 150px 50px;
    grid-template-columns: 200px 200px 200px;
  }

  .header {
    grid-area: header;
    background: #EBEEF5;
    border-radius: 10px;
  }
  .content {
    grid-area: content;
    height: 80vh;
    border-radius: 10px;
    margin-left: 30px;
    .middle-container {
      width: 100%;
      height: 200px;
      float: left;
      border-radius: 10px;
    }
    .middle {
      margin-left: 200px;
      margin-right: 200px;
      border-radius: 10px;
    }
    .left {
      background: #DCDFE6;
      width: 65%;
      height: 200px;
      float: left;
      font-size: 40px;
      color: #fff;
      margin-left: -100%;
      border-radius: 10px;
    }
    .right {
      width: 380px;
      height: 200px;
      background: #DCDFE6;
      font-size: 40px;
      float: left;
      color: #fff;
      margin-left: -380px;
      border-radius: 10px;
    }
    .bottom{
      background: #DCDFE6;
      width: 100%;
      height: 65%;
      border-radius: 10px;
      margin-top: 220px;
    }
  }
  .sidebar {
    grid-area: sidebar;
    background: #909399;
    height: 80vh;
    width: 17vw;
    border-radius: 10px;
  }
</style>
