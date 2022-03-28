<template>
  <template v-for="(menu, index) in menus">
    <el-sub-menu
      v-if="
        menu.children &&
          menu.children.length > 0 &&
          menu.children[0].menuType == '1'
      "
      :key="index"
      :index="menu.path.replace('%2F', '/').replace('=', '')"
      default-openeds="[0]"
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
      :index="menu.path.replace('%2F', '/').replace('=', '')"
    >
      {{
        menu.menuName
      }}
    </el-menu-item>
  </template>
  <!-- <div class="menu-item-wrap"> -->
  <!-- </div> -->
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CTreeMenu',
  components: {},
  props: {
    menus: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  mounted() {
    // console.log('CTreeMenu mounted')
    this.menus.forEach((menu) => {
      if (menu.children && menu.children.length > 0) {
        menu.children.forEach((child) => {
          child.path = this.resolvePath(child.path)
        })
      }
    })
  },
  methods: {
    resolvePath(path) {
      return path.replace('%2F', '/').replace('=', '')
    },
  },
})
</script>
<style lang="scss" scoped>
</style>
