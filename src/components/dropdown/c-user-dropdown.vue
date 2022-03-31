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
        :src="imageUrl"
      />
      <em class="el-icon-arrow-down" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="info">
          个人信息
        </el-dropdown-item>
        <el-dropdown-item command="out">
          退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import store from '@/store'
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
      // noticeCount: 0,
    }
  },
  computed: {
    imageUrl() {
      return store.state.UPLOAD_CDN_URL + store.state.userInfo.avatar
    },
  },
  mounted() {
    console.log(import.meta)
  },
  methods: {
    // toPagenotice() {
    //   this.$router.push({
    //     name: 'notice',
    //   })
    // },
    onLoginOut(command) {
      if (command === 'out') {
        this.$store.commit('setUserInfo', '')
        this.$store.commit('setActionList', [])
        this.$store.commit('setMenuList', [])
        this.$router.push({ name: 'login' })
      }
      else if (command === 'info') {
        this.$router.push({
          name: 'info',
        })
      }
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
