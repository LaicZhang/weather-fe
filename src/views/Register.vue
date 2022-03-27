
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
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          @change="checkRepeatUserName"
        />
      </el-form-item>
      <el-form-item prop="userEmail">
        <el-input
          v-model="userForm.userEmail"
          type="text"
          placeholder="请输入邮箱"
          prefix-icon="el-icon-email"
          @change="checkRepeatUserEmail"
        />
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          v-model="userForm.userPwd"
          type="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
        />
        <!-- <password-strength-show :pwdee="userForm.userPwd" /> -->
        <password-meter :password="userForm.userPwd" />
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          v-model="userForm.userConfirmPwd"
          type="password"
          placeholder="请确认密码"
          prefix-icon="el-icon-lock"
        />
      </el-form-item>
      <el-form-item v-if="userForm.userConfirmPwd">
        <el-input
          v-model="userForm.captcha"
          type="text"
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

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import PasswordMeter from 'vue-simple-password-meter'
import useVuexWithRouter from '@/hooks/useVuexWithRoutertjs'
import { checkRepeatApi, menuPermissionApi, registerApi, sendCaptchaEmailApi } from '@/api'
export default defineComponent({
  name: 'Register',
  components: {
    PasswordMeter,
  },
  setup() {
    const { router, store } = useVuexWithRouter()
    const toPageHome = () => {
      router.push('/')
    }
    const userFormRef = ref(null)
    const userForm = reactive({
      userName: '',
      userEmail: '',
      userPwd: '',
    })

    // const checkPhone = (rule, value, callback) => {
    //   const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
    //   if (!value)
    //     return callback(new Error('电话号码不能为空'))

    //   setTimeout(() => {
    //   // Number.isInteger是es6验证数字是否为整数的方法,但是实际用的时候输入的数字总是识别成字符串
    //   // 所以在加了一个+实现隐式转换
    //     if (!Number.isInteger(+value)) {
    //       callback(new Error('请输入数字值'))
    //     }
    //     else {
    //       if (phoneReg.test(value))
    //         callback()

    //       else
    //         callback(new Error('电话号码格式不正确'))
    //     }
    //   }, 100)
    // }
    const checkRepeatUserName = async(rule, value, callback) => {
      const { userName } = userForm
      if (!userName)
        return
      const { isRepeat } = await checkRepeatApi({ userName })
      return isRepeat !== undefined ? callback(new Error('用户名已存在')) : callback()
    }
    const checkRepeatUserEmail = async(rule, value, callback) => {
      const { userEmail } = userForm
      if (!userEmail)
        return
      const { isRepeat } = await checkRepeatApi({ userEmail })
      return isRepeat !== undefined ? callback(new Error('邮箱已存在')) : callback()
    }
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      setTimeout(() => {
        if (mailReg.test(value))
          callback()
        else
          callback(new Error('请输入正确的邮箱格式'))
      }, 100)
    }
    const userRules = {
      userName: [
        {
          required: true,
          message: '请填写用户名',
          trigger: 'blur',
        },
        { validator: checkRepeatUserName, trigger: 'blur' },
      ],
      userEmail: [
        {
          required: true,
          message: '请填写邮箱',
          trigger: 'blur',
        },
        { validator: checkEmail, trigger: 'blur' },
        { validator: checkRepeatUserEmail, trigger: 'blur' },
      ],
      userPwd: [
        {
          required: true,
          message: '请填写密码',
          trigger: 'blur',
        },
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
    const getMenuPermission = async() => {
      const { menuList, actionList } = await menuPermissionApi()
      store.commit('setActionList', actionList)
      store.commit('setMenuList', menuList)
    }
    const userFromCommit = () => {
      userFormRef.value.validate(async(valid) => {
        if (valid) {
          if (userForm.userPwd !== userForm.userConfirmPwd) {
            this.$message.error('两次密码不一致')
            return false
          }
          const registerInfo = await registerApi(userForm)
          store.commit('setUserInfo', registerInfo)
          await getMenuPermission()
          toPageHome()
        }
        else {
          return false
        }
      })
    }
    const sendCaptchaEmail = async() => {
      console.log('userForm', userForm)
      const data = await sendCaptchaEmailApi({ userEmail: userForm.userEmail })
      console.log('sendCaptchaEmail=>', data)
    }
    const toLogin = () => {
      router.push('/login')
    }
    return {
      toPageHome,
      toLogin,
      userFormRef,
      userForm,
      sendCaptchaEmail,
      userRules,
      userFromCommit,
      checkRepeatUserName,
      checkRepeatUserEmail,
    }
  },
})
</script>

<style lang="scss"  scoped >
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
