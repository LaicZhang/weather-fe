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
          <el-input v-model="userForm.userEmail" disabled />
          <el-button type="text" @click="changeEmailDialogVisible = true">
            修改邮箱
          </el-button>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="userForm.mobile" disabled />
          <el-button type="text" @click="changeMobileDialogVisible = true">
            修改电话号码
          </el-button>
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
        <!-- <el-form-item label="注册时间">
          <el-input v-model="userForm.createTime" disabled />
        </el-form-item>
        <el-form-item label="最近登陆">
          <el-input v-model="userForm.lastLoginTime" disabled />
        </el-form-item> -->
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
          <el-input v-model="pusherConfigForm.userEmail" />
        </el-form-item>
        <el-form-item v-if="pusherConfigForm.useSms" label="电话号码">
          <el-input v-model="pusherConfigForm.mobile" placeholder="暂不支持国内号码" />
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
  </div>
  <div class="settings-dialog">
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
    <el-dialog v-model="pushDeerDialogVisible" title="Tips" width="40%">
      <p>iOS14+</p>
      <p>苹果手机（iOS 14+）用系统摄像头扫描下方二维码即可拉起轻应用，亦可在苹果商店搜索「PushDeer」安装</p>
      <p>(注意：这里不要安装PushDeer自架版)</p>
      <el-image
        alt="the ios pusherdeer install image"
        :src="`${baseCdnUrl}img/pushdeer-resize.png`"
        style="width:10vw"
      />
      <p>MacOS 11+</p>
      <p>PushDeer有Mac客户端，亦支持推送。可在Mac应用商店中搜索「PushDeer」安装。</p>
      <p>Android</p>
      <p>
        快应用尚在开发，可下载并安装Android测试版APP(
        <a style="color:blue" href="https://github.com/easychen/pushdeer/releases/tag/android1.0alpha">GitHub</a>
        |<a style="color:blue" href="https://gitee.com/easychen/pushdeer/releases/android1.0alpha">Gitee</a>)。
      </p>
      <p>获取key</p>
      <p>
        <ol>
          <li>
            1. 通过apple账号（或微信账号·仅Android版支持）登录
          </li>
          <li>
            2. 切换到「设备」标签页，点击右上角的加号，注册当前设备
          </li>
          <li>
            3. 切换到「Key」标签页，点击右上角的加号，创建一个Key
          </li>
          <li>
            4. 将获取的key填入输入框
          </li>
          <li>
            5. 注意注册设备用到了device token，应用一旦重装，device token会变，所以需要重新注册一次。
          </li>
        </ol>
      </p>
      <!-- 通过访问后边的URL即可推送内容： -->
      <!-- <p>https://api2.pushdeer.com/message/push?pushkey=key&text=要发送的内容</p> -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="pushDeerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="pushDeerDialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <div class="info-dialog">
    <el-dialog v-model="changeEmailDialogVisible" title="修改邮箱" width="30%">
      <el-form ref="changeEmailFormRef" :model="changeEmailForm" :rules="changeEmailRules" label-width="80px">
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="changeEmailForm.userEmail"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="changeEmailForm.captcha" placeholder="请输入验证码" />
          <el-button type="primary" @click="getChangeEmailCaptcha">
            获取验证码
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeEmailSubmit">
            确定
          </el-button>
          <el-button @click="changeEmailDialogVisible = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="changeMobileDialogVisible" title="修改手机号" width="30%">
      <el-form ref="changeMobileFormRef" :model="changeMobileForm" :rules="changeMobileRules" label-width="80px">
        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="changeMobileForm.mobile"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="changeMobileForm.captcha" placeholder="请输入验证码" />
          <el-button type="primary" @click="getChangeMobileCaptcha">
            获取验证码
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeMobileSubmit">
            确定
          </el-button>
          <el-button @click="changeMobileDialogVisible = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
// import { Plus } from '@element-plus/icons-vue'
import {
  changeInfoApi,
  checkCaptchaApi,
  checkRepeatApi,
  getCaptchaEmailApi,
  getCaptchaSmsApi,
  getDictApi,
  getPusherSettingsApi,
  refreshApi,
  updatePusherSettingsApi,
} from '../api'
import util from '../util/utils'
import request from '@/util/request'
import store from '@/store'

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
const baseCdnUrl = store.state.BASE_CDN_URL
const uploadCdnUrl = store.state.UPLOAD_CDN_URL
let sexDict = {}

// settings dialog
const wecomDialogVisible = ref(false)
const dingtalkDialogVisible = ref(false)
const feishuDialogVisible = ref(false)
const serverchanDialogVisible = ref(false)
const pushDeerDialogVisible = ref(false)

// info dialog
const changeEmailDialogVisible = ref(false)
const changeMobileDialogVisible = ref(false)

const changeEmailForm = reactive({
  userEmail: '',
  captcha: '',
})
const checkRepeatUserEmail = async(rule, value, callback) => {
  const { userEmail } = changeEmailForm
  if (!userEmail)
    return
  const { isRepeat } = await checkRepeatApi({ userEmail })
  return isRepeat !== undefined ? callback(new Error('邮箱已存在')) : callback()
}
const changeEmailRules = {
  userEmail: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
    { validator: checkRepeatUserEmail, trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 6, message: '请输入正确验证码', trigger: 'blur' },
  ],
}
const changeMobileForm = reactive({
  mobile: '',
  captcha: '',
})
const checkRepeatMobile = async(rule, value, callback) => {
  const { mobile } = changeMobileForm
  if (!mobile)
    return
  const { isRepeat } = await checkRepeatApi({ mobile })
  return isRepeat !== undefined ? callback(new Error('手机号已存在')) : callback()
}
const changeMobileRules = {
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '手机号长度为11位', trigger: 'blur' },
    { validator: checkRepeatMobile, trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 6, message: '请输入正确验证码', trigger: 'blur' },
  ],
}

const isVisitor = ref(true)
const uploadData = ref({
  userId: userInfo.userId,
})
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

const getChangeEmailCaptcha = async() => {
  const res = await getCaptchaEmailApi({
    userEmail: changeEmailForm.userEmail,
  })
  if (res)
    ElMessage.success('验证码已发送')

  else
    ElMessage.error(res.msg)
}
const changeEmailSubmit = async() => {
  const { state } = await checkCaptchaApi({
    userId: userForm.userId,
    userEmail: changeEmailForm.userEmail,
    captcha: changeEmailForm.captcha,
  })
  if (state === 1) {
    ElMessage.success('修改成功')
    userForm.userEmail = changeEmailForm.userEmail
    changeEmailDialogVisible.value = false
  }
  else {
    ElMessage.error(res.msg)
  }
}
const getChangeMobileCaptcha = async() => {
  const res = await getCaptchaSmsApi({
    mobile: changeMobileForm.mobile,
  })
  if (res)
    ElMessage.success('验证码已发送')

  else
    ElMessage.error(res.msg)
}
const changeMobileSubmit = async() => {
  const { state } = await checkCaptchaApi({
    userId: userForm.userId,
    mobile: changeMobileForm.mobile,
    captcha: changeMobileForm.captcha,
  })
  if (state === 1) {
    ElMessage.success('修改成功')
    userForm.usermobile = changeMobileForm.mobile
    changeMobileDialogVisible.value = false
  }
  else {
    ElMessage.error(res.msg)
  }
}

const isVisitorFn = () => {
  if (userInfo.role === 2)
    isVisitor.value = false
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
const init = async() => {
  sexDict = await getDictApi('sex')
}
const imageUrl = ref(`${uploadCdnUrl}${userInfo.avatar}`)
const handleAvatarSuccess = (res, file) => {
  imageUrl.value = URL.createObjectURL(file.raw)
  refreshInfo()
  console.log('handleAvatarSuccess', res, file, imageUrl.value)
}
const beforeAvatarUpload = (file) => {
  const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt5M = file.size / 1024 / 1024 < 2

  if (!isImage)
    ElMessage.error('Avatar picture must be JPG/PNG format!')

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
