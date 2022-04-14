<template>
  <el-container class="admin-container">
    <el-aside width="200px">
      <AdminNavBar></AdminNavBar>
    </el-aside>
    <el-container>
      <el-header></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>

import AdminNavBar from "@/components/admin/common/AdminNavBar";
</script>

<style scoped>
.admin-container {
  overflow: auto;
  font-weight: 400;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  background-color: #eff3f5;
  overflow-y: auto;
}
</style>