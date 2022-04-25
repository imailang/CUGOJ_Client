<template>
  <div class="main">
    <splitpanes class="default-theme">
      <pane>
        <el-scrollbar class="problem-left">
          <el-tabs
              type="border-card"
          >
            <!--题目描述 -->
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
                <div class="problem-title">{{ problemInfo.Title }}</div>
                <div v-show="description.BackGround!==''">
                  <div style="color: #3090f2">题目背景 ：</div>
                  <p style="margin-left: 30px" v-html="description.BackGround ">
                  </p>
                </div>
                <div v-show="description.Description!==''">
                  <div style="color: #3090f2">题目描述 ：</div>
                  <p style="margin-left: 30px" v-html="description.Description">
                  </p>
                </div>
                <div v-show="description.Input!==''">
                  <div style="color: #3090f2">输入描述 ：</div>
                  <p style="margin-left: 30px" v-html="description.Input">
                  </p>
                </div>
                <div v-show="description.Output!==''">
                  <div style="color: #3090f2">输出描述 ：</div>
                  <p style="margin-left: 30px" v-html="description.Output"></p>
                </div>
                <div>
                  <el-row v-for="(item,index) in description.Examples" :key="index" justify="space-between"
                          :gutter="20">
                    <el-col :span="12">
                      <div style="color: #3090f2"> 输入用例{{ index + 1 }}:
                        <el-button type="text" @click="copy(item.input)">
                          <el-icon size="large">
                            <CopyDocument></CopyDocument>
                          </el-icon>
                        </el-button>
                      </div>
                      <el-card style="margin-top: 5px;margin-left: 30px">
                        {{ item.input }}
                      </el-card>
                    </el-col>
                    <el-col :span="12">
                      <div style="color: #3090f2"> 输出用例{{ index + 1 }}:
                        <el-button type="text" @click="copy(item.output)">
                          <el-icon size="large">
                            <CopyDocument></CopyDocument>
                          </el-icon>
                        </el-button>
                      </div>
                      <el-card style="margin-top: 5px;margin-right: 30px">
                        {{ item.output }}
                      </el-card>
                    </el-col>
                    <el-col :span="24" style="margin-top: 10px;font-size: 14px">
                      <i>用例提示：</i>
                      <p style="margin-left: 30px" v-html="marked(item.tips)"></p>
                    </el-col>
                  </el-row>
                </div>
                <div v-show="description.Hint!==''">
                  <div style="color: #3090f2">提示 ：</div>
                  <p style="margin-left: 30px;font-size: 14px" v-html="description.Hint"></p>
                </div>
              </div>
            </el-tab-pane>
            <!--我的提交 -->
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
        </el-scrollbar>
      </pane>
      <pane>
        <!--提交页-->
        <el-scrollbar class="problem-right">
          <OjCodeEditor v-model:code="code" v-model:language="language"></OjCodeEditor>
          <el-row justify="end" style="position: absolute;right: 30px;bottom: 25px">
            <el-button round type="warning" @click="reset" style="margin-right: 10px">重置</el-button>
            <el-button round type="primary" @click="submitCode" style="margin-right: 10px">提交</el-button>
          </el-row>
        </el-scrollbar>
      </pane>
    </splitpanes>
  </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {Clock, CopyDocument, Notebook} from "@element-plus/icons-vue";
import api from "@/api/api";
import OjCodeEditor from "@/components/oj/common/OjCodeEditor";
import {Splitpanes, Pane} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import {marked} from 'marked'
import {ElMessage} from "element-plus";
import useClipboard from 'vue-clipboard3'
import store from "@/store";

const {toClipboard} = useClipboard()

/**
 * 路由
 */
const route = useRoute();
/**
 * 题目信息
 */
const problemStatus = ref('')
const problemInfo = ref({})
const description = ref({})
const code = ref('#include<iostream>\nusing namespace std;\nint main(){\n    cout<<"hello";\n}')
const language = ref('c++11')
const submitLanguage = ref({
  'c99': 'gnu c99',
  'c11': 'gnu c11',
  'c++11': 'gnu cpp11',
  'c++14': 'gnu cpp14',
  'c++17': 'gnu cpp17',
  'c++20': 'gnu cpp20'
})
/**
 * 适配后端语言
 */
const calLanguage = (val) => {
  if (typeof submitLanguage.value[val] !== 'undefined') {
    val = submitLanguage.value[val]
  }
  return val
}
/**
 * 提交代码
 */
const submitCode = () => {
  api.judge.getBaseJudge()
      .then(response => {
        console.log('模板',response)
        const tmp = response
        tmp.PID = problemInfo.value.ID;
        tmp.PTitle=problemInfo.value.Title
        tmp.Language = calLanguage(language.value);
        tmp.UID = store.getters.getUserInfo.ID
        tmp.Code = code.value
        console.log('填充',tmp)
        api.judge.addJudge(tmp)
            .then(response => {
              if (response.Statu === '000') {
                ElMessage.success('提交成功')
                console.log(response)
              }
            })
      })

}
const reset = () => {
  code.value = ''
}
/**
 * 初始化
 */
onMounted(() => {
  problemInfo.value.problemId = route.params.problemId
  getProblem()
})
/**
 * 复制
 */
const copy = async (val) => {
  await toClipboard(val)
  ElMessage.success('复制成功')
}
/**
 * 获取题目信息
 */
const getProblem = () => {
  api.problem.getProblem(problemInfo.value.problemId)
      .then(response => {
        problemInfo.value = JSON.parse(response.Info)
        problemStatus.value = response.Statu
        description.value = problemInfo.value.Description
        description.value.Examples = JSON.parse(description.value.Examples)
        // console.log('problemInfo', problemInfo.value)
        // console.log('description', description.value)
        // console.log('problemStatus', problemStatus.value)
      })
}
</script>

<style scoped>
.problem-title {
  font-weight: 500;
  font-size: 30px;
}

.problem-right {
  background-color: #ffffff;
  width: calc(100% - 5px);
}

.problem-left {
  width: calc(100% - 5px);
  height: 100%;
  background-color: #ffffff;
}

.el-tabs--border-card {
  border-bottom: 0;
}

.problem-left /deep/ .el-card__body {
  padding: 5px;
}

.footer {
  position: fixed;
  bottom: 0;
  right: 20px;
}

.main {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: calc(2% + 60px)
}

/deep/ .el-card__header {
  padding: 0;
  background-color: #ffffff;
  border: 0;
}

/deep/ .CodeMirror {
  height: 776px;
}
</style>