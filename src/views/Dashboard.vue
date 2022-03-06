<template>
  <div class="dashboard-page">
    <!-- <Test/> -->
    <!-- <ScreenPage/> -->
    <Layout v-if="isLoaded" />
  </div>
  <div @click="toPageHome">
    <backToSvg :text="text" />
  </div>
</template>

<script>
  // import Test from '@/components/echarts/Test';
  import { getAllDataListApi } from '../api';
  import backToSvg from '@/components/backTo/backToSvg';
  import Layout from './dashborad/Layout.vue';
  // import ScreenPage from '@/components/echarts/ScreenPage.vue';
  export default {
    name: 'Dashboard',
    components: {
      // Test,
      // ScreenPage,
      backToSvg,
      Layout,
    },
    data() {
      return {
        text: '前往后台',
        isLoaded: false,
      };
    },
    methods: {
      toPageHome() {
        console.log('router=>', router);
        router.push('/');
      },
      today(date) {
        // 判断今天是星期几
        let day = date.getDay();
        let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return week[day];
      },
      getInervalMin(startDate, endDate) {
        // 计算时间差(单位分)
        var ms = endDate.getTime() - startDate.getTime();
        if (ms < 0) return 0;
        return Mat.floor(ms / 1000 / 60);
      },
      async getAllDataList() {
        let res = {};
        let weatherData = JSON.parse(window.localStorage.getItem('weatherData'));
        if (
          weatherData &&
          weatherData.realTime.week === this.today(new Date()) &&
          this.getInervalMin(new Date(), new Date(weatherData.queryTime)) < 30
        ) {
          console.log('localWeatherData', weatherData);
          this.isLoaded = true;
        } else {
          res = await getAllDataListApi();
          window.localStorage.setItem('weatherData', JSON.stringify(res.result));
          console.log('newWeatherData', res);
          this.isLoaded = true;
        }
      },
    },
    async created() {
      await this.getAllDataList();
      console.log('Dashboard created');
    },
  };
</script>

<style lang="scss" scoped></style>
