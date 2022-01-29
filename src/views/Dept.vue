<template>
  <div class="dept-page">
    <div class="p-search-wrap">
      <el-form :model="searchForm" inline ref="searchFormRef">
        <el-form-item label="部门名称" prop="deptName">
          <el-input
            type="text"
            v-model="searchForm.deptName"
            placeholder="请输入部门名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQueryDept">查询</el-button>
          <el-button type="danger" @click="resetFields('searchFormRef')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="p-btn-wrap">
      <el-button type="primary" v-has="'dept-create'" @click="onOpenDialog">新增部门</el-button>
    </div>
    <div class="p-table-wrap">
      <el-table :data="deptList" stripe style="width: 100%" row-key="_id">
        <el-table-column v-for="col in columns" :key="col.prop" v-bind="col" />
        <el-table-column>
          <template #default="scope">
            <el-button type="primary" v-has="'dept-edit'" @click="onEdit(scope.row)">编辑</el-button>
            <el-button type="danger" v-has="'dept-delete'" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="showDialog" title="部门操作" @close="resetFields('deptFormRef')">
      <el-form
        :model="deptForm"
        ref="deptFormRef"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item prop="parentId" label="上级部门">
          <el-cascader
            v-model="deptForm.parentId"
            :options="deptList"
            :props="{ checkStrictly: true, label: 'deptName', value: '_id' }"
            clearable
          />
        </el-form-item>
        <el-form-item prop="deptName" label="部门名称">
          <el-input
            type="text"
            v-model="deptForm.deptName"
            placeholder="请输入部门名称"
          />
        </el-form-item>
        <el-form-item prop="userName" label="负责人">
          <el-select
            placeholder="请选择负责人"
            v-model="deptForm.userName"
            @change="onUserSelectChange"
          >
            <el-option
              v-for="user in userAllList"
              :key="user._id"
              :label="user.userName"
              :value="user"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="userEmail" label="负责人邮箱">
          <el-input
            type="text"
            v-model="deptForm.userEmail"
            placeholder="请输入负责人邮箱"
            disabled
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="info" @click="onCloseDialog">取消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCurrentInstance, ref, onMounted, nextTick } from "vue";
import { deptListApi, deptOperateApi, userAllListApi } from "../api";
import utils from '../util/utils'
export default {
  setup() {
    // data
    const action = ref("add");
    const searchForm = ref({});
    const deptForm = ref({parentId: [null]});
    const columns = [
      { prop: "deptName", label: "部门名称" },
      { prop: "userName", label: "负责人" },
      { prop: "updateTime", label: "更新时间", formatter(_1,_2,val){return utils.formateDate(new Date(val))} },
      { prop: "createTime", label: "创建时间", formatter(_1,_2,val){return utils.formateDate(new Date(val))} },
    ];
    const rules = {
      deptName: {
        required: true,
        message: "必须填写部门名称",
        trigger: "blur",
      },
      parentId: {
        required: true,
        message: "必须选择上级部门",
        trigger: "blur",
      },
      userName: { required: true, message: "必须选择负责人", trigger: "blur" },
    };
    const deptList = ref([]); // 部门列表
    const userAllList = ref({}); //负责人列表
    const showDialog = ref(false);
    const { proxy } = getCurrentInstance();
    // method
    const resetFields = (name) => proxy.$refs[name].resetFields();
    const onOpenDialog = () => {
      action.value = "add";
      showDialog.value = true;
    };
    const onCloseDialog = () => {
      resetFields("deptFormRef");
      showDialog.value = false;
    };
    const onUserSelectChange = (row) => {
      const { userId, userName, userEmail } = row;
      Object.assign(deptForm.value, { userId, userName, userEmail });
    };
    const onSubmit = () => {
      proxy.$refs["deptFormRef"].validate(async (valid) => {
        if (valid) {
          const params = {};
          Object.assign(params, deptForm.value);
          Object.assign(params, { action: action.value });
          await deptOperateApi(params);
          proxy.$message.success("提交成功");
          onCloseDialog();
          getDeptList();
        }
      });
    };
    const onDelete = async({ _id }) => {
      action.value = "delete";
      const params = { _id, action: action.value };
      await deptOperateApi(params);
      proxy.$message.success("删除成功");
      onCloseDialog();
      getDeptList();
    };
    const onEdit = async(row)=>{
      action.value = 'edit'
      showDialog.value = true
      nextTick(()=>{
        Object.assign(deptForm.value, row)
      })
    }
    // api
    const onQueryDept = () => {
      getDeptList()
    };
    const getDeptList = async () => {
      const params = {};
      Object.assign(params, searchForm.value);
      const list = await deptListApi(params);
      deptList.value = list;
    };
    const getUserList = async () => {
      const list = await userAllListApi();
      userAllList.value = list;
    };
    //
    onMounted(() => {
      getDeptList();
      getUserList();
    });
    return {
      searchForm,
      deptForm,
      columns,
      rules,
      deptList,
      userAllList,
      showDialog,
      resetFields,
      onOpenDialog,
      onQueryDept,
      onCloseDialog,
      onUserSelectChange,
      onSubmit,
      onDelete,
      onEdit
    };
  },
};
</script>

<style scoped lang="scss">
</style>
