<template>
  <div class="user-page">
    <div class="user-from-wrap radius-hide"  v-has="'user-query'">
      <el-form inline :model="userFrom" ref="formRef" >
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="userFrom.userId" />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userFrom.userName" />
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select :model-value="1" v-model="userFrom.state">
            <el-option label="所有" :value="0" />
            <el-option label="在职" :value="1" />
            <el-option label="离职" :value="2" />
            <el-option label="试用期" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchUserFrom">查询</el-button>
          <el-button type="danger" @click="onResetUserFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary"  v-has="'user-create'" @click="onAddUserBtn">新增</el-button>
      <el-button type="danger" v-has="'user-delete'" @click="onDeleteUserSelects">批量删除</el-button>
      <el-table
        @selection-change="onChangeUserSelects"
        class="base-table"
        :data="userList"
        size="medium"
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="column in userColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :formatter="column.formatter"
        />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="mini" type="text" @click="onEditUser(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="onAddDeleteList(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="text-right"
        background
        layout="prev, pager, next"
        :current-page="pager.pageNum"
        :page-size="pager.pageSize"
        :total="pager.total"
        @current-change="onChangeCurrentPage"
      />
    </div>
    <!-- 删除弹窗 -->
    <el-dialog v-model="deleteDialog" title="操作" width="30%">
      <span>确定删除?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialog = false">取消</el-button>
          <el-button type="primary" @click="onDeleteUserSelects"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 新增弹窗 -->
    <el-dialog v-model="addDialog" title="操作" width="30%">
      <el-form
        ref="addFromRef"
        :model="addUserFrom"
        label-width="90px"
        :rules="addUserFromRules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            placeholder="请输入用户名"
            v-model="addUserFrom.userName"
            :disabled="isEdit"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            placeholder="请输入用户邮箱"
            :disabled="isEdit"
            v-model="addUserFrom.userEmail"
          >
            <template #append>@yq.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            placeholder="请输入手机号"
            v-model="addUserFrom.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input
            placeholder="请输入用户岗位"
            v-model="addUserFrom.job"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="addUserFrom.state">
            <el-option label="在职" :value="1"></el-option>
            <el-option label="离职" :value="2"></el-option>
            <el-option label="试用期" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select
            v-model="addUserFrom.roleList"
            multiple
            class="w-100"
            placeholder="请选择部门角色"
          >
            <el-option
              v-for="role in roleList"
              :label="role.roleName"
              :value="role._id"
              :key="role._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptId">
          <el-cascader
            v-model="addUserFrom.deptId"
            placeholder="请选择所属部门"
            :options="deptList"
            :props="{ checkStrictly: true, label: 'deptName', value: '_id' }"
            clearable
            show-all-levels
            class="w-100"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSummit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  getCurrentInstance,
  toRaw,
  nextTick,
} from "vue";
import {
  userListApi,
  deleteUserApi,
  rolesAllListApi,
  deptListApi,
  addUserApi,
  editUserApi,
  userAllListApi
} from "../api";
import util from "../util/utils";
export default defineComponent({
  name: "User",
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    // 属性
    const userFrom = reactive({
      userId: "",
      userName: "",
      state: 1,
    });
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0,
    });
    const userColumns = [
      { prop: "userId", label: "用户ID" },
      { prop: "userName", label: "用户名" },
      { prop: "userEmail", label: "邮箱" },
      {
        prop: "role",
        label: "角色",
        formatter(row, column, cellValue) {
          return { 0: "系统管理员", 1: "普通用户" }[cellValue];
        },
      },
      {
        prop: "state",
        label: "状态",
        formatter(row, column, cellValue) {
          return { 0: "所有", 1: "在职", 2: "离职", 3: "试用" }[cellValue];
        },
      },
      {
        prop: "createTime",
        label: "注册时间",
        width: 220,
        formatter(row, column, cellValue) {
          return util.formateDate(new Date(cellValue));
        },
      },
      {
        prop: "lastLoginTime",
        label: "最后登录",
        width: 220,
        formatter(row, column, cellValue) {
          return util.formateDate(new Date(cellValue));
        },
      },
    ];
    const isEdit = ref(false);
    const userList = ref([]);
    const userSelects = ref([]);
    const addDialog = ref(false);
    const deleteDialog = ref(false);
    const addUserFrom = reactive({ state: 3 });
    const roleList = ref([]);
    const deptList = ref([]);
    const addUserFromRules = {
      userName: {
        required: true,
        message: "必须填写用户名",
        trigger: "blur",
      },
      userEmail: {
        required: true,
        message: "必须填写邮箱",
        trigger: "blur",
      },
      mobile: {
        pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
        message: "手机号格式错误",
        trigger: "blur",
      },
    };
    // api
    const getUserList = async () => {
      const params = { ...userFrom, ...pager };
      const { list, page } = await userListApi(params);
      pager.pageNum = page.pageNum;
      pager.total = page.total;
      userList.value = list;
    };
    const getAllUsersList = async () => {
      const { list,page } = await userAllListApi({});
      pager.pageNum = page.pageNum;
      pager.total = page.total;
      userList.value = list;
      console.log(userList.value)
    };
    const deleteUser = async () => {
      if (userSelects.value.length > 0) {
        return deleteUserApi({ userIds: userSelects.value });
      } else {
        proxy.$message.error("请选择删除项");
      }
    };
    const getRoleList = async () => {
      roleList.value = await rolesAllListApi();
    };
    const getDeptList = async () => {
      deptList.value = await deptListApi();
    };
    const addUser = async () => {
      const userFormRaw = toRaw(addUserFrom);
      userFormRaw.userEmail += "@yq.com";
      return addUserApi(userFormRaw);
    };
    const editUser = async () => {
      const userFormRaw = toRaw(addUserFrom);
      return editUserApi(userFormRaw);
    };
    // 通用方法
    const resetFields = (refName) => {
      proxy.$refs[refName].resetFields();
    };
    // 事件方法
    // 多选时存入选中列表中
    const onChangeUserSelects = (list) => {
      userSelects.value = list.map((user) => user.userId);
    };
    const onChangeCurrentPage = (currentPage) => {
      pager.pageNum = currentPage;
      getUserList();
    };
    const onSearchUserFrom = () => {
      getUserList();
    };
    const onResetUserFrom = () => {
      proxy.$refs.formRef.resetFields();
    };
    const onEditUser = async (user) => {
      addDialog.value = true;
      isEdit.value = true;
      await nextTick(() => {
        Object.assign(addUserFrom, user);
      });
    };
    const onAddUserBtn = () => {
      isEdit.value = false;
      addDialog.value = true;
    };
    const onAddDeleteList = (user) => {
      userSelects.value = [user.userId];
      deleteDialog.value = true;
    };
    const onDeleteUserSelects = async () => {
      try {
        const { nModified } = await deleteUser();
        if (nModified > 0) {
          userSelects.value = [];
          proxy.$message.success("删除成功");
          getUserList();
        } else {
          proxy.$message.error("删除失败");
        }
      } catch (error) {}
      deleteDialog.value = false;
    };
    const onCancel = () => {
      isEdit.value = false;
      resetFields("addFromRef");
      // addUserFrom.state = 3;
      addDialog.value = false;
    };
    const onSummit = () => {
      proxy.$refs.addFromRef.validate(async (valid) => {
        if (valid) {
          try {
            let res;
            if (isEdit.value) {
              res = await editUser();
            } else {
              res = await addUser();
            }
            if (res) {
              proxy.$message.success("用户添加成功");
            } else {
              proxy.$message.error("用户添加失败");
            }
            resetFields("addFromRef");
          } catch (error) {}
          // getUserList();
          getAllUsersList();
          addDialog.value = false;
        }
      });
    };
    // 生命周期
    onMounted(() => {
      getRoleList();
      getDeptList();
      getAllUsersList();
    });
    //
    return {
      userFrom,
      userColumns,
      userList,
      onChangeUserSelects,
      pager,
      isEdit,
      addUserFrom,
      addUserFromRules,
      roleList,
      deptList,
      addDialog,
      deleteDialog,
      onChangeCurrentPage,
      onSearchUserFrom,
      onResetUserFrom,
      onEditUser,
      onAddUserBtn,
      onAddDeleteList,
      onDeleteUserSelects,
      onSummit,
      onCancel,
    };
  },
});
</script>
<style lang="scss" scoped>
.user-page {
  padding: 30px;
  box-sizing: border-box;
  .user-from-wrap {
    background: white;
    margin-bottom: 18px;
    .el-form {
      padding: 18px;
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>

