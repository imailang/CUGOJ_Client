<template>
  <el-row :gutter="30">
    <el-col :sm="15" :xs="24">
      <el-card>
        <template #header>
          <b style="font-size: 30px;color: #308ff1">欢迎来到CUGOJ</b>
        </template>
        <el-carousel :interval="1000" arrow="always" height="600px">
          <el-carousel-item>
            <el-image
                src="https://img14.360buyimg.com/pop/jfs/t1/174086/38/25421/123679/61cfd23eEad2850f2/245b204eb519851b.jpg"></el-image>
          </el-carousel-item>
          <el-carousel-item>
            <el-image
                src="https://img14.360buyimg.com/pop/jfs/t1/120947/29/18644/69926/616651caE22e7719a/ada55dd670aec9c8.jpg"></el-image>
          </el-carousel-item>
          <el-carousel-item>
            <el-image
                src="https://img14.360buyimg.com/pop/jfs/t1/142451/23/25535/182699/61cfd245Ef54789d4/f798f1cd6f6c5b01.jpg"></el-image>
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
      <el-card style="margin-top: 20px"> 近期比赛</el-card>
    </el-col>
  </el-row>
  <el-row :gutter="30">
    <el-col :sm="15" :xs="24">
    </el-col>
    <el-col :sm="9" :xs="24">

    </el-col>
  </el-row>
</template>

<script setup>
import {ref} from "vue";
import router from "@/router";
import api from "@/api/api";
import {ElMessage} from "element-plus";

const nowDate = ref(new Date())
const problemId = ref('')

/**
 * 题目跳转
 */
const jumpProblem = () => {
  console.log(problemId.value)
  if (problemId.value === '') {
    ElMessage.error('题目编号不能为空')
  } else {
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