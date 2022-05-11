<template>
  <el-row :gutter="30">
    <el-col :sm="15" :xs="24">
      <el-card>
        <template #header>
          <b style="font-size: 30px;color: #308ff1">欢迎来到CUGOJ</b>
        </template>
        <el-carousel :interval="1000" arrow="always" height="400px">
          <el-carousel-item>
            <el-image
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F0G020114924%2F200G0114924-15-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654881502&t=574f7868da85c7a0e6ecbbf16d299063"></el-image>
          </el-carousel-item>
          <el-carousel-item>
            <el-image
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654881502&t=426f9764f353d3393f8bc49baf316eda"></el-image>
          </el-carousel-item>
          <el-carousel-item>
            <el-image
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420110515%2F200524110515-11-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654881502&t=eb260aa4218df595d4693a77f96a9e6e"></el-image>
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
