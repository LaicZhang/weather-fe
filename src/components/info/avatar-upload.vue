<template>
  <el-upload
    class="avatar-uploader"
    :action="UPLOAD_URL"
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
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
// import { Plus } from '@element-plus/icons-vue'
// import { getDictApi } from '@/api/dict'
import util from '@/util/utils'
import {
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
const uploadCdnUrl = store.state.UPLOAD_CDN_URL

// info dialog
const BE_URL = import.meta.env.VITE_BE_URL
const UPLOAD_URL = `${BE_URL}upload`

const uploadData = ref({
  userId: userInfo.userId,
})

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

const imageUrl = ref(`${uploadCdnUrl}${userInfo.avatar}`)
const handleAvatarSuccess = (res: any, file: any) => {
  const filename = res.data.filename
  userInfo.avatar = filename
  store.commit('setUserInfo', userInfo)
  imageUrl.value = URL.createObjectURL(file.raw)
  // refreshInfo()
  // console.log('handleAvatarSuccess', res, file)
  // imageUrl.value = res.data.path
}
const beforeAvatarUpload = (file: any) => {
  const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt5M = file.size / 1024 / 1024 < 2

  if (!isImage)
    ElMessage.error('Avatar picture must be JPG/PNG format!')

  if (!isLt5M)
    ElMessage.error('Avatar picture size can not exceed 2MB!')

  return isImage && isLt5M
}

onMounted(() => {
  getUserInfo()
})
</script>

<style lang="scss" scoped>
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
</style>
