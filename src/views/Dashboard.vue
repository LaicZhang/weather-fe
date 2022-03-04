<template>
  <div class="dashboard-page">
    <!-- <Test/> -->
    <!-- <ScreenPage/> -->
  </div>
  <div @click="toPageHome">
    <backToSvg :text="text" />
  </div>
</template>

<script>
// import Test from '@/components/echarts/Test';
import { getAllDataListApi } from '../api';
import backToSvg from '@/components/backTo/backToSvg';
// import ScreenPage from '@/components/echarts/ScreenPage.vue';
export default {
    name: "Dashboard",
    components: {
    // Test,
    // ScreenPage,
    backToSvg,
    },
    data(){
      return{
        text: '返回后台'
      }
    },
    methods: {
        toPageHome() {
            console.log('router',router)
            router.push("/");
        },
        today(date) { // 判断今天是星期几
            let day = date.getDay();
            let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            return week[day];
        },
        async getAllDataList() {
          let res = {}
          let weatherData = JSON.parse(window.localStorage.getItem('weatherData'))
          if(weatherData && weatherData.realTime.week === this.today(new Date())) {
            console.log('localWeatherData', weatherData);
          }else{
            res = await getAllDataListApi();
            window.localStorage.setItem('weatherData',JSON.stringify(res.result));
            console.log('newWeatherData',res)
          }
        }
    },
    mounted() {
        this.getAllDataList();
        console.log("Dashboard mounted");
    }
}
</script>

<style lang="scss" scoped>

</style>