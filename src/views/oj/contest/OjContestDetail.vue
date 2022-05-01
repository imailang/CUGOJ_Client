<template>
  <el-card>
    <template #header>
      <h1>
        <b>{{ contestInfo.title }}</b>
      </h1>
    </template>
    <el-row justify="space-between" align="middle">
      <el-col :span="6" style="text-align: left">
        <el-tag
          effect="plain"
          :type="contestInfo.owner == 0 ? 'primary' : 'danger'"
          size="large"
          >{{ contestInfo.owner == 0 ? "公开赛" : "私有赛" }}</el-tag
        >
      </el-col>
      <el-col :span="18" style="text-align: right">
        <el-tag effect="plain" size="large" style="margin-right: 20px">
          <div>
            <el-icon>
              <user></user>
            </el-icon>
            <span>X{{ contestInfo.num }}</span>
          </div>
        </el-tag>
        <el-tag size="large">
          <p>
            <el-icon>
              <Goblet></Goblet>
            </el-icon>
            <span v-if="contestInfo.type == 0">ACM</span>
            <span v-if="contestInfo.type == 1">OI</span>
            <span v-if="contestInfo.type == 2">CF</span>
          </p>
        </el-tag>
      </el-col>
    </el-row>
    <el-row justify="space-between" align="middle">
      <el-col :span="12">开始时间: {{ contestInfo.startTime }}</el-col>
      <el-col :span="12">结束时间: {{ contestInfo.endTime }}</el-col>
    </el-row>
    <el-slider v-model="curVal" size="large" disabled="true" />
  </el-card>

  <el-card style="margin-top: 10px">
    <el-row justify="space-around">
      <el-col :span="22">
        <el-tabs
          class="demo-tabs"
          style="background-color: #ffffff; margin: 30px 0"
        >
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><calendar /></el-icon>
                <span>比赛简介</span>
              </span>
            </template>
            <el-row justify="start">
              <el-col :span="20" :offset="2">
                <span
                  style="float: left; margin-bottom: 10px; margin-top: 10px"
                  v-html="contestInfo.profile"
                ></span>
              </el-col>
            </el-row>
            <el-divider />
            <el-row justify="start">
              <el-col :span="20" :offset="2">
                <span
                  style="float: left; margin-bottom: 10px; margin-top: 10px"
                  v-html="contestInfo.description"
                ></span>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="题目">
            <div v-if="contestInfo.status == '未开始'">
              <el-row justify="space-around">
                <el-col :span="20">
                  <h1>比赛尚未开始</h1>
                </el-col>
              </el-row>
            </div>
            <div v-else>
              <vxe-table :data="contestProblems" ref="Xtable">
                <vxe-column field="showID" title="#" width="90px"></vxe-column>
                <vxe-column field="title" title="题目">
                  <template v-slot="{ row }">
                    <el-link @click="getProblemURI(row.pID)">{{
                      row.title
                    }}</el-link>
                  </template>
                </vxe-column>
                <vxe-column
                  field="submitCount"
                  title="提交数"
                  width="120px"
                ></vxe-column>
                <vxe-column title="通过率" width="200px">
                  <template v-slot="{ row }">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="row.submitACCount + '/' + row.submitCount"
                      placement="top"
                    >
                      <el-progress
                        :text-inside="true"
                        :percentage="
                          (row.submitACCount * 100) /
                          Math.max(1, row.submitCount)
                        "
                        :stroke-width="24"
                      />
                    </el-tooltip>
                  </template>
                </vxe-column>
              </vxe-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="状态">
            <OjJudgerList :CID="contestID"> </OjJudgerList>
          </el-tab-pane>
          <el-tab-pane label="排名">排名</el-tab-pane>
          <el-tab-pane label="公告">公告</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-card>

  sds
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { Calendar, Goblet, User } from "@element-plus/icons-vue";
import moment from "moment";
import { ElMessage } from "element-plus";
import api from "@/api/api";
import router from "@/router";
import OjJudgerList from "@/components/oj/common/OjJudgerList.vue";
/**
 * 路由
 */
const route = useRoute();
/**
 * 当前进度
 */
const curVal = ref(0);

const contestInfo = reactive({});

const contestID = ref(0);

const contestProblems = ref([]);

/**
 * 初始化
 */
onMounted(() => {
  contestID.value = route.params.contestId;
  updateContest();
});

const getProblemURI = (id) => {
  router.push({
    path: "/contest/problem/" + id,
  });
};

const updateContest = () => {
  api.contest.getContestDetail(contestID.value).then((response) => {
    if (typeof response === "undefined") {
      ElMessage.error("请求出错");
      return;
    } else if (response.Statu != "000") {
      ElMessage.error(response.Info);
      return;
    }
    var element = JSON.parse(response.Info);
    var d1 = new Date(element.StartTime);
    var d2 = new Date(element.EndTime);
    console.log(d1);
    var dnow = new Date();
    if (dnow < d1) {
      contestInfo.status = "未开始";
    } else if (dnow > d1 && dnow < d2) {
      contestInfo.status = "进行中";
    } else if (dnow > d2) {
      contestInfo.status = "已结束";
    }
    contestInfo.startTime = d1.toLocaleString("zh", { hour12: false });
    contestInfo.endTime = d2.toLocaleString("zh", { hour12: false });
    var length = moment.duration(d2 - d1);
    curVal.value = Math.max(
      0,
      Math.min(100, (moment.duration(new Date() - d1) * 100) / length)
    );
    contestInfo.startTimeDate = d1;
    contestInfo.endTimeDate = d2;
    contestInfo.id = element.ID;
    contestInfo.title = element.Title;
    contestInfo.type = element.Type;
    contestInfo.num = element.RegisterCount;
    contestInfo.owner = element.Owner;
    contestInfo.permission = element.Permission;
    contestInfo.registerMode = element.RegisteMode;
    contestInfo.visible = element.Visible;
    contestInfo.problems = element.Problems;
    contestInfo.profile = element.Profile;
    contestInfo.description = element.Description;
  });
  api.contest.getRunningContestProblems(contestID.value).then((response) => {
    if (typeof response === "undefined") {
      ElMessage.error("请求出错");
      return;
    } else if (response.Statu != "000") {
      contestProblems.value = [];
      return;
    }
    var tmp = JSON.parse(response.Info);
    contestProblems.value = [];
    tmp.forEach((item) => {
      contestProblems.value.push({
        showID: item.ShowID,
        pID: item.PID,
        title: item.Title,
        color: item.Color,
        score: item.Score,
        submitCount: item.SubmitCount,
        submitACCount: item.SubmitACCount,
      });
    });
  });
};
</script>

<style scoped>
::v-deep .el-card__header {
  border-bottom: 0;
  padding-bottom: 0;
}

::v-deep .el-card__body {
  padding: 50px;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>