<template>
  <el-popover
    placement="bottom-start"
    trigger="hover"
  >
    <template #reference>
      <div v-if="isOnline" class="is-online-user" />
      <div v-else class="is-offline-user" />
    </template>
    <template #default>
      <div class="network-detail-content">
        <p>在线状态: {{ isOnline ? '在线' : '离线' }}</p>
        <p v-show="!isOnline">
          离线时间: {{ offlineAt }}
        </p>
        <p>数据保护: {{ saveData ? '开' : '关' }}</p>
        <p>有效带宽: {{ downlink + 'Mbps' }}</p>
        <p>网络类型: {{ effectiveType }}</p>
        <p>往返时延:  {{ rtt }}</p>
      </div>
    </template>
  </el-popover>
</template>
<script setup>
import { useNetwork } from '@vueuse/core'

const { isOnline, offlineAt, saveData, downlink, rtt, effectiveType, type } = useNetwork()
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
