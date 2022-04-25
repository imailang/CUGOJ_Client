<template>
  <el-card>
    <!-- 标题头 -->
    <template #header>
      <el-row justify="space-between" align="middle">
        <el-col :xs="7" :sm="4"><p class="panel-title">评测列表</p></el-col>
        <el-col :xs="8" :sm="4">
          <el-switch
              class="mb-2"
              active-text="全部"
              inactive-text="我的"
          />
        </el-col>
        <el-col :xs="9" :sm="6">
          <el-input
              placeholder="请输入关键字"
              :suffix-icon="Search"
          />
        </el-col>
        <el-col :xs="6" :sm="5">
          <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          状态<el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col :xs="6" :sm="4">
          <el-button round :icon="Refresh" type="primary">刷新</el-button>
        </el-col>
      </el-row>
    </template>
    <!-- 评测列表-->
    <div>
      <vxe-table :data="evaluationList" ref="evaluationListRef" stripe align="center" show-overflow
                 :row-config="{height: 35}">
        <vxe-column field="ID" title="评测编号"></vxe-column>
        <vxe-column field="PTitle" title="题目"></vxe-column>
        <vxe-column field="User_info.Nickname" title="用户昵称"></vxe-column>
        <vxe-column field="Status" title="评测状态" width="90px">
          <template v-slot="{row}">
            <el-tag :style="'background-color:'+colorList[row.Status]+';color: white;font-size:14px;width:80px'">
              {{ row.Status }}
            </el-tag>
          </template>
        </vxe-column>
        <vxe-column field="Time_use" title="耗时">
          <template v-slot="{row}">
            {{ row.Time_use }} ms
          </template>
        </vxe-column>
        <vxe-column field="Memory_use" title="内存">
          <template v-slot="{row}">
            {{ row.Memory_use }} KB
          </template>
        </vxe-column>
        <vxe-column field="SuLength" title="代码长度"></vxe-column>
        <vxe-column field="Language" title="语言"></vxe-column>
        <vxe-column field="Judger" title="评测机"></vxe-column>
        <vxe-column field="Submit_time" title="提交时间" width="200px">
          <template v-slot="{row}">
            {{ updateTime(row.Submit_time) }}
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <!-- 分页-->
    <div>
      <vxe-pager
          perfect
          v-model:current-page="pageBody.offset"
          v-model:page-size="pageBody.pageSize"
          :total="Number(pageBody.totalPage)"
          @page-change="handleSizeChange"
          :page-sizes="[5,10, 20, 50]"
          :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
      </vxe-pager>
    </div>
  </el-card>
</template>

<script setup>
import {Search, Refresh, ArrowDown} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import api from "@/api/api";
import moment from "moment";

/**
 * 评测列表
 */
const evaluationList = ref()
/**
 * 列表容器
 */
const evaluationListRef = ref()
// eslint-disable-next-line no-unused-vars
const colorList = ref({
  Pending: '#7c7c7c',
  Compiling: '#fd8387',
  Running: '#5db75e',
  AC: '#00b23e',
  CE: '#efc110',
  RE: '#8d43af',
  WA: '#e74b3d',
  TLE: '#2d468c',
  MLE: '#2d468a',
  OLE: '#10efc6',
})

onMounted(() => {
  getListTotal()
  getEvaluationList()
})

/**
 * 分页
 */
const pageBody = ref({
  offset: 1,
  pageSize: 20,
  totalPage: 0,
})
/**
 * 获取评测列表
 */
const getEvaluationList = () => {
  api.judge.getJudgeList({
    "pagequery": {
      "offset": pageBody.value.offset - 1,
      "pagesize": pageBody.value.pageSize
    }
  })
      .then(res => {
        evaluationList.value = JSON.parse(res.Info)
        console.log(evaluationList.value)
      })
}
/**
 * 获取评测总数
 */
const getListTotal = () => {
  api.judge.getJudgeCount({})
      .then(res => {
        pageBody.value.totalPage = res.Info
      })
}
/**
 * 翻页
 */
const handleSizeChange = () => {
  let pages =Math.floor(pageBody.value.totalPage/pageBody.value.pageSize)+1;
  console.log(pages)
  if(pageBody.value.offset>=pages)
  {
    pageBody.value.offset=pages
  }
  getEvaluationList()
}
/**
 * 修改时间格式
 */
const updateTime = (val) => {
  return moment(val).format('YYYY-MM-DD HH:mm:ss')
}

</script>

<style scoped>
.panel-title {
  font-size: 1.5rem !important;
  font-weight: 500;
  line-height: 0;
  text-align: left;
}

</style>