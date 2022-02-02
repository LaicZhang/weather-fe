<script>
import * as echarts from 'echarts'
import { provide } from 'vue'
export default {
  name: 'app',
  setup(){
    provide('echarts',echarts)               //provide
  },
  components: {},
}
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import "@/assets/scss/reset.scss";
@import "@/assets/scss/base.scss";
@import "@/assets/scss/comm.scss";
</style>
