<template>
  <div id="link-marker" ref="myRef" style="height:100%;width:100%"> </div>
</template>

<script>
  import * as echarts from 'echarts';
  import { defineComponent, ref, onMounted } from 'vue';
  export default defineComponent({
    name: 'link-marker',
    setup() {
      const myRef = ref(null);
      const initT = () => {
        const myChart = echarts.init(document.getElementById('link-marker'));
        let option = {
          title: {
            text: 'Temperature Change in the Coming Week',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {},
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none',
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C',
            },
          },
          series: [
            {
              name: 'Highest',
              type: 'line',
              data: [10, 11, 13, 11, 12, 12, 9],
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' },
                ],
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }],
              },
            },
            {
              name: 'Lowest',
              type: 'line',
              data: [1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }],
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
        };
        myChart.setOption(option);
        console.log('myChart', myChart);
      };
      onMounted(() => {
        initT();
      });
      return {
        myRef,
      };
    },
  });
</script>

<style>
</style>
