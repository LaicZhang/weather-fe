
<template>
  <div class="register-page">
    <el-form
      class="register-form"
      ref="userFormRef"
      :model="userForm"
      :rules="userRules"
      status-icon
    >
      <div class="register-title">注册</div>
      <el-form-item prop="userName">
        <el-input
          v-model="userForm.userName"
          type="text"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userEmail">
        <el-input
          v-model="userForm.userEmail"
          type="text"
          placeholder="请输入邮箱"
          prefix-icon="el-icon-email"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          v-model="userForm.userPwd"
          type="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          v-model="userForm.userConfirmPwd"
          type="password"
          placeholder="请确认密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="userFromCommit" type="primary" class="register-submit"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import useVuexWithRouter from "@/hooks/useVuexWithRouter";
import { registerApi, menuPermissionApi } from "@/api";
export default defineComponent({
  name: "Register",
  components: {},
  setup() {
    const { router, store } = useVuexWithRouter();
    const toPageHome = () => {
      router.push("/");
    };
    const userFormRef = ref(null);
    const userForm = reactive({
      userName: "",
      userPwd: "",
    });
    const userRules = {
      userName: [
        {
          required: true,
          message: "请填写用户名",
          trigger: "blur",
        },
      ],
      userEmail: [
        {
          required: true,
          message: "请填写邮箱",
          trigger: "blur",
        },
      ],
      userPwd: [
        {
          required: true,
          message: "请填写密码",
          trigger: "blur",
        },
      ],
      userConfirmPwd: [
        {
          required: true,
          message: "请确认密码",
          trigger: "blur",
        },
      ],
    };
    const userFromCommit = () => {
      userFormRef.value.validate(async (valid) => {
        if (valid) {
          if(userForm.userPwd !== userForm.userConfirmPwd){
            this.$message.error('两次密码不一致');
            return false;
          }
          const registerInfo = await registerApi(userForm);
          store.commit("setUserInfo", registerInfo);
          await getMenuPermission();
          toPageHome();
        } else {
          return false;
        }
      });
    };
    const getMenuPermission = async () => {
      const { menuList, actionList } = await menuPermissionApi();
      store.commit("setActionList", actionList);
      store.commit("setMenuList", menuList);
    };
    return {
      toPageHome,
      userFormRef,
      userForm,
      userRules,
      userFromCommit,
    };
  },
});
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