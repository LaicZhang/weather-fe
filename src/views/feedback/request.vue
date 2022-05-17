<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import store from '@/store'
import { addFeedbackApi, deleteFeedbackApi, getFeedbackListApi, replyApi } from '@/api/feedback'

const userId = store.state.userInfo.userId
const isSubmit = ref(false)
const deleteDialog = ref(false)
const replyDialog = ref(false)
const feedbackList = ref([])
const feedbackFormRef: any = ref(null)
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
  feedbackCategory: '',
})
const replyForm = reactive({
  userId,
  feedbackId: 0,
  reply: '',
  isEmail: false,
})
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})

const onSubmit = () => {
  feedbackFormRef.value.validate(async (valid: any) => {
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
const getFeedbackList = async () => {
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
const okToDelete = async () => {
  await deleteFeedbackApi(replyForm.feedbackId)
  await getFeedbackList()
  deleteDialog.value = false
}
const okToReply = async () => {
  await replyApi({ ...replyForm })
  await getFeedbackList()
  replyDialog.value = false
}
onMounted(() => {
  getFeedbackList()
})
</script>

<template>
  <el-card class="feedback-card">
    <el-form v-if="!isSubmit" ref="feedbackFormRef" :model="feedbackForm" :rules="feedbackFormRules">
      <el-form-item prop="category">
        <el-radio-group v-model="feedbackForm.feedbackCategory" size="large">
          <el-radio-button label="1">
            建议
          </el-radio-button>
          <el-radio-button label="2">
            bug
          </el-radio-button>
          <el-radio-button label="3">
            其他
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="summary">
        <el-input
          v-model="feedbackForm.summary"
          placeholder="请输入标题"
          clearable
          size="large"
          maxlength="50"
        />
      </el-form-item>
      <el-form-item prop="content">
        <el-input
          v-model="feedbackForm.content"
          placeholder="请输入内容"
          clearable
          rows="6"
          size="large"
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

<style lang="scss" scoped>
.feedback-card{
  width: 40vw;
  margin: 0 auto;
  margin-top: 20vh;
}
</style>
