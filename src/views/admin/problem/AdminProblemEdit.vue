<template>
  <el-card>
    <template #header>
      <el-page-header content="编辑题目" @back="goBack"/>
    </template>
    <el-form
        ref="problemInfoRef"
        :model="problemInfo"
        label-position="top"
        label-width="70px"
    >

    </el-form>
  </el-card>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";
/**
 * 路由
 */
const route = useRoute();
/**
 * 题目信息
 */
const problemInfo =ref({})
/**
 * 表单容器
 * @type {Ref<any>}
 */
const problemInfoRef =ref()
/**
 * 初始化
 */
onMounted(()=>{
   problemInfo.value.ID=route.params.problemId
  console.log(problemInfo.value)
})
/**
 * 返回
 */
const goBack = () => {
  router.back()
}
</script>

<style scoped>


</style>