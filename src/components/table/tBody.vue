<script setup lang="ts">
defineProps({
  dataColumns: {
    type: Array,
    required: true,
  },
  dataList: {
    type: Array,
    required: true,
  },
  isShowIndex: {
    type: Boolean,
    default: false,
  },
  isShowSelection: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <el-table
    class="base-table"
    :data="dataList"
    size="default"
    stripe
    style="width: 100%"
  >
    <el-table-column v-if="isShowSelection" sortable type="selection" width="55" />
    <el-table-column
      v-if="isShowIndex"
      type="index"
      width="50"
      align="center"
    />
    <el-table-column
      v-for="column in (dataColumns as any)"
      :key="column.prop"
      sortable
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :formatter="column.formatter"
      show-overflow-tooltip
    />
    <slot />
  </el-table>
</template>
