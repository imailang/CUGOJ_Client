<template>
  <el-card v-if="TID.value != 0">
    <el-row justify="space-around">
      <el-col :span="22">
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
            <el-tooltip
              class="box-item"
              effect="light"
              content="修改队伍信息"
              placement="top-start"
            >
              <el-icon
                :size="30"
                color="grey"
                style="margin-left: 10px; cursor: pointer"
                @click="changeTeam"
              >
                <Setting />
              </el-icon>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col>
            <span style="font-size: 20px">
              {{ teamInfo.Description }}
            </span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col>
            <el-button
              type="danger"
              v-if="showDelete == 1"
              @click="deleteTeam()"
              >解散队伍</el-button
            >
            <el-button type="info" v-else-if="showDelete == 2">
              退出队伍
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
  <el-card style="margin-top: 20px">
    <template #header>
      <div style="text-align: left">
        <span>团队成员</span>
      </div>
    </template>
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

      <el-col :span="8" v-if="showInvite > 0">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <el-row>
            <el-col :span="22" :offset="1">
              <el-icon
                :size="90"
                style="margin-left: 5px; cursor: pointer"
                color="#9596a3"
                @click="
                  () => {
                    openDialog();
                  }
                "
              >
                <Plus />
              </el-icon>
              <div>
                <el-row>
                  <el-col>
                    <el-button
                      size="large"
                      type="text"
                      style="font-size: 18px"
                      @click="openDialog()"
                      >邀请新成员</el-button
                    >
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8" v-if="showInvite > 1" />
    </el-row>
  </el-card>
  <el-dialog v-model="inviteDialog" width="30%" title="邀请成员" center>
    <el-row justify="space-around" :gutter="20" align="middle">
      <el-col :span="9">
        <span>请输入用户名或昵称:</span>
      </el-col>
      <el-col :span="13">
        <el-autocomplete
          v-model="inputString"
          :fetch-suggestions="querySearch"
          popper-class="my-autocomplete"
          placeholder="请输入用户名或昵称"
          @select="handleSelect"
        >
          <template #default="{ item }">
            <el-row align="middle" :gutter="10">
              <el-col :span="6">
                <el-avatar :size="30" :src="item.Avatar" />
              </el-col>
              <el-col :span="9">
                <span style="marigin-left: 5px">{{ item.Username }}</span>
              </el-col>
              <el-col :span="9">
                <span style="marigin-left: 5px">{{ item.Nickname }}</span>
              </el-col>
            </el-row>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-divider />
    <el-row
      justify="space-around"
      v-if="selectUserInfo.ID != 0"
      style="margin-top: 20px"
    >
      <el-col :span="24">
        <el-row>
          <el-col :span="8">
            <el-avatar :size="80" :src="selectUserInfo.Avatar" />
          </el-col>
          <el-col :span="16">
            <el-descriptions
              title="请确认邀请的用户信息"
              direction="vertical"
              :column="2"
              :size="middle"
              :style="blockMargin"
            >
              <el-descriptions-item label="用户名:"
                ><b>{{ selectUserInfo.Username }}</b></el-descriptions-item
              >
              <el-descriptions-item label="昵称:"
                ><b>{{ selectUserInfo.Nickname }}</b></el-descriptions-item
              >
              <el-descriptions-item label="学校:"
                ><b>{{ selectUserInfo.School }}</b></el-descriptions-item
              >
            </el-descriptions>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button type="primary">邀请加入</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import api from "@/api/api";
import router from "@/router";
import store from "@/store";
import { Setting, Plus } from "@element-plus/icons-vue";
import { onBeforeMount } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
const { reactive, ref } = require("@vue/reactivity");

const inputString = ref("");
const inviteDialog = ref(false);
const UID = ref(0);
const teamInfo = reactive({});
const memberInfo = ref([]);
const TID = ref(0);
const route = useRoute();
const showInvite = ref(0);
const showDelete = ref(0);
const selectUserInfo = reactive({ ID: 0 });

onBeforeMount(() => {
  UID.value = store.getters.getUserInfo.ID;
  TID.value = route.params.teamId;
  if (TID.value != 0) {
    updateTeamInfo();
    updateMemeberInfo();
  }
});

const openDialog = () => {
  inviteDialog.value = true;
  selectUserInfo.ID = 0;
};

const querySearch = (queryString, cb) => {
  if (!queryString || queryString === "") {
    cb([]);
    return;
  }
  var results = [];
  api.user.queryUser(queryString).then((response) => {
    if (!response) {
      ElMessage.error("请求出错");
      return;
    } else if (response.Statu != "000") {
      ElMessage.error(response.Statu);
      return;
    } else {
      var tmp = JSON.parse(response.Info);
      tmp.forEach((item) => {
        var vis = false;
        for (var i = 0; i < memberInfo.value.length; i++) {
          if (memberInfo.value[i].UID == item.ID) {
            vis = true;
          }
        }
        if (!vis) {
          results.push({
            ID: item.ID,
            Username: item.Username,
            Nickname: item.Nickname,
            Avatar: item.Avatar,
            School: item.School,
          });
        }
      });
      cb(results);
    }
  });
};

const handleSelect = (item) => {
  selectUserInfo.ID = item.ID;
  selectUserInfo.Username = item.Username;
  selectUserInfo.Nickname = item.Nickname;
  selectUserInfo.Avatar = item.Avatar;
  selectUserInfo.School = item.School;
};

const deleteTeam = () => {
  if (TID.value == 0) return;
  api.team.deleteTeam(TID.value).then((response) => {
    if (typeof response === "undefined") {
      ElMessage.error("请求出错");
      return;
    } else if (response.Statu != "000") {
      ElMessage.error(response.Info);
      return;
    } else {
      router.push({
        path: "/user-home",
      });
    }
  });
};

const changeTeam = () => {
  router.push({
    path: "/team/edit/" + TID.value,
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
    memberInfo.value.forEach((item) => {
      if (item.UID == UID.value) {
        if (item.Leader) {
          showDelete.value = 1;
        } else {
          showDelete.value = 2;
        }
      }
    });
    if (UID.value && UID.value != 0) {
      showInvite.value = 3 - memberInfo.value.length;
    }
  });
};
</script>

<style scoped>
</style>