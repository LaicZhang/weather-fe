<template>
  <div id="link-marker" ref="myRef" />
</template>

<script>
import * as echarts from 'echarts'
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'LinkMarker',
  setup() {
    const myRef = ref(null)
    const initT = () => {
      const myChart = echarts.init(document.getElementById('link-marker'))
      const futureHour = JSON.parse(window.localStorage.getItem('weatherData')).futureHour
      console.log('futureHour', futureHour)
      const xAxisData = []
      const wtTempList = []
      // wtTemp1List = [],
      // wtTemp2List = []
      // futureDay.forEach(item =>{
      //   // xAxisData.push(item.week)
      //   wtTemp1List.push(item.wtTemp1)
      //   wtTemp2List.push(item.wtTemp2)
      // })
      futureHour.forEach((item) => {
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
      console.log('line-marker=>', myChart)
    }
    onMounted(() => {
      initT()
    })
    return {
      myRef,
    }
  },
})
</script>

<style lang="scss" scoped>
#link-marker {
  height:120%;
  width:100%;
  border-radius: 10px;
}
</style>
