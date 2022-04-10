<template>
  <el-row :gutter="10">
    <el-col :sm="17" :xs="24">
      <el-card>
        <!--题目列表-->
        <div>
          <el-row justify="space-between" align="middle">
            <el-col :xs="6" :sm="5"><p class="panel-title">题目列表</p></el-col>
            <el-col :xs="7" :sm="8">
              <el-input
                  placeholder="请输入关键字"
                  :suffix-icon="Search"
              />
            </el-col>
            <el-col :xs="4" :sm="4" style="text-align: right">
              <el-button round :icon="Refresh" type="primary">重置</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 题库选项-->
        <div>
          <el-row align="middle" style="margin-bottom: 10px">
            <div>题库
              <el-check-tag effect="plain">全部</el-check-tag>
            </div>
          </el-row>
          <el-row align="middle">
            <div>难度
              <el-check-tag effect="plain">全部</el-check-tag>
            </div>
          </el-row>
        </div>
        <!-- 表-->
        <div>
          <vxe-table :data="tableData" ref="Xtable">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="problemId" title="题目ID"></vxe-column>
            <vxe-column field="problemName" title="题目">
              <template v-slot="{row}">
                <el-link @click="getProblemUri(row.problemId)">{{row.problemName}}</el-link>
              </template>
            </vxe-column>
            <vxe-column field="problemLevel" title="难度"></vxe-column>
            <vxe-column field="AC" title="AC通过率"></vxe-column>
          </vxe-table>
        </div>
      </el-card>
    </el-col>
    <el-col :sm="7" :xs="24">
      <el-card shadow="always"> Always</el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import {Search} from "@element-plus/icons-vue";
import {Refresh} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import router from "@/router";
import api from "@/api/api";


const tableData = ref([
  { problemId: 10001, problemName: '猴子偷套', problemLevel: '入门', AC: '50%' },
  { problemId: 10002, problemName: '猴子偷桃', problemLevel: '一般', AC: '80%' },
])

const pageBody=reactive({
  pagesize:10,
  offset:0
})

/**
 * 初始化
 */
onMounted(()=>{
  api.problem.getProblemList(pageBody)
  .then(response=>{
    console.log(response.data)
    console.log(response)
  })
})

/**
 * 点击跳转题目
 */
const getProblemUri = (problemId) => {
  router.push({
    path:'/problem/'+problemId
  })
}


</script>
<style scoped>
.panel-title {
  font-size: 1.5rem !important;
  font-weight: 500;
  line-height: 0;
  text-align: left;
}

.el-input {
  max-width: 200px;
}
</style>