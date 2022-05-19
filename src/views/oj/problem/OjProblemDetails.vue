<template>
  <div class="main">
    <splitpanes class="default-theme">
      <pane>
        <el-scrollbar class="problem-left">
          <el-tabs type="border-card" :before-leave="beforeChangeTab">
            <!--题目描述 -->
            <el-tab-pane>
              <template #label>
                <div>
                  <el-icon style="vertical-align: -2px">
                    <Notebook></Notebook>
                  </el-icon>
                  题目描述
                </div>
              </template>
              <div style="text-align: left">
                <div class="problem-title">#P{{ problemInfo.ID }} {{ problemInfo.Title }}</div>
                <div style="margin:10px 0;">
                  <el-card
                      style="border-left: 2px solid rgb(25,91,190);border-right: 2px solid rgb(25,91,190);background-color: #f4f4f4;--el-card-padding: 15px">
                    <el-row>
                      <el-col :span="24">
                        <div>
                          <el-icon style="vertical-align: -2px">
                            <Stopwatch></Stopwatch>
                          </el-icon>
                          时间限制：{{ problemInfo.TimeLimit }} ms
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <div>
                          <el-icon style="vertical-align: -2px">
                            <Cpu></Cpu>
                          </el-icon>
                          空间限制：{{ problemInfo.MemoryLimit }} MB
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                </div>
                <div v-show="description.BackGround !== ''">
                  <div style="color: #3090f2"><b>题目背景</b></div>
                  <p v-html="description.BackGround"></p>
                </div>
                <div v-show="description.Description !== ''">
                  <div style="color: #3090f2"><b>描述</b></div>
                  <p
                      v-html="description.Description"
                  ></p>
                </div>
                <div v-show="description.Input !== ''">
                  <div style="color: #3090f2"><b>输入描述</b></div>
                  <p v-html="description.Input"></p>
                </div>
                <div v-show="description.Output !== ''">
                  <div style="color: #3090f2"><b>输出描述</b></div>
                  <p v-html="description.Output"></p>
                </div>
                <div>
                  <el-row
                      v-for="(item, index) in description.Examples"
                      :key="index"
                      justify="space-between"
                      :gutter="20"
                  >
                    <el-col :span="12">
                      <div style="color: #3090f2">
                        <b style="font-size: 15px;">输入用例{{ index + 1 }}:</b>
                        <el-button type="text" @click="copy(item.input)">
                          <el-icon size="large">
                            <CopyDocument></CopyDocument>
                          </el-icon>
                        </el-button>
                      </div>
                      <el-card style="margin-top: 5px;">
                        {{ item.input }}
                      </el-card>
                    </el-col>
                    <el-col :span="12">
                      <div style="color: #3090f2">
                        <b style="font-size: 15px;">输出用例{{ index + 1 }}:</b>
                        <el-button type="text" @click="copy(item.output)">
                          <el-icon size="large">
                            <CopyDocument></CopyDocument>
                          </el-icon>
                        </el-button>
                      </div>
                      <el-card style="margin-top: 5px; ">
                        {{ item.output }}
                      </el-card>
                    </el-col>
                    <el-col
                        :span="24"
                        style="margin-top: 10px; font-size: 14px"
                    >
                      <i>用例提示：</i>
                      <p
                          style="margin-left: 30px"
                          v-html="marked(item.tips)"
                      ></p>
                    </el-col>
                  </el-row>
                </div> <!-- 用例-->
                <div v-show="description.Hint !== ''">
                  <div style="color: #3090f2"><b>提示</b></div>
                  <p
                      style="font-size: 14px"
                      v-html="description.Hint"
                  ></p>
                </div>
              </div>
            </el-tab-pane>
            <!--我的提交 -->
            <el-tab-pane>
              <template #label>
                <div>
                  <el-icon style="vertical-align: -2px">
                    <Clock></Clock>
                  </el-icon>
                  我的提交
                </div>
              </template>
              <!-- 评测列表-->
              <div>
                <vxe-table
                    :data="evaluationList"
                    ref="evaluationListRef"
                    stripe
                    align="center"
                    show-overflow
                    highlight-hover-row
                    border="inner"
                    :row-config="{ height: 35 }"
                >
                  <vxe-column field="ID" title="评测编号">
                    <template v-slot="{ row }">
                      <el-button type="text" @click="getJudgeCases(row.ID)">
                        #{{ row.ID }}
                      </el-button>
                    </template>
                  </vxe-column>
                  <vxe-column field="Status" title="评测状态" width="92">
                    <template v-slot="{ row }">
                      <el-button type="text" @click="getJudgeCases(row.ID)">
                        <el-tag
                            :style="
                            'background-color:' +
                            colorList[row.Status] +
                            ';color: white;font-size:14px;width:80px'
                          "
                        >
                          {{ row.Status }}
                        </el-tag>
                      </el-button>
                    </template>
                  </vxe-column>
                  <vxe-column field="Time_use" title="耗时">
                    <template v-slot="{ row }"> {{ row.TimeUse }} ms</template>
                  </vxe-column>
                  <vxe-column field="Memory_use" title="内存">
                    <template v-slot="{ row }">
                      {{ row.MemoryUse }} KB
                    </template>
                  </vxe-column>
                  <vxe-column
                      field="Length"
                      title="代码长度"
                      width="50px"
                  ></vxe-column>
                  <vxe-column field="Language" title="语言"></vxe-column>
                  <vxe-column field="Judger" title="评测机"></vxe-column>
                  <vxe-column field="SubmitTime" title="提交时间">
                    <template v-slot="{ row }">
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
                    :page-sizes="[5, 10, 20, 50]"
                    :layouts="[
                    'PrevJump',
                    'PrevPage',
                    'JumpNumber',
                    'NextPage',
                    'NextJump',
                    'Sizes',
                    'FullJump',
                    'Total',
                  ]"
                >
                </vxe-pager>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-scrollbar>
      </pane>
      <pane>
        <!--提交页-->
        <el-scrollbar class="problem-right">
          <OjCodeEditor
              v-model:code="code"
              v-model:language="language"
          ></OjCodeEditor>
          <el-row
              justify="end"
              style="position: absolute; right: 30px; bottom: 15px"
              @click="loginFirst"
          >
            <el-button
                :disabled="!isLogin"
                round
                type="warning"
                size="large"
                @click="reset"
                style="margin-right: 10px"
            >重置
            </el-button>
            <el-button
                v-loading="loading"
                :disabled="!isLogin || loading || dialogVisible"
                size="large"
                round
                type="primary"
                @click="submitCode"
                style="margin-right: 10px"
            >提交
            </el-button>
          </el-row>
        </el-scrollbar>
      </pane>
    </splitpanes>
  </div>

  <!-- 弹窗-->
  <el-dialog v-model="dialogVisible" title="评测详情">
    <div v-loading="loading">
      <div v-if="evaluationClick.Status === 'CE'">
        <el-card
            :style="'background-color: ' + colorList[evaluationClick.Status]"
        >
          <el-row align="middle">
            <el-col :span="4">
              <div
                  style="
                  width: 50px;
                  text-align: left;
                  color: white;
                  font-size: 25px;
                "
              >
                {{ evaluationClick.Status }}
              </div>
            </el-col>
            <el-col :span="20">
              <el-row style="color: white; font-size: 14px; text-align: left">
                <p
                    v-html="evaluationClick.ErrorMessage.replace(/\n/g, '<br>')"
                ></p>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div v-else>
        <el-card
            :style="'background-color: ' + colorList[evaluationClick.Status]"
        >
          <el-row align="middle">
            <el-col :span="4">
              <div
                  style="
                  width: 50px;
                  text-align: left;
                  color: white;
                  font-size: 25px;
                "
              >
                {{ evaluationClick.Status }}
              </div>
            </el-col>
            <el-col :span="20">
              <el-row style="color: white; font-size: 14px; text-align: left">
                <el-col :span="20">
                  <el-row justify="space-between">
                    <el-col :span="12"
                    >运行时间:{{ evaluationClick.TimeUse }}ms
                    </el-col
                    >
                    <el-col :span="12">
                      运行内存:{{ evaluationClick.MemoryUse }}KB
                    </el-col
                    >
                  </el-row>
                </el-col>
                <el-col :span="20">
                  <el-row justify="space-between">
                    <el-col :span="12">
                      代码长度:{{ evaluationClick.Length }}
                    </el-col
                    >
                    <el-col :span="12">
                      语言:{{ evaluationClick.Language }}
                    </el-col
                    >
                  </el-row>
                </el-col>
                <el-col :span="24">
                  提交时间{{
                    moment(evaluationClick.SubmitTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                    )
                  }}
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
        <el-row :gutter="30" style="margin-top: 30px">
          <el-col :span="6" v-for="(item, index) in judgeCases" :key="index">
            <el-card
                :style="
                'width: 90px;height: 80px;' +
                'background-color: ' +
                colorList[codeList[item.Status]]
              "
            >
              <div style="position: absolute; left: 20px; top: 0; color: white">
                #{{ index + 1 }}
              </div>
              <div style="font-size: 10px; color: white">
                <div style="font-size: 15px">{{ codeList[item.Status] }}</div>
                <div>{{ item.TimeUse }}ms</div>
                <div>{{ item.MemoryUse }}KB</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row style="text-align: left; margin-top: 30px">
          <el-col :span="24">
            <el-button
                style="position: absolute; right: 0; top: 10px"
                type="text"
                @click="copy(evaluationClick.Code)"
            >
              <el-icon size="large">
                <CopyDocument></CopyDocument>
              </el-icon>
              复制
            </el-button>
            <highlightjs :code="evaluationClick.Code"></highlightjs>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {Clock, CopyDocument, Cpu, Notebook, Stopwatch} from "@element-plus/icons-vue";
import api from "@/api/api";
import OjCodeEditor from "@/components/oj/common/OjCodeEditor";
import {Splitpanes, Pane} from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import {marked} from "marked";
import {ElMessage} from "element-plus";
import useClipboard from "vue-clipboard3";
import store from "@/store";
import {mapGetters} from "vuex";
import moment from "moment";

const loading = ref(false);
const judgeCases = ref();
const dialogVisible = ref(false);
const {toClipboard} = useClipboard();
const route = useRoute();
const problemStatus = ref("");
const problemInfo = ref({});
const description = ref({});
const code = ref(
    '#include<iostream>\nusing namespace std;\nint main(){\n    cout<<"hello";\n}'
);
const language = ref("c++11");
const submitLanguage = ref({
  c99: "gnu c99",
  c11: "gnu c11",
  "c++11": "gnu cpp11",
  "c++14": "gnu cpp14",
  "c++17": "gnu cpp17",
  "c++20": "gnu cpp20",
});
/**
 * 颜色列表
 */
const colorList = ref({
  Pending: "#7c7c7c",
  Compiling: "#fd8387",
  Running: "#5db75e",
  AC: "#00b23e",
  CE: "#efc110",
  RE: "#8d43af",
  WA: "#e74b3d",
  TLE: "#2d468c",
  MLE: "#2d468a",
  OLE: "#10efc6",
  SE: "#ff8000",
});
/**
 * code列表
 */
const codeList = ref({
  "010": "AC",
  "011": "TLE",
  "012": "RE",
  "013": "MLE",
  "014": "WA",
  "015": "OLE",
  "017": "SE",
});
/**
 * 评测列表
 */
const evaluationList = ref();
/**
 * 列表容器
 */
const evaluationListRef = ref();
/**
 * 最近评测  点击评测
 */
const evaluationClick = ref({
  Code: "",
  Status: "Compiling",
});
/**
 * 获取store 是否登录字段
 */
const isLogin = computed(
    mapGetters(["getIsLogin"]).getIsLogin.bind({$store: store})
);
/**
 * 分页
 */
const pageBody = reactive({
  pageSize: 10,
  offset: 1,
  totalPage: null,
});

/**
 * 获取测试点信息
 * @param id 编号
 */
const getJudgeCases = (id) => {
  api.judge.getJudgeFull(id).then((res) => {
    evaluationClick.value = JSON.parse(res.Info);
  });
  api.judge.getJudgeCases(id).then((res) => {
    if (res.Statu === "000") {
      judgeCases.value = JSON.parse(res.Info);
      dialogVisible.value = true;
    }
  });
};
/**
 * 翻页
 */
const handleSizeChange = () => {
  let pages = Math.floor(pageBody.totalPage / pageBody.pageSize) + 1;
  if (pageBody.offset >= pages) {
    pageBody.offset = pages;
  }
  getMyEvaluation();
};
/**
 * 左边标签页更换前钩子
 */
const beforeChangeTab = (activeName) => {
  if (Number(activeName) === 1) {
    if (isLogin.value) {
      getMyListTotal();
      getMyEvaluation();
    } else {
      ElMessage.error("请先登录");
      store.dispatch("changeLoginVisible", true);
      return false;
    }
  }
};
/**
 * 获取我的评测
 */
const getMyEvaluation = () => {
  api.judge
      .getJudgeList({
        pagequery: {
          offset: pageBody.offset - 1,
          pagesize: pageBody.pageSize,
        },
        odd1: {
          UID: store.getters.getUserInfo.ID,
          p_id: problemInfo.value.ID,
        },
      })
      .then((res) => {
        evaluationList.value = JSON.parse(res.Info);
        console.log(evaluationList.value);
      });
};
/**
 * 获取我的评测总数
 */
const getMyListTotal = () => {
  api.judge
      .getJudgeCount({
        odd1: {
          UID: store.getters.getUserInfo.ID,
          p_id: problemInfo.value.ID,
        },
      })
      .then((res) => {
        pageBody.totalPage = res.Info;
      });
};
/**
 * 修改时间格式
 */
const updateTime = (val) => {
  return moment(val).format("YYYY-MM-DD HH:mm:ss");
};
/**
 * 适配后端语言
 */
const calLanguage = (val) => {
  if (typeof submitLanguage.value[val] !== "undefined") {
    val = submitLanguage.value[val];
  }
  return val;
};
/**
 * 登录判断
 */
const loginFirst = () => {
  if (!isLogin.value) {
    ElMessage.error("请先登录");
    store.dispatch("changeLoginVisible", true);
  }
};
/**
 * 提交代码
 */
const submitCode = async () => {
  loading.value = true;
  await api.judge.getBaseJudge().then((response) => {
    const tmp = response;
    tmp.PID = problemInfo.value.ID;
    tmp.PTitle = problemInfo.value.Title;
    tmp.Language = calLanguage(language.value);
    tmp.UID = store.getters.getUserInfo.ID;
    tmp.Code = code.value;
    api.judge.addJudge(tmp).then((response) => {
      loading.value = false;
      if (!response) {
        ElMessage.error("请求出错");
      } else if (response.Statu != "000") {
        ElMessage.error(response.Info);
      } else {
        ElMessage.success("提交成功");
        judgeCases.value = [];
        evaluationClick.value = {Code: "", Status: "Pending"};
        dialogVisible.value = true;
        const timer = setInterval(() => {
          api.judge.getJudgeStatus(response.Info).then((res) => {
            console.log(res.Info);
            if (
                res.Info !== "Pending" &&
                res.Info !== "Compiling" &&
                res.Info !== "Running"
            ) {
              clearInterval(timer);
              getJudgeCases(response.Info);
              getMyEvaluation();
            }
          });
        }, 500);
      }
    });
  });
};
/**
 * 重置代码
 */
const reset = () => {
  code.value = "";
};
/**
 * 初始化
 */
onMounted(() => {
  problemInfo.value.problemId = route.params.problemId;
  getProblem();
});
/**
 * 复制
 */
const copy = async (val) => {
  await toClipboard(val);
  ElMessage.success("复制成功");
};
/**
 * 获取题目信息
 */
const getProblem = () => {
  api.problem.getProblem(problemInfo.value.problemId).then((response) => {
    problemInfo.value = JSON.parse(response.Info);
    problemStatus.value = response.Statu;
    description.value = problemInfo.value.Description;
    description.value.Examples = JSON.parse(description.value.Examples);
    console.log(problemInfo.value)
  });
};
</script>

<style scoped>
.problem-title {
  font-weight: 500;
  font-size: 30px;
}

.problem-right {
  background-color: #ffffff;
}

.problem-left {
  background-color: #ffffff;
}

.el-tabs--border-card {
  border-bottom: 0;
}

.main {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: calc(1% + 60px);
}

>>> .el-card__header {
  padding: 0;
  background-color: #ffffff;
  border: 0;
}
b{
  font-size: 22px;
}

</style>
