<template>
  <div>
    <el-row>
      <el-col :sm="24" :md="24" :lg="12" class="problem-left">
        <el-tabs
            type="border-card"
        >
          <el-tab-pane>
            <template #label>
              <div>
                <el-icon>
                  <Notebook></Notebook>
                </el-icon>
                题目描述
              </div>
            </template>
            <div style="text-align: left">
              <div class="problem-title">{{ problemInfo.Title}}</div>
              <div>
                <div style="color: #3090f2">题目背景 ：</div>
                <p style="margin-left: 30px">
                  {{description.BackGround}}
                </p>
              </div>
              <div>
                <div style="color: #3090f2">题目描述 ：</div>
                <p style="margin-left: 30px">
                  {{description.Description}}
                </p>
              </div>
              <div>
                <div style="color: #3090f2">输入描述 ：</div>
                <p style="margin-left: 30px">
                  {{description.Input}}
                </p>
              </div>
              <div>
                <div style="color: #3090f2">输出描述 ：</div>
                <p style="margin-left: 30px">
                  {{description.Output}}
                </p>
              </div>
              <div>
                <el-row justify="space-between">
                  <el-col :span="12" style="color: #308ff1">
                    <div>用例输入1</div>
                    <p style="background-color: #f0f0f0;width: 60%;height: 30px">2</p>
                  </el-col>
                  <el-col :span="12" style="color: #308ff1">用例输入2</el-col>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <div>
                <el-icon>
                  <Clock></Clock>
                </el-icon>
                我的提交
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :sm="24" :md="24" :lg="12" class="problem-right">
        <OjCodeEditor v-model:code="code" v-model:language="language"></OjCodeEditor>
        <el-button @click="submitCode">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {Clock, Notebook} from "@element-plus/icons-vue";
import api from "@/api/api";
import OjCodeEditor from "@/components/oj/common/OjCodeEditor";

/**
 * 路由
 */
const route = useRoute();
/**
 * 题目信息
 */
const problemStatus = ref('')
const problemInfo = ref({})
const description =ref({})
const code =ref('class')
const language=ref('c++')

/**
 * 提交代码
 */
const submitCode = () => {
  api.judge.getBaseJudge()
  .then(response=>{
    console.log(response)
    const tmp =response
    tmp.PID=1;
    tmp.Language='gnu cpp11';
    tmp.UID= 1
    tmp.Code=code.value
    console.log('tmp',tmp)
    api.judge.addJudge(tmp)
    .then(response=>{
      console.log(response)
    })
  })

  console.log(code.value)
}
/**
 * 初始化
 */
onMounted(() => {
  problemInfo.value.problemId = route.params.problemId
  getProblem()
})

/**
 * 获取题目信息
 */
const getProblem = () => {
  api.problem.getProblem(problemInfo.value.problemId)
      .then(response => {
        console.log(response)
        problemInfo.value = JSON.parse(response.Info)
        problemStatus.value = response.Statu
        description.value=problemInfo.value.Description
        console.log('problemInfo',problemInfo.value)
        console.log('description',description.value)
        console.log('problemStatus',problemStatus.value)


      })
}
</script>

<style scoped>
.problem-title{
  font-weight: 500;
  font-size: 30px;
}

@media screen and (min-width: 1050px) {
  .problem-left {
    width: calc(50% - 10px); /*左侧初始化宽度*/
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    float: left;
  }
  .problem-right {
    height: 100%;
    float: left;
    width: 50%;
  }
}

@media screen  and (max-width: 1080px)
{


}
</style>