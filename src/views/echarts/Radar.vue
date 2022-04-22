<template>
  <div id="radar" ref="myRef" />
  <div>
    <life-index />
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import LifeIndex from './LifeIndex.vue'
import store from '@/store'

const myRef = ref(null)
const init = () => {
  const myChart = echarts.init(document.getElementById('radar') as HTMLElement)
  const realTime = store.state.weatherData.realTime
  type IndicatorInterface = Record<string, any>
  const indicator: IndicatorInterface = [
    { name: '能见度', max: 20 },
    { name: 'AQI', max: 300 },
    { name: '温度', max: 40 },
    { name: '湿度', max: 100 },
    { name: '降雨量', max: 100 },
    { name: '风速', max: 50 },
    { name: '风力', max: 10 },
  ]
  const option = {
    title: {
      text: '实时天气指数',
    },
    // legend: {
    //   data: ['Allocated Budget', 'Actual Spending'],
    // },
    radar: {
      // shape: 'circle',
      indicator,
    },
    series: [
      {
        // name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [
              realTime.wtVisibility < indicator[0].max ? realTime.wtVisibility : indicator[0].max,
              realTime.wtAqi < indicator[1].max ? realTime.wtAqi : indicator[1].max,
              realTime.wtTemp < indicator[2].max ? realTime.wtTemp : indicator[2].max,
              realTime.wtHumi < indicator[3].max ? realTime.wtHumi : indicator[3].max,
              realTime.wtRainfall < indicator[4].max ? realTime.wtRainfall : indicator[4].max,
              realTime.wtWins < indicator[5].max ? realTime.wtWins : indicator[5].max,
              realTime.wtWinp < indicator[6].max ? realTime.wtWinp : indicator[6].max,
            ],
            // name: 'Allocated Budget',
          },
        ],
      },
    ],
  }
  myChart.setOption(option)
}
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
  #radar {
    height: 60%;
    width: 95%;
    border-radius: 10px;
  }
</style>
