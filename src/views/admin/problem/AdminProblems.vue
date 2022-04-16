<template>
  <el-card>
    <template #header>
      <el-row align="middle">
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
      <vxe-table :data="problemList" ref="problemListRef">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="ID" title="题目ID"></vxe-column>
        <vxe-column field="Title" title="题目"></vxe-column>
        <vxe-column field="SubmitNumber" title="提交数"></vxe-column>
        <vxe-column field="SubmitACNumber" title="AC"></vxe-column>
        <vxe-column title="操作" width="100" show-overflow>
          <template #default="{row}">
            <el-button type="text" @click="editProblem(row)">
              <el-icon>
                <edit></edit>
              </el-icon>
            </el-button>
            <el-button type="text" @click="removeProblem(row)">
              <el-icon>
                <delete></delete>
              </el-icon>
            </el-button>
          </template>
        </vxe-column>
      </vxe-table>
      <!-- 分页-->
      <div>
        <vxe-pager
            perfect
            v-model:current-page="pageBody.offset"
            v-model:page-size="pageBody.pageSize"
            :total="pageBody.total"
            @page-change="handleSizeChange"
            :page-sizes="[5,10, 20, 50]"
            :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
        </vxe-pager>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import api from "@/api/api";
import {Delete, Edit, Plus} from "@element-plus/icons-vue";
import {VXETable} from "vxe-table";
import router from "@/router";


/**
 * 题目列表
 */
const problemList = ref([])
/**
 * 题目列表容器
 */
const problemListRef = ref()
/**
 * 分页
 */
const pageBody = ref({
  pageSize: 10,
  offset: 1,
  total: 0,
})

/**
 * 编辑题目
 */
const editProblem = (row) => {
  router.push({
    path: '/admin/problem/edit/' + row.ID
  })
}
/**
 * 删除题目
 */
const removeProblem = async (row) => {
  const type = await VXETable.modal.confirm('确定要删除吗？')
  if (type === 'confirm') {
    problemListRef.value.remove(row)
  }
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
  api.problem.getProblemList({
    "pagequery": {
      "offset": pageBody.value.offset - 1,
      "pagesize": pageBody.value.pageSize
    }
  }).then(response => {
    problemList.value = JSON.parse(response.Info)
    pageBody.value.total = problemList.value.length
    console.log('题目列表', problemList.value)
  })
}
/**
 * 翻页
 */
const handleSizeChange = () => {
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