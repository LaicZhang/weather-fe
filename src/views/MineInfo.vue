<template>
  <div class="mine-info-page">
    <el-card class="mine-info-left">
      <span>个人信息</span>
      <el-form ref="formRef" :model="userForm" label-width="60px" label-position="left">
        <el-form-item label="用户ID">
          <el-input v-model="userForm.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userForm.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userForm.sexText" @change="value=>userForm.sex=value">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="userForm.mobile"></el-input>
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
          <el-input v-model="userForm.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="最近登陆">
          <el-input v-model="userForm.lastLoginTime" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="验证码" v-if="flag">
          <el-input v-model="userForm.code"></el-input>
        </el-form-item> -->
        <el-col :span="24"
          ><el-form-item>
            <el-button @click="onSubmit(userForm)" type="primary">提交</el-button>
            <el-button @click="resetForm">撤销修改</el-button>
          </el-form-item></el-col
        >
      </el-form>
    </el-card>
    <el-card class="mine-info-right">
      <span>推送配置</span>
      <el-form ref="configRef" :model="pusherConfigForm" label-position="left">
        <el-form-item>
          <el-checkbox v-model="pusherConfigForm.useEmail" label="邮箱" border></el-checkbox>
          <el-checkbox v-model="pusherConfigForm.useSms" label="短信" border></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="pusherConfigForm.useFeishu" label="飞书" border></el-checkbox>
          <el-checkbox v-model="pusherConfigForm.useDingTalk" label="钉钉" border></el-checkbox>
          <el-checkbox v-model="pusherConfigForm.useWecom" label="企业微信" border></el-checkbox>
          <el-checkbox
            v-model="pusherConfigForm.useServerChan"
            label="Server酱"
            border
          ></el-checkbox>
        </el-form-item>
        <el-form-item> </el-form-item>
        <el-form-item>
          <el-button @click="onSubmitPusherConfigForm" type="primary">提交</el-button>
          <el-button @click="resetPusherConfigForm">撤销修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue';
  import request from '@/util/request';
  import storage from '@/util/storage';
  import { getDictApi, changeInfoApi, getPusherSettingsApi, updatePusherSettingsApi } from '../api';
  import util from '../util/utils';
  let userForm = reactive({});
  let sexDict = {};
  let flag = ref(false);
  let isChangeEmail = ref(false);
  let isChangeMobile = ref(false);
  let isChangePassword = ref(false);
  let pusherConfigForm = reactive({
    // useEmail: true,
    // useSms: true,
    // useFeishu: false,
    // useWecom: false,
    // useDingtalk: false,
    // useServerChan: false
  });
  let userInfo = storage.getItem('userInfo');

  const onSubmit = async (data) => {
    console.log('userForm', data);
    await changeInfoApi(data);
  };
  const getUserInfo = () => {
    request.get('/users/info', { userName: userInfo.userName }).then((res) => {
      Object.assign(userForm, res);
      if (userForm.sex === 1) {
        userForm.sexText = '男';
      } else {
        userForm.sexText = '女';
      }
      userForm.createTime = util.formateDate(new Date(userForm.createTime));
      userForm.lastLoginTime = util.formateDate(new Date(userForm.lastLoginTime));
    }).catch(()=>{
      console.log('获取用户信息失败');
    });
  };
  const resetForm = () => {
    getUserInfo();
  };
  const onSubmitPusherConfigForm = () => {
    console.log('pusherConfigForm', pusherConfigForm);
    updatePusherSettings();
  };
  const resetPusherConfigForm = () => {
    getPusherSettings();
  };
  const init = () => {
    sexDict = getDictApi('sex');
  };
  const getPusherSettings = async () => {
    let { list } = await getPusherSettingsApi({ userId: userInfo.userId });
    pusherConfigForm = Object.assign(pusherConfigForm, list);
    console.log('getPusherSettings=>', pusherConfigForm);
  };
  const updatePusherSettings = async () => {
    let data = await updatePusherSettingsApi(pusherConfigForm);
    console.log('updatePusherSettings=>', data);
  };
  onMounted(() => {
    init();
    getUserInfo();
    getPusherSettings();
  });
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
