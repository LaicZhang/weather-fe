<template>
  <div class="reply-page">
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
        <el-button type="primary" @click="queryFeedbackList">
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <TBody :data-columns="feedbackColumns" :data-list="feedbackList">
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
    </TBody>
    <el-pagination
      class="text-right"
      background
      layout="prev, pager, next"
      :current-page="pager.pageNum"
      :page-size="pager.pageSize"
      :total="pager.total"
      @current-change="onChangeCurrentPage"
    />
    <!-- <TPagination :pager="pager" /> -->
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
          <el-radio v-model="replyForm.isEmail" :disabled="!replyForm.reply" label="0">
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { deleteFeedbackApi, getFeedbackListApi, getQueryListApi, replyApi } from '@/api/feedback'
import store from '@/store'
import util from '@/util/utils'
import TBody from '@/components/table/tBody.vue'
// import TPagination from '@/components/table/tPagination.vue'

const userId = store.state.userInfo.userId
const deleteDialog = ref(false)
const replyDialog = ref(false)
const queryForm = reactive({
  userId: '',
  summary: '',
  status: '',
})
const feedbackList = ref([])
const feedbackColumns: any = [
  { prop: 'feedbackId', label: '反馈ID' },
  { prop: 'userId', label: '用户ID' },
  {
    prop: 'feedbackCategory',
    label: '反馈类型',
    formatter(row: any, column: any, cellValue: any) {
      const dict: any = { 1: '建议', 2: '投诉', 3: '其他' }
      return dict[cellValue]
    },
  },
  { prop: 'summary', label: '标题' },
  { prop: 'content', label: '内容' },
  {
    prop: 'status',
    label: '状态',
    formatter(row: any, column: any, cellValue: any) {
      const dict: any = { 0: '未处理', 1: '已处理' }
      return dict[cellValue]
    },
  },
  {
    prop: 'createTime',
    label: '创建时间',
    formatter(row: any, column: any, cellValue: any) {
      return util.formateDate(new Date(cellValue))
    },
  },
  {
    prop: 'replyTime',
    label: '回复时间',
    formatter(row: any, column: any, cellValue: any) {
      if (cellValue)
        return util.formateDate(new Date(cellValue))
    },
  },
]
const replyForm = reactive({
  userId,
  feedbackId: 0,
  reply: '',
  isEmail: '',
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
const queryFeedbackList = async() => {
  const params = {
    ...queryForm,
    ...pager,
  }
  const { list, page } = await getQueryListApi(params)
  pager.pageNum = page.pageNum
  pager.total = page.total
  feedbackList.value = list
}
const getFeedbackList = async() => {
  const params = { userId, ...pager }
  const { list, page } = await getFeedbackListApi(params)
  pager.pageNum = page.pageNum
  pager.total = page.total
  feedbackList.value = list
}
const okToDelete = async() => {
  await deleteFeedbackApi(replyForm.feedbackId)
  await getFeedbackList()
  deleteDialog.value = false
}
const onReply = (data: any) => {
  replyDialog.value = true
  Object.assign(replyForm, data)
}
const onDelete = (data: any) => {
  deleteDialog.value = true
  Object.assign(replyForm, data)
}
const okToReply = async() => {
  await replyApi({ ...replyForm })
  await getFeedbackList()
  replyDialog.value = false
}
const onChangeCurrentPage = async(pageNum: number) => {
  pager.pageNum = pageNum
  await getFeedbackList()
}
onMounted(() => {
  getFeedbackList()
})
</script>

<style lang="scss" scoped>
.reply-page {
  margin: 15px;
}
</style>
