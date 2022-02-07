<template>
  <el-menu
  :default-active="activePath"
    class="menu-wrap"
    :collapse="isCollapse"
    background-color="#071321"
    text-color="#ffffff"
    active-text-color="#409eff"
    router
    ref="menuRef"
  >
    <div class="menu-logo"
       :class="[calcLogoClass ? 'fold' : '']"
        @click="toIndexPage"
     >
      <div class="menu-logo-img"></div>
      <div class="menu-logo-title">Manager</div>
    </div>
    <c-tree-menu :menus="menus"></c-tree-menu>
  </el-menu>
</template>

<script  >
import { defineComponent, onMounted } from "vue";
import CTreeMenu from "./c-tree-menu.vue";

export default defineComponent({
  name: "CMenu",
  props: {
    menus: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: { CTreeMenu },
  data() {
    return {
      isCollapse: false,
      activePath: ''
    };
  },
  mounted() {
    this.activePath = this.$route.path
    // try {
    //   const path = "/" + this.$route.path.split("/").filter((item) => item)[0];
    //   this.$refs.menuRef.open(path);
    // } catch (error) {}
  },
  computed: {
    calcLogoClass() {
      return this.isCollapse;
    },
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      return this.isCollapse;
    },
    toIndexPage() {
      this.$router.push("/");
    },
  },
});
</script>
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
      background: url("../../assets/logo.png") no-repeat center/cover;
    }
    .menu-logo-title {
      font-size: 20px;
      margin-left: 10px;
      color: white;
    }
  }
}
</style>

