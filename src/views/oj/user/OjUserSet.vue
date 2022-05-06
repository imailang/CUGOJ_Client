<template>
  <div>
    <el-card style="--el-card-padding: 10px;margin-bottom: 30px;">
      <el-tabs v-model="activeName" class="demo-tabs">
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
            <b style="font-size: 20px">头像设置</b>
          </el-col>
          <el-col :span="20" style="margin-top: 40px">
            <el-row>
              <el-col style="text-align: center">
                <el-upload
                    class="avatar-uploader"
                    action="/api/upload/upload"
                    :show-file-list="false"
                    :on-success="uploadSuccess"
                    :before-upload="beforeAvatarUpload"
                    name="uploadfile"
                >
                  <img v-if="userInfo.Avatar" :src="userInfo.Avatar" class="avatar"/>
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus/>
                  </el-icon>
                </el-upload>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4"><b style="font-size: 20px">资料设置</b></el-col>
          <el-col :span="20" style="margin-top: 40px;text-align: center">
            <!-- 表单-->
            <el-form :model="userInfo" ref="userInfoRef" :rules="rules" label-position="top">
              <el-row justify="space-between" :gutter="30">
                <el-col :span="8">
                  <el-form-item label="昵称" required>
                    <el-input v-model="userInfo.Nickname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="真实姓名">
                    <el-input v-model="userInfo.Realname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别">
                    <el-radio-group v-model="userInfo.Gender">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="2">女</el-radio>
                      <el-radio :label="3">保密</el-radio>
                    </el-radio-group>
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
                <el-col :span="24">
                  <el-form-item label="Codeforces id">
                    <el-input v-model="userInfo.CfUsername"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="洛谷id">
                    <el-input v-model="userInfo.LuoguUsername"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="牛客id">
                    <el-input v-model="userInfo.NowCoderUsername"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="Vj id">
                    <el-input v-model="userInfo.VjUsername"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="博客">
                    <el-input v-model="userInfo.Blog"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="github">
                    <el-input v-model="userInfo.Github"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-button @click="submitUserInfo" style="width: 60%" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div v-else-if="activeName==='second'">
      <div class="demo-collapse">
        <el-collapse v-model="accordionActive" accordion>
          <el-collapse-item name="1">
            <template #title>
              <b style="font-size: 20px"> 密码修改</b>
            </template>
            <el-form :model="passwordInfo" ref="passwordInfoRef" :rules="rules" label-position="top">
              <el-row justify="center">
                <el-col :span="13">
                  <el-form-item label="旧密码" required prop="oldPassword">
                    <el-input v-model="passwordInfo.oldPassword" type="password"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-form-item label="新密码" required prop="newPassword">
                    <el-input v-model="passwordInfo.newPassword" type="password"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-form-item label="确认密码" required prop="passwordAgain">
                    <el-input v-model="passwordInfo.passwordAgain" type="password"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-button type="primary" style="width: 60%" @click="submitPassword">修改密码</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template #title>
              <b style="font-size: 20px"> 邮箱绑定</b>
            </template>
            <el-form :model="emailInfo" ref="emailInfoRef" :rules="rules" label-position="top">
              <el-row justify="center">
                <el-col :span="13">
                  <el-form-item label="当前邮箱">
                    <el-input disabled v-model="userInfo.Email"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-form-item label="新邮箱" required prop="email">
                    <el-input
                        v-model="emailInfo.email"
                        :placeholder="'请输入邮箱,点击右侧获取验证码'"
                    >
                      <template #append>
                        <div class="email-style">
                          <el-button
                              size="small"
                              @click="emailVerification"
                              :icon="Message"
                              style="font-size: 20px;vertical-align: 0"
                          />
                        </div>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-form-item label="验证码" required prop="code">
                    <el-input v-model="emailInfo.code"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-button type="primary" style="width: 60%" @click="submitEmail">修改邮箱</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<script setup>
import {onBeforeUnmount, reactive, ref} from "vue";
import {Lock, Place, Plus, Message} from "@element-plus/icons-vue";
import store from "@/store";
import {ElMessage} from "element-plus";
import api from "@/api/api";

const activeName = ref('first')
const accordionActive = ref('1')
const userInfo = reactive(store.getters.getUserInfo)
const userInfoRef = ref()
const passwordInfo = reactive({
  oldPassword: '',
  newPassword: '',
  passwordAgain: '',
})
const passwordInfoRef = ref()
const emailInfo = reactive({})
const emailInfoRef = ref()

onBeforeUnmount(() => {
})


/**
 * 邮箱验证 发送验证码
 */
const emailVerification = () => {
  emailInfoRef.value.validate((valid) => {
    if (valid) {
      let tmp = {
        email: emailInfo.email,
      };
      api.user.emailVerification(tmp).then((res) => {
        if (res.code === 200) {
          ElMessage({
            message: "验证码已发送!",
            type: "success",
          });

        } else if (res.code === 500) {
          ElMessage.warning("验证码已经发送，十分钟内有效");
        }
      });
    }
  });
};
/**
 * 检查邮箱是否存在
 * @constructor
 */
const checkEmailNotExist = (rule, value, callback) => {
  api.user.checkEmail(value).then((res) => {
    if (res.Info === "0") {
      return callback();
    } else {
      callback("");
    }
  });
};
/**
 * 检查密码
 * @constructor
 */
const checkPassword = (rule, value, callback) => {
  if (passwordInfo.newPassword !== "") {
    passwordInfoRef.value.validateField("passwordAgain");
  }
  return callback();
};
/**
 * 检查密码
 * @constructor
 */
const checkAgainPassword = (rule, value, callback) => {
  if (value !== passwordInfo.newPassword) {
    callback(new Error("两次密码不一致"));
  }
  callback();
};


const submitEmail=()=>{
  ElMessage.error('暂不支持修改')
}
const submitPassword=()=>{
  ElMessage.error('暂不支持修改')
}
/**
 * 提交用户信息
 */
const submitUserInfo = () => {
  api.user.changeUser(userInfo)
      .then(res => {
        console.log(res)
        if (res.Statu === '000') {
          ElMessage.success('修改成功')
          store.dispatch("changeUserInfo", JSON.stringify(userInfo));
        }
      })
}
/**
 * 上传后回调
 */
const uploadSuccess = (response) => {
  if (typeof response == "undefined" || response.Statu !== "000") {
    ElMessage.error("上传出错");
    return;
  }
  userInfo.Avatar = response.Info;
};
/**
 * 上传前回调
 */
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


const rules = reactive({

  email: [
    {
      required: true,
      message: "邮箱不能为空",
      trigger: "blur",
    },
    {
      type: "email",
      message: "邮箱格式不正确",
      trigger: "blur",
    },
    {
      validator: checkEmailNotExist,
      message: "邮箱已存在",
      trigger: "blur",
    },
  ],
  oldPassword: [
    {
      required: true,
      message: "原密码不能为空",
      trigger: "blur",
    },
    {
      min: 6,
      max: 20,
      message: "请输入长度为6-20的密码",
      trigger: "blur",
    },
  ],
  newPassword: [
    {
      required: true,
      message: "新密码不能为空",
      trigger: "blur",
    },
    {
      min: 6,
      max: 20,
      message: "请输入长度为6-20的密码",
      trigger: "blur",
    },
    {validator: checkPassword, trigger: "blur"},
  ],
  passwordAgain: [
    {
      required: true,
      message: "请再次输入密码",
      trigger: "blur",
    },
    {validator: checkAgainPassword, trigger: "change"},
  ],
  code: [
    {
      required: true,
      message: "验证码不能为空",
      trigger: "blur",
    },
    {
      min: 6,
      max: 6,
      message: "验证码长度为6",
      trigger: "blur",
    },
  ],
});
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

.email-style :active {
  background-color: #bdb4b4;
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