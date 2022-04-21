<template>
  <div class="share-page">
    <div class="share-content" style="margin: 15px;">
      <el-form inline :model="queryForm">
        <el-form-item label="打开状态">
          <el-select v-model="queryForm.isOpened" placeholder="打开状态">
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
        <el-table-column sortable label="Operations" width="140px">
          <template #default="scope">
            <el-button v-show="scope.row.state===1" size="default" type="text" @click="onCopy(scope.row)">
              复制链接
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
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { addShareApi, deleteShareApi, getShareListApi, getShareListWithParamsApi } from '../api/share'
import store from '../store'
import util from '../util/utils'

const userId = store.state.userInfo.userId
const role = store.state.userInfo.role
const deleteDialog = ref(false)
const replyDialog = ref(false)
const queryForm = reactive({
  userId,
})
const currentRoute = window.location.href
const shareForeUrl = currentRoute.replace('system/share', 'gallery')

const shareList = ref([])
const shareColumns = [
  { prop: 'shareId', label: '分享ID' },
  { prop: 'userId', label: '用户ID' },
  // {
  //   prop: 'shareLink',
  //   label: '链接',
  //   formatter(row, column, cellValue) {
  //     return `${shareForeUrl}?shareId=${cellValue}`
  //   },
  // },
  {
    prop: 'state',
    label: '生成状态',
    formatter(row, column, cellValue) {
      return { 0: '生成失败', 1: '生成成功' }[cellValue]
    },
  },
  {
    prop: 'openCount',
    label: '打开次数',
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
  },
  {
    prop: 'isOpened',
    label: '打开状态',
    formatter(row, column, cellValue) {
      return { false: '未打开过', true: '已打开过' }[cellValue]
    },
  },
  {
    prop: 'shareLocation',
    label: '分享地址',
    formatter(row, column, cellValue) {
      if (cellValue.province === cellValue.city)
        return cellValue.province
      return cellValue.province + cellValue.city
    },
  },
]
const shareFormRef = ref(null)
const shareFormRules = {}
const shareForm = reactive({
  userId,
})
const deleteInfo = reactive({
  userId,
  shareId: 0,
})
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const options = [
  { label: '未打开过', value: false },
  { label: '已打开过', value: true },
]
const queryShareList = async() => {
  const params = {
    ...queryForm,
    ...pager,
  }
  const { list, page } = await getShareListWithParamsApi(params)
  pager.pageNum = page.pageNum
  pager.total = page.total
  shareList.value = list
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
const okToDelete = async() => {
  await deleteShareApi({ shareId: deleteInfo.shareId })
  await getShareList()
  deleteDialog.value = false
}
const onCopy = (data) => {
  const { copy } = useClipboard()
  copy(`${shareForeUrl}?shareId=${data.shareId}`)
  ElMessage.success('复制成功，快去分享吧')
}
const onDelete = (data) => {
  deleteDialog.value = true
  Object.assign(deleteInfo, data)
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
    background: #ffffff;
    margin-bottom: 18px;
  }
</style>
