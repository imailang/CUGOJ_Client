<template>
  <el-row justify="space-around">
    <el-col :span="24">
      <el-card>
        <template #header>
          <el-row justify="space-between" align="middle">
            <el-col :xs="6" :sm="4"><p class="panel-title">全部竞赛</p></el-col>
            <el-col :xs="18" :sm="20">
              <el-row justify="end" align="middle">
                <el-col :xs="4" :sm="3">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      规则
                      <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>全部</el-dropdown-item>
                        <el-dropdown-item>ACM</el-dropdown-item>
                        <el-dropdown-item>OI</el-dropdown-item>
                        <el-dropdown-item>codeforces</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </el-col>
                <el-col :xs="4" :sm="3">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      状态
                      <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>全部</el-dropdown-item>
                        <el-dropdown-item>筹备中</el-dropdown-item>
                        <el-dropdown-item>进行中</el-dropdown-item>
                        <el-dropdown-item>已结束</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </el-col>
                <el-col :xs="12" :sm="5">
                  <el-input placeholder="请输入关键字" :suffix-icon="Search" />
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>

        <div v-for="(item, index) in contests" :key="index">
          <div class="left-border">
            <el-row justify="space-between" align="middle">
              <el-col :xs="6" :sm="4" :md="3" :lg="3">
                <el-image
                  v-if="item.type === 0"
                  :src="require('@/assets/ACM_logo.png')"
                  style="width: 95px; height: 95px"
                  lazy
                ></el-image>
                <el-image
                  v-else-if="item.type === 1"
                  :src="require('@/assets/OI_logo.png')"
                  style="width: 95px; height: 95px"
                  lazy
                ></el-image>
              </el-col>
              <el-col :xs="10" :sm="16" :md="19" :lg="19" class="contest-main">
                <el-link class="contest-title" @click="getCompetitionUri(item)">
                  {{ item.title }}
                </el-link>

                <el-tag
                  v-if="item.owner != 0"
                  effect="plain"
                  type="danger"
                  style="margin-left: 5px"
                  >私有赛</el-tag
                >
                <el-tag
                  v-if="item.owner == 0"
                  effect="plain"
                  type="primary"
                  style="margin-left: 5px"
                  >公开赛</el-tag
                >
                <el-tag
                  v-if="item.status === '进行中'"
                  class="ml-2"
                  type="success"
                  effect="dark"
                  style="margin-left: 10px"
                >
                  进行中
                </el-tag>
                <el-tag
                  v-else-if="item.status === '已结束'"
                  class="ml-2"
                  type="danger"
                  effect="dark"
                  style="margin-left: 10px"
                >
                  已结束
                </el-tag>
                <el-tag
                  v-else-if="item.status === '未开始'"
                  class="ml-2"
                  effect="dark"
                  style="margin-left: 10px"
                >
                  未开始
                </el-tag>
                <div class="detail">
                  <el-icon color="#3091f2" :size="18" style="margin-left: 5px">
                    <Calendar></Calendar>
                  </el-icon>
                  {{ item.startTime }}
                  <el-icon color="#3091f2" :size="18" style="margin-left: 5px">
                    <Clock></Clock>
                  </el-icon>
                  {{ item.length }}

                  <el-icon color="#3091f2" :size="18" style="margin-left: 5px">
                    <Avatar></Avatar>
                  </el-icon>
                  X{{ item.num }}
                </div>
              </el-col>
              <el-col
                :xs="4"
                :sm="4"
                :md="2"
                :lg="2"
                style="text-align: center"
              >
                <el-button
                  v-if="
                    item.permission == 2 &&
                    (item.status === '未开始' || item.status === '进行中') &&
                    item.visible != 1
                  "
                  type="primary"
                  @click="openregisterDialog(item)"
                >
                  报名
                </el-button>
                <font style="color: #05e745" v-else-if="item.permission == 1">
                  已报名
                </font>
                <el-button v-else-if="item.permission == 0" type="primary">
                  请先登录
                </el-button>
                <font style="color: #ec1c24" v-else-if="item.visible == 1">
                  该比赛为邀请制，不允许报名
                </font>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalPage"
          @current-change="onCurrentChanged"
        />
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="registerDialog" title="报名" center :model="form">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-row>
          <h2>
            <b> 欢迎报名参加{{ registerData.title }}</b>
          </h2>
        </el-row>
        <el-row>
          <p><b>我代表个人（团队）承诺：</b></p>
        </el-row>
        <el-row>
          <p>1.参与比赛不违纪、不作弊。</p>
          <p>2.严格遵守比赛纪律，不使用比赛主办方禁止携带或使用的违禁物品。</p>
          <p>3.比赛过程中不与队伍以外的人沟通合作，不以非常规方式骗取AC。</p>
          <p>4.自觉维护竞赛纪律，配合监考人员以及主办方的安排。</p>
        </el-row>
      </el-col>
    </el-row>

    <el-row justify="space-around" v-if="registerData.mode == 1">
      <el-divider />
      <p>该比赛要求团队参赛，请选择您要报名的队伍：</p>
      <el-select
        v-model="registerParams.tid"
        class="m-2"
        placeholder="Select"
        size="large"
        clearable
      >
        <el-option
          v-for="item in teams"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-row>
    <el-row justify="space-around" v-else-if="registerData.mode == 2">
      <el-divider />
      <p>该比赛允许个人/团队参赛，请选择您的参赛方式：</p>
      <div>
        <el-radio v-model="registerParams.mode" label="1" size="large" border
          >个人参赛</el-radio
        >
        <el-radio v-model="registerParams.mode" label="2" size="large" border
          >团队参赛</el-radio
        >
      </div>
      <div v-if="registerParams.mode === '2'">
        <el-select
          v-model="registerParams.tid"
          class="m-2"
          placeholder="Select"
          size="large"
          clearable
        >
          <el-option
            v-for="item in teams"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
    </el-row>
    <el-row justify="space-around" v-if="registerData.visible == 2">
      请输入参赛密码：
      <el-input
        v-model="registerParams.password"
        placeholder="参赛密码"
      ></el-input>
    </el-row>
    <template #footer>
      <el-button
        type="primary"
        size="large"
        @click="register"
        v-loading="registerLoading"
      >
        报名
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import moment from "moment";
import { Avatar, Calendar, Clock, Search } from "@element-plus/icons-vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import router from "@/router";
import api from "@/api/api";
import { ElMessage } from "element-plus";

const registerLoading = ref(false);
const registerDialog = ref(false);
const registerData = reactive({});
const odds = reactive({
  pagequery: {
    offset: 0,
    pagesize: 10,
  },
});
const totalPage = ref(1);
const registerParams = reactive({
  tid: "",
});
const teams = ref([]);
/**
 * 比赛数据
 */
const contests = ref([]);
/**
 * 初始化
 */
onMounted(() => {
  updateContestList();
  updateTeams();
});

const openregisterDialog = (item) => {
  registerDialog.value = true;
  registerData.id = item.id;
  registerData.title = item.title;
  registerData.mode = item.registerMode;
  registerData.visible = item.visible;
  registerParams.mode = "1";
  registerParams.tid = "";
  registerParams.cid = item.id;
  registerParams.password = "";
};

const updateTeams = () => {
  api.team.getSelfTeamList().then((response) => {
    if (typeof response === "undefined") {
      ElMessage.error("服务器响应出错");
    } else if (response.Statu != "000") {
      ElMessage.error("请先登录");
    } else {
      teams.value = [];

      JSON.parse(response.Info).forEach((item) => {
        teams.value.push({
          id: item.ID.toString(),
          name: item.Name,
        });
      });
    }
    console.log(teams.value);
  });
};

const onCurrentChanged = (cur) => {
  odds.pagequery.offset = cur - 1;
  updateContestList();
};

const register = () => {
  if (
    registerData.mode == 1 ||
    (registerData.mode == 2 && registerParams.mode == 2)
  ) {
    if (registerParams.tid === "") {
      ElMessage.error("请选择要报名的队伍");
      return;
    }
  }
  registerLoading.value = true;
  api.contest
    .registerContest({
      tid: Number(registerParams.tid),
      mode: Number(registerParams.mode),
      password: registerParams.password,
      cid: registerParams.cid,
    })
    .then((response) => {
      registerLoading.value = false;
      if (typeof response === "undefined") {
        ElMessage.error("请求出错");
        return;
      } else if (response.Statu == "000") {
        ElMessage.success("报名成功");
        contests.value.forEach((item) => {
          if (item.id == registerParams.cid) {
            item.num++;
            item.permission = 1;
          }
        });
        registerDialog.value = false;
      } else if (response.Statu == "025") {
        ElMessage.error("请不要重复报名");
        registerDialog.value = false;
      } else if (response.Statu == "033") {
        ElMessage.error("密码错误");
      } else {
        ElMessage.error(
          response.Info +
            "，请确保自己已经登录，以队伍形式报名是请确保使用了自己为成员的合法队伍"
        );
      }
    });
};

const updateContestList = () => {
  api.contest.getUserContestCount(odds).then((response) => {
    if (typeof response === "undefined" || response.Statu != "000") {
      ElMessage.error("请求出错");
      return;
    }
    totalPage.value = Math.max(Number(response.Info) / 10, 1);
  });
  api.contest.getUserContestList(odds).then((response) => {
    if (typeof response === "undefined") {
      ElMessage.error("请求出错");
      return;
    }
    var tmp = JSON.parse(response.Info);
    contests.value = [];
    tmp.forEach((element) => {
      contests.value.push({
        id: element.ID,
        title: element.Title,
        type: element.Type,
        startTime: element.StartTime,
        endTime: element.EndTime,
        num: element.RegisterCount,
        owner: element.Owner,
        permission: element.Permission,
        registerMode: element.RegisteMode,
        visible: element.Visible,
      });
    });
    contests.value.forEach((element) => {
      var d1 = new Date(element.startTime);
      var d2 = new Date(element.endTime);
      var dnow = new Date();
      if (dnow < d1) {
        element.status = "未开始";
      } else if (dnow > d1 && dnow < d2) {
        element.status = "进行中";
      } else if (dnow > d2) {
        element.status = "已结束";
      }
      element.startTime = d1.toLocaleString("zh", { hour12: false });
      element.endTime = d2.toLocaleString("zh", { hour12: false });
      var duration = moment.duration(d2 - d1);
      element.length =
        duration.hours().toString().padStart(2, "0") +
        ":" +
        duration.minutes().toString().padStart(2, "0") +
        ":" +
        duration.seconds().toString().padStart(2, "0");
    });
    console.log(contests.value);
  });
};

// /**
//  * 计算剩余时间
//  */
// const calTime = (start) => {
//   moment.suppressDeprecationWarnings = true;
//   const now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
//   const day = moment(start).diff(now, "days");
//   if (day <= 2) {
//     return moment(start).diff(now, "hours") + "小时";
//   }
//   return day + "天";
// };
/**
 * 点击跳转比赛
 */
const getCompetitionUri = (item) => {
  if (item.owner > 1 || item.visible == 0 || item.permission == 1) {
    router.push({
      path: "/competition/" + item.id,
    });
  } else {
    ElMessage.info("请先报名再查看比赛详情");
  }
};
</script>

<style scoped>
.panel-title {
  font-size: 1.5rem !important;
  font-weight: 500;
  line-height: 0;
}

/deep/ .el-card__header {
  border-bottom: 0;
  padding-bottom: 0;
}

/deep/ .el-card__body {
  padding: 50px;
}

.el-input {
  max-width: 200px;
}

.el-divider {
  margin-bottom: 10px;
}

.left-border {
  border-left: 4px solid rgb(25, 190, 107);
}

.contest-main {
  text-align: left;
}

.contest-main .contest-title {
  font-size: 1.75rem;
  padding-left: 8px;
  margin-bottom: 0;
  font-weight: 400;
}

.contest-main .detail {
  list-style: none;
  font-size: 1.25rem;
  padding-left: 5px;
  padding-bottom: 10px;
  margin-top: 10px;
}
</style>