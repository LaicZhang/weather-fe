<template>
  <div class="layout-page">
    <div class="grid-container">
      <div class="header">
        <div class="city-name">{{city}}</div>
      </div>
      <div class="content">
        <div class="middle-container">
          <div class="middle"></div>
        </div>
        <div class="left">
          <line-marker />
        </div>
        <div class="right">
          <life-index />
        </div>
        <div class="bottom">bottom</div>
      </div>
      <div class="sidebar">sidebar</div>
    </div>
  </div>
</template>

<script>
import {getIpInfoApi} from '@/api'
import LineMarker from "@/views/echarts/LineMarker.vue";
import LifeIndex from '../echarts/LifeIndex.vue';
  export default {
    components: {
    LineMarker,
    LifeIndex
},
    data(){
      return{
        city: ''
      }
    },
    methods:{
      async getLocationByIp(){
        const {result} = await getIpInfoApi();
        this.city = (result.att+'天气可视化').replace(/,/g, "");
      }
    },
    mounted(){
      this.getLocationByIp()
      console.log('layout mounted')
    }
  };
</script>

<style lang="less" scoped>
.city-name {
  font-size: 45px;
}
  .grid-container {
    height: 100vh;
    text-align: center;
    padding: 20px;
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    background: pink;
    grid-template-areas:
      'header header header header header'
      'sidebar content content content content'
      'footer footer footer footer footer';
    grid-template-rows: 50px 150px 50px;
    grid-template-columns: 200px 200px 200px;
  }

  .header {
    grid-area: header;
    background: #fff;
    border-radius: 10px;
  }
  .content {
    grid-area: content;
    height: 80vh;
    border-radius: 10px;
    .middle-container {
      width: 100%;
      height: 200px;
      float: left;
      border-radius: 10px;
    }
    .middle {
      margin-left: 200px;
      margin-right: 200px;
      border-radius: 10px;
    }
    .left {
      background: palevioletred;
      width: 65%;
      height: 200px;
      float: left;
      font-size: 40px;
      color: #fff;
      margin-left: -100%;
      border-radius: 10px;
    }
    .right {
      width: 380px;
      height: 200px;
      background: palevioletred;
      font-size: 40px;
      float: left;
      color: #fff;
      margin-left: -380px;
      border-radius: 10px;
    }
    .bottom{
      background: #fff;
      width: 100%;
      height: 65%;
      border-radius: 10px;
      margin-top: 220px;
    }
  }
  .sidebar {
    grid-area: sidebar;
    background: #5bc0de;
    height: 80vh;
    border-radius: 10px;
  }
</style>
