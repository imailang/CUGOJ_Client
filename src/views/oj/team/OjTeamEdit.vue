<template>
  <el-card>
    <template #header>
      <h2 v-if="TID.value == 0">创建团队</h2>
      <h2 v-if="TID.value != 0">编辑团队信息</h2>
    </template>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-form
          ref="ruleFormRef"
          :model="teamInfo"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="队名" prop="Name">
            <el-input v-model="teamInfo.Name" />
          </el-form-item>
          <el-form-item label="头像" prop="Avatar">
            <el-upload
              class="avatar-uploader"
              action="/api/upload/upload"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :before-upload="beforeAvatarUpload"
              style="border: 1px dashed grey"
              name="uploadfile"
            >
              <img
                v-if="imgUrl && imgUrl.value !== ''"
                :src="imgUrl"
                class="avatar"
                width="120"
                height="120"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <p>
              <font style="font-size: 20px; color: grey">
                &nbsp;&nbsp;支持5M以下的png/jpg图片上传</font
              >
            </p>
          </el-form-item>
          <el-form-item label="描述" prop="Description">
            <el-input
              v-model="teamInfo.Description"
              :rows="4"
              type="textarea"
              resize="none"
              show-word-limit
              :maxlength="128"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="large" @click="saveTeamInfo">
          {{ TID.value == 0 ? "创建" : "保存" }}
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import api from "@/api/api";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { Plus } from "@element-plus/icons-vue";
import router from "@/router";

const teamInfo = reactive({});
const TID = ref(0);
const route = useRoute();
const ruleFormRef = ref();
const rules = reactive({});
const imgUrl = ref("");

onBeforeMount(() => {
  TID.value = route.params.teamId;
  if (TID.value != 0) {
    updateTeamInfo();
  }
});

const uploadSuccess = (response) => {
  if (typeof response == "undefined" || response.Statu != "000") {
    ElMessage.error("上传出错");
    return;
  }
  imgUrl.value = response.Info;
  teamInfo.Avatar = response.Info;
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
        imgUrl.value = tmp.Avatar;
      }
    }
  });
};

const saveTeamInfo = async () => {
  await ruleFormRef.value.validate((valid) => {
    if (!valid) {
      return;
    }
  });

  if (TID.value == 0) {
    api.team.createTeam(teamInfo).then((response) => {
      if (typeof response == "undefined") {
        ElMessage.error("请求出错");
        return;
      } else if (response.Statu != "000") {
        ElMessage.error(response.Info);
        return;
      } else {
        router.push({
          path: "/team/" + response.Info,
        });
      }
    });
  } else {
    api.team.changeTeam(teamInfo).then((response) => {
      if (typeof response == "undefined") {
        ElMessage.error("请求出错");
        return;
      } else if (response.Statu != "000") {
        ElMessage.error(response.Info);
        return;
      } else {
        router.push({
          path: "/team/" + TID.value,
        });
      }
    });
  }
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("只允许使用PNG|JPG格式");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error("图片不可以大于 5MB!");
    return false;
  }
  return true;
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: black;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>