<template>
  <el-row justify="space-around">
    <el-col :span="24">
      <el-card shadow="">
        <template #header>
          <el-row justify="space-between" align="middle">
            <el-col :xs="6" :sm="4"><p class="panel-title">全部竞赛</p></el-col>
            <el-col :xs="18" :sm="20">
              <el-row justify="end" align="middle">
                <el-col :xs="4" :sm="3">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      规则
                      <el-icon class="el-icon--right"><arrow-down/></el-icon>
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
                    <el-icon class="el-icon--right"><arrow-down/></el-icon>
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
                  <el-input
                      placeholder="请输入关键字"
                      :suffix-icon="Search"
                  />
                </el-col>
              </el-row>


            </el-col>
          </el-row>
        </template>
        <div v-for="(item,index) in contests" :key="index">
          <div class="left-border">
            <el-row justify="space-between" align="middle">
              <el-col :xs="6" :sm="4" :md="3" :lg="2">
                <el-image v-if="item.type==='acm'" :src="require('@/assets/ACM_logo.png')"
                          style="width: 95px;height: 95px" lazy></el-image>
                <el-image v-else-if="item.type==='oi'" :src="require('@/assets/OI_logo.png')"
                          style="width: 95px;height: 95px" lazy></el-image>
              </el-col>
              <el-col
                  :xs="10"
                  :sm="16"
                  :md="19"
                  :lg="20"
                  class="contest-main"
              >
                <p class="contest-title">
                  {{ item.title }}
                </p>
                <div class="detail">
                  <el-icon color="#3091f2" :size="18">
                    <Calendar></Calendar>
                  </el-icon>
                  {{ item.startTime }}
                  <el-icon color="#3091f2" :size="18">
                    <Clock></Clock>
                  </el-icon>
                  {{ calTime(item.startTime) }}
                  <el-tag effect="plain" type="danger">私有赛</el-tag>
                  <el-icon color="#3091f2" :size="18">
                    <Avatar></Avatar>
                  </el-icon>
                  X{{item.num}}
                </div>
              </el-col>
              <el-col
                  :xs="4"
                  :sm="4"
                  :md="2"
                  :lg="2"
                  style="text-align: center"
              >
                <el-tag v-if="item.status==='进行中'" class="ml-2" type="success" effect="dark" size="large">
                  进行中
                </el-tag>
                <el-tag v-else-if="item.status==='已结束'" class="ml-2" type="danger" effect="dark" size="large">
                  已结束
                </el-tag>
                <el-tag v-else-if="item.status==='筹备中'" class="ml-2" type="primary" effect="dark" size="large">
                  筹备中
                </el-tag>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import moment from 'moment'
import {Avatar, Calendar, Clock, Search} from "@element-plus/icons-vue";
import {ArrowDown} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";

/**
 * 比赛数据
 */
const contests = ref()
/**
 * 初始化
 */
onMounted(() => {
  contests.value = [
    {
      type: 'acm',
      title: '小白月赛',
      startTime: '2022-4-13 12:00:00',
      endTime: '2022-4-15 16:00:00',
      status: '进行中',
      num:60
    },
    {
      type: 'oi',
      title: '小白月赛',
      startTime: '2022-4-15 12:00:00',
      endTime: '2022-4-15 16:00:00',
      status: '已结束',
      num:4
    },
    {
      type: 'oi',
      title: '小白月赛',
      startTime: '2022-4-15 12:00:00',
      endTime: '2022-4-15 16:00:00',
      status: '筹备中',
      num:4
    }
  ]
})
/**
 * 计算剩余时间
 */
const calTime = (start) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss')
  const day = moment(start).diff(now, "days")
  if (day <= 2) {
    return moment(start).diff(now, 'hours') + '小时'
  }
  return day + '天';
}

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
  font-size: 1.25rem;
  padding-left: 8px;
  margin-bottom: 0;
  font-weight: 400;
}

.contest-main .detail {
  list-style: none;
  font-size: 0.875rem;
  padding-left: 5px;
  padding-bottom: 10px;
  margin-top: 10px;

}

</style>