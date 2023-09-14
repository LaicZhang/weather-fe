<script setup lang="ts">
import * as echarts from 'echarts/core'
import type {
  DataZoomComponentOption,
  GridComponentOption,
  MarkLineComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
  VisualMapComponentOption,
} from 'echarts/components'
import {
  DataZoomComponent,
  GridComponent,
  MarkLineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components'
import type { LineSeriesOption } from 'echarts/charts'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, ref } from 'vue'
import store from '@/store'

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent,
  MarkLineComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
])
type EChartsOption = echarts.ComposeOption<
| TitleComponentOption
| ToolboxComponentOption
| TooltipComponentOption
| GridComponentOption
| VisualMapComponentOption
| DataZoomComponentOption
| MarkLineComponentOption
| LineSeriesOption
>
const myRef = ref(null)
function initT() {
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
  const option: EChartsOption = {
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

<template>
  <div id="link-marker" ref="myRef" />
</template>

<style lang="scss" scoped>
#link-marker {
  height:120%;
  width:100%;
  border-radius: 10px;
}
</style>
