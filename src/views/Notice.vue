<template>
  <div class="notice-page">
    <div v-has="'notice-query'" class="notice-from-wrap radius-hide">
      <el-form ref="formRef" inline :model="noticeFrom">
        <el-form-item label="公告ID" prop="_id">
          <el-input v-model="noticeFrom._id" />
        </el-form-item>
        <el-form-item label="公告标题" prop="noticeTitle">
          <el-input v-model="noticeFrom.noticeTitle" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchNoticeFrom">
            查询
          </el-button>
          <el-button type="danger" @click="onResetNoticeFrom">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button v-has="'notice-create'" type="primary" @click="onAddNoticeBtn">
        新增
      </el-button>
      <el-button type="primary" @click="onReadAll">
        全部已读
      </el-button>
      <!-- <el-button type="danger" v-has="'notice-delete'" @click="onDeleteNoticeSelects"
        >批量删除</el-button
      > -->
      <el-table
        class="base-table"
        :data="noticeList"
        size="medium"
        stripe
        style="width: 100%"
        @selection-change="onChangeNoticeSelects"
      >
        <!-- <el-table-column sortable type="selection" width="55" /> -->
        <el-table-column
          v-for="column in noticeColumns"
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
            <el-button size="default" type="text" @click="watchMore(scope.row)">
              查看
            </el-button>
            <el-button v-has="'notice-create'" size="default" type="text" @click="onEditNotice(scope.row)">
              编辑
            </el-button>
            <el-button
              v-has="'notice-create'"
              style="color:#F56C6C"
              size="default"
              type="text"
              @click="onAddDeleteList(scope.row)"
            >
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
    <!-- 详情弹窗-->
    <el-dialog v-if="selectedRow" v-model="moreDialog" title="公告详情" width="35%">
      <el-descriptions direction="vertical" border :title="selectedRow.value.noticeTitle">
        <el-descriptions-item label="公告ID">
          {{ selectedRow.value._id }}
        </el-descriptions-item>
        <el-descriptions-item label="公告标题">
          {{ selectedRow.value.noticeTitle }}
        </el-descriptions-item>
        <el-descriptions-item label="公告内容">
          {{ selectedRow.value.noticeContent }}
        </el-descriptions-item>
        <el-descriptions-item label="已读次数">
          {{ selectedRow.value.haveReadCount }}
        </el-descriptions-item>
        <el-descriptions-item label="发布时间">
          {{ selectedRow.value.createTime }}
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="haveReadCount">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog v-model="deleteDialog" title="操作" width="30%">
      <span>确定删除?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialog = false">取消</el-button>
          <el-button type="primary" @click="onDeleteNoticeSelects">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增弹窗 -->
    <el-dialog v-model="addDialog" title="操作" width="30%">
      <el-form
        ref="addFromRef"
        :model="addNoticeFrom"
        label-width="90px"
        :rules="addNoticeFromRules"
      >
        <el-form-item label="公告标题" prop="noticeTitle">
          <el-input
            v-model="addNoticeFrom.noticeTitle"
            placeholder="请输入公告标题"
          />
        </el-form-item>
        <el-form-item label="公告内容" prop="noticeContent">
          <el-input
            v-model="addNoticeFrom.noticeContent"
            placeholder="请输入公告内容"
            :rows="4"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSummit">发布</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRaw,
} from 'vue'
import {
  addNoticeApi,
  deleteNoticeApi,
  editNoticeApi,
  noticeAllListApi,
  noticeAllReadApi,
  noticeHaveReadApi,
  noticeListApi,
  rolesAllListApi,
} from '../api'
import util from '../util/utils'
import store from '../store'

const { proxy } = getCurrentInstance()
// 属性
const noticeFrom = reactive({
  _id: '',
  noticeTitle: '',
})
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const noticeColumns = [
  { prop: '_id', label: '公告ID' },
  { prop: 'noticeTitle', label: '公告标题' },
  {
    prop: 'noticeContent',
    label: '公告内容',
  },
  {
    prop: 'haveReadCount',
    label: '已读次数',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    formatter(row, column, cellValue) {
      return util.formateDate(new Date(cellValue))
    },
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    formatter(row, column, cellValue) {
      return util.formateDate(new Date(cellValue))
    },
  },
]
const isEdit = ref(false)
const noticeList = ref([])
const noticeSelects = ref([])
const addDialog = ref(false)
const deleteDialog = ref(false)
const moreDialog = ref(false)
const addNoticeFrom = reactive({})
const roleList = ref([])
const deptList = ref([])
const selectedRow = reactive({})
const userInfo = store.state.userInfo

const addNoticeFromRules = {
  noticeTitle: [{
    required: true,
    message: '必须填写公告标题',
    trigger: 'blur',
  },
  {
    min: 5,
    max: 50,
    message: '公告标题最少5个，最多50个字符',
    trigger: 'blur',
  }],
  noticeContent: [{
    required: true,
    message: '必须填写公告内容',
    trigger: 'blur',
  }, {
    min: 10,
    max: 100,
    message: '公告内容最少10个，最多100个字符',
    trigger: 'blur',
  }],
}
// api
const getNoticeList = async() => {
  const params = { ...noticeFrom, ...pager }
  const { list, page } = await noticeListApi(params)
  pager.pageNum = page.pageNum
  pager.total = page.total
  noticeList.value = list
}
const getAllNoticesList = async() => {
  const { list, page } = await noticeAllListApi({})
  pager.pageNum = page.pageNum
  pager.total = page.total
  noticeList.value = list
}
const onReadAll = async() => {
  await noticeAllReadApi({ userId: userInfo.userId })
  getAllNoticesList()
  store.dispatch('getNoticeCount')
}
const deleteNotice = async() => {
  if (noticeSelects.value.length > 0)
    return deleteNoticeApi({ _ids: noticeSelects.value })
  else
    proxy.$message.error('请选择删除项')

  noticeAllListApi()
}
const getRoleList = async() => {
  roleList.value = await rolesAllListApi()
}
const addNotice = async() => {
  const noticeFormRaw = toRaw(addNoticeFrom)
  return addNoticeApi(noticeFormRaw)
}
const editNotice = async() => {
  const noticeFormRaw = toRaw(addNoticeFrom)
  return editNoticeApi(noticeFormRaw)
}
const haveReadCount = async() => {
  await noticeHaveReadApi({ _id: selectedRow.value._id, userId: userInfo.userId })
  moreDialog.value = false
  store.dispatch('getNoticeCount')
  getAllNoticesList()
}
// 通用方法
const resetFields = (refName) => {
  proxy.$refs[refName].resetFields()
}
// 事件方法: 多选时存入选中列表中
const onChangeNoticeSelects = (list) => {
  noticeSelects.value = list.map(notice => notice._id)
}
const onChangeCurrentPage = (currentPage) => {
  pager.pageNum = currentPage
  getNoticeList()
}
const onSearchNoticeFrom = () => {
  getNoticeList()
}
const onResetNoticeFrom = () => {
  proxy.$refs.formRef.resetFields()
  getAllNoticesList()
}
const onEditNotice = async(notice) => {
  addDialog.value = true
  isEdit.value = true
  nextTick(() => {
    Object.assign(addNoticeFrom, notice)
  })
}
const onAddNoticeBtn = () => {
  isEdit.value = false
  addDialog.value = true
}
const onAddDeleteList = (notice) => {
  noticeSelects.value = [notice._id]
  deleteDialog.value = true
  store.dispatch('getNoticeCount')
}
const onDeleteNoticeSelects = async() => {
  try {
    const { nModified } = await deleteNotice()
    if (nModified > 0) {
      noticeSelects.value = []
      proxy.$message.success('删除成功')
    }
    store.dispatch('getNoticeCount')
  }
  catch (error) {}
  deleteDialog.value = false
  getAllNoticesList()
}
const onCancel = () => {
  isEdit.value = false
  resetFields('addFromRef')
  // addNoticeFrom.state = 3;
  addDialog.value = false
}
const watchMore = (val) => {
  selectedRow.value = val
  moreDialog.value = true
}
const onSummit = () => {
  proxy.$refs.addFromRef.validate(async(valid) => {
    if (valid) {
      try {
        let res
        if (isEdit.value)
          res = await editNotice()
        else
          res = await addNotice()

        if (res)
          proxy.$message.success('公告操作成功')
        else
          proxy.$message.error('公告添加失败')

        resetFields('addFromRef')
      }
      catch (error) {
        proxy.$message.error('公告添加失败')
      }
      // getNoticeList();
      store.dispatch('getNoticeCount')
      getAllNoticesList()
      addDialog.value = false
    }
  })
}
// 生命周期
onMounted(() => {
  getRoleList()
  getAllNoticesList()
})
//
</script>
<style lang="scss" scoped>
  .notice-page {
    padding: 30px;
    box-sizing: border-box;
    height: 100vh;
    .notice-from-wrap {
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
