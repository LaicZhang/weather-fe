<template>
  <el-card v-show="isVisitor" class="mine-info-right">
    <span>推送配置</span>
    <el-form ref="configRef" :model="pusherConfigForm" label-position="left">
      <el-form-item>
        <el-checkbox v-model="pusherConfigForm.useEmail" label="邮箱" border />
        <el-checkbox v-model="pusherConfigForm.useSms" label="短信" border />
        <el-checkbox v-model="pusherConfigForm.usePushDeer" label="PushDeer" border />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="pusherConfigForm.useFeiShu" label="飞书" border />
        <el-checkbox v-model="pusherConfigForm.useDingTalk" label="钉钉" border />
        <el-checkbox v-model="pusherConfigForm.useWeCom" label="企业微信" border />
        <el-checkbox
          v-model="pusherConfigForm.useServerChan"
          label="Server酱"
          border
        />
      </el-form-item>
      <el-form-item v-if="pusherConfigForm.useEmail" label="电子邮箱">
        <el-input v-model="pusherConfigForm.userEmail" disabled />
      </el-form-item>
      <el-form-item v-if="pusherConfigForm.useSms" label="电话号码">
        <el-input v-model="pusherConfigForm.mobile" placeholder="国内号码暂不支持" />
        国内短信推送仅支持审核成功的正文模版，暂不支持推送自定义天气信息，此处设置仅实现在企业微信中推送时@此手机号码账号功能
      </el-form-item>
      <el-form-item v-if="pusherConfigForm.usePushDeer">
        <el-button type="text" @click="pushDeerDialogVisible=true">
          pushkey获取方法
        </el-button>
        <el-input v-model="pusherConfigForm.pushkey" placeholder="" />
      </el-form-item>
      <el-form-item v-if="pusherConfigForm.useFeiShu">
        <el-button type="text" @click="feishuDialogVisible=true">
          飞书群消息机器人网址获取方法
        </el-button>
        <el-input v-model="pusherConfigForm.feishuUrl" placeholder="飞书群消息机器人网址" />
      </el-form-item>
      <el-form-item v-if="pusherConfigForm.useWeCom">
        <el-button type="text" @click="wecomDialogVisible=true">
          企业微信群消息机器人网址获取方法
        </el-button>
        <el-input v-model="pusherConfigForm.wecomUrl" placeholder="企业微信群消息机器人网址" />
      </el-form-item>
      <el-form-item v-if="pusherConfigForm.useDingTalk">
        <el-button type="text" @click="dingtalkDialogVisible=true">
          钉钉群消息机器人网址获取方法
        </el-button>
        <el-input v-model="pusherConfigForm.dingtalkUrl" placeholder="钉钉群消息机器人网址" />
      </el-form-item>
      <el-form-item v-if="pusherConfigForm.useServerChan">
        <el-button type="text" @click="serverchanDialogVisible=true">
          server酱key获取方法
        </el-button>
        <el-input v-model="pusherConfigForm.serverChanKey" placeholder="server酱key" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitPusherConfigForm">
          提交
        </el-button>
        <el-button @click="resetPusherConfigForm">
          撤销修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <div class="settings-dialog">
    <el-dialog v-model="wecomDialogVisible" title="Tips" width="30%">
      <span>
        开启企业微信内部群群机器人方法：
        手机端开启入口，进入企业微信内部群聊，点击右上角的群组，在群聊信息页面中群成员就可以看到添加群机器人按钮了，并添加群机器人了。
        电脑端开启入口，在PC端选中群聊点击鼠标右键即可发现添加机器人按钮.
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="wecomDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="wecomDialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dingtalkDialogVisible" title="Tips" width="30%">
      <span>在群设置->群助理里添加自定义机器人后获得，添加中的"自定义关键字"请设置为：LAICWEATHER
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dingtalkDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dingtalkDialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="feishuDialogVisible" title="Tips" width="30%">
      <span>在群设置添加自定义机器人后获得的网址
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="feishuDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="feishuDialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="serverchanDialogVisible" title="Tips" width="30%">
      <span>
        <a href="https://sct.ftqq.com/sendkey" style="color:blue" target="view_window">点击此处</a> 获取SCKEY
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="serverchanDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="serverchanDialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="pushDeerDialogVisible" title="Tips" width="40%">
      <pusherdeerAlert />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="pushDeerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="pushDeerDialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
// import { ElMessage } from 'element-plus'
// import { Plus } from '@element-plus/icons-vue'
import util from '@/util/utils'
import {
  getPusherSettingsApi,
  getUserInfoApi,
  // refreshApi,
  updatePusherSettingsApi,
} from '@/api'
import store from '@/store'
import pusherdeerAlert from '@/components/info/pushdeer-alert.vue'

const userForm = reactive({
  userId: 0,
  userName: '',
  sex: 1,
  userEmail: '',
  sexText: '',
  mobile: '',
  createTime: '',
  lastLoginTime: '',
})
const userInfo = store.state.userInfo

// settings dialog
const configRef = ref(null)
const wecomDialogVisible = ref(false)
const dingtalkDialogVisible = ref(false)
const feishuDialogVisible = ref(false)
const serverchanDialogVisible = ref(false)
const pushDeerDialogVisible = ref(false)

const isVisitor = ref(true)
let pusherConfigForm = reactive({
  useEmail: true,
  useSms: false,
  useFeiShu: false,
  useWeCom: false,
  useDingTalk: false,
  useServerChan: false,
  usePushDeer: false,
  userEmail: '',
  mobile: '',
  pushkey: '',
  feishuUrl: '',
  wecomUrl: '',
  dingtalkUrl: '',
  serverChanKey: '',
})

const isVisitorFn = () => {
  if (userInfo.role === 2)
    isVisitor.value = false
}
const updatePusherSettings = async() => {
  await updatePusherSettingsApi(pusherConfigForm)
}
const getPusherSettings = async() => {
  const { list } = await getPusherSettingsApi({ userId: userInfo.userId })
  pusherConfigForm = Object.assign(pusherConfigForm, list)
}
const getUserInfo = async() => {
  const data = await getUserInfoApi({ userId: userInfo.userId })
  Object.assign(userForm, data)
  if (userForm.sex === 1)
    userForm.sexText = '男'
  else
    userForm.sexText = '女'

  userForm.createTime = util.formateDate(new Date(userForm.createTime))
  userForm.lastLoginTime = util.formateDate(new Date(userForm.lastLoginTime))
}
const onSubmitPusherConfigForm = () => {
  updatePusherSettings()
}
const resetPusherConfigForm = () => {
  getPusherSettings()
}

onMounted(() => {
  isVisitorFn()
  getUserInfo()
  getPusherSettings()
})
</script>

<style lang="scss" scoped>
    .mine-info-right {
      float: right;
      text-align: center;
      line-height: 45px;
      width: 35vw;
      height: 80vh;
      margin-right: 110px;
      overflow-y: auto;
    }
</style>
