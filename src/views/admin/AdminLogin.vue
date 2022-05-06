<template>
  <div>
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
    >
    </vue-particles>
    <div class="form">
      <el-form
          :model="formLogin"
          ref="formLoginRef"
          label-position="left"
          label-width="0px"
          class="demo-ruleForm login-container"
          :rules="rules"
      >
        <h1 class="title">欢迎登录后台管理系统</h1>
        <el-form-item prop="username">
          <el-input
              type="text"
              auto-complete="off"
              placeholder="请输入用户名"
              size="large"
              v-model="formLogin.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              auto-complete="off"
              placeholder="请输入密码"
              size="large"
              v-model="formLogin.password"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
              type="primary"
              style="width: 100%"
              size="large"
              @click="clickLogin"
          >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import {reactive, ref} from "vue";
import api from "@/api/api";
import Md5 from "js-md5";
import {ElMessage} from "element-plus";
import store from "@/store";
import cookie from "js-cookie";

/**
 * 登录表单容器
 */
const formLoginRef = ref();
/**
 * 登录表单
 */
const formLogin = reactive({
  username: "",
  password: "",
});
/**
 * 验证规则
 */
const rules = reactive({
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
    {
      max: 20,
      message: "用户名长度不能超过20位",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
    {
      min: 6,
      max: 20,
      message: "请输入长度为6-20的密码",
      trigger: "blur",
    },
  ],
});
/**
 * 登录
 */
const clickLogin = () => {
  api.user
      .login({
        username: formLogin.username,
        password: Md5(formLogin.password),
      })
      .then((res) => {
        if (res.code === 200) {
          ElMessage({
            type: "success",
            message: "欢迎回来~",
            duration: 3000,
          });
          api.user.getUserByUsername(formLogin.username).then((response) => {
            store.dispatch("changeUserInfo", JSON.stringify(response));
            store.dispatch("changeUserToken", cookie.get("cugtoken"));
            store.dispatch("changeIsLogin", true);
            router.push('/admin/home')
          });
        } else {
          ElMessage.error(res.msg);
        }
      });
};
</script>

<style scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 300px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-container .title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #1e9fff;
  font-size: 25px;
  font-weight: bold;
}

.login-container .remember {
  margin: 0 0 35px 0;
}

.form {
  position: relative;
  z-index: 9999;
}
</style>