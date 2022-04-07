<template>
  <div>
    <div id="header">
      <el-row justify="space-between" align="middle">
        <!-- 导航菜单图标-->
        <el-col :sm="0" :xs="3">
          <el-button type="text" class="btn-icon" @click="data.leftDrawerVisible=true">
            <el-icon>
              <Expand></Expand>
            </el-icon>
          </el-button>
        </el-col>
        <!-- logo -->
        <el-col :sm="6" :xs="5">
          <div class="logo">
            <el-image
                style="width: 120px; height: 42px"
                fit="scale-down"
                :src="require('@/assets/logo.png')"
            ></el-image>
          </div>
        </el-col>
        <!-- 导航菜单-->
        <el-col :sm="12" :xs="0">
          <NavBar mode="horizontal"></NavBar>
        </el-col>
        <el-col :sm="6" :xs="16">
          <!-- 未登录显示-->
          <div v-if="!isLogin" class="btn-menu">
            <el-button type="primary" round @click="data.loginVisible=true" size="large">
              登录
            </el-button>
            <el-button
                round
                type="danger"
                @click="data.registerVisible=true"
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
    <OjLogin :dialog-visible="data.loginVisible" @closeDialog="closeDialog"></OjLogin>
    <OjRegister :dialog-visible="data.registerVisible" @closeDialog="closeDialog"></OjRegister>
    <LeftDrawer v-model:drawer-visible="data.leftDrawerVisible"></LeftDrawer>
  </div>
</template>

<script setup>
import {
  ArrowDown, BellFilled, Expand,
} from "@element-plus/icons-vue";
import {computed, reactive} from "vue";
import OjLogin from "@/components/oj/common/OjLogin";
import OjRegister from "@/components/oj/common/OjRegister";
import store from "@/store";
import {mapGetters} from "vuex";
import LeftDrawer from "@/components/oj/common/LeftDrawer";
import NavBar from "@/components/oj/common/NavBar";



/**
 * 关闭登录、注册对话框
 */
const closeDialog = () => {
  data.registerVisible = false
  data.loginVisible = false
}
/**
 * 获取store 是否登录字段
 */
const isLogin = computed(
    mapGetters(['getIsLogin']).getIsLogin.bind({$store: store})
)


/**
 * 数据
 */
// eslint-disable-next-line no-unused-vars
const data = reactive({
  loginVisible: false,
  registerVisible: false,
  leftDrawerVisible:false,
})

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
  /deep/.is-round{
    border-radius:0
  }
}



</style>