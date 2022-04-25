<template>
  <el-table
    class="base-table"
    :data="dataList"
    size="default"
    stripe
    style="width: 100%"
  >
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
    <slot></slot>
  </el-table>
</template>

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
})
</script>
