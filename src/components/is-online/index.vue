<template>
  <div v-if="online" class="is-online-user" />
  <div v-else class="is-offline-user" />
</template>
<script setup>
import { useOnline } from '@vueuse/core'
const online = useOnline()
</script>
<style lang="scss" scoped>
.is-online-user {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: green;
  margin-right: 10px;
}
.is-offline-user{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
  margin-right: 10px;
}
</style>
