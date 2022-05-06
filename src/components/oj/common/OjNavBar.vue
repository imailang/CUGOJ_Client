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
              size="large"
            >
              注册
            </el-button>
          </div>
          <!-- 登录显示-->
          <el-row v-else class="btn-menu" align="middle">
            <el-tooltip class="box-item" effect="dark" content="通知中心">
              <el-badge
                  :value="messageCount"
                  :max="99"
                  class="item"
                  type="primary"
                  style="margin-right: 25px"
                  :hidden="messageCount == 0"
              >
                <el-icon
                    :size="25"
                    @click="clickMessage"
                    style="cursor: pointer"
                >
                  <BellFilled></BellFilled>
                </el-icon>
              </el-badge>
            </el-tooltip>
            <el-link style="--el-link-hover-text-color: none; cursor: pointer">
              <el-avatar
                :src="userInfo.Avatar"
                style="margin-right: 5px"
                @click="clickUserHome"
              ></el-avatar>
            </el-link>
            <el-dropdown trigger="click" size="large" style="margin-top: 8px">
              <span style="font-size: 18px" class="el-dropdown-link">
                {{ userInfo.Username }}
                <el-icon>
                  <ArrowDown></ArrowDown>
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="clickUserHome"
                  >个人主页
                  </el-dropdown-item
                  >
                  <el-dropdown-item @click="clickUserSet"
                  >账户设置
                  </el-dropdown-item
                  >

                  <el-dropdown-item @click="clickAdminHome">管理员入口</el-dropdown-item>

                  <el-dropdown-item style="color: red" divided @click="logout"
                  >退出
                  </el-dropdown-item
                  >

                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <OjLogin></OjLogin>
    <OjRegister></OjRegister>
    <OjLeftDrawer></OjLeftDrawer>
  </div>
</template>

<script setup>
import {ArrowDown, BellFilled, Expand} from "@element-plus/icons-vue";
import {computed, onBeforeMount, ref} from "vue";
import store from "@/store";
import { mapGetters } from "vuex";
import NavBar from "@/components/oj/basic/BaseNavBar";
import OjLogin from "@/components/oj/common/OjLogin";
import OjRegister from "@/components/oj/common/OjRegister";
import OjLeftDrawer from "@/components/oj/common/OjLeftDrawer";
import router from "@/router";
import api from "@/api/api";
import { ElMessage } from "element-plus";

const messageCount = ref(0);

onBeforeMount(() => {
  if (isLogin.value) {
    loadMessageCount();
  }

});

/**
 * 退出
 */
const logout = () => {
  api.user.logout().then((res) => {
    if (res.code === 200) {
      router.push("/home");
      store.dispatch("changeUserToken", undefined);
      store.dispatch("changeUserInfo", undefined);
      store.dispatch("changeIsLogin", false);
      ElMessage.success("注销成功");
    }
  });
};

/**
 * 跳转管理员入口
 */
const clickAdminHome = () => {
  console.log(userInfo.value);
  window.open("/admin/home", "_blank");
};
/**
 * 跳转账户设置
 */
const clickUserSet = () => {
  router.push("/user-set");
};
/**
 * 跳转用户主页
 */
const clickUserHome = () => {
  router.push("/user-home");
};
/**
 * 跳转消息中心
 */
const clickMessage = () => {
  router.push("/message");
};
/**
 * 打开左弹窗
 */
const openLeftDrawer = () => {
  store.dispatch("changeLeftDrawerVisible", true);
};
/**
 * 打开登录窗口
 */
const openLogin = () => {
  store.dispatch("changeLoginVisible", true);
};
/**
 * 打开注册窗口
 */
const openRegister = () => {
  store.dispatch("changeRegisterVisible", true);
};

/**
 * 获取store 是否登录字段
 */
const isLogin = computed(
  mapGetters(["getIsLogin"]).getIsLogin.bind({ $store: store })
);
/**
 * 用户信息
 */
const userInfo = computed(
  mapGetters(["getUserInfo"]).getUserInfo.bind({ $store: store })
);

/**
 * 加载消息数
 */
const loadMessageCount = () => {
  api.message.getUserMessageCount().then((response) => {
    if (!response) {
      ElMessage.error("请求出错");
    } else if (response.Statu != "000") {
      store.dispatch('changeIsLogin',false)
    } else {
      messageCount.value = Number(response.Info);
    }
  });
};
</script>

<style scoped>
#header {
  min-width: 300px;
  top: 0;
  left: 0;
  height: auto;
  width: 100%;
  z-index: 2000;
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

  ::v-deep .is-round {
    border-radius: 0;
  }
}
</style>