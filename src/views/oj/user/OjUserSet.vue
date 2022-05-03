<template>
  <div>
    <el-card style="--el-card-padding: 10px;margin-bottom: 30px;">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane name="first">
          <template #label>
            <div style="font-size: 18px">
              <el-icon style="vertical-align: -2px">
                <Place></Place>
              </el-icon>
              个人信息
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane name="second">
          <template #label>
            <div style="font-size: 18px">
              <el-icon style="vertical-align: -2px">
                <Lock></Lock>
              </el-icon>
              安全设置
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <div v-if="activeName==='first'">
      <el-card>
        <el-row style="text-align: left">
          <el-col :span="4">
            头像设置
          </el-col>
          <el-col :span="20" style="margin-top: 30px">
            <el-row>
              <el-col style="text-align: center">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                >
                  <img v-if="userInfo.Avatar" :src="userInfo.Avatar" class="avatar"/>
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus/>
                  </el-icon>
                </el-upload>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">资料设置</el-col>
          <el-col :span="20" style="margin-top: 30px">
            <el-form v-model="userInfo" ref="userInfoRef" label-position="top">
              <el-row justify="space-between" :gutter="30">
                <el-col :span="8">
                  <el-form-item label="昵称">
                    <el-input v-model="userInfo.Nickname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学校">
                    <el-input v-model="userInfo.School"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="专业">
                    <el-input v-model="userInfo.Course"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学号">
                    <el-input v-model="userInfo.StudentID"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12"></el-col>
                <el-col :span="12"></el-col>
                <el-col :span="12"></el-col>
              </el-row>



              <el-form-item label="真实姓名">
                <el-input v-model="userInfo.Realname"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-input v-model="userInfo.Gender"></el-input>
              </el-form-item>
              <el-form-item label="Codeforces id">
                <el-input v-model="userInfo.CfUsername"></el-input>
              </el-form-item>
              <el-form-item label="洛谷id">
                <el-input v-model="userInfo.LuoguUsername"></el-input>
              </el-form-item>
              <el-form-item label="牛客id">
                <el-input v-model="userInfo.NowCoderUsername"></el-input>
              </el-form-item>
              <el-form-item label="Vj id">
                <el-input v-model="userInfo.VjUsername"></el-input>
              </el-form-item>
              <el-form-item label="博客">
                <el-input v-model="userInfo.Blog"></el-input>
              </el-form-item>
              <el-form-item label="github">
                <el-input v-model="userInfo.Github"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {Lock, Place, Plus} from "@element-plus/icons-vue";
import store from "@/store";


const activeName = ref('first')
const userInfo = store.getters.getUserInfo
const userInfoRef = ref()


onMounted(() => {
  console.log(userInfo)
})

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<style scoped>
>>> .el-tabs__header {
  margin-bottom: 1px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>