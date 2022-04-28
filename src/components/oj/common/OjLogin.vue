<template>
  <div>
    <el-dialog
      :model-value="loginVisible"
      width="370px"
      title="登录-OJ"
      :close-on-click-modal="false"
      :before-close="closeLogin"
    >
      <div>
        <el-form :model="formLogin" :rules="rules" ref="formLoginRef">
          <el-form-item prop="username">
            <el-input
              v-model="formLogin.username"
              :prefix-icon="User"
              :placeholder="'用户名'"
              size="large"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formLogin.password"
              :prefix-icon="Lock"
              :placeholder="'密码'"
              type="password"
              size="large"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button type="primary" size="large" @click="clickLogin"
            >登录</el-button
          >
          <el-row justify="space-between">
            <el-col :span="10">
              <el-button type="text" @click="openRegister"
                >没有账号？立即注册</el-button
              >
            </el-col>
            <el-col :span="5">
              <el-button type="text">忘记密码</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { computed, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import store from "@/store";
import { mapGetters } from "vuex";
import api from "@/api/api";
import Md5 from "js-md5";
import cookie from "js-cookie";

/**
 * 登录
 */
const clickLogin = () => {
  api.user
    .login({
      username: formLogin.username,
      password: Md5(formLogin.password),
    })
    .then((res) => {
      if (res.code === 200) {
        ElMessage({
          type: "success",
          message: "欢迎回来~",
          duration: 3000,
        });
        api.user.getUserByUsername(formLogin.username).then((response) => {
          store.dispatch("changeUserInfo", JSON.stringify(response));
          store.dispatch("changeLoginVisible", false);
          store.dispatch("changeUserToken", cookie.get("cugtoken"));
          store.dispatch("changeIsLogin", true);
        });
      } else {
        ElMessage.error("用户名或密码错误");
      }
    });
};
/**
 * 关闭登录
 */
const closeLogin = () => {
  store.dispatch("changeLoginVisible", false);
  resetForm();
};
/**
 * 打开注册
 */
const openRegister = () => {
  closeLogin();
  store.dispatch("changeRegisterVisible", true);
};

/**
 * 重置表单
 */
const resetForm = () => {
  formLoginRef.value.resetFields();
};

/**
 * 登录窗口显示
 */
const loginVisible = computed(
  mapGetters(["getLoginVisible"]).getLoginVisible.bind({ $store: store })
);
/**
 * 登录表单容器
 */
const formLoginRef = ref();
/**
 * 登录表单
 */
const formLogin = reactive({
  username: "",
  password: "",
});
/**
 * 验证规则
 */
const rules = reactive({
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
    {
      max: 20,
      message: "用户名长度不能超过20位",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
    {
      min: 6,
      max: 20,
      message: "请输入长度为6-20的密码",
      trigger: "blur",
    },
  ],
});
</script>


<style scoped>
::v-deep .el-dialog {
  border-radius: 10px !important;
  text-align: center;
}

::v-deep .el-dialog__header .el-dialog__title {
  font-size: 22px;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1em;
  color: #4e4e4e;
}

::v-deep .el-form-item__content {
  margin-left: 0 !important;
}

::v-deep .el-button {
  margin: 0 0 15px 0;
  width: 100%;
}

.footer {
  overflow: auto;
  margin-top: 20px;
  margin-bottom: -15px;
  text-align: left;
}
</style>
<style>
.el-message {
  min-width: 0 !important;
}
</style>