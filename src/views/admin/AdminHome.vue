<template>
  <el-container class="admin-container">
    <el-row>
      <!-- 窄-->
      <el-col :xs="24" :sm="0">
        <el-aside width="70px">
          <AdminNavBar :is-collapse="true"></AdminNavBar>
        </el-aside>
      </el-col>
      <!-- 宽 -->
      <el-col :xs="0" :sm="24">
        <el-aside width="200px">
          <router-link to="/admin/home">
            <el-image
                style="width: 190px; height: 50px"
                fit="scale-down"
                :src="require('@/assets/acmLogo.png')"
            ></el-image>
          </router-link>
          <AdminNavBar :is-collapse="false"></AdminNavBar>
        </el-aside>
      </el-col>
    </el-row>
    <el-container>
      <el-header style="padding: 0">
        <div class="breadcrumb-container">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/admin/home' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in routerPathList" :key="index">{{
                item.meta.title
              }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-header>
      <el-main style="padding: 0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>

import AdminNavBar from "@/components/admin/common/AdminNavBar";
import {ArrowRight} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";


const route = useRoute()
const routerPathList = ref()
onMounted(() => {
  getRoutePath()
})

/**
 * 获取路由路径
 */
const getRoutePath = () => {
  routerPathList.value = route.matched.filter((item) => item.meta.title)
}

/**
 * 监听路由变化
 * 响应式监听
 */
watch(() => route.path, () => {
  getRoutePath()
})

</script>


<style scoped>
.admin-container {
  overflow: auto;
  font-weight: 400;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  background-color: #eff3f5;
}

.breadcrumb-container {
  padding: 17px;
  background-color: #fff;
}
</style>