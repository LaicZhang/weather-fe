<template>
  <el-dropdown @command="onLoginOut">
    <span class="el-dropdown-link user-dropdown-title">
      {{ userInfo.userName }}
      <i class="el-icon-arrow-down"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="email">{{
          userInfo.userEmail
        }}</el-dropdown-item>
        <el-dropdown-item command="out">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
export default {
  name: "CUserDropdown",
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
      if (command === "out") {
        this.$store.commit("setUserInfo", "");
        this.$store.commit('setActionList',[])
        this.$store.commit('setMenuList',[])
        this.$router.push({ name: "login" });
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
</style>