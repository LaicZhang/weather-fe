<template>
  <div id="area-stack" ref="myRef" />
</template>

<script setup>
import * as echarts from 'echarts'
import { defineComponent, onMounted, ref } from 'vue'
import { getStackdataApi } from '@/api'

const myRef = ref(null)
const init = async() => {
  const myChart = echarts.init(document.getElementById('area-stack'))
  const stackData = await getStackdataApi()
  console.log('init stackData', stackData)
  console.log('init arr', stackData.arr)
  const option = {
    title: {
      text: '历史天气变化',
      left: '1%',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '5%',
      right: '15%',
      bottom: '10%',
    },
    xAxis: {
      data: stackData.arr.map((item) => {
        return item[0]
      }),
    },
    yAxis: {},
    toolbox: {
      right: 10,
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
        saveAsImage: {},
      },
    },
    dataZoom: [
      {
        startValue: '2022-03-10',
      },
      {
        type: 'inside',
      },
    ],
    visualMap: {
      top: 50,
      right: 10,
      pieces: [
        {
          gt: 0,
          lte: 50,
          color: '#93CE07',
        },
        {
          gt: 50,
          lte: 100,
          color: '#FBDB0F',
        },
        {
          gt: 100,
          lte: 150,
          color: '#FC7D02',
        },
        {
          gt: 150,
          lte: 200,
          color: '#FD0100',
        },
        {
          gt: 200,
          lte: 300,
          color: '#AA069F',
        },
        {
          gt: 300,
          color: '#AC3B2A',
        },
      ],
      outOfRange: {
        color: '#999',
      },
    },
    series: {
      name: 'Beijing AQI',
      type: 'line',
      data: stackData.arr.map((item) => {
        return item[1]
      }),
      markLine: {
        silent: true,
        lineStyle: {
          color: '#333',
        },
        data: [
          {
            yAxis: 0,
          },
          {
            yAxis: 15,
          },
          {
            yAxis: 25,
          },
          {
            yAxis: 30,
          },
          {
            yAxis: 40,
          },
        ],
      },
    },
  }
  myChart.setOption(option)
  console.log('area stack=>', myChart)
}
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
  #area-stack {
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }
</style>
