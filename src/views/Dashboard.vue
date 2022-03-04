<template>
  <div class="dashboard-page">
    <!-- <Test/> -->
    <!-- <ScreenPage/> -->
  </div>
  <div class="to-dashboard" @click="toPageHome">
    <svg
      class="icon"
      width="50"
      height="50"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      data-v-042ca774=""
    >
      <path
        fill="currentColor"
        d="M926.784 480H701.312A192.512 192.512 0 00544 322.688V97.216A416.064 416.064 0 01926.784 480zm0 64A416.064 416.064 0 01544 926.784V701.312A192.512 192.512 0 00701.312 544h225.472zM97.28 544h225.472A192.512 192.512 0 00480 701.312v225.472A416.064 416.064 0 0197.216 544zm0-64A416.064 416.064 0 01480 97.216v225.472A192.512 192.512 0 00322.688 480H97.216z"
      ></path>
    </svg>
    <span style="font-size:12px">返回后台</span>
  </div>
</template>

<script>
// import Test from '@/components/echarts/Test';
import { getAllDataListApi } from '../api';
import storage from '../util/storage';
// import ScreenPage from '@/components/echarts/ScreenPage.vue';
export default {
    name: "Dashboard",
    components: {
    // Test,
    // ScreenPage
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
            console.log('res',res)
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
.to-dashboard {
    /*  设置图片相对于浏览器窗口固定*/
    position: fixed;
    right: 180px;
    bottom: 20px;
    width: 50px;
    cursor:pointer;
    margin-right: -100px;
  }
</style>