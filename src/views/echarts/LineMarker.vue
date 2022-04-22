<template>
  <div id="link-marker" ref="myRef" />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import store from '@/store'

const myRef = ref(null)
const initT = () => {
  const element = document.getElementById('link-marker') as HTMLElement
  const myChart = echarts.init(element)
  const futureHour = store.state.weatherData.futureHour
  const xAxisData: Array<number> = []
  const wtTempList: Array<number> = []
  futureHour.forEach((item: any) => {
    const datedh = item.dateYmdh.substring(5).slice(0, -3)
    xAxisData.push(datedh)
    wtTempList.push(item.wtTemp)
  })
  const option = {
    title: {
      text: '未来24小时温度变化',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {},
    // toolbox: {
    //   show: true,
    //   feature: {
    //     dataZoom: {
    //       yAxisIndex: 'none',
    //     },
    //     dataView: { readOnly: false },
    //     magicType: { type: ['line', 'bar'] },
    //     restore: {},
    //     saveAsImage: {},
    //   },
    // },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C',
      },
    },
    series: [
      // {
      //   name: '温度(白天)',
      //   type: 'line',
      //   data: wtTemp1List,
      //   markPoint: {
      //     // data: [
      //     //   { type: 'max', name: 'Max' },
      //     //   { type: 'min', name: 'Min' },
      //     // ],
      //   },
      //   markLine: {
      //     data: [{ type: 'average', name: 'Avg' }],
      //   },
      // },
      {
        name: '温度',
        type: 'line',
        data: wtTempList,
        markPoint: {
          // data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }],
        },
        markLine: {
          data: [
            { type: 'average', name: 'Avg' },
            [
              {
                symbol: 'none',
                x: '90%',
                yAxis: 'max',
              },
              {
                symbol: 'circle',
                label: {
                  position: 'start',
                  formatter: 'Max',
                },
                type: 'max',
                name: '最高点',
              },
            ],
          ],
        },
      },
    ],
  }
  myChart.setOption(option)
}
onMounted(() => {
  initT()
})
</script>

<style lang="scss" scoped>
#link-marker {
  height:120%;
  width:100%;
  border-radius: 10px;
}
</style>
