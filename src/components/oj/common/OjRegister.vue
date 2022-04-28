<template>
  <div>
    <div>
      <el-dialog
        :model-value="registerVisible"
        width="370px"
        title="注册-OJ"
        :close-on-click-modal="false"
        :before-close="closeRegister"
      >
        <div>
          <el-form :model="formRegister" :rules="rules" ref="formRegisterRef">
            <el-form-item prop="username">
              <el-input
                v-model="formRegister.username"
                :prefix-icon="User"
                :placeholder="'用户名'"
                size="large"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formRegister.password"
                :prefix-icon="Lock"
                :placeholder="'密码'"
                type="password"
                size="large"
              ></el-input>
            </el-form-item>
            <el-form-item prop="passwordAgain">
              <el-input
                v-model="formRegister.passwordAgain"
                :prefix-icon="Lock"
                :placeholder="'确认密码'"
                type="password"
                size="large"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                size="large"
                v-model="formRegister.email"
                :prefix-icon="Message"
                :placeholder="'请输入邮箱,点击右侧获取验证码'"
              >
                <template #append>
                  <div class="email-style">
                    <el-button
                      size="small"
                      @click="emailVerification"
                      :icon="Message"
                      class="iconSize"
                    />
                  </div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                size="large"
                v-model="formRegister.code"
                :prefix-icon="Stamp"
                placeholder="请输入6位验证码"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div class="footer">
            <el-button type="primary" size="large" @click="clickRegister"
              >注册</el-button
            >
            <el-button type="text" @click="openLogin"
              >已有账号？立即登录！</el-button
            >
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { User, Lock, Message, Stamp } from "@element-plus/icons-vue";
import { computed, reactive, ref } from "vue";
import store from "@/store";
import { mapGetters } from "vuex";
import api from "@/api/api";
import { ElMessage } from "element-plus";

/**
 * 注册
 */
const clickRegister = () => {
  formRegisterRef.value.validate((valid) => {
    if (valid) {
      api.user.register(formRegister).then((res) => {
        console.log(res);
        if (res.code === "000") {
          ElMessage({
            message: "注册成功",
            type: "success",
          });
        } else {
          ElMessage.error("验证码错误");
        }
      });
    }
  });
};
/**
 * 邮箱验证 发送验证码
 */
const emailVerification = () => {
  formRegisterRef.value.validateField("email", (valid) => {
    if (valid) {
      let tmp = {
        email: formRegister.email,
      };
      api.user.emailVerification(tmp).then((res) => {
        if (res.code === "200") {
          ElMessage({
            message: "验证码已发送!",
            type: "success",
          });
        } else if (res.code === "500") {
          ElMessage.warning("验证码已经发送，十分钟内有效");
        }
      });
    }
  });
};
/**
 * 关闭注册窗口
 */
const closeRegister = () => {
  store.dispatch("changeRegisterVisible", false);
  resetForm();
};
/**
 * 打开登录
 */
const openLogin = () => {
  store.dispatch("changeLoginVisible", true);
  closeRegister();
};
/**
 * 重置表单
 */
const resetForm = () => {
  formRegisterRef.value.resetFields();
};
/**
 * 检查用户是否已经存在
 * @constructor
 */
const checkUsernameNotExist = (rule, value, callback) => {
  api.user.checkUserName(value).then((res) => {
    if (res.Info === "0") {
      return callback();
    } else {
      callback("");
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
  if (formRegister.password !== "") {
    formRegisterRef.value.validateField("passwordAgain");
  }
  return callback();
};
/**
 * 检查密码
 * @constructor
 */
const checkAgainPassword = (rule, value, callback) => {
  if (value !== formRegister.password) {
    callback(new Error("两次密码不一致"));
  }
  callback();
};

/**
 * 注册窗口显示
 */
const registerVisible = computed(
  mapGetters(["getRegisterVisible"]).getRegisterVisible.bind({ $store: store })
);

/**
 * 注册表单容器
 */
const formRegisterRef = ref();
/**
 * 注册表单
 */
const formRegister = reactive({
  username: "",
  password: "",
  passwordAgain: "",
  email: "",
  code: "",
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
      validator: checkUsernameNotExist,
      trigger: "blur",
      message: "用户名已存在",
    },
    {
      max: 20,
      message: "用户名长度不能超过20位",
      trigger: "blur",
    },
  ],
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
    { validator: checkPassword, trigger: "blur" },
  ],
  passwordAgain: [
    {
      required: true,
      message: "请再次输入密码",
      trigger: "blur",
    },
    { validator: checkAgainPassword, trigger: "change" },
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

.iconSize {
  font-size: 20px;
  padding: 8px;
}

.footer {
  overflow: auto;
  margin-top: 20px;
  margin-bottom: -15px;
  text-align: left;
}

.email-style :active {
  background-color: #bdb4b4;
}
</style>