<template>
  <div class="weather-info"> </div>
  <div>
    <life-index />
  </div>
</template>

<script>
  import LifeIndex from './LifeIndex.vue';
  export default {
    components: {
      LifeIndex,
    },
  };
</script>

<style lang="less" scoped>
  .weather-info {
    width: 60%;
    height: 100%;
  }
</style>
