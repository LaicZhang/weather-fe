<template>
  <template v-for="(menu, index) in menus">
    <el-sub-menu
      :index="menu.path"
      :key="index"
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == '1'
      "
    >
      <template #title>
        <i :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </template>
      <c-tree-menu :menus="menu.children"></c-tree-menu>
    </el-sub-menu>
    <el-menu-item 
      :key="-index" 
      v-else-if="menu.menuType !== '2'" 
      :index="menu.path" >{{
      menu.menuName
    }}</el-menu-item>
  </template>
  <!-- <div class="menu-item-wrap"> -->
  <!-- </div> -->
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CTreeMenu",
  props: {
    menus: {  
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {},
});
</script>
<style lang="scss" scoped>
</style>
