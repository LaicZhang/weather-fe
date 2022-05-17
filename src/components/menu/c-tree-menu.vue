<script setup lang="ts">
defineProps({
  menus: {
    type: Array,
    default: () => {
      return []
    },
  },
})
</script>

<template>
  <template v-for="(menu, index) in (menus as any)">
    <el-sub-menu
      v-if="
        menu.children
          && menu.children.length > 0
          && menu.children[0].menuType == '1'
      "
      :key="index"
      :index="menu.path"
    >
      <template #title>
        <em :class="menu.icon" />
        <span>{{ menu.menuName }}</span>
      </template>
      <c-tree-menu :menus="menu.children" />
    </el-sub-menu>
    <el-menu-item
      v-else-if="menu.menuType !== '2'"
      :key="-index"
      :index="menu.path"
    >
      {{
        menu.menuName
      }}
    </el-menu-item>
  </template>
  <!-- <div class="menu-item-wrap"> -->
  <!-- </div> -->
</template>

<style lang="scss" scoped>
</style>
