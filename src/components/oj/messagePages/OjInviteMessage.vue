<template>
  <el-row justify="space-around">
    <el-col
      v-if="loaded >= 2"
      style="font-size: 18px; text-align: left; maigin-top: 5px"
    >
      &nbsp;&nbsp;用户:
      <span style="color: blue">{{ nickname }}</span>
      邀请你加入队伍:
      <span style="color: blue">{{ teamInfo.Name }}</span
      >。
      <el-divider content-position="left">队伍信息</el-divider>
      <div style="width: 100%; text-align: center">
        <el-row>
          <el-col>
            <el-avatar :size="120" :src="teamInfo.Avatar">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col>
            <span style="color: #585858; font-size: 50px">{{
              teamInfo.Name
            }}</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col>
            <span style="font-size: 20px">
              {{ teamInfo.Description }}
            </span>
          </el-col>
        </el-row>
      </div>
      <el-divider content-position="left" style="font-size: 26px"
        >队伍成员</el-divider
      >
      <div style="width: 100%; text-align: center">
        <el-row justify="space-between" :gutter="10">
          <el-col v-for="item in memberInfo" :key="item.ID" :span="8">
            <el-card shadow="hover" :body-style="{ padding: '5px' }">
              <el-row>
                <el-col :span="22" :offset="1">
                  <el-avatar
                    :size="90"
                    :src="item.UserInfo.Avatar"
                    style="margin-left: 5px"
                  >
                    <img
                      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                    />
                  </el-avatar>
                  <div>
                    <el-row>
                      <el-col>
                        <el-button
                          size="large"
                          type="text"
                          style="font-size: 18px"
                          >{{ item.UserInfo.Nickname }}</el-button
                        >
                        <el-tag style="margin-top: 6px" v-if="item.Leader"
                          >队长</el-tag
                        >
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <span style="color: grey; font-size: 20px">{{
                          item.UserInfo.School
                        }}</span>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-divider />
      <div style="width: 100%">
        <el-row
          justify="space-around"
          style="text-align: center; margin-bottom: 10px"
          v-if="Accept == 1"
        >
          <el-col>
            <el-button type="primary" disabled size="large">已加入</el-button>
          </el-col>
        </el-row>
        <el-row
          justify="space-around"
          style="text-align: center; margin-bottom: 10px"
          v-if="Accept == 2"
        >
          <el-col>
            <el-button type="primary" disabled size="large">已拒绝</el-button>
          </el-col>
        </el-row>
        <el-row
          justify="space-around"
          style="text-align: center; margin-bottom: 10px"
          v-else
        >
          <el-col :span="12">
            <el-button type="primary" size="large" @click="accept"
              >确认加入</el-button
            >
          </el-col>
          <el-col :span="12">
            <el-button type="danger" size="large" @click="denied"
              >拒绝加入</el-button
            >
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import api from "@/api/api";
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  message: {
    default: "",
  },
  MID: {
    default: 0,
  },
});
const nickname = ref("");
const loaded = ref(0);
onMounted(() => {
  var tmp = JSON.parse(props.message);
  console.log(tmp);
  TID.value = tmp.TID;
  UID.value = tmp.UID;
  Accept.value = tmp.Accept;
  if (TID.value != 0) {
    updateTeamInfo();
    updateMemeberInfo();
  }
});
const teamInfo = reactive({});
const memberInfo = ref([]);
const TID = ref(0);
const UID = ref(0);
const Accept = ref(0);

const accept = () => {
  console.log(props.MID);
  api.team.acceptInvite(props.MID).then((response) => {
    if (!response) {
      ElMessage.error("请求出错");
    } else if (response.Statu != "000") {
      ElMessage.error(response.Info);
    } else {
      Accept.value = 1;
      ElMessage.success("成功加入队伍");
    }
  });
};
const denied = () => {
  api.team.deniedInvite(props.MID).then((response) => {
    if (!response) {
      ElMessage.error("请求出错");
    } else if (response.Statu != "000") {
      ElMessage.error(response.Info);
    } else {
      Accept.value = 2;
      ElMessage.success("已拒绝");
    }
  });
};
const updateTeamInfo = () => {
  api.team.getTeam(TID.value).then((response) => {
    if (typeof response === "undefined") {
      ElMessage.error("请求出错");
      return;
    }
    if (response.Statu === "000") {
      var tmp = JSON.parse(response.Info);
      teamInfo.ID = tmp.ID;
      teamInfo.Name = tmp.Name;
      teamInfo.Description = tmp.Description;
      if (typeof tmp.Avatar != "undefined" && tmp.Avatar != "") {
        teamInfo.Avatar = tmp.Avatar;
      }
      loaded.value++;
    }
  });
};
const updateMemeberInfo = () => {
  api.team.getMember(TID.value).then((response) => {
    if (typeof response === "undefined" || response.Statu != "000") {
      return;
    }
    memberInfo.value = JSON.parse(response.Info);
    memberInfo.value.sort((a, b) => {
      return a.ID < b.ID ? -1 : 1;
    });
    console.log(memberInfo);
    nickname.value = memberInfo.value[0].UserInfo.Nickname;
    loaded.value++;
  });
};
</script>

<style scoped>
.title {
  font-size: 26px;
  text-align: left;
}
</style>