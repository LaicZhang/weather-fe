<template>
  <div class="page-404">
<!--    <el-image id="not-found-img" alt="404.jpeg" src="'./../public/img/404.jpeg" />-->
    <div style="text-align: center;font-size: 50px;">
      <h1>404 not found</h1>
      <h2>it seems you're in the wrong page</h2>
    </div>
    <el-button class="btn-404" @click="$router.push('/')">返回首页</el-button>
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
  #not-found-img{
    width: 100vw;
    height: 100vh;
    display: block;
  }
  .btn-404{
    position: fixed;
    @extend .center-h;
    bottom: 100px;
  }
}
</style>
