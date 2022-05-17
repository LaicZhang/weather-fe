<script>
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    noticeCount() {
      return this.$store.state.noticeCount
    },
  },
  async mounted() {
    this.$store.dispatch('getNoticeCount')
  },
})
</script>

<template>
  <el-badge
    :value="noticeCount === '0' ? '' : noticeCount"
    class="manager-user-badge"
    @click="noticeCount !== '0' ? $router.push({ name: 'notice' }) : ''"
  >
    <el-icon size="large">
      <bell-filled />
    </el-icon>
  </el-badge>
</template>

<style lang="scss" scoped></style>
