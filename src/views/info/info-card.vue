<template>
  <el-card class="mine-info-left">
    <span>个人信息</span>
    <AvatarUpload />
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
            保存修改
          </el-button>
          <el-button @click="resetForm">
            撤销修改
          </el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-card>
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

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
// import { Plus } from '@element-plus/icons-vue'
// import { getDictApi } from '@/api/dict'
import util from '@/util/utils'
import {
  changeInfoApi,
  checkCaptchaApi,
  checkRepeatApi,
  getCaptchaEmailApi,
  getCaptchaSmsApi,
  getUserInfoApi,
  // refreshApi,
} from '@/api'
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
// let sexDict = {}

// info dialog
const changeEmailDialogVisible = ref(false)
const changeMobileDialogVisible = ref(false)
const changeEmailForm = reactive({
  userEmail: '',
  captcha: '',
})
const checkRepeatUserEmail = async(callback: any) => {
  const { userEmail } = changeEmailForm
  if (!userEmail)
    return
  const { isRepeat } = await checkRepeatApi({ userEmail })
  // return isRepeat !== undefined ? callback(new Error('邮箱已存在')) : callback()
  if (isRepeat)
    return callback(new Error('邮箱已存在'))
  return callback()
}
const changeEmailRules: any = {
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
const checkRepeatMobile = async(callback: any) => {
  const { mobile } = changeMobileForm
  if (!mobile)
    return
  const { isRepeat } = await checkRepeatApi({ mobile })
  // return isRepeat !== undefined ? callback(new Error('手机号已存在')) : callback()
  if (isRepeat)
    return callback(new Error('手机号已存在'))
  return callback()
}
const changeMobileRules: any = {
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
  const data = await checkCaptchaApi({
    userId: userForm.userId,
    userEmail: changeEmailForm.userEmail,
    captcha: changeEmailForm.captcha,
  })
  if (data.state === 1) {
    ElMessage.success('验证成功，请保存本次修改')
    userForm.userEmail = changeEmailForm.userEmail
    changeEmailDialogVisible.value = false
  }
  else {
    ElMessage.error(data)
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
  const data = await checkCaptchaApi({
    userId: userForm.userId,
    mobile: changeMobileForm.mobile,
    captcha: changeMobileForm.captcha,
  })
  if (data.state === 1) {
    ElMessage.success('验证成功，请保存本次修改')
    userForm.mobile = changeMobileForm.mobile
    changeMobileDialogVisible.value = false
  }
  else {
    ElMessage.error(data)
  }
}

const isVisitorFn = () => {
  if (userInfo.role === 2)
    isVisitor.value = false
}
const onSubmit = async(data: any) => {
  await changeInfoApi(data)
}
// const refreshInfo = async() => {
//   const data = await refreshApi({ userId: userInfo.userId })
//   store.commit('setUserInfo', data)
// }
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
const resetForm = () => {
  getUserInfo()
}

onMounted(() => {
  isVisitorFn()
  getUserInfo()
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
      overflow-y: auto;
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
  }
</style>
