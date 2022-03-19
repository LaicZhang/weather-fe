<template>
  <div class="welcome-page">
    <div class="word">
      <div class="title-one">
        欢迎体验
      </div>
      <div class="title-two">
        天气大数据可视化后台管理系统
      </div>
      <div class="title-three">
        front-end by Vue3 + Vite2 + ElementPlus
        <br>
        back-end by Koa2 + Mongodb + Python
        <br>
        deploy by Github + Vercel + Tencent Cloud
        <br>
        Stored by AliBaBa OSS
      </div>
    </div>
    <el-image lazy class="welcome-img" alt="welcome" src="/img/welcome.webp" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Welcome',
  components: {},
  setup() {
    const router = useRouter()
    const toPageLogin = () => {
      router.push({ name: 'login' })
    }
    return { toPageLogin }
  },
})
</script>
<style lang="scss" scoped>
.welcome-page {
  background: white;
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
