<template>
  <div class="right-con">
    <div class="gallery-page">
      <div class="gallery-form" status-icon>
        <div class="gallery-title">
          来自{{ userName }}分享的{{ location }}天气预报
        </div>
        <el-image style="border-radius: 10px;" :src="imgUrl" />
      </div>
    </div>
  </div>
  <div @click="toRegister">
    <backToSvgVue :text="text" />
  </div>
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import store from '@/store'
import router from '@/router'
import { getShareInfoApi, openShareApi } from '@/api/share'
import backToSvgVue from '@/components/backTo/backToSvg.vue'

const text = '了解更多'
const currentRoute = router.currentRoute.value
const shareId = currentRoute.query.shareId
const toPageHome = () => {
  router.push('/')
}
const userName = ref('')
const location = ref('')
const BASE_CDN_URL = store.state.BASE_CDN_URL
const imgUrl = ref('https://img.yzcdn.cn/vant/cat.jpeg')
const getShareInfo = async() => {
  const data = await getShareInfoApi({
    shareId,
  })
  if (data) {
    imgUrl.value = `http://localhost:9000${data.shareLink}`
    userName.value = data.userName
    location.value = data.shareLocation.city
  }
}
const openShare = async() => {
  const data = await openShareApi({
    shareId,
  })
}
const toRegister = () => {
  router.push('/register')
}
onMounted(() => {
  openShare()
  getShareInfo()
})
</script>

<style lang="scss" scoped>
  .gallery-page {
    width: 100vw;
    height: 100vh;
    background-color: #f4f4f5;
    .gallery-form {
      padding: 30px;
      width: 500px;
      height: 350px;
      box-shadow: $shadow-light;
      border-radius: 10px;
      @extend .center-all;
      text-align: center;
      background-color:  #dedfe0;
      .gallery-title {
        height: 60px;
        font-size: $font-size-large;
        text-align: center;
      }
    }
  }
</style>
