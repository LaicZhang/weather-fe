<template>
  <div class="feedback-page">
    <Request v-if="role > 0" />
    <Reply v-if="role === 0" />
  </div>
</template>

<script setup lang="ts">
import Request from './feedback/request.vue'
import Reply from './feedback/reply.vue'
import store from '@/store'

const role = store.state.userInfo.role
</script>

<style lang="scss" scoped>
  .feedback-page {
    padding: 30px;
    box-sizing: border-box;
    height: 100vh;
  }
</style>
