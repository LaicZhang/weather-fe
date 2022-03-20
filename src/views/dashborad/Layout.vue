<template>
  <div class="layout-page">
    <div class="grid-container">
      <div class="header">
        <div class="city-name">
          {{ city }}
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

<script>
import LifeIndex from '../echarts/LifeIndex.vue'
import Radar from '../echarts/Radar.vue'
import Bar1 from '../echarts/Bar1.vue'
import LineMarker from '@/views/echarts/LineMarker.vue'
import AreaStack from '@/views/echarts/AreaStack.vue'
import { getIpInfoApi } from '@/api'
// import WeatherInfo from '../echarts/weatherInfo.vue';
export default {
  components: {
    LineMarker,
    LifeIndex,
    Radar,
    Bar1,
    AreaStack,
    // WeatherInfo
  },
  data() {
    return {
      city: '',
    }
  },
  mounted() {
    this.getLocationByIp()
    console.log('layout mounted')
  },
  methods: {
    async getLocationByIp() {
      const { result } = await getIpInfoApi()
      this.city = (`${result.att}天气可视化`).replace(/,/g, '')
      // this.city = this.$store.state.weatherData
    },
  },
}
</script>

<style lang="less" scoped>
.city-name {
  font-size: 25px;
  line-height: 50px;
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
