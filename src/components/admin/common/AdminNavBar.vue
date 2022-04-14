<template>
  <el-menu
      default-active="/admin/home"
      class="el-menu-demo"
      router
  >
    <el-menu-item index="/admin/home">
      <el-icon>
        <HomeFilled></HomeFilled>
      </el-icon>
      <p>首页</p>
    </el-menu-item>
    <el-sub-menu>
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
      <el-menu-item index="/admin/problem/create">
        <el-icon>
          <Grid></Grid>
        </el-icon>
        <span>创建题目</span>
      </el-menu-item>
    </el-sub-menu>

  </el-menu>
</template>

<script setup>
import {
  Grid,
  HomeFilled,
} from "@element-plus/icons-vue";
</script>

<style scoped>

</style>