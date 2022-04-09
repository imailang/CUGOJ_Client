<template>
  <div>
    <div>
      <el-dialog
          :model-value="registerVisible"
          width="370px"
          class="dialog"
          title="注册-OJ"
          label-width="0"
          :close-on-click-modal="false"
          :before-close="closeRegister"
      >
        <div>
          <el-form
              :model="formRegister"
              :rules="rules"
              ref="formRegisterRef"
          >
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
                  <el-button size="small" :icon="Message" class="iconSize"/>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="footer">
            <el-button type="primary" size="large">注册</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import {User, Lock, Message} from '@element-plus/icons-vue'
import {computed, reactive, ref} from "vue";
import store from "@/store";
import {mapGetters} from "vuex";


/**
 * 关闭注册窗口
 */
const closeRegister = () => {
  store.dispatch("changeRegisterVisible", false)
  resetForm()
}
/**
 * 重置表单
 */
const resetForm = () => {
  formRegisterRef.value.resetFields()
}

/**
 * 检查用户是否已经存在
 * @constructor
 */
const checkUsernameNotExist = (rule, value, callback) => {
  return callback()
}
/**
 * 检查邮箱是否存在
 * @constructor
 */
const checkEmailNotExist = (rule, value, callback) => {
  return callback()
}
/**
 * 检查密码
 * @constructor
 */
const checkPassword = (rule, value, callback) => {
  if (formRegister.password !== '') {
    formRegisterRef.value.validateField('passwordAgain')
  }
  return callback();
}
/**
 * 检查密码
 * @constructor
 */
const checkAgainPassword = (rule, value, callback) => {
  if (value !== formRegister.password) {
    callback(new Error('两次密码不一致'))
  }
  callback();
}

/**
 * 注册窗口显示
 */
const registerVisible = computed(
    mapGetters(['getRegisterVisible']).getRegisterVisible.bind({$store: store})
)

/**
 * 注册表单容器
 */
const formRegisterRef = ref()
/**
 * 注册表单
 */
const formRegister = reactive({
  username: '',
  password: '',
  passwordAgain: '',
  email: '',
})
/**
 * 验证规则
 */
const rules = reactive({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
    {
      validator: checkUsernameNotExist,
      trigger: 'blur',
      message: '用户名已存在',
    },
    {
      max: 20,
      message: '用户名长度不能超过20位',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: 'blur',
    },
    {
      validator: checkEmailNotExist,
      message: '邮箱已存在',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    {
      min: 6,
      max: 20,
      message: '请输入长度为6-20的密码',
      trigger: 'blur',
    },
    {validator: checkPassword, trigger: 'blur'},
  ],
  passwordAgain: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur',
    },
    {validator: checkAgainPassword, trigger: 'change'},
  ],
})

</script>

<style scoped>
/deep/ .el-dialog {
  border-radius: 10px !important;
  text-align: center;
}

/deep/ .el-dialog__header .el-dialog__title {
  font-size: 22px;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1em;
  color: #4e4e4e;
}

/deep/ .el-form-item__content {
  margin-left: 0 !important;
}

/deep/ .el-button {
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
</style>