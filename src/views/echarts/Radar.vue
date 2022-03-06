<template>
  <div id="radar" ref="myRef"></div>
  <div>
    <life-index />
  </div>
</template>

<script>
  import * as echarts from 'echarts';
  import { defineComponent, ref, onMounted } from 'vue';
  import LifeIndex from './LifeIndex.vue';
  export default defineComponent({
    name: 'radar',
    components: {
      LifeIndex,
    },
    setup() {
      const myRef = ref(null);
      const init = () => {
        const myChart = echarts.init(document.getElementById('radar'));
        let realTime = JSON.parse(window.localStorage.getItem('weatherData')).realTime;
        console.log('radar realTime', realTime);
        let option = {
          title: {
            text: '今日实时天气指数',
          },
          // legend: {
          //   data: ['Allocated Budget', 'Actual Spending'],
          // },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '风力', max: 10 },
              { name: 'AQI', max: 300 },
              { name: '温度', max: 40 },
              { name: '湿度', max: 100 },
              { name: '降雨量', max: 100 },
              { name: '风速', max: 80 },
              { name: '能见度', max: 10 },
            ],
          },
          series: [
            {
              // name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [
                    realTime.wtWinp,
                    realTime.wtAqi,
                    realTime.wtTemp,
                    realTime.wtHumi,
                    realTime.wtRainfall,
                    realTime.wtWins,
                    realTime.wtVisibility,
                  ],
                  // name: 'Allocated Budget',
                },
              ],
            },
          ],
        };
        myChart.setOption(option);
        console.log('barYCategory=>', myChart);
      };
      onMounted(() => {
        init();
      });
      return {
        myRef,
      };
    },
  });
</script>

<style lang="scss" scoped>
  #radar {
    height: 60%;
    width: 100%;
  }
</style>
