<script setup lang="ts">
import * as echarts from 'echarts/core'
import type {
  GridComponentOption,
  LegendComponentOption,
  MarkLineComponentOption,
  MarkPointComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import {
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
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
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
])

type EChartsOption = echarts.ComposeOption<
| TitleComponentOption
| ToolboxComponentOption
| TooltipComponentOption
| GridComponentOption
| LegendComponentOption
| MarkLineComponentOption
| MarkPointComponentOption
| LineSeriesOption
>
const myRef = ref(null)
const init = () => {
  const element = document.getElementById('bar1') as HTMLElement
  const myChart = echarts.init(element)
  const futureDay = store.state.weatherData.futureDay
  const week: Array<string> = []
  const wtTemp1List: Array<number> = []
  const wtTemp2List: Array<number> = []
  futureDay.forEach((item: any) => {
    week.push(item.week)
    wtTemp1List.push(item.wtTemp1)
    wtTemp2List.push(item.wtTemp2)
  })
  const option: EChartsOption = {
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
        type: 'line',
        data: wtTemp1List,
        markPoint: {
          data: [
            { type: 'max', name: 'Max', symbolSize: 25 },
            { type: 'min', name: 'Min', symbolSize: 25 },
          ],
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }],
        },
      },
      {
        name: '夜间',
        type: 'line',
        data: wtTemp2List,
        markPoint: {
          data: [
            { type: 'max', name: 'Max', symbolSize: 25 },
            { type: 'min', name: 'Min', symbolSize: 25 },
          ],
        },
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
</script>

<template>
  <div id="bar1" ref="myRef" />
</template>

<style lang="scss" scoped>
  #bar1 {
    height: 120%;
    width: 100%;
    border-radius: 10px;
  }
</style>
