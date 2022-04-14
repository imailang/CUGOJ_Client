<template>
<el-card>
  <template #header>
    题目列表
  </template>
  <!-- 表-->
  <div>
    <vxe-table :data="problemList" ref="Xtable">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="ID" title="题目ID"></vxe-column>
      <vxe-column field="Title" title="题目"></vxe-column>
      <vxe-column field="SubmitNumber" title="提交数"></vxe-column>
      <vxe-column field="SubmitACNumber" title="AC">
      </vxe-column>
    </vxe-table>
  </div>
</el-card>
</template>

<script setup>/**
 * 题目列表
 */

import {onMounted, reactive, ref} from "vue";
import api from "@/api/api";

const problemList = ref([])
/**
 * 分页
 */
const pageBody = reactive({
  pagesize: 10,
  offset: 0,
  total: 0,
})
/**
 * 初始化
 */
onMounted(() => {
  getProblemList()
})
/**
 * 获取题目列表
 */
const getProblemList = () => {
  api.problem.getProblemList(pageBody)
      .then(response => {
        problemList.value = response
        pageBody.total = problemList.value.length
        console.log('题目列表', problemList.value)
      })
}

</script>

<style scoped>

</style>