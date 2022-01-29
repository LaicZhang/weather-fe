<template>
  <div class="role-page">
    <div class="p-search-wrap">
      <el-form :model="roleSearchForm" inline ref="searchFromRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            type="text"
            v-model="roleSearchForm.roleName"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button type="danger" @click="resetFields('searchFromRef')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="p-btn-wrap"  v-has="'role-create'">
      <el-button type="primary" @click="onShowRoleOperate('add')"
        >新增角色</el-button
      >
    </div>
    <div class="p-table-wrap">
      <el-table :data="roleList" stripe style="width: 100%">
        <el-table-column
          v-for="col in roleColumns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :formatter="col.formatter"
        />
        <el-table-column>
          <template #default="scope">
            <el-button
              v-has="'role-edit'"
              type="primary"
              @click="onShowRoleOperate('edit', scope.row)"
              >编辑</el-button
            >
            <el-button v-has="'role-setting'" type="success" @click="onOpenRolePermission(scope.row)"
              >设置权限</el-button
            >
            <el-button v-has="'role-delete'" type="danger" @click="onDeleteRole(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="p-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pager.total"
        @current-change="onChangePage"
      />
    </div>
    <!-- 添加role弹窗 -->
    <el-dialog
      v-model="showAddDialog"
      title="角色管理"
      width="40%"
      @close="resetFields('addFormRef')"
    >
      <el-form
        ref="addFormRef"
        :model="roleAddForm"
        label-width="100px"
        :rules="addRoleRules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            type="text"
            placeholder="请输入角色名称"
            v-model="roleAddForm.roleName"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            rows="4"
            placeholder="请输入备注"
            v-model="roleAddForm.remark"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="onRoleOperate">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改权限弹窗 -->
    <el-dialog
      v-model="showPermission"
      :title="currentRole.roleName"
      width="40%"
    >
      <el-tree
        ref="treeRef"
        default-expand-all
        node-key="_id"
        :data="menuList"
        :props="{ label: 'menuName' }"
        show-checkbox
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPermission = false">取消</el-button>
          <el-button type="primary" @click="onPermissionSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  ref,
  getCurrentInstance,
  reactive,
  onMounted,
  toRaw,
  nextTick,
} from "vue";
import {
  roleListApi,
  roleOperateApi,
  menuListApi,
  rolePermissionApi,
} from "../api";
import utils from '../util/utils'
export default {
  name: "Role",
  setup() {
    // data
    const { proxy } = getCurrentInstance();
    const menuList = ref([]);
    const menuMap = ref({});
    const roleSearchForm = reactive({ roleName: "" });
    const roleAddForm = reactive({});
    const addRoleRules = {
      roleName: {
        required: true,
        message: "必须填写角色名称",
        trigger: "blur",
      },
    };
    const currentRole = ref({});
    const pager = reactive({ pageNum: 1, pageSize: 10, total: 0 });
    const roleList = ref([]);
    const roleColumns = [
      {
        prop: "roleName",
        label: "角色名称",
        width: "",
      },
      {
        prop: "remark",
        label: "备注",
        width: "",
      },
      {
        prop: "permissionList",
        label: "权限列表",
        width: "",
        formatter(_1,_2,value){
          const names = []
          const halfKeys = value.checkedKeys|| []
          halfKeys.map(half=>{
            const name = menuMap.value[half]
            if(name){
              names.push(name)
            }
          })
          return names.join(', ')
        }
      },
      {
        prop: "createTime",
        label: "创建时间",
        width: "",
        formatter(_1,_2,value){
            return utils.formateDate(new Date(value))
        }
      },
    ];
    const action = ref("add");
    const showAddDialog = ref(false);
    const showPermission = ref(false);
    // 生命周期
    onMounted(() => {
      getMenuList();
      getRoleList();
    });
    // methods
    const resetFields = (name) => proxy.$refs[name].resetFields();
    const onShowRoleOperate = (type, role = {}) => {
      action.value = type;
      showAddDialog.value = true;
      nextTick(() => {
        for (const key in role) {
          roleAddForm[key] = role[key];
        }
      });
    };
    const onOpenRoleOperate = () => {};
    const onOpenRolePermission = (role) => {
      currentRole.value = role;
      showPermission.value = true;
      nextTick(() => {
        setCheckedKeys();
      });
    };
    const onDeleteRole = async (role) => {
      action.value = "delete";
      const params = { _id: role._id };
      params.action = action.value;
      await roleOperateApi(params);
      await getRoleList();
      proxy.$message.success("删除成功");
    };
    const onChangePage = (pageNum) => {
      pager.pageNum = pageNum;
      getRoleList();
    };
    const setCheckedKeys = () => {
      const checkedKeys = toRaw(currentRole.value.permissionList.checkedKeys);
      proxy.$refs['treeRef'].setCheckedKeys(checkedKeys)
      // proxy.$refs["treeRef"].setCheckedKeys([
      //   "6183e5eb1d93507ca220c0e4",
      //   "6183a9febf81d2e98eff3576",
      // ]);
    };
    const setMenuMap = (list) => {
      const res = {};
      const deep = (arr) => {
        while (arr.length) {
          const menu = arr.pop();
          res[menu._id] = menu.menuName;
          if (menu.children) {
            deep(menu.children);
          }
        }
      };
      deep(JSON.parse(JSON.stringify(list)));
      menuMap.value = res;
    };
    // api
    const getRoleList = async () => {
      const params = { ...pager };
      params.roleName = roleSearchForm.roleName;
      try {
        const { page, list } = await roleListApi(params);
        pager.pageNum = page.pageNum;
        pager.pageSize = page.pageSize;
        pager.total = page.total;
        roleList.value = list;
      } catch (error) {}
    };
    const onRoleOperate = () => {
      proxy.$refs["addFormRef"].validate(async (valid) => {
        if (valid) {
          const params = toRaw(roleAddForm);
          params.action = action.value;
          await roleOperateApi(params);
          await getRoleList();
          proxy.$message.success("操作成功");
          showAddDialog.value = false;
        }
      });
    };
    const getMenuList = async () => {
      try {
        const list = await menuListApi();
        menuList.value = list;
        setMenuMap(list);
      } catch (error) {}
    };
    const onPermissionSubmit = async () => {
      const tree = proxy.$refs["treeRef"];
      const halfCheckedKeys = tree.getHalfCheckedKeys();
      const checkedKeys = tree.getCheckedKeys();
      const params = {};
      params._id = currentRole.value._id;
      params.permissionList = {halfCheckedKeys,checkedKeys}
      await rolePermissionApi(params);
      getRoleList();
      showPermission.value = false;
      proxy.$message.success("修改成功");
    };
    return {
      menuList,
      menuMap,
      roleSearchForm,
      resetFields,
      pager,
      roleList,
      roleColumns,
      roleAddForm,
      addRoleRules,
      showAddDialog,
      showPermission,
      currentRole,
      getRoleList,
      onShowRoleOperate,
      onRoleOperate,
      onOpenRoleOperate,
      onOpenRolePermission,
      onDeleteRole,
      onChangePage,
      onPermissionSubmit,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
