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
          <vxe-table :data="problemList" ref="Xtable">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="ID" title="题目ID"></vxe-column>
            <vxe-column field="Title" title="题目">
              <template v-slot="{row}">
                <el-link @click="getProblemUri(row.ID)">{{ row.Title }}</el-link>
              </template>
            </vxe-column>
            <vxe-column field="SubmitNumber" title="提交数"></vxe-column>
            <vxe-column field="SubmitACNumber" title="AC">
              <template v-slot="{row}">
                <el-progress :text-inside="true" :percentage="calAcRate(row.SubmitNumber,row.SubmitACNumber)" :stroke-width="24"/>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
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
      </el-card>
    </el-col>
    <el-col :sm="7" :xs="24">
      <el-card shadow="always">
        <!-- 进度条-->
        <div class="demo-progress">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="70"/>
          <el-progress
              :text-inside="true"
              :stroke-width="24"
              :percentage="100"
              status="success"
          />
          <el-progress
              :text-inside="true"
              :stroke-width="22"
              :percentage="80"
              status="warning"
          />
          <el-progress
              :text-inside="true"
              :stroke-width="20"
              :percentage="50"
              status="exception"
          />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import {Search} from "@element-plus/icons-vue";
import {Refresh} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import router from "@/router";
import api from "@/api/api";

/**
 * 题目列表
 */
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
 * 计算AC率
 */
const calAcRate = (num, acNum) => {
  if(num===0) return 0
  return (num / acNum).toFixed(2)*100
}

/**
 * 页面变化
 */
const handleSizeChange = () => {
  console.log('页面变化pageBody', pageBody)
  getProblemList()
}
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

/**
 * 点击跳转题目
 */
const getProblemUri = (problemId) => {
  router.push({
    path: '/problem/' + problemId
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

.demo-progress .el-progress--line {
  margin-bottom: 15px;
}
</style>