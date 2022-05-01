<template>
  <el-menu
    default-active="/admin/home"
    class="el-menu-demo"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/admin/home">
      <el-icon>
        <HomeFilled></HomeFilled>
      </el-icon>
      <template #title>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="/admin/users">
      <template #title>
        <el-icon>
          <Grid></Grid>
        </el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/admin/users">
        <el-icon>
          <Grid></Grid>
        </el-icon>
        <span>用户列表</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/admin/problems">
      <template #title>
        <el-icon>
          <Grid></Grid>
        </el-icon>
        <span>题目管理</span>
      </template>
      <el-menu-item index="/admin/problems">
        <el-icon>
          <Grid></Grid>
        </el-icon>
        <span>题目列表</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/admin/contests">
      <template #title>
        <el-icon>
          <Grid></Grid>
        </el-icon>
        <span>竞赛管理</span>
      </template>
      <el-menu-item index="/admin/contests">
        <el-icon>
          <Grid></Grid>
        </el-icon>
        <span>竞赛列表</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { Grid, HomeFilled } from "@element-plus/icons-vue";

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
</style>