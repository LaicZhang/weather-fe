<template>
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
</template>

<script>
import { defineComponent, onBeforeMount, onMounted, reactive, ref } from 'vue'
import useVuexWithRouter from '@/hooks/useVuexWithRoutertjs'
import { getIpApi, loginApi, menuPermissionApi } from '@/api'

export default defineComponent({
  name: 'LoginPage',
  components: {},
  setup() {
    const { router, store } = useVuexWithRouter()
    const toPageHome = () => {
      console.log('toPageHome')
      router.push('/')
    }
    const captchaRef = ref('')
    const userFormRef = ref(null)
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
    const getMenuPermission = async() => {
      const { menuList, actionList } = await menuPermissionApi()
      store.commit('setActionList', actionList)
      store.commit('setMenuList', menuList)
    }
    const userFromCommit = () => {
      userFormRef.value.validate(async(valid) => {
        if (valid) {
          const loginInfo = await loginApi(userForm)
          console.log('loginInfo=>', loginInfo)
          store.commit('setUserInfo', loginInfo)
          await getMenuPermission()
          toPageHome()
        }
        else {
          return false
        }
      })
    }

    const toRegister = () => {
      router.push('/register')
    }
    const toForget = () => {
      router.push('/forget')
    }
    const toHomeAsVisitor = () => {
      userForm.userName = 'visitor'
      userForm.userPwd = '123456'
      userForm.captchaCode = '123456'
      console.log('userForm=>', userForm)
      userFromCommit()
    }
    const componentKey = ref(0)
    onMounted(() => {
      getIpApi()
    })
    return {
      toPageHome,
      captchaRef,
      componentKey,
      userFormRef,
      userForm,
      userRules,
      userFromCommit,
      toRegister,
      toForget,
      toHomeAsVisitor,
      onMounted,
      // changeCaptcha
    }
  },
})
</script>

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
