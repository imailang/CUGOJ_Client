<template>
  <div>
    <div id="header">
      <el-row justify="space-between" align="middle">
        <!-- 导航菜单图标-->
        <el-col :sm="0" :xs="3">
          <el-button type="text" class="btn-icon" @click="openLeftDrawer">
            <el-icon>
              <Expand></Expand>
            </el-icon>
          </el-button>
        </el-col>
        <!-- logo -->
        <el-col :sm="6" :xs="5">
          <div class="logo">
            <router-link to="/home">
              <el-image
                  style="width: 120px; height: 42px"
                  fit="scale-down"
                  :src="require('@/assets/logo.png')"
              ></el-image>
            </router-link>
          </div>
        </el-col>
        <!-- 导航菜单-->
        <el-col :sm="12" :xs="0">
          <NavBar mode="horizontal"></NavBar>
        </el-col>
        <el-col :sm="6" :xs="16">
          <!-- 未登录显示-->
          <div v-if="!isLogin" class="btn-menu">
            <el-button type="primary" round @click="openLogin" size="large">
              登录
            </el-button>
            <el-button
                round
                type="danger"
                @click="openRegister"
                style="margin-left: 5px"
                size="large">
              注册
            </el-button>
          </div>
          <!-- 登录显示-->
          <div v-else class="btn-menu">
            <el-dropdown size="large" type="primary" style="margin-right: 5px;margin-top: 8px">
              <el-icon :size="25" color="#409EFC">
                <BellFilled></BellFilled>
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item>Action 4</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-avatar style="margin-right: 5px"></el-avatar>
            <el-dropdown trigger="click" size="large" style="margin-top: 8px">
                <span style="font-size: 18px" class="el-dropdown-link">
                  Dropdown List
                <el-icon>
                  <ArrowDown></ArrowDown>
                </el-icon>
                    </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
    <OjLogin></OjLogin>
    <OjRegister></OjRegister>
    <OjLeftDrawer></OjLeftDrawer>
  </div>
</template>

<script setup>
import {
  ArrowDown, BellFilled, Expand,
} from "@element-plus/icons-vue";
import {computed} from "vue";
import OjLogin from "@/components/oj/common/OjLogin";
import OjRegister from "@/components/oj/common/OjRegister";
import store from "@/store";
import {mapGetters} from "vuex";
import NavBar from "@/components/oj/basic/NavBar";
import OjLeftDrawer from "@/components/oj/common/OjLeftDrawer";


/**
 * 打开左弹窗
 */
const openLeftDrawer = () => {
  store.dispatch("changeLeftDrawerVisible", true)
}
/**
 * 打开登录窗口
 */
const openLogin = () => {
  store.dispatch("changeLoginVisible", true)
}
/**
 * 打开注册窗口
 */
const openRegister = () => {
  store.dispatch("changeRegisterVisible", true)
}

/**
 * 获取store 是否登录字段
 */
const isLogin = computed(
    mapGetters(['getIsLogin']).getIsLogin.bind({$store: store})
)


</script>

<style scoped>
#header {
  min-width: 300px;
  top: 0;
  left: 0;
  height: auto;
  width: 100%;
  z-index: 2000;
  background-color: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
}

/**
屏幕宽度大于 768
 */
@media screen and (min-width: 768px) {
  .btn-menu {
    font-size: 16px;
    float: left;
    margin-left: 50px;
  }

  .logo {
    float: right;
    width: 120px;
    height: 42px;
    margin-right: 50px;
  }

  .btn-icon {
    margin-top: 10px;
    float: left;
    font-size: 40px;
    color: #3795ca;
  }
}

/**
屏幕宽度小于 768
 */
@media screen and (max-width: 768px) {
  .btn-menu {
    font-size: 16px;
    float: right;
    margin-right: 10px;
  }

  .logo {
    float: left;
    width: 120px;
    height: 42px;
  }

  .btn-icon {
    float: left;
    font-size: 40px;
    color: #3795ca;
  }

  /deep/ .is-round {
    border-radius: 0
  }
}


</style>