<template>
  <el-dropdown @command="onLoginOut">
    <span class="el-dropdown-link user-dropdown-title">
      <el-image
          lazy
        alt="user picture"
        class="user-img"
        src="../public/img/default.jpg"
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
//  import defaultImage from '@/assets/images/default.jpg';
  export default {
    name: 'CUserDropdown',
    data() {
      return {
        // userImage: defaultImage,
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
    mounted() {
      console.log(import.meta);
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
