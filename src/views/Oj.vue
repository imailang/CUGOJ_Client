<template>
  <div v-if="role==='user'" style="background-color: #eff3f5">
    <!-- 顶部导航栏 -->
    <div ref="affix">
      <el-affix v-if="isRefresh" :offset="0">
        <OjNavBar></OjNavBar>
      </el-affix>
    </div>
    <div id="oj-content">
      <router-view></router-view>
    </div>
  </div>


  <!-- 回到顶部-->
  <el-backtop/>
</template>

<script setup>
import elementResizeDetectorMaker from 'element-resize-detector'
import {computed, nextTick, onMounted, ref} from "vue";
import store from "@/store";
import {mapGetters} from "vuex";
import OjNavBar from "@/components/oj/common/OjNavBar";

//顶部导航栏容器
const affix = ref()
//监听页面大小变化
const erd = elementResizeDetectorMaker()
//是否刷新
const isRefresh = ref(false)
//用户身份
const role = computed(
    mapGetters(['getRole']).getRole.bind({$store: store})
)

/**
 * 初始化
 * 解决顶部导航组件响应变化
 */
onMounted(() => {
  erd.listenTo(affix.value, () => {
    isRefresh.value = false  //不展示
    nextTick(() => {
      isRefresh.value = true  //渲染后又展示 实现刷新组件
    })
  })
})
</script>

<style>
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
    min-width: 300px;
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
