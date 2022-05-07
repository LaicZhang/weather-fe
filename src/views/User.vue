<template>
  <div class="user-page">
    <div v-has="'user-query'" class="user-from-wrap radius-hide">
      <el-form ref="formRef" inline :model="userFrom">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="userFrom.userId" />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userFrom.userName" />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="userFrom.userEmail" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userFrom.state" :model-value="1">
            <el-option label="已注销" :value="0" />
            <el-option label="正常" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchUserFrom">
            查询
          </el-button>
          <el-button type="danger" @click="onResetUserFrom">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button v-has="'user-create'" type="primary" @click="onAddUserBtn">
        新增
      </el-button>
      <el-button v-has="'user-delete'" type="danger" @click="onDeleteUserSelects">
        批量删除
      </el-button>
      <el-table
        class="base-table"
        :data="userList"
        size="default"
        stripe
        style="width: 100%"
        @selection-change="onChangeUserSelects"
      >
        <el-table-column sortable type="selection" width="55" />
        <el-table-column label="头像" width="55">
          <template #default="scope">
            <el-avatar :size="30" :src="UPLOAD_CDN_URL+scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column
          v-for="column in userColumns"
          :key="column.prop"
          sortable
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :formatter="column.formatter"
          show-overflow-tooltip
        />
        <el-table-column sortable label="Operations">
          <template #default="scope">
            <el-button size="default" type="text" @click="onEditUser(scope.row)">
              编辑
            </el-button>
            <el-button size="default" style="color:#F56C6C" type="text" @click="onAddDeleteList(scope.row)">
              删除
            </el-button>
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
          <el-button type="primary" @click="onDeleteUserSelects">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增弹窗 -->
    <el-dialog v-model="addDialog" title="操作" width="30%">
      <el-form ref="addFromRef" :model="addUserFrom" label-width="90px" :rules="addUserFromRules">
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="addUserFrom.userName"
            placeholder="请输入用户名"
            :disabled="isEdit"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="addUserFrom.userEmail" placeholder="请输入用户邮箱" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-radio v-if="item in addUserFromRoleOptions" v-model="addUserFrom.role" :label="item.value">
            {{ item.label }}
          </el-radio>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserFrom.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addUserFrom.sex">
            <el-option label="女" :value="0" />
            <el-option label="男" :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button v-if="isEdit" @click="resetPassword">重置密码</el-button>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSummit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRaw,
} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  addUserApi,
  changePasswordApi,
  checkRepeatApi,
  deleteUserApi,
  editUserApi,
  rolesAllListApi,
  userAllListApi,
  userListApi,
} from '../api'
import util from '../util/utils'
import store from '../store'

const { proxy } = getCurrentInstance()
const UPLOAD_CDN_URL = store.state.UPLOAD_CDN_URL
// 属性
const userFrom = reactive({
  userId: '',
  userName: '',
  state: 1,
})
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const userColumns = [
  { prop: 'userId', label: '用户ID' },
  { prop: 'userName', label: '用户名' },
  {
    prop: 'sex',
    label: '性别',
    formatter(row, column, cellValue) {
      return { 0: '女', 1: '男' }[cellValue]
    },
  },
  { prop: 'userEmail', label: '邮箱' },
  { prop: 'mobile', label: '手机号' },
  {
    prop: 'role',
    label: '角色',
    formatter(row, column, cellValue) {
      return { 0: '管理员', 1: '普通用户', 2: '游客' }[cellValue]
    },
  },
  {
    prop: 'state',
    label: '状态',
    formatter(row, column, cellValue) {
      return { 0: '已注销', 1: '正常' }[cellValue]
    },
  },
  {
    prop: 'createTime',
    label: '注册时间',
    formatter(row, column, cellValue) {
      return util.formateDate(new Date(cellValue))
    },
  },
  {
    prop: 'lastLoginTime',
    label: '最后登录',
    formatter(row, column, cellValue) {
      return util.formateDate(new Date(cellValue))
    },
  },
  {
    prop: 'ip',
    label: '最后登录IP',
  },
]
const isEdit = ref(false)
const userList = ref([])
const userSelects = ref([])
const addDialog = ref(false)
const deleteDialog = ref(false)
const addUserFrom = reactive({
  role: '1',
})
const roleList = ref([])
const deptList = ref([])
const addUserFromRoleOptions = ref([
  {
    label: '管理员',
    value: '0',
  },
  {
    label: '普通用户',
    value: '1',
  },
  {
    label: '游客',
    value: '2',
  },
])
const checkRepeatUserName = async(rule, value, callback) => {
  const userName = addUserFrom.userName
  if (!userName)
    return
  const { isRepeat } = await checkRepeatApi({ userName })
  // return isRepeat !== undefined ? callback(new Error('邮箱已存在')) : callback()
  if (isRepeat)
    return callback(new Error('用户名已存在'))
  return callback()
}
const checkRepeatUserEmail = async(rule, value, callback) => {
  const userEmail = addUserFrom.userEmail
  if (!userEmail)
    return
  const { isRepeat } = await checkRepeatApi({ userEmail })
  // return isRepeat !== undefined ? callback(new Error('邮箱已存在')) : callback()
  if (isRepeat)
    return callback(new Error('邮箱已存在'))
  return callback()
}
const checkRepeatMobile = async(rule, value, callback) => {
  const mobile = addUserFrom.mobile
  if (!mobile)
    return
  const { isRepeat } = await checkRepeatApi({ mobile })
  // return isRepeat !== undefined ? callback(new Error('手机号已存在')) : callback()
  if (isRepeat)
    return callback(new Error('手机号已存在'))
  return callback()
}
const addUserFromRules = {
  userName: [{
    required: true,
    message: '必须填写用户名',
    trigger: 'blur',
  }, {
    min: 3,
    max: 18,
    message: '长度在 3 到 18 个字符',
    trigger: 'blur',
  }, { validator: checkRepeatUserName, trigger: 'blur' },
  { pattern: /^[a-zA-Z]+$/, message: '只能输入字母', trigger: 'blur' },
  ],
  userEmail: [{
    required: true,
    message: '必须填写邮箱',
    trigger: 'blur',
  }, {
    type: 'email',
    message: '邮箱格式不正确',
    trigger: 'blur',
  },
  { validator: checkRepeatUserEmail, trigger: 'blur' },
  ],
  role: {
    required: true,
    message: '必须选择角色',
    trigger: 'blur',
  },
  mobile: [{
    pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
    message: '手机号格式错误',
    trigger: 'blur',
  }, {
    min: 11,
    max: 11,
    message: '手机号长度错误',
    trigger: 'blur',
  }, { validator: checkRepeatMobile, trigger: 'blur' }],
}

const getUserList = async() => {
  const params = { ...userFrom, ...pager }
  const { list, page } = await userListApi(params)
  pager.pageNum = page.pageNum
  pager.total = page.total
  userList.value = list
}
const getAllUsersList = async() => {
  const params = { ...pager }
  const { list, page } = await userAllListApi(params)
  pager.pageNum = page.pageNum
  pager.total = page.total
  userList.value = list
}
const deleteUser = async() => {
  if (userSelects.value.length > 0)
    return deleteUserApi({ userIds: userSelects.value })
  else
    proxy.$message.error('请选择删除项')
}
const getRoleList = async() => {
  roleList.value = await rolesAllListApi()
}
const addUser = async() => {
  const userFormRaw = toRaw(addUserFrom)
  return addUserApi(userFormRaw)
}
const editUser = async() => {
  const userFormRaw = toRaw(addUserFrom)
  return editUserApi(userFormRaw)
}
// 通用方法
const resetFields = (refName) => {
  proxy.$refs[refName].resetFields()
}
// 事件方法: 多选时存入选中列表中
const onChangeUserSelects = (list) => {
  userSelects.value = list.map(user => user.userId)
}
const onChangeCurrentPage = (currentPage) => {
  pager.pageNum = currentPage
  getUserList()
}
const onSearchUserFrom = () => {
  getUserList()
}
const onResetUserFrom = () => {
  proxy.$refs.formRef.resetFields()
  getAllUsersList()
}
const onEditUser = async(user) => {
  addDialog.value = true
  isEdit.value = true
  await nextTick(() => {
    Object.assign(addUserFrom, user)
  })
}
const onAddUserBtn = () => {
  isEdit.value = false
  addDialog.value = true
}
const onAddDeleteList = (user) => {
  userSelects.value = [user.userId]
  deleteDialog.value = true
}
const onDeleteUserSelects = async() => {
  try {
    const { nModified } = await deleteUser()
    if (nModified > 0) {
      userSelects.value = []
      proxy.$message.success('删除成功')
      getUserList()
    }
    else {
      proxy.$message.error('删除失败')
    }
  }
  catch (error) {}
  deleteDialog.value = false
}
const onCancel = () => {
  isEdit.value = false
  resetFields('addFromRef')
  addDialog.value = false
}
const resetPassword = () => {
  ElMessageBox.confirm('确认重置密码?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      addUserFrom.changeAction = 'reset'
      changePasswordApi(addUserFrom)
      ElMessage({
        type: 'success',
        message: '重置成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消重置',
      })
    })
}
const onSummit = () => {
  proxy.$refs.addFromRef.validate(async(valid) => {
    if (valid) {
      try {
        let res
        if (isEdit.value)
          res = await editUser()
        else
          res = await addUser()

        if (res)
          proxy.$message.success('用户添加成功')
        else
          proxy.$message.error('用户添加失败')

        resetFields('addFromRef')
      }
      catch (error) {}
      getAllUsersList()
      addDialog.value = false
    }
  })
}
// 生命周期
onMounted(() => {
  getRoleList()
  getAllUsersList()
})
//
</script>
<style lang="scss" scoped>
  .user-page {
    padding: 30px;
    box-sizing: border-box;
    height: 100vh;
    .user-from-wrap {
      background: #ffffff;
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
