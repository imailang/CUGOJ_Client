<template>
<div>
  <div>
    <el-dialog
        :model-value="props.dialogVisible"
        width="370px"
        class="dialog"
        title="注册-OJ"
        label-width="0"
        :close-on-click-modal="false"
        :before-close="closeDialog"
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
                v-model="formRegister.email"
                :prefix-icon="Message"
                :placeholder="'请输入邮箱'"
            >
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
import { User,Lock ,Message} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";

/**
 * 定义返回函数接口
 * @type {EmitFn<string[]>}
 */
// eslint-disable-next-line no-undef
const emits = defineEmits(["closeDialog"])
/**
 * 执行关闭
 */
const closeDialog = () => {
  emits("closeDialog")
  resetForm()
}
/**
 * 重置表单
 */
const resetForm=()=>{
  formRegisterRef.value.resetFields()
}

/**
 * 检查用户是否已经存在
 * @constructor
 */
const CheckUsernameNotExist = (rule, value, callback) => {
   return callback()
}
/**
 * 检查邮箱是否存在
 * @constructor
 */
const CheckEmailNotExist = (rule, value, callback) => {
  return callback()
}
/**
 * 检查密码
 * @constructor
 */
const CheckPassword = (rule, value, callback) => {
  if(formRegister.password!=='')
  {
    formRegisterRef.value.validateField('passwordAgain')
  }
  return callback();
}
/**
 * 检查密码
 * @constructor
 */
const CheckAgainPassword = (rule, value, callback) => {
  if(value!==formRegister.password){
    callback(new Error('两次密码不一致'))
  }
  callback();
}


const formRegisterRef = ref()
const formRegister =reactive({
  username: '',
  password: '',
  passwordAgain: '',
  email:'',
})
const rules =reactive({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
    {
      validator: CheckUsernameNotExist,
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
      validator: CheckEmailNotExist,
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
    { validator: CheckPassword, trigger: 'blur' },
  ],
  passwordAgain: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur',
    },
    { validator: CheckAgainPassword, trigger: 'change' },
  ],
})
/**
 * 传入数据
 */
// eslint-disable-next-line no-undef
const props = defineProps({
  dialogVisible: Boolean,
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
  margin-left: 0px !important;
}
/deep/.el-button {
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