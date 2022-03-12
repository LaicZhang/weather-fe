
<template>
  <el-badge
    style="cursor: pointer"
    :value="value"
    :max="max"
    v-bind="$attrs"
    :is-dot="isDot"
  >
    <component :is="icon" />
  </el-badge>
</template>
<script setup>
const props = defineProps({
  // 说明：图标
  icon: {
    type: String,
    default: 'el-icon-bell',
  },
  // 说明：通知数量
  value: {
    type: [String, Number],
    default: 0,
  },
  color: {
    type: String,
    default: 'el-icon-bell',
  },
  // 徽章最大值
  max: {
    type: Number,
  },
  // 是否显示小圆点
  isDot: {
    type: Boolean,
    default: false,
  },
})
</script>
<style lang="scss" scoped></style>
