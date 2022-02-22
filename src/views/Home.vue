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
  <div class="to-dashboard" @click="toPageHome">
    <svg
      class="icon"
      width="50"
      height="50"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      data-v-042ca774=""
    >
      <path
        fill="currentColor"
        d="M926.784 480H701.312A192.512 192.512 0 00544 322.688V97.216A416.064 416.064 0 01926.784 480zm0 64A416.064 416.064 0 01544 926.784V701.312A192.512 192.512 0 00701.312 544h225.472zM97.28 544h225.472A192.512 192.512 0 00480 701.312v225.472A416.064 416.064 0 0197.216 544zm0-64A416.064 416.064 0 01480 97.216v225.472A192.512 192.512 0 00322.688 480H97.216z"
      ></path>
    </svg>
    <span style="font-size:12px">返回首页</span>
    <!-- <el-button @click="toPageHome" class="to-dashboard-btn">
      <em class="el-icon-arrow-left"/>
      返回首页
    </el-button> -->
  </div>
</template>

<script>
  import { Folder } from '@element-plus/icons-vue';
  import { defineComponent } from 'vue';
  import CMenu from '../components/menu/c-menu.vue';
  import { menuPermissionApi } from '../api';
  import CBreadCrumbs from '../components/bread-crumbs/c-bread-crumbs.vue';
  import CUserDropdown from '../components/dropdown/c-user-dropdown.vue';
  export default defineComponent({
    name: 'HOME',
    components: { CMenu, CBreadCrumbs, CUserDropdown },
    data() {
      return {
        menus: this.$store.state.menuList || [],
        wrapClass: '',
        menuIconClass: ' el-icon-s-fold',
        userInfo: this.$store.state.userInfo || {},
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
      toPageHome() {
        router.push('/dashboard');
        console.log('toPageHome', this.router);
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
  .to-dashboard {
    /*  设置图片相对于浏览器窗口固定*/
    position: fixed;
    right: 180px;
    bottom: 20px;
    width: 50px;
    cursor:pointer;
    margin-right: -100px;
  }
</style>
