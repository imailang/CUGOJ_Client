<template>
  <div>
    <el-dialog
        :model-value="props.dialogVisible"
        width="370px"
        class="dialog"
        title="登录-OJ"
        label-width="0"
        :close-on-click-modal="false"
        :before-close="closeDialog"
    >
      <div>
        <el-form
            :model="formLogin"
            :rules="rules"
            ref="formLoginRef"
        >
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
          <el-button type="primary" size="large" @click="clickLogin">登录</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";
import {ElMessage} from 'element-plus'
import store from "@/store";

/**
 * 登录
 */
const clickLogin = () => {
  //***********************************************登录验证
  ElMessage({
    type: 'success',
    message: '欢迎回来~',
    duration:3000
  })
  store.dispatch("changeIsLogin",'true')
  closeDialog()
}

/**
 * 传入数据
 */
// eslint-disable-next-line no-undef
const props = defineProps({
  dialogVisible: Boolean,
})

/**
 * 返回函数接口
 * @type {EmitFn<string[]>}
 */
// eslint-disable-next-line no-undef
const emits = defineEmits(["closeDialog"])

/**
 * 执行接口
 */
const closeDialog = () => {
  emits("closeDialog")
  resetForm()
}

/**
 * 重置表单
 */
const resetForm = () => {
  formLoginRef.value.resetFields()
}


const formLoginRef = ref()
const formLogin = reactive({
  username: '',
  password: '',
})
const rules = reactive({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
    {
      max: 20,
      message: '用户名长度不能超过20位',
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

.footer {
  overflow: auto;
  margin-top: 20px;
  margin-bottom: -15px;
  text-align: left;
}

</style>
<style>
.el-message{
  min-width: 0 !important;
}
</style>