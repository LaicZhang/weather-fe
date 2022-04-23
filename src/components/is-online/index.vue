<template>
  <el-popover
    placement="bottom-start"
    trigger="hover"
    width="11vw"
  >
    <template #reference>
      <div v-if="isOnline" class="is-online-user" />
      <div v-else class="is-offline-user" />
    </template>
    <template #default>
      <div class="network-detail-content">
        <p>在线状态: {{ isOnline ? '在线' : '离线' }}</p>
        <p v-show="!isOnline">
          离线时间: {{ offlineAtTimeWithFormat }}
        </p>
        <p>数据保护: {{ saveData ? '开' : '关' }}</p>
        <p>有效带宽: {{ downlink + 'Mbps' }}</p>
        <p>网络类型: {{ effectiveType }}</p>
        <p>往返时延:  {{ rtt }}</p>
      </div>
    </template>
  </el-popover>
</template>
<script setup lang="ts">
import { useNetwork } from '@vueuse/core'
import { dayjs } from 'element-plus'
import { ref } from 'vue'

const { isOnline, saveData, offlineAt, downlink, rtt, effectiveType } = useNetwork()
const offlineAtTimeWithFormat = ref(dayjs(offlineAt.value).format('MM-DD HH:mm:ss'))
</script>
<style lang="scss" scoped>
.is-online-user {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #008000;
  margin-right: 10px;
}
.is-offline-user{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff0000;
  margin-right: 10px;
}
.network-detail-content{
  width: 12vw;
}
</style>
