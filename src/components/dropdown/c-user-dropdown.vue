<template>
  <!-- <div class="banner-bell" @click="toPagenotice">
    <el-badge :value="noticeCount" class="notice-count">
      <el-icon size="large">
        <bell-filled />
      </el-icon>
    </el-badge>
  </div> -->
  <el-dropdown @command="onLoginOut">
    <span class="el-dropdown-link user-dropdown-title">
      <el-image
        lazy
        alt="user picture"
        class="user-img"
        src="/img/default.jpg"
      />
      <em class="el-icon-arrow-down" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="email">
          {{ userInfo.userEmail }}
        </el-dropdown-item>
        <el-dropdown-item command="out">
          退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
//  import defaultImage from '@/assets/images/default.jpg';
import { noticeCountApi } from '@/api'
export default {
  name: 'CUserDropdown',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      // userImage: defaultImage,
      noticeCount: 0,
    }
  },
  mounted() {
    console.log(import.meta)
    // this.noticeCount = this.$store.state.unReadCount
    // this.getNoticeCount()
  },
  methods: {
    toPagenotice() {
      this.$router.push({
        name: 'notice',
      })
    },
    onLoginOut(command) {
      if (command === 'out') {
        this.$store.commit('setUserInfo', '')
        this.$store.commit('setActionList', [])
        this.$store.commit('setMenuList', [])
        this.$router.push({ name: 'login' })
      }
    },
    async getNoticeCount() {
      const { count } = await noticeCountApi({ userId: this.$store.state.userInfo.userId })
    },
  },
}
</script>
<style scoped lang="scss">
  .user-dropdown-title {
    color: $color-active;
    margin-left: 20px;
  }
  .user-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 30px;
  }
</style>
