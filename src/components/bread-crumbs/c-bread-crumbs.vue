<template>
  <div class="bread-crumbs">
    <div class="bread-crumbs-left">
      <slot name="left" />
    </div>
    <el-breadcrumb>
      <template v-for="(match, index) in matched">
        <el-breadcrumb-item v-if="index === 0" :key="match.meta.title" :to="{ path: '/' }">
          {{
            match.meta.title
          }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else :key="index">
          {{ match.meta.title }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script  >
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'CBreadCrumbs',
  setup() {
    const route = useRoute()
    const matched = ref([])
    watchEffect(() => {
      matched.value = route.matched
    })
    return { matched }
  },
})
</script>
<style lang="scss" scoped>
.bread-crumbs {
  display: flex;
  align-items: center;
  .bread-crumbs-left {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
