<template>
  <div class="feedback-page">
    <div v-if="role > 0" class="apply">
      <el-form v-if="!isSubmit" ref="feedbackFormRef" :model="feedbackForm" :rules="feedbackFormRules">
        <el-form-item prop="summary">
          <el-input
            v-model="feedbackForm.summary"
            placeholder="请输入标题"
            clearable
            maxlength="50"
          />
        </el-form-item>
        <el-form-item prop="content">
          <el-input
            v-model="feedbackForm.content"
            placeholder="请输入内容"
            clearable
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
    </div>
    <div v-if="role === 0" class="reply">
      <el-table
        class="base-table"
        :data="feedbackList"
        size="default"
        stripe
        style="width: 100%"
      >
        <el-table-column
          v-for="column in feedbackColumns"
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
              回复
            </el-button>
            <el-button size="default" type="text" @click="onAddDeleteList(scope.row)">
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
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { addFeedbackApi, getFeedbackListApi } from '../api/feedback'
import store from '../store'
import util from '../util/utils'

const userId = store.state.userInfo.userId
const role = store.state.userInfo.role
const isSubmit = ref(false)

const feedbackList = ref([])
const feedbackColumns = [
  { prop: 'userId', label: '用户ID' },
  { prop: 'feedbackId', label: '反馈ID' },
  { prop: 'summary', label: '标题' },
  { prop: 'content', label: '内容' },
  {
    prop: 'createTime',
    label: '创建时间',
    formatter(row, column, cellValue) {
      return util.formateDate(new Date(cellValue))
    },
  },
  {
    prop: 'replyTime',
    label: '更新时间',
    formatter(row, column, cellValue) {
      return util.formateDate(new Date(cellValue))
    },
  },
]
const feedbackFormRef = ref(null)
const feedbackFormRules = {
  summary: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' },
    { min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' },
  ],
}
const feedbackForm = reactive({
  userId,
  summary: '',
  content: '',
})
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const onSubmit = () => {
  feedbackFormRef.value.validate(async(valid) => {
    if (valid) {
      const res = await addFeedbackApi(feedbackForm)
      if (res)
        isSubmit.value = true
    }
  })
}
const resetForm = () => {
  feedbackForm.summary = ''
  feedbackForm.content = ''
}
const getFeedbackList = async() => {
  const params = { userId, ...pager }
  const { list, page } = await getFeedbackListApi(params)
  pager.pageNum = page.pageNum
  pager.total = page.total
  feedbackList.value = list
}
const continueApply = () => {
  resetForm()
  isSubmit.value = false
}
const onChangeCurrentPage = async(pageNum) => {
  pager.pageNum = pageNum
  await getFeedbackList()
}
onMounted(() => {
  getFeedbackList()
})
</script>

<style lang="scss" scoped>
  .feedback-page {
    padding: 30px;
    box-sizing: border-box;
    height: 100vh;
    // width: 30vw;
  }
  .search-from-wrap {
    background: white;
    margin-bottom: 18px;
  }
</style>
