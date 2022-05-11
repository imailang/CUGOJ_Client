<template>
  <el-row v-loading="problemLoading">
    <el-col :span="24">
      <el-card :body-style="{ padding: '5px' }">
        <template #header>
          <div style="text-align: left">
            <el-button
              style="margin-top: 5px; margin-left: 5px"
              @click="backToList"
              >返回题目列表</el-button
            >
          </div>
        </template>
        <div>
          <div class="problem-title">{{ problemInfo.Title }}</div>
          <el-divider />
          <splitpanes class="default-theme">
            <pane>
              <el-scrollbar class="problem-left">
                <div style="text-align: left">
                  <div v-show="description.BackGround !== ''">
                    <div style="color: #3090f2">题目背景 ：</div>
                    <p
                      style="margin-left: 30px"
                      v-html="description.BackGround"
                    ></p>
                  </div>
                  <div v-show="description.Description !== ''">
                    <div style="color: #3090f2">题目描述 ：</div>
                    <p
                      style="margin-left: 30px"
                      v-html="description.Description"
                    ></p>
                  </div>
                  <div v-show="description.Input !== ''">
                    <div style="color: #3090f2">输入描述 ：</div>
                    <p style="margin-left: 30px" v-html="description.Input"></p>
                  </div>
                  <div v-show="description.Output !== ''">
                    <div style="color: #3090f2">输出描述 ：</div>
                    <p
                      style="margin-left: 30px"
                      v-html="description.Output"
                    ></p>
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
                          输入用例{{ index + 1 }}:
                          <el-button type="text" @click="copy(item.input)">
                            <el-icon size="large">
                              <CopyDocument></CopyDocument>
                            </el-icon>
                          </el-button>
                        </div>
                        <el-card
                          style="margin-top: 5px; margin-left: 30px"
                          :body-style="{ padding: '5px' }"
                        >
                          {{ item.input }}
                        </el-card>
                      </el-col>
                      <el-col :span="12">
                        <div style="color: #3090f2">
                          输出用例{{ index + 1 }}:
                          <el-button type="text" @click="copy(item.output)">
                            <el-icon size="large">
                              <CopyDocument></CopyDocument>
                            </el-icon>
                          </el-button>
                        </div>
                        <el-card
                          style="margin-top: 5px; margin-right: 30px"
                          :body-style="{ padding: '5px' }"
                        >
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
                  </div>
                  <div v-show="description.Hint !== ''">
                    <div style="color: #3090f2">提示 ：</div>
                    <p
                      style="margin-left: 30px; font-size: 14px"
                      v-html="description.Hint"
                    ></p>
                  </div>
                </div>
              </el-scrollbar>
            </pane>
            <pane>
              <!--提交页-->
              <el-scrollbar class="problem-right">
                <OjCodeEditor
                  v-loading="loading"
                  v-model:code="code"
                  v-model:language="language"
                ></OjCodeEditor>
                <el-row
                  justify="end"
                  style="position: absolute; right: 30px; bottom: 25px"
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
                    :loading="loading"
                    :disabled="!isLogin || dialogVisible || loading || !Running"
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
      </el-card>
    </el-col>
  </el-row>

  <!-- 弹窗-->
  <el-dialog v-model="dialogVisible" title="评测详情">
    <div v-loading="loading">
      <div
        v-if="
          evaluationClick.Status === 'AC' || evaluationClick.Status === 'WA'
        "
      >
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
                      >运行时间:{{ evaluationClick.TimeUse }}ms</el-col
                    >
                    <el-col :span="12">
                      运行内存:{{ evaluationClick.MemoryUse }}KB</el-col
                    >
                  </el-row>
                </el-col>
                <el-col :span="20">
                  <el-row justify="space-between">
                    <el-col :span="12">
                      代码长度:{{ evaluationClick.Length }}</el-col
                    >
                    <el-col :span="12">
                      语言:{{ evaluationClick.Language }}</el-col
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
        <!-- <el-row :gutter="30" style="margin-top: 30px">
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
        </el-row> -->
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
      <div v-else-if="evaluationClick.Status === 'CE'">
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
          <div style="text-align: left; color: white; font-size: 25px">
            {{ evaluationClick.Status }}
          </div>
        </el-card>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { CopyDocument } from "@element-plus/icons-vue";
import api from "@/api/api";
import OjCodeEditor from "@/components/oj/common/OjCodeEditor";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { marked } from "marked";
import { ElMessage } from "element-plus";
import useClipboard from "vue-clipboard3";
import store from "@/store";
import { mapGetters } from "vuex";
import moment from "moment";
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  CPID: {
    default: 0,
  },
  CID: {
    default: 0,
  },
  Running: {
    default: false,
  },
});
const dialogVisible = ref(false);
const { toClipboard } = useClipboard();
const contestProblemInfo = ref({});
const problemInfo = ref({});
const description = ref({});
const code = ref("");
const loading = ref(false);
const language = ref("c++11");
const submitLanguage = ref({
  c99: "gnu c99",
  c11: "gnu c11",
  "c++11": "gnu cpp11",
  "c++14": "gnu cpp14",
  "c++17": "gnu cpp17",
  "c++20": "gnu cpp20",
});
const problemLoading = ref(true);
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
 * 列表容器
 */

const evaluationClick = ref({
  Code: "",
});
/**
 * 获取store 是否登录字段
 */
const isLogin = computed(
  mapGetters(["getIsLogin"]).getIsLogin.bind({ $store: store })
);

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
  await api.judge.getBaseContestJudge().then((response) => {
    const tmp = response;
    tmp.CPID = Number(props.CPID);
    tmp.PTitle = problemInfo.value.Title;
    tmp.Language = calLanguage(language.value);
    tmp.UID = store.getters.getUserInfo.ID;
    tmp.Code = code.value;
    tmp.CID = Number(props.CID);
    api.judge.addContestJudge(tmp).then((response) => {
      loading.value = false;
      if (!response) {
        ElMessage.error("请求出错");
      } else if (response.Statu != "000") {
        ElMessage.error(response.Info);
      } else {
        ElMessage.success("提交成功");
        evaluationClick.value = { Code: "", Status: "Pending" };
        dialogVisible.value = true;
        const timer = setInterval(() => {
          api.judge.getContestJudgeStatus(response.Info).then((res) => {
            if (
              res.Info !== "Pending" &&
              res.Info !== "Compiling" &&
              res.Info !== "Running"
            ) {
              clearInterval(timer);
              api.judge.getContestJudgeFull(response.Info).then((res) => {
                console.log(res);
                evaluationClick.value = JSON.parse(res.Info);
                dialogVisible.value = true;
              });
              //getJudgeCases(res.ID);
              emits("submited");
            }
          });
        }, 1000);
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
  api.problem.getContestProblem(props.CPID).then((response) => {
    problemLoading.value = false;
    if (!response) {
      ElMessage.error("请求出错");
    } else if (response.Statu != "000") {
      ElMessage.error(response.Info);
    } else {
      contestProblemInfo.value = JSON.parse(response.Info);
      console.log(contestProblemInfo.value);
      problemInfo.value = contestProblemInfo.value.Problem;
      description.value = problemInfo.value.Description;
      description.value.Examples = JSON.parse(description.value.Examples);
    }
  });
};

// eslint-disable-next-line no-undef
const emits = defineEmits(["back", "submited"]);
/**
 * 编辑区代码变化
 */

const backToList = () => {
  emits("back");
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
  height: 100%;
  background-color: #ffffff;
}

.el-tabs--border-card {
  border-bottom: 0;
}

>>> .el-card__header {
  padding: 0;
  background-color: #ffffff;
  border: 0;
}

>>> .CodeMirror {
  height: 776px;
}
</style>