<template>
  <el-card>
    <template #header>
      <el-page-header content="创建比赛" @back="goBack" />
    </template>
    <el-form
      ref="contestInfoRef"
      :model="contestInfo"
      label-position="top"
      label-width="70px"
    >
      <!-- 比赛标题-->
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item prop="title" label="比赛标题" required>
            <el-input
              placeholder="请输入比赛标题"
              size="large"
              v-model="contestInfo.title"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 信息设置-->
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="authur" label="比赛主办人" required>
            <el-input
              placeholder="请输入比赛主办人"
              size="large"
              v-model="contestInfo.authur"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row justify="space-around">
        <el-col :span="8">
          <el-form-item label="比赛赛制" v-model="contestInfo.type">
            <el-select
              v-model="contestInfo.type"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option :key="'0'" :label="'ACM赛制'" :value="'0'" />
              <el-option :key="'1'" :label="'OI赛制'" :value="'1'" />
              <el-option :key="'2'" :label="'CF赛制'" :value="'2'" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="比赛可见性" v-model="contestInfo.owner">
            <el-select
              v-model="contestInfo.owner"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option :key="'0'" :label="'所有人可见'" :value="'0'" />
              <el-option
                :key="'1'"
                :label="'仅管理员和自己可见'"
                :value="'1'"
              />
              <el-option :key="'2'" :label="'仅自己可见'" :value="'2'" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="比赛报名权限" v-model="contestInfo.visible">
            <el-select
              v-model="contestInfo.visible"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option :key="'0'" :label="'所有人可报名'" :value="'0'" />
              <el-option :key="'1'" :label="'仅允许主办者邀请'" :value="'1'" />
              <el-option :key="'2'" :label="'通过密码报名'" :value="'2'" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row justify="space-around">
        <el-col :span="8">
          <el-form-item label="比赛开始时间" v-model="contestInfo.startTime">
            <el-date-picker
              v-model="contestInfo.startTime"
              type="datetime"
              placeholder="比赛开始时间"
              format="YYYY/MM/DD hh:mm:ss"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="比赛结束时间" v-model="contestInfo.endTime">
            <el-date-picker
              v-model="contestInfo.endTime"
              type="datetime"
              placeholder="比赛结束时间"
              format="YYYY/MM/DD hh:mm:ss"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="是否封榜" v-model="contestInfo.sealRank">
            <el-switch v-model="contestInfo.sealRank" class="ml-2" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row justify="space-around">
        <el-col :span="8">
          <el-form-item label="报名方式" v-model="contestInfo.registeMode">
            <el-select
              v-model="contestInfo.registeMode"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option :key="'0'" :label="'个人报名'" :value="'0'" />
              <el-option :key="'1'" :label="'团队报名'" :value="'1'" />
              <el-option
                :key="'2'"
                :label="'个人和团队混合报名'"
                :value="'2'"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="排名显示信息" v-model="contestInfo.rankShowName">
            <el-select
              v-model="contestInfo.rankShowName"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option
                :key="'username'"
                :label="'用户名'"
                :value="'username'"
              />
              <el-option
                :key="'nickname'"
                :label="'昵称'"
                :value="'nickname'"
              />
              <el-option
                :key="'realname'"
                :label="'真实姓名'"
                :value="'realname'"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="是否开放打印" v-model="contestInfo.openPrint">
            <el-switch v-model="contestInfo.openPrint" class="ml-2" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row justify="space-around">
        <el-col :span="8">
          <el-form-item label="是否开放外榜" v-model="contestInfo.openOutRank">
            <el-switch v-model="contestInfo.openOutRank" class="ml-2" />
          </el-form-item>
        </el-col>

        <el-col :span="8" v-if="contestInfo.sealRank">
          <el-form-item label="封榜时间">
            <el-date-picker
              v-model="contestInfo.sealRankTime"
              type="datetime"
              placeholder="封榜时间"
              format="YYYY/MM/DD hh:mm:ss"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8" v-if="contestInfo.visible === '2'">
          <el-form-item prop="title" label="密码" required>
            <el-input
              placeholder="请输入比赛密码"
              v-model="contestInfo.password"
              class="m-2"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div>
        <!-- 比赛简介-->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
              label="比赛简介"
              v-model="contestInfo.profile"
              prop="profile"
            >
              <AdminMakedown v-model:code="contestInfo.profile"></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
              label="比赛描述"
              v-model="contestInfo.description"
              prop="description"
            >
              <AdminMakedown
                v-model:code="contestInfo.description"
              ></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="1">
            <vxe-toolbar>
              <template #buttons>
                <vxe-button
                  icon="fa fa-plus"
                  @click="addProblem()"
                  style="float: left"
                  >增加题目</vxe-button
                >
              </template>
            </vxe-toolbar>
            <vxe-table :data="contestProblems" stripe border
              >>
              <vxe-column field="showID" title="#" width="80px"></vxe-column>
              <vxe-column field="pID" title="题目编号" :edit-render="{}">
                <template v-slot="{ row }">
                  <el-input
                    v-model="row.pID"
                    :disabled="row.status == 1"
                    placeholder="请输入题目编号"
                    @change="
                      (val) => {
                        updateProblem(val, row.showID);
                      }
                    "
                  ></el-input>
                </template>
              </vxe-column>
              <vxe-column field="title" title="题目标题">
                <template v-slot="{ row }">
                  <span v-if="row.status == 0"> 请输入题目编号以加载题目 </span>
                  <span v-else-if="row.status == 1">
                    <span v-loading="true"> 加载中 </span>
                  </span>
                  <span v-else-if="row.status == 2">
                    {{ row.title }}
                  </span>
                  <span v-else>
                    <el-tag class="ml-2" type="danger">题目编号不存在</el-tag>
                  </span>
                </template>
              </vxe-column>
              <vxe-column
                field="color"
                title="气球颜色"
                :edit-render="{}"
                width="80px"
              >
                <template v-slot="{ row }">
                  <el-color-picker v-model="row.color" />
                </template>
              </vxe-column>
              <vxe-column title="操作" width="80px">
                <template v-slot="{ row }">
                  <el-button
                    type="danger"
                    :icon="Delete"
                    circle
                    size="small"
                    @click="removeProblem(row.showID)"
                  >
                  </el-button>
                </template>
              </vxe-column>
            </vxe-table>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="16" :offset="4">
            <el-button
              @click="submit"
              type="primary"
              style="width: 100%"
              v-loading="submitLoading"
              :disabled="submitLoading"
              >提交</el-button
            >
          </el-col>
        </el-row>
      </div>
    </el-form>
  </el-card>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import AdminMakedown from "@/components/admin/common/AdminMakedown";
import { Delete } from "@element-plus/icons-vue";
import { marked } from "marked";
import api from "@/api/api";
import router from "@/router";
import { ElMessage } from "element-plus";
// import { ElMessage } from "element-plus";
//import AdminAccordion from "@/components/admin/common/AdminAccordion";

/**
 * 比赛信息
 */
const contestInfo = reactive({
  authur: "",
  title: "",
  type: "0",
  source: "",
  owner: "0",
  visible: "0",
  password: "",
  startTime: dateFormat("YYYY-mm-ddTHH:MM:SS+08:00", new Date()),
  endTime: dateFormat("YYYY-mm-ddTHH:MM:SS+08:00", new Date()),
  profile: "",
  description: "",
  sealRank: false,
  sealRankTime: dateFormat("YYYY-mm-ddTHH:MM:SS+08:00", new Date()),
  openPrint: false,
  rankShowName: "nickname",
  openOutRank: false,
  registeMode: "0",
});

/**
 * 比赛问题列表
 */
const contestProblems = ref([]);

/**
 * 比赛编号，只有在创建以后00才会被赋值
 */
// const contestID = ref(0);
onMounted(() => {
  console.log(new Date().toUTCString());
  console.log(dateFormat("YYYY-mm-ddTHH:MM:SS+08:00", new Date()));
});
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
const removeProblem = (showID) => {
  contestProblems.value = contestProblems.value.filter((item) => {
    if (item.showID != showID) return item;
  });
};
/**
 * 在输入题目编号之后更新题目标题
 */
const updateProblem = (val, showID) => {
  contestProblems.value.forEach((item) => {
    if (item.showID == showID) {
      if (val === "") {
        item.status = 0;
        return;
      }
      item.status = 1;
    }
  });
  api.problem.getTitleByID(Number(val)).then((response) => {
    if (typeof response === "undefined") {
      ElMessage.error("请求出错");
      contestProblems.value.forEach((item) => {
        if (item.showID == showID) {
          item.title = response.Info;
          item.status = 0;
        }
      });
      return;
    } else if (response.Statu !== "000") {
      contestProblems.value.forEach((item) => {
        if (item.showID == showID) {
          item.status = 3;
        }
      });
    } else {
      contestProblems.value.forEach((item) => {
        if (item.showID == showID) {
          item.title = response.Info;
          item.status = 2;
        }
      });
    }
  });
};

/**
 * 表单容器
 */
const contestInfoRef = ref();

/**
 * 添加题目
 */
const addProblem = () => {
  if (contestProblems.value.length >= 26) {
    ElMessage.error("一场比赛最多创建26个题目");
    return;
  }
  contestProblems.value.push({
    showID: "" + String.fromCharCode(65 + contestProblems.value.length),
    pID: "",
    title: "",
    color: "#FFFFFF",
    score: "",
    status: 0,
  });
  contestProblems.value = contestProblems.value.filter((item) => {
    return item;
  });
};

const submitLoading = ref(false);

/**
 * 提交
 */
const submit = () => {
  var check = true;
  contestProblems.value.forEach((item) => {
    if (item.status != 2) {
      ElMessage.error("请确保所有题目正确之后再提交");
      check = false;
      return;
    }
  });
  if (!check) {
    return;
  }
  submitLoading.value = true;
  api.contest
    .addContest({
      Authur: contestInfo.authur,
      Title: contestInfo.title,
      Type: Number(contestInfo.type),
      Source: contestInfo.source,
      Owner: Number(contestInfo.owner),
      Visible: Number(contestInfo.visible),
      Password: contestInfo.password,
      StartTime: contestInfo.startTime,
      EndTime: contestInfo.endTime,
      Profile: marked(contestInfo.profile),
      Description: marked(contestInfo.description),
      SealRank: contestInfo.sealRank,
      SealRankTime: contestInfo.sealRankTime,
      Status: 0,
      OpenPrint: contestInfo.openPrint,
      RankShowName: contestInfo.rankShowName,
      OpenOutRank: contestInfo.openOutRank,
      RegisteMode: Number(contestInfo.registeMode),
    })
    .then((response) => {
      if (typeof response === "undefined") {
        submitLoading.value = false;
        ElMessage.error("请求出错");
      } else if (response.Statu != "000") {
        submitLoading.value = false;
        ElMessage.error(response.Info);
      } else {
        var CID = response.Info;
        if (contestProblems.value.length == 0) {
          ElMessage.success("比赛已保存");
          router.push({
            path: "/admin/contest/edit/" + Number(CID),
          });
          submitLoading.value = false;
          return;
        }
        var params = [
          {
            CID: Number(response.Info),
          },
        ];
        contestProblems.value.forEach((item) => {
          params.push({
            ShowID: item.showID,
            PID: Number(item.pID),
            CID: Number(response.Info),
            Title: item.title,
            Color: item.color,
            Score: item.score,
          });
        });
        api.contest.setContestProblems(params).then((response) => {
          if (typeof response === "undefined") {
            ElMessage.error("请求出错");
            submitLoading.value = false;
          } else if (response.Statu != "000") {
            ElMessage.error(response.Info);
            submitLoading.value = false;
          } else {
            ElMessage.success("比赛已保存");
            router.push({
              path: "/admin/contest/edit/" + Number(CID),
            });
          }
        });
      }
    });
};
/**
 * 重置
 */
// const reset = () => {
//   problemInfoRef.value.resetFields();
//   problemInfo.value.examples = [];
// };

/**
 * 返回上一页
 */
const goBack = () => {
  router.back();
};
</script>

<style scoped>
.add-examples {
  width: 100%;
  background-color: #fff;
  border: 1px dashed #19bc6b;
  outline: none;
  cursor: pointer;
  color: #19bc6b;
  height: 35px;
  font-size: 14px;
}

.add-examples i {
  margin-right: 10px;
}

.add-examples:hover {
  border: 0px;
  background-color: #19bc6b !important;
  color: #fff;
}
</style>