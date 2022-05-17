<script setup lang="ts">
// import { defineComponent } from 'vue'
import store from '@/store'
// import router from '@/router'
import GithubCorner from '@/components/github/corner.vue'

const baseCdnUrl = store.state.BASE_CDN_URL
// const toPageLogin = () => {
//   router.push({ name: 'login' })
// }
</script>

<template>
  <div class="welcome-page">
    <GithubCorner />
    <div class="word">
      <div class="title-one">
        欢迎体验
      </div>
      <div class="title-two">
        天气大数据可视化后台管理系统~
      </div>
      <div class="title-three">
        front-end by Vue3 + Vite2 + ElementPlus + Echarts5
        <br>
        back-end by Koa2 + Mongodb + Python3
        <br>
        deploy by Github + Vercel + Tencent Cloud
        <br>
        Stored by AliBaBa OSS
      </div>
    </div>
    <el-image class="welcome-img" alt="welcome" :src="`${baseCdnUrl}img/welcome.webp`" />
  </div>
</template>

<style lang="scss" scoped>
.welcome-page {
  background: #ffffff;
  position: relative;
  height: 100vh;
  .welcome-img{
    @extend .center-v;
    right: 20%;
  }
  .word {
    @extend .center-v;
    left: 10%;
    transform: translateY(-120px);
    .title-one {
      font-size: 38px;
    }
    .title-two {
      font-size: 30px;
      color: $color-active;
      padding: 20px 0;
    }
    .title-three {
      font-size: 16px;
      color: $color-sub;
      line-height: 25px;
    }
  }
}
</style>
