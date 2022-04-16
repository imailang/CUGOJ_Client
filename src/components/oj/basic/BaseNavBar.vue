<template>
  <el-menu
      :default-active="active"
      class="el-menu-demo"
      :mode="props.mode"
      router
      @select="closeDrawer"
  >
    <el-menu-item index="/home">
      <el-icon>
        <HomeFilled></HomeFilled>
      </el-icon>
      首页
    </el-menu-item>
    <el-menu-item index="/problem">
      <el-icon>
        <Grid></Grid>
      </el-icon>
      题库
    </el-menu-item>
    <el-menu-item index="/practice">
      <el-icon>
        <List></List>
      </el-icon>
      训练
    </el-menu-item>
    <el-menu-item index="/competition">
      <el-icon>
        <Goblet></Goblet>
      </el-icon>
      竞赛
    </el-menu-item>
    <el-menu-item index="/evaluation">
      <el-icon>
        <TrendCharts></TrendCharts>
      </el-icon>
      评测
    </el-menu-item>
    <el-menu-item index="/rank">
      <el-icon>
        <Histogram></Histogram>
      </el-icon>
      排名
    </el-menu-item>
    <el-menu-item index="/discuss">
      <el-icon>
        <QuestionFilled></QuestionFilled>
      </el-icon>
      讨论
    </el-menu-item>
    <el-menu-item index="/team">
      <el-icon>
        <Flag></Flag>
      </el-icon>
      团队
    </el-menu-item>
    <el-menu-item index="/about">
      <el-icon>
        <MagicStick></MagicStick>
      </el-icon>
      关于
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {
  Flag,
  Goblet,
  Grid,
  Histogram,
  HomeFilled,
  List, MagicStick,
  QuestionFilled,
  TrendCharts,
} from "@element-plus/icons-vue";
import store from "@/store";
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";

/**
 * 传入数据 选择 横 竖 模式
 */
// eslint-disable-next-line no-undef
const props= defineProps({
  mode:String,
})
/**
 * 当前页面
 */
const active=ref()
/**
 * 理由
 */
const route =useRoute()

onBeforeMount(()=>{
  active.value="/"+route.path.split('/')[1]
})
/**
 * 关闭左弹窗
 */
const closeDrawer =()=>{
  store.dispatch("changeLeftDrawerVisible",false)
}


</script>

<style scoped>

</style>