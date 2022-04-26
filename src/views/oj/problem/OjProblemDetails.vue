<template>
  <div class="main">
    <splitpanes class="default-theme">
      <pane>
        <el-scrollbar class="problem-left">
          <el-tabs
              type="border-card"
              :before-leave="beforeChangeTab"
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
              <!-- 评测列表-->
              <div>
                <vxe-table :data="evaluationList" ref="evaluationListRef" stripe align="center" show-overflow
                           :row-config="{height: 35}">
                  <vxe-column field="ID" title="评测编号" width="50px"></vxe-column>
                  <vxe-column field="Status" title="评测状态" width="92">
                    <template v-slot="{row}">
                      <el-tag
                          :style="'background-color:'+colorList[row.Status]+';color: white;font-size:14px;width:80px'">
                        {{ row.Status }}
                      </el-tag>
                    </template>
                  </vxe-column>
                  <vxe-column field="Time_use" title="耗时">
                    <template v-slot="{row}">
                      {{ row.TimeUse }} ms
                    </template>
                  </vxe-column>
                  <vxe-column field="Memory_use" title="内存">
                    <template v-slot="{row}">
                      {{ row.MemoryUse }} KB
                    </template>
                  </vxe-column>
                  <vxe-column field="Length" title="代码长度" width="50px"></vxe-column>
                  <vxe-column field="Language" title="语言"></vxe-column>
                  <vxe-column field="Judger" title="评测机"></vxe-column>
                  <vxe-column field="SubmitTime" title="提交时间" width="50px">
                    <template v-slot="{row}">
                      {{ updateTime(row.SubmitTime) }}
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
            </el-tab-pane>
          </el-tabs>
        </el-scrollbar>
      </pane>
      <pane>
        <!--提交页-->
        <el-scrollbar class="problem-right">
          <OjCodeEditor v-model:code="code" v-model:language="language"></OjCodeEditor>
          <el-row justify="end" style="position: absolute;right: 30px;bottom: 25px" @click="Loginfirst">
            <el-button :disabled="!isLogin" round type="warning" @click="reset" style="margin-right: 10px">重置
            </el-button>
            <el-button :disabled="!isLogin" round type="primary" @click="submitCode" style="margin-right: 10px">提交
            </el-button>
          </el-row>
        </el-scrollbar>
      </pane>
    </splitpanes>
  </div>

</template>

<script setup>

import {computed, onMounted, ref} from "vue";
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
import {mapGetters} from "vuex";
import moment from "moment";


const {toClipboard} = useClipboard()
const route = useRoute();
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
 * 颜色列表
 */
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
/**
 * 评测列表
 */
const evaluationList = ref()
/**
 * 列表容器
 */
const evaluationListRef = ref()
/**
 * 获取store 是否登录字段
 */
const isLogin = computed(
    mapGetters(['getIsLogin']).getIsLogin.bind({$store: store})
)
/**
 * 分页
 */
const pageBody = ref({
  pageSize: 10,
  offset: 1,
  totalPage: null,
})
/**
 * 翻页
 */
const handleSizeChange = () => {
  let pages = Math.floor(pageBody.value.totalPage / pageBody.value.pageSize) + 1;
  if (pageBody.value.offset >= pages) {
    pageBody.value.offset = pages
  }
  getMyEvaluation()
}
/**
 * 左边标签页更换前钩子
 */
const beforeChangeTab = (activeName) => {
  if (Number(activeName) === 1) {
    if (isLogin.value) {
      getMyListTotal()
      getMyEvaluation()
    } else {
      ElMessage.error('请先登录')
      store.dispatch('changeLoginVisible', true)
      return false
    }
  }


}
/**
 * 获取我的评测
 */
const getMyEvaluation = () => {
  api.judge.getJudgeList({
    pagequery: {
      offset: pageBody.value.offset - 1,
      pagesize: pageBody.value.pageSize
    },
    odd1: {
      UID: store.getters.getUserInfo.ID,
      p_id: problemInfo.value.ID
    }
  })
      .then(res => {
        console.log(res)
        evaluationList.value = JSON.parse(res.Info)

      })
}
/**
 * 获取我的评测总数
 */
const getMyListTotal = () => {
  api.judge.getJudgeCount({
    odd1: {
      UID: store.getters.getUserInfo.ID,
      p_id: problemInfo.value.ID
    }

  })
      .then(res => {
        pageBody.value.totalPage = res.Info
      })
}
/**
 * 修改时间格式
 */
const updateTime = (val) => {
  return moment(val).format('YYYY-MM-DD HH:mm:ss')
}
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
 * 登录判断
 */
const Loginfirst = () => {
  if (!isLogin.value) {
    ElMessage.error('请先登录')
    store.dispatch('changeLoginVisible', true)
  }
}
/**
 * 提交代码
 */
const submitCode = () => {
  api.judge.getBaseJudge()
      .then(response => {
        console.log('模板', response)
        const tmp = response
        tmp.PID = problemInfo.value.ID;
        tmp.PTitle = problemInfo.value.Title
        tmp.Language = calLanguage(language.value);
        tmp.UID = store.getters.getUserInfo.ID
        tmp.Code = code.value
        console.log('填充', tmp)
        api.judge.addJudge(tmp)
            .then(response => {
              if (response.Statu === '000') {
                ElMessage.success('提交成功')
                console.log(response)
              }
            })
      })
}
/**
 * 重置代码
 */
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