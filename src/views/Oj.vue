
<template>
  <div v-if="role === 'user'">
    <!-- 顶部导航栏 -->
    <div ref="affix" style="top: 0">
      <OjNavBar v-if="isRefresh"></OjNavBar>
    </div>
    <el-scrollbar class="oj-scroll">
      <div ref="main" id="oj-content">
        <router-view></router-view>
      </div>
      <oj-footer :style="'margin-top:'+footerTopMargin+'px'"></oj-footer>
    </el-scrollbar>
  </div>
  <div v-else>
    <div id="admin-content">
      <router-view></router-view>
    </div>
  </div>

  <!-- 回到顶部-->
  <el-backtop />
</template>

<script setup>
import elementResizeDetectorMaker from "element-resize-detector";
import { computed, nextTick, onMounted, ref } from "vue";
import store from "@/store";
import { mapGetters } from "vuex";
import OjNavBar from "@/components/oj/common/OjNavBar";

import {useRoute} from "vue-router";
import OjFooter from "@/components/oj/common/OjFooter";

//顶部导航栏容器
const affix = ref()
//主要窗口容器
const main=ref()
//监听页面大小变化
const erd = elementResizeDetectorMaker();
//是否刷新
const isRefresh = ref(false);
//用户身份
const role = computed(mapGetters(["getRole"]).getRole.bind({ $store: store }));
const route = useRoute();

/**
 * 底部距离
 */
const footerTopMargin= ref()


/**
 * 初始化
 * 解决顶部导航组件响应变化
 */
onMounted(() => {
  // localStorage.setItem('userInfo',undefined)
  erd.listenTo(affix.value, () => {
    reloadNavBar()
  })
  erd.listenTo(main.value, (ele) => {
    // console.log('屏幕高度',document.documentElement.clientHeight)
    // console.log('主窗口高度',ele.offsetHeight)
    if(document.documentElement.clientHeight-233<ele.offsetHeight)
    {
      footerTopMargin.value=80
    }
    else {
      footerTopMargin.value=document.documentElement.clientHeight-ele.offsetHeight-233
    }
  })
  //路由 角色
  if (route.path.split("/")[1] === "admin") {
    store.dispatch("changeRole", "admin");
  }
});
/**
 * NavBar组件刷新
 */
const reloadNavBar = () => {
  isRefresh.value = false; //不展示
  nextTick(() => {
    isRefresh.value = true; //渲染后又展示 实现刷新组件
  });
};
</script>

<style>
#admin-content {
  background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

#particles-js {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/**
屏幕宽度 小于768时
el-row去除margin
 */
@media screen and (max-width: 768px) {
  #oj-content {
    margin-top: 20px;
    padding: 0 8%;
    min-width: 700px;
  }

  #admin-content {
    background-color: #1e9fff;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    min-width: 700px;
  }

  .oj-scroll {
    position: fixed;
    background-color: #f6f6f6;
    bottom: 0;
    top: 45px;
    right: 0;
    left: 0;
    height: calc(100% - 45px);
  }

  .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .el-col {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

/**
屏幕宽度大于 768
 */
@media screen and (min-width: 768px) {
  #oj-content {
    margin-top: 20px;
    padding: 0 6%;
  }

  .oj-scroll {
    position: fixed;
    background-color: #f6f6f6;
    bottom: 0;
    top: 60px;
    right: 0;
    left: 0;
    height: calc(100% - 60px);
  }
}

/**
屏幕宽度大于 2100
 */
@media screen and (min-width: 2100px) {
  #oj-content {
    margin-top: 20px;
    padding: 0 10%;
  }

  .oj-scroll {
    position: fixed;
    background-color: #f6f6f6;
    bottom: 0;
    top: 60px;
    right: 0;
    left: 0;
    height: calc(100% - 60px);
  }
}
</style>
