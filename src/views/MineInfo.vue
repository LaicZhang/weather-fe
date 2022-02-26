<template>
  <div class="mine-info-page">
    <el-form ref="formRef" :model="userForm" label-width="60px" label-position="left">
      <!--<el-col :span="24">-->
        <el-form-item label="ID">
          <el-input v-model="userForm.userId"></el-input>
        </el-form-item>
      <!--</el-col>-->
      <!--<el-col :span="24">-->
        <el-form-item label="用户名">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
      <!--</el-col>-->
      <!--<el-col :span="24">-->
        <el-form-item label="性别">
          <el-input v-model="userForm.sex"></el-input>
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
          <el-input v-model="userForm.userPwd"></el-input> </el-form-item
      ><!--</el-col>-->
      <el-col :span="24"
        ><el-form-item>
          <el-button @click="onSubmit" type="primary">提交</el-button>
          <el-button @click="resetForm">撤销修改</el-button>
        </el-form-item></el-col
      >
    </el-form>
  </div>
</template>

<script setup>
  import { onMounted, reactive } from 'vue';
  import request from '@/util/request';
  import storage from '@/util/storage';
  import { getDictApi } from '../api';
  let userForm = reactive({});
  let sexDict = {};

  const onSubmit = () => {
    console.log('submit!');
  };
  const getUserInfo = () => {
    let userInfo = storage.getItem('userInfo');
    request.get('/users/info?userName=' + userInfo.userName).then((res) => {
      console.log(res);
      Object.assign(userForm, res);
    });
  };
  const resetForm = () => {
    getUserInfo();
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
    box-sizing: border-box;
    height: 80vh;
  }
</style>
