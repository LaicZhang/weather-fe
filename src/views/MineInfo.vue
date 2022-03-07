<template>
  <div class="mine-info-page">
    <el-card class="mine-info-left">
      <span>个人信息</span>
      <el-form ref="formRef" :model="userForm" label-width="60px" label-position="left">
        <!--<el-col :span="24">-->
        <el-form-item label="用户ID">
          <el-input v-model="userForm.userId" disabled></el-input>
        </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="24">-->
        <el-form-item label="用户名">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="24">-->
        <el-form-item label="性别">
          <el-select v-model="userForm.sex">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <!--</el-col>-->
        <!--<el-col :span="24">-->
        <el-form-item label="邮箱">
          <el-input v-model="userForm.userEmail"></el-input>
        </el-form-item>
        <!--</el-col>-->
        <!-- <el-col :span="24"> -->
        <el-form-item label="电话号码">
          <el-input v-model="userForm.mobile"></el-input> </el-form-item
        ><!--</el-col>-->
        <!-- <el-col :span="24"> -->
        <el-form-item label="密码">
          <el-input type="password" v-model="userForm.userPwd"></el-input> </el-form-item
        ><!--</el-col>-->
        <el-form-item label="注册时间">
          <el-input v-model="userForm.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="最近登陆">
          <el-input v-model="userForm.lastLoginTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="验证码" v-if="flag">
          <el-input v-model="userForm.code"></el-input>
        </el-form-item>
        <el-col :span="24"
          ><el-form-item>
            <el-button @click="onSubmit" :disable="!flag" type="primary">提交</el-button>
            <el-button @click="resetForm">撤销修改</el-button>
          </el-form-item></el-col
        >
      </el-form>
    </el-card>
    <el-card class="mine-info-right">
      <span>推送配置</span>
      <el-form>
        <el-form-item>
          <el-checkbox v-model="pusherConfig.useEmail" label="邮箱" border></el-checkbox>
          <el-checkbox v-model="pusherConfig.useSms" label="短信" border></el-checkbox>
          <el-checkbox v-model="pusherConfig.useWecom" label="企业微信" border></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="pusherConfig.useFeishu" label="飞书" border></el-checkbox>
          <el-checkbox v-model="pusherConfig.useDingtalk" label="钉钉" border></el-checkbox>
          <el-checkbox v-model="pusherConfig.useServerChan" label="Server酱" border></el-checkbox>
        </el-form-item>
        <el-form-item>

        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmitPusherConfig" type="primary">提交</el-button>
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
  import { getDictApi } from '../api';
  import util from '../util/utils';
  let userForm = reactive({});
  let sexDict = {};
  let flag = ref(false);
  let pusherConfig = reactive({
    useEmail: false,
    useSms: false,
    useFeishu: false,
    useWecom: false,
    useDingtalk: false,
    useServerChan: false
  });

  const onSubmit = () => {
    console.log('submit!');
  };
  const getUserInfo = () => {
    let userInfo = storage.getItem('userInfo');
    request.get('/users/info', { userName: userInfo.userName }).then((res) => {
      Object.assign(userForm, res);
      if (userForm.sex === 1) {
        userForm.sex = '男';
      } else {
        userForm.sex = '女';
      }
      userForm.createTime = util.formateDate(new Date(userForm.createTime));
      userForm.lastLoginTime = util.formateDate(new Date(userForm.lastLoginTime));
    });
  };
  const resetForm = () => {
    getUserInfo();
  };
  const onSubmitPusherConfig = () => {
    console.log('submit!');
  };
  const resetPusherConfigForm = () => {
    getPusherConfig();
  };
  const init = () => {
    sexDict = getDictApi('sex');
  };
  onMounted(() => {
    init();
    getUserInfo();
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
      height: 60vh;
    }
    .mine-info-right {
      float: right;
      text-align: center;
      line-height: 45px;
      width: 30vw;
      height: 60vh;
      margin-right: 110px;
    }
  }
</style>
