<template>
  <div class="menu-page">
    <div class="search-from-wrap radius-hide">
      <el-form inline :model="menuSearchFrom" ref="formRef">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            v-model="menuSearchFrom.menuName"
            placeholder="请输入菜单名称"
          />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="menuSearchFrom.menuState">
            <el-option label="正常" :value="1" />
            <el-option label="停用" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQueryMenu">查询</el-button>
          <el-button type="danger" @click="resetForm('formRef')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-button type="primary" v-has="'menu-create'" @click="onOpenMenuDialog(1)">创建</el-button>
      <el-table
        class="base-table"
        :data="menuList"
        style="width: 100%; margin-bottom: 20px"
        row-key="_id"
        border
      >
        <el-table-column
          v-for="(menu,index) in menuColumns"
          :prop="menu.prop"
          :label="menu.label"
          :width="menu.width"
          :formatter="menu.formatter"
          :key="index"
        />
        <el-table-column fixed="right" label="Operations" width="220">
          <template #default="scope">
            <el-button
            v-has="'menu-create'"
              type="text"
              size="small"
              @click="onOpenMenuDialog(2, scope.row)"
              >新增</el-button
            >
            <el-button v-has="'menu-edit'" type="text" size="small" @click="onEmitMenu(scope.row)"
              >编辑</el-button
            >
            <el-button v-has="'menu-delete'" type="text" size="small" @click="onDeleteMenu(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="isShowDialog"
      title="菜单操作"
      @close="resetForm('menuFormRef')"
    >
      <el-form
        :model="menuForm"
        ref="menuFormRef"
        :rules="menuFromRoles"
        label-width="100px"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="menuForm.parentId"
            :options="menuList"
            :props="{ checkStrictly: true, label: 'menuName', value: '_id' }"
            clearable
          />
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            type="text"
            v-model="menuForm.menuName"
            placeholder="请输入菜单名称"
          />
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="menuForm.menuType === 1"
        >
          <el-input
            type="text"
            v-model="menuForm.icon"
            placeholder="请输入菜单图标"
          />
        </el-form-item>
        <el-form-item
          label="路由地址"
          prop="path"
          v-show="menuForm.menuType === 1"
        >
          <el-input
            type="text"
            v-model="menuForm.path"
            placeholder="请输入路由地址"
          />
        </el-form-item>
        <el-form-item
          label="组件路径"
          prop="component"
          v-show="menuForm.menuType === 1"
        >
          <el-input
            type="text"
            v-model="menuForm.component"
            placeholder="请输入组件路径"
          />
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="menuCode"
          v-show="menuForm.menuType === 2"
        >
          <el-input
            type="text"
            v-model="menuForm.menuCode"
            placeholder="请输入权限标识"
          />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onToggleDialog(false)">取消</el-button>
          <el-button type="primary" @click="onMenuSubmit"> 确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script  >
import { defineComponent, nextTick } from "vue";
import { menuListApi, menuOperateApi } from "../api";
export default defineComponent({
  name: "Menu",
  components: {},
  data() {
    return {
      menuSearchFrom: {
        menuState: 1, // 1:正常 2:停用
      },
      menuList: [],
      menuColumns: [
        {
          label: "菜单名称",
          prop: "menuName",
        },
        {
          label: "图标",
          prop: "icon",
        },
        {
          label: "菜单类型",
          prop: "menuType", // 1:菜单 2:按钮
          formatter(_1, _2, value) {
            return { "1": "菜单", "2": "按钮" }[value];
          },
        },
        {
          label: "权限标识",
          prop: "menuCode",
        },
        {
          label: "路由地址",
          prop: "path",
        },
        {
          label: "组件路径",
          prop: "component",
        },
        {
          label: "菜单状态",
          prop: "menuState",
          formatter(_1, _2, value) {
            return { "1": "正常", "2": "停用" }[value];
          },
        },
      ],
      menuForm: {
        parentId: [null],
        menuType: 1,
        menuState: 1,
      },
      menuFromRoles: {
        menuName: {
          required: true,
          message: "必须填写菜单名称",
          trigger: "blur",
        },
      },
      isShowDialog: false,
      action: 1, // 1:新增  2:子级新增.
      isEdit: false,
    };
  },
  methods: {
    async getMenuList() {
      const list = await menuListApi(this.menuSearchFrom);
      this.menuList = list;
    },
    addMenu() {
      const params = this.menuForm;
      params.action = "add";
      return menuOperateApi(params);
    },
    editMenu() {
      const params = this.menuForm;
      params.action = "edit";
      return menuOperateApi(params);
    },
    deleteMenu(row) {
      const params = {};
      params._id = row._id;
      params.action = "delete";
      return menuOperateApi(params);
    },
    onToggleDialog(flag) {
      this.isShowDialog = flag;
    },
    async onOpenMenuDialog(type, row) {
      this.isEdit = false;
      // 1:新增  2:子级新增
      this.action = type;
      // 如果是子级新增
      if (type === 2) {
        await nextTick(() => {
          const parentId = [...row.parentId, row._id].filter((id) => id);
          this.menuForm.parentId = parentId;
        });
      } else {
        // this.menuForm = {};
      }
      this.onToggleDialog(true);
    },
    onMenuSubmit() {
      this.$refs.menuFormRef.validate(async (valid) => {
        if (valid) {
          if (!this.isEdit) {
            await this.addMenu();
          } else {
            await this.editMenu();
          }
          this.onToggleDialog(false);
          await this.getMenuList();
          this.$message.success("操作成功");
        }
      });
    },
    onEmitMenu(menu) {
      this.isEdit = true;
      this.onToggleDialog(true);
      this.menuForm = menu;
    },
    async onDeleteMenu(menu) {
      await this.deleteMenu(menu);
      this.$message.success("操作成功");
      await this.getMenuList();
    },
    async onQueryMenu() {
      await this.getMenuList();
    },
    resetForm(formRefName) {
      this.$refs[formRefName].resetFields();
    },
  },
  mounted() {
    this.getMenuList();
  },
});
</script>
<style lang="scss" scoped>
.menu-page {
  padding: 30px;
  box-sizing: border-box;
}
.search-from-wrap {
  background: white;
  margin-bottom: 18px;
  .el-form {
    padding: 18px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
