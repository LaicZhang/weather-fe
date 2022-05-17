<script>
import { defineComponent } from 'vue'
import CTreeMenu from './c-tree-menu.vue'

export default defineComponent({
  name: 'CMenu',
  components: { CTreeMenu },
  props: {
    menus: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      isCollapse: false,
      activePath: '',
    }
  },
  computed: {
    calcLogoClass() {
      return this.isCollapse
    },
  },
  mounted() {
    this.activePath = this.$route.path
    // try {
    //   const path = "/" + this.$route.path.split("/").filter((item) => item)[0];
    //   this.$refs.menuRef.open(path);
    // } catch (error) {}
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      return this.isCollapse
    },
    toIndexPage() {
      this.$router.push('/')
    },
  },
})
</script>

<template>
  <el-menu
    ref="menuRef"
    :default-active="activePath"
    class="menu-wrap"
    :collapse="isCollapse"
    background-color="#071321"
    text-color="#ffffff"
    active-text-color="#409eff"
    router
    default-openeds="[
        '/system/userInfo', '/system/user', '/system/notice',
        '/system/pusher', '/system/feedback', 'system/share',
        'data/showData','/data/SetDataConfig'
      ]"
  >
    <div class="menu-logo" :class="[calcLogoClass ? 'fold' : '']" @click="toIndexPage">
      <div class="menu-logo-img" />
      <div class="menu-logo-title">
        Manager
      </div>
    </div>
    <CTreeMenu :menus="menus" />
  </el-menu>
</template>

<style lang="scss" scoped>
  .menu-wrap {
    height: 100%;
    overflow-y: auto;
    border: none;
    transition: all 200ms;
    .menu-logo {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &.fold {
        .menu-logo-title {
          display: none;
        }
      }
      .menu-logo-img {
        width: 40px;
        height: 40px;
        background: url('../../assets/logo.png') no-repeat center/cover;
      }
      .menu-logo-title {
        font-size: 20px;
        margin-left: 10px;
        color: #ffffff;
      }
    }
  }
</style>
