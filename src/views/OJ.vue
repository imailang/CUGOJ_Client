<template>
  <div>
    <!-- 顶部导航栏 -->
    <div ref="affix">
      <el-affix v-if="isRefresh" :offset="0">
        <TopNavBar></TopNavBar>
      </el-affix>
    </div>
    <div id="oj-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import TopNavBar from "@/components/oj/common/TopNavBar";
import elementResizeDetectorMaker from 'element-resize-detector'
import {nextTick, onMounted, ref} from "vue";

//顶部导航栏容器
const affix = ref()
//监听页面大小变化
const erd = elementResizeDetectorMaker()
//是否刷新
const isRefresh = ref(false)

onMounted(() => {
  erd.listenTo(affix.value, (ele) => {
    const width = ele.offsetWidth
    const height = ele.offsetHeight
    console.log(width, height)
    isRefresh.value = false  //不展示
    nextTick(() => {
      isRefresh.value = true  //渲染后又展示 实现刷新组件
    })
  })
})
</script>

<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/**
屏幕宽度大于 768
 */
@media screen and (min-width: 768px) {
  #oj-content {
    margin-top: 20px;
    padding: 0 3%;
  }
}

/**
屏幕宽度 小于768时
el-row去除margin
 */
@media screen and (max-width: 768px) {
  #oj-content {
    margin-top: 20px;
    padding: 0 5px;
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
</style>
