<script>
export default{
  name: 'login',
  methods:{
    goHome(){
      this.$router.push('/')
    }
  },
  mounted(){
    console.log('login mounted')
    /*
    this.$request({
      method: 'post',
      url: '/login',
      data:{
        name: 'laic'
      },
    }).then(res=>{
      console.log(res)
    })
    */
   this.$request.post('/login',{
        name: 'laic'
   }).then(res=>{
     console.log(res)
   })
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <el-button @click="goHome">come back Home</el-button>
  </div>
</template>

<style scoped>

</style>
