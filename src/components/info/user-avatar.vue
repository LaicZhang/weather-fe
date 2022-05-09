<template>
  <el-avatar :src="avatar" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import store from '@/store'

const avatar = ref('')
if (store.state.userInfo.userId)
  avatar.value = store.state.UPLOAD_CDN_URL + store.state.userInfo.avatar
else
  avatar.value = `${store.state.UPLOAD_CDN_URL}default-avatar.png`
</script>

<style lang="scss" scoped>

</style>
