<template>
  <div class="SetDataConfig-page">
    <div>
      <base-count-down v-slot="timeObj" :time="countDown">
        <div class="count-down">
          <div class="icon"></div>
            {{timeObj.d}}天{{timeObj.hh}}小时{{timeObj.mm}}分钟{{timeObj.ss}}秒
          </div>
     </base-count-down>
    </div>
  </div>
</template>

<script>
import baseCountDown from '@/components/countDown/baseCountDown.vue';
export default{
  components: {
    baseCountDown
  },
}
</script>
<style lang="scss" scoped>
.SetDataConfig-page {
  padding: 30px;
  box-sizing: border-box;
  height: 100vh;
}
.search-from-wrap {
  background: white;
  margin-bottom: 18px;
}
</style>
