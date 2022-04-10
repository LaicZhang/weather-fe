<template>
  <div id="bar1" ref="myRef" />
</template>

<script>
import * as echarts from 'echarts'
import { defineComponent, onMounted, ref } from 'vue'
import store from '@/store'

export default defineComponent({
  name: 'Bar1',
  setup() {
    const myRef = ref(null)
    const init = () => {
      const myChart = echarts.init(document.getElementById('bar1'))
      const futureDay = store.state.weatherData.futureDay
      const week = []
      const wtTemp1List = []
      const wtTemp2List = []
      futureDay.forEach((item) => {
        week.push(item.week)
        wtTemp1List.push(item.wtTemp1)
        wtTemp2List.push(item.wtTemp2)
      })
      const option = {
        title: {
          text: '一周昼夜温差',
          // subtext: 'Fake Data',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['白天', '夜间'],
        },
        //   toolbox: {
        //     show: true,
        //     feature: {
        //       dataView: { show: true, readOnly: false },
        //       magicType: { show: true, type: ['line', 'bar'] },
        //       restore: { show: true },
        //       saveAsImage: { show: true },
        //     },
        //   },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // prettier-ignore
            data: week,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '白天',
            type: 'bar',
            data: wtTemp1List,
            //   markPoint: {
            //     data: [
            //       { type: 'max', name: 'Max' },
            //       { type: 'min', name: 'Min' },
            //     ],
            //   },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }],
            },
          },
          {
            name: '夜间',
            type: 'bar',
            data: wtTemp2List,
            //   markPoint: {
            //     data: [
            //       { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
            //       { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 },
            //     ],
            //   },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }],
            },
          },
        ],
      }
      myChart.setOption(option)
    }
    onMounted(() => {
      init()
    })
    return {
      myRef,
    }
  },
})
</script>

<style lang="scss" scoped>
  #bar1 {
    height: 120%;
    width: 100%;
    border-radius: 10px;
  }
</style>
