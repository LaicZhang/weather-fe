<template>
  <div class="pusher-page">
    <div v-has="'pusher-query'" class="pusher-from-wrap radius-hide">
      <el-form ref="formRef" inline :model="pusherFrom">
        <el-form-item label="推送ID" prop="_id">
          <el-input v-model="pusherFrom._id" />
        </el-form-item>
        <!-- <el-form-item label="推送类型" prop="pusherCategory">
          <el-select placeholder="请输入推送类型" v-model="pusherFrom.pusherCategoryOptions">
            <el-option
              v-for="item in pusherCategoryOptions"
              :key="item.text"
              :label="item.value"
              :value="item.text"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="推送周期" prop="pusherLifeTime">
          <el-select placeholder="请选择推送周期" v-model="pusherFrom.pusherLifetime">
            <el-option
              v-for="item in pushLifetimeOptions"
              :key="item.text"
              :label="item.value"
              :value="item.text"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="推送标题" prop="pusherTitle">
          <el-input v-model="pusherFrom.pusherTitle" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearchPusherFrom">
            查询
          </el-button>
          <el-button type="danger" @click="onResetPusherFrom">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button v-has="'pusher-create'" type="primary" @click="onAddPusherBtn">
        新增
      </el-button>
      <!-- <el-button type="danger" v-has="'pusher-delete'" @click="onDeletePusherSelects"
        >批量删除</el-button
      > -->
      <el-table
        class="base-table"
        :data="pusherList"
        size="medium"
        stripe
        style="width: 100%"
        @selection-change="onChangePusherSelects"
      >
        <!-- <el-table-column sortable type="selection" width="55" /> -->
        <el-table-column
          v-for="column in pusherColumns"
          :key="column.prop"
          sortable
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :formatter="column.formatter"
          show-overflow-tooltip
        />
        <el-table-column sortable label="Operations" width="180px">
          <template #default="scope">
            <!-- <el-button size="default" type="text" @click="watchMore(scope.row)">
              查看
            </el-button> -->
            <el-button
              v-if="scope.row.state !== 2"
              size="default"
              type="text"
              @click="openImmediatelyPushDialog(scope.row)"
            >
              推送
            </el-button>
            <el-button
              v-if="scope.row.state !== 2"
              v-has="'pusher-create'"
              size="default"
              type="text"
              @click="onEditPusher(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="scope.row.state !== 2"
              v-has="'pusher-create'"
              size="default"
              type="text"
              style="color:#F56C6C"
              @click="cancelPush(scope.row.pusherId)"
            >
              取消
            </el-button>
            <el-button
              v-has="'pusher-create'"
              size="default"
              type="text"
              style="color:#F56C6C"
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
    <!-- <el-dialog v-model="moreDialog" title="详情" width="30%">
      <span>详情</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="moreDialog = false">确定</el-button>
        </span>
      </template>
    </el-dialog> -->
    <!-- 立即推送弹窗-->
    <el-dialog v-model="immediatelyPushDialog" title="详情" width="30%">
      <!-- <span>剩余时间：
        <CountDownTime :endTime="pushTime" />
        {{pushTime}}
      </span>
      <br/> -->
      <span>立即推送?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="immediatelyPush">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog v-model="deleteDialog" title="操作" width="30%">
      <span>确定删除?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialog = false">取消</el-button>
          <el-button type="primary" @click="onDeletePusherSelects">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增弹窗 -->
    <el-dialog v-model="addDialog" title="操作" width="30%">
      <el-form
        ref="addFromRef"
        :model="addPusherFrom"
        label-width="90px"
        :rules="addPusherFromRules"
      >
        <el-form-item label="推送人ID" prop="userId">
          <el-input v-model="addPusherFrom.userId" disabled />
        </el-form-item>
        <el-form-item label="推送人名字" prop="userName">
          <el-input v-model="addPusherFrom.userName" disabled />
        </el-form-item>
        <el-form-item label="ip" prop="pushIp">
          <el-input v-model="addPusherFrom.pushIp" disabled />
        </el-form-item>
        <el-form-item label="地址" prop="pushLocation">
          <el-input v-model="addPusherFrom.pushLocation" disabled />
        </el-form-item>
        <el-form-item label="推送标题" prop="pusherTitle">
          <el-input v-model="addPusherFrom.pusherTitle" placeholder="请输入推送标题，不填则使用推送类型作为标题" />
        </el-form-item>
        <!-- <el-form-item label="推送内容" prop="pusherContent">
          <el-input
            placeholder="请输入推送内容"
            v-model="addPusherFrom.pusherContent"
            :rows="4"
            type="textarea"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="推送类型" prop="pusherCategoryOptions">
          <el-select v-model="addPusherFrom.pusherCategoryOptions" placeholder="请输入推送类型">
            <el-option
              v-for="item in pusherCategoryOptions"
              :key="item.text"
              :label="item.value"
              :value="item.text"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="推送周期" prop="pusherLifeTime">
          <el-select v-model="addPusherFrom.pusherLifeTime" placeholder="请选择推送周期">
            <el-option
              v-for="item in pushLifetimeOptions"
              :key="item.text"
              :label="item.value"
              :value="item.text"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="addPusherFrom.pusherLifeTime == '1'" label="推送时间" prop="pushTime">
          <el-date-picker
            v-model="addPusherFrom.pushTime"
            type="datetime"
            placeholder="请选择推送时间"
            :shortcuts="shortcuts"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item v-if="addPusherFrom.pusherLifeTime == '0'" label="推送时间" prop="pushTime">
          <el-time-picker v-model="addPusherFrom.pushTime" type="date" placeholder="请选择推送时间" />
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

<script setup>
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRaw,
} from 'vue'
import {
  addPusherApi,
  cancelPushApi,
  deletePusherApi,
  editPusherApi,
  getIpApi,
  getLocationApi,
  immediatelyPushApi,
  pusherAllListApi,
  pusherListApi,
  rolesAllListApi,
} from '../api'
import { getDictApi } from '../api/dict'
import util from '../util/utils'
import storage from '@/util/storage'

const { proxy } = getCurrentInstance()
// 属性
const userInfo = storage.getItem('userInfo')
const pusherFrom = reactive({
  userId: userInfo.userId,
  pusherTitle: '',
  pusherContent: '',
  // pusherCategoryOptions: undefined
})
const shortcuts = [
  {
    text: '此刻',
    value: new Date(),
  },
  {
    text: '1小时后',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000)
      return date
    },
  },
  {
    text: '3小时后',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 3)
      return date
    },
  },
  {
    text: '1天后',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '3天后',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 3)
      return date
    },
  },
]
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const pusherColumns = [
  { prop: 'pusherId', label: '推送ID' },
  { prop: 'userId', label: '用户ID' },
  { prop: 'userName', label: '用户名' },
  { prop: 'pusherTitle', label: '推送标题' },
  // {
  //   prop: 'pusherContent',
  //   label: '推送内容',
  // },
  {
    prop: 'pusherCategory',
    label: '推送类型',
    formatter(row, column, cellValue) {
      return { 0: '普通天气预报', 1: '温度提醒', 2: '天气提醒', 3: 'AQI提醒' }[cellValue]
    },
  },
  {
    prop: 'pusherLifeTime',
    label: '推送周期',
    formatter(row, column, cellValue) {
      return { 0: '每天', 1: '一次' }[cellValue]
    },
  },
  {
    prop: 'state',
    label: '推送状态',
    formatter(row, column, cellValue) {
      return { 0: '待推送', 1: '今日已推送', 2: '已发送/已过期' }[cellValue]
    },
  },
  {
    prop: 'pushTime',
    label: '推送时间',
    formatter(row, column, cellValue) {
      return util.formateDate(new Date(cellValue))
    },
  },
  {
    prop: 'createTime',
    label: '创建时间',
    formatter(row, column, cellValue) {
      return util.formateDate(new Date(cellValue))
    },
  },
  // {
  //   prop: 'updateTime',
  //   label: '更新时间',
  //   formatter(row, column, cellValue) {
  //     return util.formateDate(new Date(cellValue));
  //   },
  // },
]
const isEdit = ref(false)
const pusherList = ref([])
const pusherSelects = ref([])
const addDialog = ref(false)
const deleteDialog = ref(false)
const moreDialog = ref(false)
const immediatelyPushDialog = ref(false)
const addPusherFrom = reactive({})
addPusherFrom.userId = userInfo.userId
addPusherFrom.userName = userInfo.userName
const roleList = ref([])
const pickerOptions = {
  disabledDate(time) {
    return time.getTime() < Date.now() - 3600 * 1000 * 24
  },
}
const addPusherFromRules = {
  // pusherTitle: {
  //   required: true,
  //   message: '必须填写推送标题',
  //   trigger: 'blur',
  // },
  pusherCategoryOptions: {
    required: true,
    message: '必须选择推送类型',
    trigger: 'blur',
  },
  pusherLifeTime: {
    required: true,
    message: '必须选择推送类型',
    trigger: 'blur',
  },
}
// api
const getPusherList = async() => {
  const params = { ...pusherFrom, ...pager }
  const { list, page } = await pusherListApi(params)
  pager.pageNum = page.pageNum
  pager.total = page.total
  pusherList.value = list
}
const getAllPushersList = async() => {
  const { list, page } = await pusherAllListApi({ userId: userInfo.userId })
  pager.pageNum = page.pageNum
  pager.total = page.total
  pusherList.value = list
}
const cancelPush = async(pusherId) => {
  await cancelPushApi({ pusherId })
  await getPusherList()
}
const pusherCategoryOptions = ref([])
const getPusherCategoryOptions = async() => {
  pusherCategoryOptions.value = await getDictApi('pusher_category')
}
const pushLifetimeOptions = ref([])
const getPushLifetimeOptions = async() => {
  pushLifetimeOptions.value = await getDictApi('pusher_lifetime')
}
const deletePusher = async() => {
  if (pusherSelects.value.length > 0)
    return deletePusherApi({ _ids: pusherSelects.value })
  else
    proxy.$message.error('请选择删除项')

  pusherAllListApi()
}
const getRoleList = async() => {
  roleList.value = await rolesAllListApi()
}
const addPusher = async() => {
  const pusherFormRaw = toRaw(addPusherFrom)
  return addPusherApi(pusherFormRaw)
}
const editPusher = async() => {
  const pusherFormRaw = toRaw(addPusherFrom)
  return editPusherApi(pusherFormRaw)
}
// 通用方法
const resetFields = (refName) => {
  proxy.$refs[refName].resetFields()
}
// 事件方法: 多选时存入选中列表中
const onChangePusherSelects = (list) => {
  pusherSelects.value = list.map(pusher => pusher._id)
}
const onChangeCurrentPage = (currentPage) => {
  pager.pageNum = currentPage
  getPusherList()
}
const onSearchPusherFrom = () => {
  getPusherList()
}
const onResetPusherFrom = () => {
  proxy.$refs.formRef.resetFields()
  getAllPushersList()
}
const onEditPusher = async(pusher) => {
  addDialog.value = true
  isEdit.value = true
  await nextTick(() => {
    Object.assign(addPusherFrom, pusher)
  })
}
const onAddPusherBtn = async() => {
  let ip = ''
  if (!ip) {
    ip = await getIpApi()
    addPusherFrom.pushIp = ip.ip
    const { location } = await getLocationApi()
    addPusherFrom.pushLocation = location.province + location.city
  }
  isEdit.value = false
  addDialog.value = true
}
const onAddDeleteList = (pusher) => {
  pusherSelects.value = [pusher._id]
  deleteDialog.value = true
}
const onDeletePusherSelects = async() => {
  try {
    const { nModified } = await deletePusher()
    if (nModified > 0) {
      pusherSelects.value = []
      proxy.$message.success('删除成功')
    }
  }
  catch (error) {}
  deleteDialog.value = false
  getAllPushersList()
}
const onCancel = () => {
  isEdit.value = false
  resetFields('addFromRef')
  addDialog.value = false
}
const watchMore = (val) => {
  // console.log('watchMore', val)
  moreDialog.value = true
}
// let pushTime = ref('2022-03-20 9:51:00');
let pusherLifeTime = ''
let _id = ''
let pusherId = ''
const openImmediatelyPushDialog = (val) => {
  // console.info('immediatelyPush', val)
  _id = val._id
  pusherId = val.pusherId
  // pushTime = val.pushTime;
  pusherLifeTime = val.pusherLifeTime
  immediatelyPushDialog.value = true
}
const immediatelyPush = async() => {
  await immediatelyPushApi({ _id, pusherId, userId: userInfo.userId, pusherLifeTime })
  await getAllPushersList()
  immediatelyPushDialog.value = false
}
const onSummit = () => {
  proxy.$refs.addFromRef.validate(async(valid) => {
    if (valid) {
      try {
        let res
        if (isEdit.value)
          res = await editPusher()
        else
          res = await addPusher()

        if (res)
          proxy.$message.success('推送添加成功')
        else
          proxy.$message.error('推送添加失败')

        resetFields('addFromRef')
      }
      catch (error) {
        proxy.$message.error('推送添加失败')
      }
      getAllPushersList()
      addDialog.value = false
    }
  })
}
// 生命周期
onMounted(() => {
  getPusherCategoryOptions()
  getPushLifetimeOptions()
  getRoleList()
  getAllPushersList()
})
//
</script>
<style lang="scss" scoped>
  .pusher-page {
    padding: 30px;
    box-sizing: border-box;
    height: 100vh;
    .pusher-from-wrap {
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
