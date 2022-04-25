<template>
  <div id="area-stack" ref="myRef" />
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
import type {
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'
import type { LineSeriesOption } from 'echarts/charts'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, ref } from 'vue'
import { getStackdataApi } from '@/api'
import router from '@/router'

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
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
| LineSeriesOption
>

const myRef = ref(null)
const init = async() => {
  const element = document.getElementById('area-stack') as HTMLElement
  const myChart = echarts.init(element)
  const currentRoute = router.currentRoute.value
  const ip = currentRoute.query.ip
  const stackData = await getStackdataApi({ ip })
  const option: EChartsOption = {
    title: {
      text: '历史温度变化',
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
      data: stackData.arr.map((item: any) => {
        return item[0]
      }),
    },
    yAxis: {},
    // toolbox: {
    //   right: 10,
    //   feature: {
    //     dataZoom: {
    //       yAxisIndex: 'none',
    //     },
    //     restore: {},
    //     saveAsImage: {},
    //   },
    // },
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
          // gt: 0,
          lte: 15,
          color: '#93CE07',
        },
        {
          gt: 15,
          lte: 25,
          color: '#FBDB0F',
        },
        {
          gt: 25,
          lte: 30,
          color: '#FC7D02',
        },
        {
          gt: 30,
          lte: 35,
          color: '#FD0100',
        },
        {
          gt: 35,
          lte: 40,
          color: '#AA069F',
        },
        {
          gt: 40,
          color: '#AC3B2A',
        },
      ],
      outOfRange: {
        color: '#999',
      },
    },
    series: [
      {
        name: '最高温度',
        type: 'line',
        data: stackData.arr.map((item: any) => {
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
      {
        name: '最低温度',
        type: 'line',
        data: stackData.arr.map((item: any) => {
          return item[2]
        }),
        markLine: {
          silent: true,
          lineStyle: {
            color: '#444',
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
    ],
  }
  myChart.setOption(option)
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
