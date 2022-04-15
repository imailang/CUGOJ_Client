<template>
  <el-card>
    <template #header>
      <el-row align="middle" gutter="30">
        <el-col :span="24" style="text-align: left;margin-bottom: 10px">
          <span class="panel-title home-title">题目列表</span>
        </el-col>
        <el-col :xs="5" :sm="4" style="text-align: left">
          <router-link to="/admin/problem/create" style="text-decoration: none">
            <el-button :icon="Plus" type="primary">创建
            </el-button>
          </router-link>
        </el-col>
        <el-col :xs="8" :sm="5">
          <el-input
              placeholder="请输入搜索关键字"
          ></el-input>
        </el-col>
      </el-row>

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
      <!-- 分页-->
      <div style="float: right">
        <el-pagination
            v-model:currentPage="pageBody.offset"
            v-model:page-size="pageBody.pagesize"
            :page-sizes="[10, 20, 30, 40]"
            layout=" prev, pager, next,sizes"
            :total="pageBody.total"
            background
            @size-change="handleSizeChange"
        />
      </div>
    </div>
  </el-card>
</template>

<script setup>/**
 * 题目列表
 */

import {onMounted, reactive, ref} from "vue";
import api from "@/api/api";
import {Plus} from "@element-plus/icons-vue";

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
        problemList.value = JSON.parse(response.Info)
        pageBody.total = problemList.value.length
        console.log('题目列表', problemList.value)
      })
}
/**
 * 翻页
 */
const handleSizeChange = () => {
  console.log('页面变化pageBody', pageBody)
  getProblemList()
}

</script>

<style scoped>
.home-title {
  color: #409eff;
  font-size: 25px;
}

.el-input {
  max-width: 200px;
}
</style>