<template>
  <div class="share-page">
    <div v-if="role > 0" class="apply">
      <el-card class="share-card">
        <el-form v-if="!isSubmit" ref="shareFormRef" :model="shareForm" :rules="shareFormRules">
          <el-form-item prop="summary">
            <el-input
              v-model="shareForm.summary"
              placeholder="请输入标题"
              clearable
              size="large"
              autocomplete
              maxlength="50"
            />
          </el-form-item>
          <el-form-item prop="content">
            <el-input
              v-model="shareForm.content"
              placeholder="请输入内容"
              clearable
              rows="6"
              size="large"
              autocomplete
              type="textarea"
              maxlength="500"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">
              提交
            </el-button>
            <el-button type="text" @click="resetForm">
              撤销
            </el-button>
          </el-form-item>
        </el-form>
        <div v-if="isSubmit" class="after-submit">
          <el-result
            icon="success"
            title="Success Tip"
            sub-title="反馈成功"
          >
            <template #extra>
              <el-button type="primary" @click="continueApply">
                继续反馈
              </el-button>
            </template>
          </el-result>
        </div>
      </el-card>
    </div>
    <div v-if="role === 0" class="reply">
      <el-form inline :model="queryForm">
        <el-form-item label="用户ID">
          <el-input v-model="queryForm.userId" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="queryForm.summary" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryForm.status" placeholder="处理状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryShareList">
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-table
        class="base-table"
        :data="shareList"
        size="default"
        stripe
        style="width: 100%"
      >
        <el-table-column
          v-for="column in shareColumns"
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
            <el-button v-show="scope.row.status===0" size="default" type="text" @click="onReply(scope.row)">
              处理
            </el-button>
            <el-button size="default" style="color:#F56C6C" type="text" @click="onDelete(scope.row)">
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
  </div>
  <!-- 删除弹窗 -->
  <el-dialog v-model="deleteDialog" title="操作" width="30%">
    <span>确定删除?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="okToDelete">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 回复弹窗 -->
  <el-dialog v-model="replyDialog" title="操作" width="30%">
    <el-form>
      <el-form-item>
        <el-input
          v-model="replyForm.reply"
          placeholder="请输入回复内容"
          clearable
          type="textarea"
          maxlength="500"
        />
      </el-form-item>
      <el-form-item label="是否发送邮件">
        <el-radio v-model="replyForm.isEmail" :disabled="!replyForm.reply" label="1">
          是
        </el-radio>
        <el-radio v-model="replyForm.isEmail" :disabled="!replyForm.reply" label="2">
          否
        </el-radio>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="replyDialog = false">取消</el-button>
        <el-button type="primary" @click="okToReply">已处理</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { addShareApi, deleteShareApi, getShareListApi } from '../api/share'
import store from '../store'
import util from '../util/utils'

const userId = store.state.userInfo.userId
const role = store.state.userInfo.role
const isSubmit = ref(false)
const deleteDialog = ref(false)
const replyDialog = ref(false)
const queryForm = reactive({
  userId: '',
  summary: '',
  status: '',
})
const shareList = ref([])
const shareColumns = [
  { prop: 'shareId', label: '分享ID' },
  { prop: 'userId', label: '用户ID' },
  { prop: 'link', label: '链接' },
  {
    prop: 'status',
    label: '状态',
    formatter(row, column, cellValue) {
      return { 0: '未处理', 1: '已处理' }[cellValue]
    },
  },
  {
    prop: 'shareTime',
    label: '分享时间',
    formatter(row, column, cellValue) {
      return util.formateDate(new Date(cellValue))
    },
  },
  {
    prop: 'shareIp',
    label: '分享ip',
    formatter(row, column, cellValue) {
      if (cellValue)
        return util.formateDate(new Date(cellValue))
    },
  },
  {
    prop: 'shareLocation',
    label: '分享地址',
    formatter(row, column, cellValue) {

    },
  },
]
const shareFormRef = ref(null)
const shareFormRules = {
  summary: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' },
    { min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' },
  ],
}
const shareForm = reactive({
  userId,
  summary: '',
  content: '',
})
const replyForm = reactive({
  userId,
  shareId: 0,
  reply: '',
  isEmail: false,
})
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const options = [
  { label: '未处理', value: 0 },
  { label: '已处理', value: 1 },
]
const queryShareList = async() => {
  const params = {
    ...queryForm,
    ...pager,
  }
  const { list, page } = await getQueryListApi(params)
  pager.pageNum = page.pageNum
  pager.total = page.total
  shareList.value = list
}
const onSubmit = () => {
  shareFormRef.value.validate(async(valid) => {
    if (valid) {
      const res = await addShareApi(shareForm)
      if (res)
        isSubmit.value = true
    }
  })
}
const resetForm = () => {
  shareForm.summary = ''
  shareForm.content = ''
}
const getShareList = async() => {
  const params = { userId, ...pager }
  const { list, page } = await getShareListApi(params)
  pager.pageNum = page.pageNum
  pager.total = page.total
  shareList.value = list
}
const continueApply = () => {
  resetForm()
  isSubmit.value = false
}
const okToDelete = async() => {
  await deleteShareApi(replyForm.shareId)
  await getShareList()
  deleteDialog.value = false
}
const onReply = (data) => {
  replyDialog.value = true
  Object.assign(replyForm, data)
  console.log('onReply', replyForm)
}
const onDelete = (data) => {
  deleteDialog.value = true
  Object.assign(replyForm, data)
  console.log('onDelete', replyForm)
}
const okToReply = async() => {
  await getShareList()
  replyDialog.value = false
}
const onChangeCurrentPage = async(pageNum) => {
  pager.pageNum = pageNum
  await getShareList()
}
onMounted(() => {
  getShareList()
})
</script>

<style lang="scss" scoped>
  .share-page {
    padding: 30px;
    box-sizing: border-box;
    height: 100vh;
    .share-card{
      width: 40vw;
      margin: 0 auto;
      margin-top: 20vh;
    }
  }
  .search-from-wrap {
    background: white;
    margin-bottom: 18px;
  }
</style>
