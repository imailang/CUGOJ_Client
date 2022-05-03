<template>
  <el-card>
    <el-row justify="space-between">
      <el-col :span="12">
        <div>
          <el-row>
            <el-col :xs="10" :sm="8" :lg="6">
              <el-avatar
                style="--el-avatar-size: 120px"
                src="https://assets.leetcode-cn.com/aliyun-lc-upload/users/mrwesleyfoxmailcom/avatar_1585403468.png?x-oss-process=image%2Fformat%2Cwebp"
              ></el-avatar>
            </el-col>
            <el-col :xs="14" :sm="16" :lg="18">
              <el-row style="text-align: left">
                <el-col :span="24">
                  <el-row align="middle" justify="space-between">
                    <b style="font-size: 50px">{{ userInfo.Username }}</b>
                  </el-row>
                </el-col>
                <el-col :span="24">
                  <p style="color: #a7a9ad; font-size: 15px">
                    这个人很懒，什么都没留下
                  </p></el-col
                >
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <el-row justify="end">
          <el-col :span="24" style="text-align: right">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="
                moment(userInfo.UpdatedAt).format('YYYY-MM-DD HH:mm:ss')
              "
            >
              <el-tag type="success"
                >最近上线时间:{{ calTime(userInfo.UpdatedAt) }}</el-tag
              >
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <div style="text-align: center">
              <p><b style="font-size: 25px">0</b></p>
              总提交数
            </div>
          </el-col>
          <el-col :span="4">
            <div style="text-align: center">
              <p><b style="font-size: 25px">0</b></p>
              AC数
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
  <el-row>
    <h1 style="vertical-align: middle">我的团队</h1>
  </el-row>
  <el-row>
    <el-button
      type="text"
      style="vertical-align: middle; font-size: 20px"
      @click="toTeam(0)"
      >+创建团队</el-button
    >
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8" v-for="item in teamInfo" :key="item.ID">
      <el-card>
        <el-row justify="center">
          <el-avatar
            :size="90"
            :src="item.Avatar"
            style="cursor: pointer"
            @click="toTeam(item.ID)"
          >
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
        </el-row>
        <el-row justify="center" style="margin-top: 20px">
          <font
            style="cursor: pointer; font-size: 30px"
            @click="toTeam(item.ID)"
          >
            {{ item.Name }}
          </font>
        </el-row>
        <el-row justify="center" style="margin-top: 20px">
          <el-button type="primary" size="large" @click="toTeam(item.ID)"
            >查看我的团队</el-button
          >
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, ref } from "vue";
import moment from "moment";
import store from "@/store";
import api from "@/api/api";
import { ElMessage } from "element-plus";
import router from "@/router";

const userInfo = ref({
  Username: "",
  UpdatedAt: "",
});

const teamInfo = ref([]);

onMounted(() => {
  /**
   * 用户信息
   */
  userInfo.value = store.getters.getUserInfo;
  updateTeamInfo();
});

const updateTeamInfo = () => {
  api.team.getSelfTeamList().then((response) => {
    if (typeof response === "undefined") {
      ElMessage.error("请求出错");
      return;
    }
    if (response.Statu === "000") {
      teamInfo.value = JSON.parse(response.Info);
    }
  });
};

const toTeam = (id) => {
  router.push({
    path: "/team/" + id,
  });
};

/**
 * 计算上线时间
 */
const calTime = (val) => {
  console.log(val);
  moment.suppressDeprecationWarnings = true;
  val = moment(val).format("YYYY-MM-DD HH:mm:ss");
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const seconds = moment(now).diff(val, "seconds");
  if (seconds <= 60) {
    return seconds + "秒前";
  } else if (seconds <= 3600) {
    return (seconds / 60).toFixed(0) + "分钟前";
  } else if (seconds <= 86400) {
    return (seconds / 3600).toFixed(0) + "小时前";
  } else {
    return (seconds / 86400).toFixed(0) + "天前";
  }
};
</script>

<style scoped>
</style>