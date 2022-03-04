<template>
  <div class="manager-wrap" :class="[wrapClass]">
    <div class="manager-left">
      <c-menu :menus="menus" ref="menuRef"></c-menu>
    </div>
    <div class="manager-right">
      <div class="manager-top-nav">
        <div class="manager-bread">
          <c-bread-crumbs>
            <template #left>
              <em @click="toggleMenu" class="menu-icon-fold" :class="[menuIconClass]"></em>
            </template>
          </c-bread-crumbs>
        </div>
        <div class="manager-user">
          <el-badge
            :is-dot="leaveCount > 0"
            class="manager-user-badge"
            @click="leaveCount != 0 ? $router.push({ name: 'check' }) : ''"
          >
            <em class="el-icon-bell"></em>
          </el-badge>
          <c-user-dropdown :userInfo="userInfo"></c-user-dropdown>
        </div>
      </div>
      <div class="manager-main">
        <div class="manager-main-box">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  <div @click="toPageDashboard">
    <back-to-svg :text="text" />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import CMenu from '../components/menu/c-menu.vue';
  import { menuPermissionApi } from '../api';
  import CBreadCrumbs from '../components/bread-crumbs/c-bread-crumbs.vue';
  import CUserDropdown from '../components/dropdown/c-user-dropdown.vue';
import BackToSvg from '../components/backTo/backToSvg.vue';
  export default defineComponent({
    name: 'HOME',
    components: { CMenu, CBreadCrumbs, CUserDropdown, BackToSvg },
    data() {
      return {
        menus: this.$store.state.menuList || [],
        wrapClass: '',
        menuIconClass: ' el-icon-s-fold',
        userInfo: this.$store.state.userInfo || {},
        text: '返回首页'
      };
    },
    computed: {
      leaveCount() {
        return this.$store.state.leaveCount;
      },
    },
    async mounted() {
      // const leaveCount = await leaveCountApi();
      // this.leaveCount = leaveCount;
      // this.$store.dispatch('getLeaveCount')
      // const menus = await menuListApi();
      // const menus = await menuPermissionApi()
      // this.menus = menus.menuList;
      this.getMenuPermission();
    },
    methods: {
      toggleMenu() {
        const flag = this.$refs.menuRef.toggleCollapse();
        if (flag) {
          this.wrapClass = 'fold';
          this.menuIconClass = 'el-icon-s-unfold';
        } else {
          this.wrapClass = '';
          this.menuIconClass = 'el-icon-s-fold';
        }
      },
      toPageDashboard() {
        router.push('/dashboard');
        console.log('toPageDashboard', this.router);
      },
      async getMenuPermission() {
        const { menuList, actionList } = await menuPermissionApi();
        this.$store.commit('setActionList', actionList);
        this.$store.commit('setMenuList', menuList);
      },
    },
  });
</script>
<style>
  @import '@/assets/scss/reset.scss';
  @import '@/assets/scss/base.scss';
  @import '@/assets/scss/comm.scss';
</style>
<style lang="scss" scoped>
  .manager-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100vh;
    width: 100%;
    font-size: $font-size-small;
    // 导航栏收缩样式
    &.fold {
      .manager-left {
        width: 70px;
        overflow-x: hidden;
        height: 100%;
      }
      .manager-right {
        margin-left: 70px;
      }
    }
    .manager-left {
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
      height: 100%;
      overflow-y: auto;
      background: $color-main;
      color: $color-light;
      transition: all 200ms;
      overflow-y: auto;
    }
    .manager-right {
      min-width: 1300px;
      margin-left: 200px;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      color: $color-dark;
      transition: all 200ms;
      overflow-y: auto;

      .manager-top-nav {
        height: 50px;
        background: white;
        box-shadow: $shadow-light;
        display: flex;
        padding: 0 30px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 2;
        .menu-icon-fold {
          font-size: 20px;
        }
        .manager-bread {
        }
        .manager-user {
          display: flex;
          align-items: center;
          cursor: pointer;
          .manager-user-badge {
            line-height: 1;
          }
          .el-icon-bell {
            font-size: 20px;
          }
        }
      }
      .manager-main {
        width: 100%;
        padding: 30px;
        box-sizing: border-box;
        .manager-main-box {
          height: 100%;
          box-shadow: $shadow-light;
        }
      }
    }
  }
</style>
