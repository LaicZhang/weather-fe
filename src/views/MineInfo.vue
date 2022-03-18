<template>
  <div class="mine-info-page">
    <el-card class="mine-info-left">
      <span>个人信息</span>
      <el-upload
        class="avatar-uploader"
        action="https://weather-api.zyha.cn/api/upload"
        :data="uploadData"
        :limit="1"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-image v-if="imageUrl" alt="user avatar" lazy class="avatar" :src="imageUrl" />
        <!-- <el-icon class="avatar-uploader-icon">
          <Plus />
        </el-icon> -->
      </el-upload>
      <el-form ref="formRef" :model="userForm" label-width="60px" label-position="left">
        <el-form-item label="用户ID">
          <el-input v-model="userForm.userId" disabled />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userForm.userName" disabled />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userForm.sexText" @change="(value) => (userForm.sex = value)">
            <el-option label="男" value="1" />
            <el-option label="女" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.userEmail" />
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="userForm.mobile" />
        </el-form-item>
        <!-- <el-form-item label="密码">
          <el-input
            type="password"
            v-model="userForm.userPwd"
          ></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="确认密码" v-show="isChangePassword">
          <el-input type="password" v-model="userForm.userPwd2"></el-input>
        </el-form-item> -->
        <el-form-item label="注册时间">
          <el-input v-model="userForm.createTime" disabled />
        </el-form-item>
        <el-form-item label="最近登陆">
          <el-input v-model="userForm.lastLoginTime" disabled />
        </el-form-item>
        <!-- <el-form-item label="验证码" v-if="flag">
          <el-input v-model="userForm.code"></el-input>
        </el-form-item> -->
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="onSubmit(userForm)">
              提交
            </el-button>
            <el-button @click="resetForm">
              撤销修改
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-card v-show="isVisitor" class="mine-info-right">
      <span>推送配置</span>
      <el-form ref="configRef" :model="pusherConfigForm" label-position="left">
        <el-form-item>
          <el-checkbox v-model="pusherConfigForm.useEmail" label="邮箱" border />
          <el-checkbox v-model="pusherConfigForm.useSms" label="短信" border />
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
          <el-input v-model="pusherConfigForm.userEmail" />
        </el-form-item>
        <el-form-item v-if="pusherConfigForm.useSms" label="电话号码">
          <el-input v-model="pusherConfigForm.mobile" placeholder="暂不支持国内号码" />
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
  </div>
  <el-dialog v-model="wecomDialogVisible" title="Tips" width="30%">
    <span>开启企业微信内部群群机器人方法：
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
    <span><a href="https://sct.ftqq.com/sendkey" style="color:blue" target="view_window">点击此处</a> 获取SCKEY
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="serverchanDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="serverchanDialogVisible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {
  changeInfoApi,
  getDictApi,
  getPusherSettingsApi,
  refreshApi,
  updatePusherSettingsApi,
} from '../api'
import util from '../util/utils'
import request from '@/util/request'
// import store from '@/store'
import useVuexWithRouter from '@/hooks/useVuexWithRouter'

const { router, store } = useVuexWithRouter()

const userForm = reactive({})
const userInfo = store.state.userInfo
const cdnUrl = store.state.BASE_CDN_URL
let sexDict = {}
const flag = ref(false)
const isChangeEmail = ref(false)
const isChangeMobile = ref(false)
const isChangePassword = ref(false)
const wecomDialogVisible = ref(false)
const dingtalkDialogVisible = ref(false)
const feishuDialogVisible = ref(false)
const serverchanDialogVisible = ref(false)
const isVisitor = ref(true)
const uploadData = ref({
  userId: userInfo.userId,
})
let pusherConfigForm = reactive({
  // useEmail: true,
  // useSms: true,
  // useFeiShu: false,
  // useWeCom: false,
  // useDingtalk: false,
  // useServerChan: false
})

const isVisitorFn = () => {
  if (userInfo.role === 2) {
    isVisitor.value = false
    console.log('isVisitor', isVisitor.value)
  }
}
const updatePusherSettings = async() => {
  const data = await updatePusherSettingsApi(pusherConfigForm)
  console.log('updatePusherSettings=>', data)
}
const getPusherSettings = async() => {
  const { list } = await getPusherSettingsApi({ userId: userInfo.userId })
  pusherConfigForm = Object.assign(pusherConfigForm, list)
  console.log('getPusherSettings=>', pusherConfigForm)
}
const onSubmit = async(data) => {
  console.log('userForm', data)
  await changeInfoApi(data)
}
const refreshInfo = async() => {
  const data = await refreshApi({ userId: userInfo.userId })
  console.log('refreshInfo=>', data)
  store.commit('setUserInfo', data)
}
const getUserInfo = () => {
  request
    .get('/users/info', { userName: userInfo.userName })
    .then((res) => {
      Object.assign(userForm, res)
      if (userForm.sex === 1)
        userForm.sexText = '男'
      else
        userForm.sexText = '女'

      userForm.createTime = util.formateDate(new Date(userForm.createTime))
      userForm.lastLoginTime = util.formateDate(new Date(userForm.lastLoginTime))
    })
    .catch(() => {
      console.error('获取用户信息失败')
    })
}
const resetForm = () => {
  getUserInfo()
}
const onSubmitPusherConfigForm = () => {
  console.log('pusherConfigForm', pusherConfigForm)
  updatePusherSettings()
}
const resetPusherConfigForm = () => {
  getPusherSettings()
}
const init = () => {
  sexDict = getDictApi('sex')
}
const imageUrl = ref(`${cdnUrl}${userInfo.avatar}`)
const handleAvatarSuccess = (res, file) => {
  imageUrl.value = URL.createObjectURL(file.raw)
  refreshInfo()
  console.log('handleAvatarSuccess', res, file, imageUrl.value)
}
const beforeAvatarUpload = (file) => {
  const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage)
    ElMessage.error('Avatar picture must be JPG format!')

  if (!isLt5M)
    ElMessage.error('Avatar picture size can not exceed 2MB!')

  return isImage && isLt5M
}

onMounted(() => {
  init()
  isVisitorFn()
  getUserInfo()
  getPusherSettings()
})
</script>

<style lang="scss" scoped>
  .mine-info-page {
    padding: 30px;
    // box-sizing: border-box;
    height: 100vh;
    .mine-info-left {
      float: left;
      text-align: center;
      line-height: 45px;
      width: 30vw;
      height: 80vh;
      .avatar{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        z-index: 99;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
      }
    .avatar-uploader .avatar:hover {
      border-color: var(--el-color-primary);
      opacity:0.5;
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      z-index: 999;
      text-align: center;
    }
    // .avatar {
    //   width: 178px;
    //   height: 178px;
    //   display: block;
    // }
    }
    .mine-info-right {
      float: right;
      text-align: center;
      line-height: 45px;
      width: 35vw;
      height: 80vh;
      margin-right: 110px;
      overflow-y: auto;
    }
  }
</style>
