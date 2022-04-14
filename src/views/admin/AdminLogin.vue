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
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
    >
      <h1 class="title">欢迎登录后台管理系统</h1>
      <el-form-item prop="username">
        <el-input
            type="text"
            auto-complete="off"
            placeholder="请输入用户名"
            size="large"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            type="password"
            auto-complete="off"
            placeholder="请输入密码"
            size="large"
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
    </el-form></div>
  </div>
</template>

<script setup>

import router from "@/router";

/**
 * 登录
 */
const clickLogin = () => {
  router.push('/admin/home')
}
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
  margin: 0px auto 40px auto;
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