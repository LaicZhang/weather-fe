<script setup lang="ts">
import { reactive, ref } from 'vue'
import PasswordMeter from 'vue-simple-password-meter'
import { ElMessage } from 'element-plus'
import useVuexWithRouter from '@/hooks/useVuexWithRoutert'
import { changePasswordApi, sendCaptchaEmailApi, sendCaptchaSmsApi } from '@/api'

const methodsRadio = ref('邮件')
const content = ref('发送验证码')
const totalTime = ref(60)
const userFormRef: any = ref(null)
const { router } = useVuexWithRouter()
const userRules = {
  userName: [
    {
      required: true,
      message: '必须填写用户名',
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
const userForm: any = reactive({
  userName: '',
  userEmail: '',
  captchaCode: '',
  changeAction: 'forget',
})

const sendCaptchaCode = async () => {
  let data
  if (methodsRadio.value === '邮件')
    data = await sendCaptchaEmailApi({ userEmail: userForm.userEmail })

  else
    await sendCaptchaSmsApi({ mobile: userForm.mobile })

  const clock = window.setInterval(() => {
    content.value = `${totalTime.value}s后重新发送`
    totalTime.value--
    if (totalTime.value < 0) {
      totalTime.value = 60
      content.value = '重新发送验证码'
      window.clearInterval(clock)
    }
  }, 1000)
}
const toPageLogin = () => {
  router.push('/login')
}
const userFromCommit = () => {
  userFormRef.value.validate(async (valid: any) => {
    if (valid) {
      const data = await changePasswordApi(userForm)
      if (data) {
        ElMessage({
          message: '修改成功',
          type: 'success',
        })
      }
      toPageLogin()
    }
    else {
      return false
    }
  })
}
</script>

<template>
  <div class="forget-page">
    <el-form ref="userFormRef" class="forget-form" :model="userForm" :rules="userRules" status-icon>
      <!-- <div class="forget-title">
        忘记密码？
      </div> -->
      <el-form-item>
        <div class="methods-radio">
          <span style="font-size:23px">通过</span>
          <el-radio-group v-model="methodsRadio" size="small">
            <el-radio-button label="邮件" />
            <el-radio-button label="手机号码" />
          </el-radio-group>
          <span style="font-size:23px">找回</span>
        </div>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input
          v-model="userForm.userName"
          type="text"
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item prop="userEmail">
        <el-input
          v-if="methodsRadio === '邮件'"
          v-model="userForm.userEmail"
          placeholder="请输入邮箱"
        />
        <el-input
          v-if="methodsRadio === '手机号码'"
          v-model="userForm.mobile"
          placeholder="请输入手机号码"
        />
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          v-model="userForm.userPwd"
          type="password"
          placeholder="请输入密码"
        />
        <!-- <password-strength-show :pwdee="userForm.userPwd" /> -->
        <password-meter :password="userForm.userPwd" />
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          v-model="userForm.userConfirmPwd"
          type="password"
          placeholder="请确认密码"
        />
      </el-form-item>
      <el-form-item prop="captchaCode">
        <div style="display:inline;width:20vw">
          <el-input v-model="userForm.captchaCode" type="text" placeholder="请输入验证码" />
        </div>
        <div style="display:inline">
          <el-button :disabled="totalTime < 60" @click="sendCaptchaCode">
            {{ content }}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="forget-submit" @click="userFromCommit">
          确定
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
  .forget-page {
    width: 100vw;
    height: 100vh;
    .forget-form {
      padding: 30px;
      width: 400px;
      height: 300px;
      box-shadow: $shadow-light;
      border-radius: 10px;
      @extend .center-all;
      text-align: center;
      .forget-title {
        height: 60px;
        font-size: $font-size-large;
        text-align: center;
      }
      .methods-radio{
        display: flex;
        justify-content: center;
        align-items: center;
        margin:0 auto;
      }
      .forget-submit {
        width: 100%;
      }
    }
  }
</style>
