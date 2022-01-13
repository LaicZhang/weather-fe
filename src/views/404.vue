<template>
  <div class="page-404">
    <img src="@/assets/imgs/404.jpeg">
    <el-button class="btn-404" size="medium" @click="$router.push('/')">返回首页</el-button>
  </div>
</template>

<script>
  export default {
     setup() {
      
      return {

      }
    }
  }
</script>

<style scoped lang="scss">
.page-404{
  width: 100vw;
  height: 100vh;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .btn-404{
    position: fixed;
    @extend .center-h;
    bottom: 100px;
  }
}
</style>
