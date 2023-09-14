<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import PasswordMeter from 'vue-simple-password-meter'
import { ElMessage } from 'element-plus'
import useVuexWithRouter from '@/hooks/useVuexWithRoutert'
import { checkRepeatApi, menuPermissionApi, registerApi, sendCaptchaEmailApi } from '@/api'

const { router, store } = useVuexWithRouter()
function toPageHome() {
  router.push('/')
}
const userFormRef = ref(null)
const userForm = reactive({
  userName: '',
  userEmail: '',
  userPwd: '',
})

async function checkRepeatUserName(rule, value, callback) {
  const { userName } = userForm
  if (!userName)
    return
  const { isRepeat } = await checkRepeatApi({ userName })
  // return isRepeat !== undefined ? callback(new Error('用户名已存在')) : callback()
  if (isRepeat)
    return callback(new Error('用户名已存在'))
}
async function checkRepeatUserEmail(rule, value, callback) {
  const { userEmail } = userForm
  if (!userEmail)
    return
  const { isRepeat } = await checkRepeatApi({ userEmail })
  // return isRepeat !== undefined ? callback(new Error('邮箱已存在')) : callback()
  if (isRepeat)
    return callback(new Error('邮箱已存在'))
}
const userRules = {
  userName: [
    {
      required: true,
      message: '请填写用户名',
      trigger: 'blur',
    },
    { validator: checkRepeatUserName, trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z]+$/, message: '只能是字母', trigger: 'blur' },
  ],
  userEmail: [
    {
      required: true,
      message: '请填写邮箱',
      trigger: 'blur',
    },
    { validator: checkRepeatUserEmail, trigger: 'blur' },
  ],
  userPwd: [
    {
      required: true,
      message: '请填写密码',
      trigger: 'blur',
    },
    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },
  ],
  userConfirmPwd: [
    {
      required: true,
      message: '请确认密码',
      trigger: 'blur',
    },
  ],
  captcha: [
    {
      required: true,
      message: '请填写验证码',
      trigger: 'blur',
    },
  ],
}
async function getMenuPermission() {
  const { menuList, actionList } = await menuPermissionApi()
  store.commit('setActionList', actionList)
  store.commit('setMenuList', menuList)
}
const arr = [
  { value: '@qq.com' },
  { value: '@gmail.com' },
  { value: '@126.com' },
  { value: '@163.com' },
  { value: '@hotmail.com' },
  { value: '@yahoo.com' },
  { value: '@sohu.com' },
  { value: '@sina.com' },
  { value: '@139.com' },
  { value: '@189.com' },
]
function querySearch(queryString, callback) {
  const results = []
  queryString = queryString.toLowerCase()

  for (const item in arr)
    results[item] = `${queryString}${arr[item].value}`

  callback(results)
}
function handleSelect(item) {
  userForm.userEmail = item
}
function encodedUserPwd(userPwd) {
  return btoa(userPwd)
}
function decodedUserPwd(userPwd) {
  return atob(userPwd)
}
function userFromCommit() {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      if (userForm.userPwd !== userForm.userConfirmPwd) {
        ElMessage.error('两次密码不一致')
        return false
      }
      userForm.userPwd = encodedUserPwd(userForm.userPwd)
      userForm.userConfirmPwd = encodedUserPwd(userForm.userConfirmPwd)
      const registerInfo = await registerApi(userForm)
      store.commit('setUserInfo', registerInfo)
      await getMenuPermission()
      toPageHome()
    }
    else {
      userForm.userPwd = decodedUserPwd(userForm.userPwd)
      userForm.userConfirmPwd = decodedUserPwd(userForm.userConfirmPwd)
      return ElMessage.error('请检查表单')
    }
  })
}
async function sendCaptchaEmail() {
  const data = await sendCaptchaEmailApi({ userEmail: userForm.userEmail })
}
function toLogin() {
  router.push('/login')
  // router.back()
}
</script>

<template>
  <div class="register-page">
    <el-form
      ref="userFormRef"
      class="register-form"
      :model="userForm"
      :rules="userRules"
      status-icon
    >
      <div class="register-title">
        注册
      </div>
      <el-form-item prop="userName">
        <el-input
          v-model="userForm.userName"
          type="text"
          clearable
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          @change="checkRepeatUserName"
        />
      </el-form-item>
      <el-form-item prop="userEmail">
        <el-autocomplete
          v-model="userForm.userEmail"
          type="text"
          style="width: 28vw;"
          placeholder="请输入邮箱"
          prefix-icon="el-icon-email"
          clearable
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          @select="handleSelect"
        >
          <template #default="{ item }">
            <div class="user-email-value">
              {{ item }}
            </div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          v-model="userForm.userPwd"
          type="password"
          clearable
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
        />
        <!-- <password-strength-show :pwdee="userForm.userPwd" /> -->
        <PasswordMeter :password="userForm.userPwd" />
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          v-model="userForm.userConfirmPwd"
          type="password"
          clearable
          placeholder="请确认密码"
          prefix-icon="el-icon-lock"
        />
      </el-form-item>
      <el-form-item v-if="userForm.userConfirmPwd">
        <el-input
          v-model="userForm.captcha"
          type="text"
          clearable
          placeholder="请输入验证码"
          style="width: 20vw;"
        />
        <el-button @click="sendCaptchaEmail">
          发送邮件验证码
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="toLogin">
          已有账号？点击登陆
        </el-button>
        <el-button type="primary" class="register-submit" @click="userFromCommit">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss"  scoped>
.register-page {
  width: 100vw;
  height: 100vh;
  .register-form {
    padding: 30px;
    width: 400px;
    height: 300px;
    box-shadow: $shadow-light;
    border-radius: 10px;
    @extend .center-all;
    text-align: center;
    .register-title {
      height: 60px;
      font-size: $font-size-large;
      text-align: center;
    }
    .register-submit {
      width: 100%;
    }
  }
}
</style>
