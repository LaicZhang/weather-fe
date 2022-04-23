<template>
  <div class="mine-info-page">
    <infoCard />
    <settingCard />
  </div>
</template>

<script setup lang="ts">
import infoCard from '@/views/info/info-card.vue'
import settingCard from '@/views/info/setting-card.vue'
</script>

<style lang="scss" scoped>
.mine-info-page {
  padding: 30px;
  // box-sizing: border-box;
  height: 100vh;
}
</style>
