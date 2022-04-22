<template>
  <el-row :gutter="30">
    <el-col :sm="15" :xs="24">
      <el-card>
        <template #header>
          <b style="font-size: 30px;color: #308ff1">欢迎来到CUGOJ</b>
        </template>
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-card>
      <el-card style="margin-top: 20px">
        <el-row justify="space-between">
          <p> 题目跳转:</p>
        </el-row>
        <el-row justify="space-between">
          <el-col :xl="20" :lg="18" :sm="14" :xs="14">
            <el-input v-model="problemId" placeholder="题目编号"></el-input>
          </el-col>
          <el-col :xl="4" :lg="6" :sm="10" :xs="10">
            <el-button type="primary" @click="jumpProblem">跳转</el-button>
            <el-button type="danger">随机跳转</el-button>
          </el-col>

        </el-row>

      </el-card>
      <div class="card-top">
        <el-card shadow="always"> 公告</el-card>
      </div>
    </el-col>
    <el-col :sm="9" :xs="24">
      <el-card shadow="always">
        <el-calendar v-model="nowDate"/>
        <el-button type="success" @click="clockIn">
          点击打卡
        </el-button>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="30">
    <el-col :sm="15" :xs="24">
    </el-col>
    <el-col :sm="9" :xs="24">
      <el-card style="margin-top: 20px"> 近期比赛</el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import {ref} from "vue";
import router from "@/router";
import api from "@/api/api";
import {ElMessage} from "element-plus";

const nowDate = ref(new Date())
const problemId = ref()

/**
 * 题目跳转
 */
const jumpProblem = () => {
  api.problem.getProblem(problemId.value)
      .then(res => {
        if (res.Statu === '000') {
          router.push({
            path: '/problem/' + problemId.value
          })
        } else {
          ElMessage.warning('当前题目不存在，请重新选择')
          problemId.value = ''
        }
      })
}
/**
 * 打卡
 */
const clockIn = () => {
  ElMessage.success('打卡成功')
}

</script>
<script>

</script>

<style scoped>

.card-top {
  margin-top: 20px;
}


</style>