<template>
  <el-card>
    <template #header>
      {{ competitionInfo.competitionId }}
    </template>
    <el-row justify="space-between" align="middle">
      <el-col :span="6" style="text-align: left">
        <el-tag effect="plain" type="danger" size="large">私有赛</el-tag>
      </el-col>
      <el-col :span="18" style="text-align: right">
        <el-tag effect="plain" size="large" style="margin-right: 20px">
          <div >
            <el-icon>
              <user></user>
            </el-icon>
            <span>X7</span>
          </div>
        </el-tag>
        <el-tag size="large">
          <p>
            <el-icon>
              <Goblet></Goblet>
            </el-icon>
            <span>OI</span>
          </p>
        </el-tag>
      </el-col>
    </el-row>
    <el-row justify="space-between" align="middle">
      <el-col :span="12">开始时间</el-col>
      <el-col :span="12">结束时间</el-col>
    </el-row>
    <el-slider v-model="curVal" size="large" disabled="true"/>
  </el-card>

  <el-tabs class="demo-tabs" style="background-color: #ffffff;margin: 30px 0">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><calendar/></el-icon>
          <span>比赛简介</span>
        </span>
      </template>
      Route
    </el-tab-pane>
    <el-tab-pane label="题目">题目</el-tab-pane>
    <el-tab-pane label="状态">状态</el-tab-pane>
    <el-tab-pane label="排名">排名</el-tab-pane>
    <el-tab-pane label="公告">公告</el-tab-pane>

  </el-tabs>
  sds
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {Calendar, Goblet, User} from "@element-plus/icons-vue";
import moment from "moment";

/**
 * 路由
 */
const route = useRoute();
/**
 * 当前进度
 */
const curVal = ref()
const competitionInfo = ref({
  competitionId: '',
  startTime: '2022-4-10 23:21:24',
  endTime: '2022-4-15 23:21:36'
})
/**
 * 初始化
 */
onMounted(() => {
  competitionInfo.value.competitionId = route.params.competitionId
  calCurVal()
})
/**
 * 计算当前时间点
 */
const calCurVal = () => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss')
  const tot = moment(competitionInfo.value.endTime).diff(competitionInfo.value.startTime, "seconds")
  const past = moment(now).diff(competitionInfo.value.startTime, "seconds");
  curVal.value = past / tot * 100

}
</script>

<style scoped>
/deep/ .el-card__header {
  border-bottom: 0;
  padding-bottom: 0;
}

/deep/ .el-card__body {
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