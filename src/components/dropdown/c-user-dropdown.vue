<template>
  <el-dropdown @command="onLoginOut">
    <span class="el-dropdown-link user-dropdown-title">
      <img
        alt="user picture"
        class="user-img"
        v-lazy="{
          src: userImage,
          error: '../../src/assets/images/default.jpg',
          loading: '../../src/assets/images/default.jpg',
        }"
      />
      <em class="el-icon-arrow-down"></em>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="email">{{ userInfo.userEmail }}</el-dropdown-item>
        <el-dropdown-item command="out">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
  export default {
    name: 'CUserDropdown',
    data() {
      return {
        userImage: '../../src/assets/images/default.jpg',
      }
    },
    props: {
      userInfo: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },
    methods: {
      onLoginOut(command) {
        if (command === 'out') {
          this.$store.commit('setUserInfo', '');
          this.$store.commit('setActionList', []);
          this.$store.commit('setMenuList', []);
          this.$router.push({ name: 'login' });
        }
      },
    },
  };
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
