<template>
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
    <span style="font-size:12px">{{text}}</span>
  </div>
</template>

<script>
export default {
    props: ['text'],
    // data() {
    //     return {
    //         text: ''
    //     }
    // },
    methods: {
        // toPageHome() {
        //     this.$router.push('/');
        // }
    },
    mounted() {
        console.log("backToSvg mounted");
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