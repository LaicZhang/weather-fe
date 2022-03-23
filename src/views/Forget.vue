<template>
  <div class="forget-page">
    <el-form ref="userFormRef" class="forget-form" :model="userForm" :rules="userRules" status-icon>
      <div class="forget-title">
        <!-- 忘记密码？ -->
      </div>
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
          v-if="methodsRadio==='邮件'"
          v-model="userForm.userEmail"
          placeholder="请输入邮箱"
        />
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input
          v-if="methodsRadio==='手机号码'"
          v-model="userForm.mobile"
          placeholder="请输入手机号码"
        />
      </el-form-item>
      <!-- <el-form-item>
        <el-image :key="componentKey" alt="Captcha image" :src="captchaRef" @click="changeCaptcha" />
      </el-form-item> -->
      <el-form-item prop="captchaCode">
        <div style="display:inline;width:20vw">
          <el-input v-model="userForm.captchaCode" type="text" placeholder="请输入验证码" />
        </div>
        <div style="display:inline">
          <el-button @click="sendCaptchaCode">
            发送验证码
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
<script setup>
import { reactive, ref } from 'vue'

const methodsRadio = ref('邮件')
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
const userForm = reactive({
  userName: '',
  userEmail: '',
  captchaCode: '',
})

const sendCaptchaCode = () => {

}

</script>

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
