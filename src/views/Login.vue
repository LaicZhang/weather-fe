<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import useVuexWithRouter from '@/hooks/useVuexWithRoutert'
import { getIpApi, getWeatherLikeApi, loginApi, menuPermissionApi } from '@/api'

const { router, store } = useVuexWithRouter()
function toPageHome() {
  router.push('/')
}
const BASE_CDN_URL: string = store.state.BASE_CDN_URL
const baseImgUrl = ref(`${BASE_CDN_URL}/img/bg-default.png`)
const coverImgUrl = ref('')
// const captchaRef = ref('')
const userFormRef: any = ref(null)
const userForm = reactive({
  userName: '',
  userPwd: '',
  isRememberMe: true,
})
const userRules = {
  userName: [
    {
      required: true,
      message: '必须填写用户名',
      trigger: 'blur',
    },
  ],
  userPwd: [
    {
      required: true,
      message: '必须填写密码',
      trigger: 'blur',
    },
  ],
  captchaCode: [
    {
      required: true,
      message: '必须填写验证码',
      trigger: 'blur',
    },
  ],
}
// const componentKey = ref(0)
async function getMenuPermission() {
  const { menuList, actionList } = await menuPermissionApi()
  store.commit('setActionList', actionList)
  store.commit('setMenuList', menuList)
}
function encodedUserPwd(userPwd: string) {
  userForm.userPwd = btoa(userPwd)
  return userForm.userPwd
}
function userFromCommit() {
  userFormRef.value.validate(async (valid: any) => {
    if (valid) {
      encodedUserPwd(userForm.userPwd)
      const loginInfo = await loginApi(userForm)
      store.commit('setUserInfo', loginInfo)
      await getMenuPermission()
      toPageHome()
    }
    else {
      return false
    }
  })
}
async function getWeatherLike() {
  const { condition } = await getWeatherLikeApi()
  coverImgUrl.value = `${BASE_CDN_URL}/img/bg-${condition}.png`
}
function toRegister() {
  router.push('/register')
}
function toForget() {
  router.push('/forget')
}
function toHomeAsVisitor() {
  userForm.userName = 'visitor'
  userForm.userPwd = '123456'
  // userForm.captchaCode = '123456'
  userFromCommit()
}
onMounted(() => {
  getIpApi()
  getWeatherLike()
})
</script>

<template>
  <div class="bg" :style="{ backgroundImage: `url(${coverImgUrl ? coverImgUrl : baseImgUrl})`, backgroundSize: 'cover' }">
    <div class="login-page">
      <el-form ref="userFormRef" class="login-form" :model="userForm" :rules="userRules" status-icon>
        <div class="login-title">
          登陆
        </div>
        <el-form-item prop="userName">
          <el-input v-model="userForm.userName" type="text" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input v-model="userForm.userPwd" type="password" placeholder="请输入密码" />
        </el-form-item>
        <!-- <el-form-item>
        <el-image alt="Captcha image" :key="componentKey" @click="changeCaptcha" :src="captchaRef"></el-image>
      </el-form-item> -->
        <!-- <el-form-item prop="captchaCode">
        <el-input v-model="userForm.captchaCode" type="text" placeholder="请输入验证码"></el-input>
      </el-form-item> -->
        <el-form-item>
          <el-button type="text" @click="toForget">
            忘记密码？
          </el-button>
          <span>或</span>
          <el-button type="text" @click="toRegister">
            注册
          </el-button>
          <span>或</span>
          <el-button type="text" @click="toHomeAsVisitor">
            不想注册？一键游客登陆
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="userForm.isRememberMe" label="记住我" border />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-submit" size="large" @click="userFromCommit">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .login-page {
    width: 100vw;
    height: 100vh;
    .login-form {
      padding: 30px;
      width: 400px;
      height: 300px;
      box-shadow: $shadow-light;
      border-radius: 10px;
      @extend .center-all;
      text-align: center;
      background-color: #ffffff;
      .login-title {
        height: 60px;
        font-size: $font-size-large;
        text-align: center;
      }
      .login-submit {
        width: 100%;
        display: block;
        margin: 0 auto;
      }
    }
  }
</style>
