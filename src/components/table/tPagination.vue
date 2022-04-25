<template>
  <el-pagination
    class="text-right"
    background
    layout="prev, pager, next"
    :current-page="pager.pageNum"
    :page-size="pager.pageSize"
    :total="pager.total"
    @current-change="onChangeCurrentPage"
  />
</template>
<script setup lang="ts">

defineProps({
  pager: {
    type: Object,
    required: true,
  },
})

</script>
