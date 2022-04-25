<template>
  <el-card>
    <template #header>
      <el-page-header content="创建题目" @back="goBack"/>
    </template>
    <el-form
        ref="problemInfoRef"
        :model="problemInfo"
        label-position="top"
        label-width="70px"
    >
      <!-- 题目标题-->
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item prop="title"
                        label="题目标题"
                        required>
            <el-input
                placeholder="请输入题目标题"
                size="large"
                v-model="problemInfo.title"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 空间大小-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item
              label="时间限制"
              v-model="problemInfo.timeLimit"
              required
          >
            <vxe-input v-model="problemInfo.timeLimit" type="integer"></vxe-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
              label="内存限制"
              v-model="problemInfo.memoryLimit"
              required
          >
            <vxe-input v-model="problemInfo.memoryLimit" type="integer"></vxe-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
              label="栈限制"
              v-model="problemInfo.stackLimit"
              required
          >
            <vxe-input v-model="problemInfo.stackLimit" type="integer"></vxe-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 题目描述模块-->
      <el-switch v-model="problemInfo.markdown"/>
      <i style="font-size: 10px;color: #cac6c6">文件上传描述</i>
      <!-- 开启markdown-->
      <el-row v-if="problemInfo.markdown" :gutter="20">
        <el-col :span="24">
          <el-form-item
              label="文件上传"
              v-model="problemInfo.description"
              prop="description"
          >
            <el-upload
                class="upload-demo"
                drag
                :limit="1"
                :auto-upload="false"
                accept=".md"
                :on-change="selectFile"
            >
              <el-icon class="el-icon--upload">
                <upload-filled/>
              </el-icon>
              <div class="el-upload__text">
                请将Makedown文件拖到此处 <em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 不开启markdown 题目描述-->
      <div v-else>
        <!-- 题目背景-->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
                label="题目背景"
                v-model="problemInfo.background"
                prop="background"
            >
              <AdminMakedown v-model:code="problemInfo.background"></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 题目描述-->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
                label="题目描述"
                v-model="problemInfo.description"
                prop="description"
            >
              <AdminMakedown v-model:code="problemInfo.description"></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 输入描述-->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
                label="输入描述"
                v-model="problemInfo.input"
                prop="input"
            >
              <AdminMakedown v-model:code="problemInfo.input"></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 输出描述-->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
                label="输出描述"
                v-model="problemInfo.output"
                prop="output"
            >
              <AdminMakedown v-model:code="problemInfo.output"></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 题目样例-->
        <el-row :gutter="20">
          <el-col :span="24">
            题目样例
            <el-form-item
                v-for="(example,index) in problemInfo.examples"
                prop="examples"
                :key="index"
            >
              <AdminAccordion :title="'样例'+(index+1)" v-model:is-open="example.isOpen" :index="index">
                <template v-slot:header>
                  <el-button
                      type="danger"
                      size="small"
                      :icon="Delete"
                      @click="delExample(index)"
                  >
                    删除
                  </el-button>
                </template>
                <!-- 样例-->
                <el-row :gutter="20">
                  <el-col :xs="24" :md="12">
                    <el-form-item label="输入样例" v-model="example.input">
                      <el-input
                          :rows="5"
                          type="textarea"
                          placeholder="样例输入"
                          v-model="example.input"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :md="12">
                    <el-form-item label="输出样例" v-model="example.output">
                      <el-input
                          :rows="5"
                          type="textarea"
                          placeholder="输出样例"
                          v-model="example.output"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="样例提示" v-model="example.tips">
                      <AdminMakedown v-model:code="example.tips"></AdminMakedown>
                    </el-form-item>
                  </el-col>
                </el-row>
              </AdminAccordion>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="add-example-btn">
              <el-button
                  class="add-examples"
                  @click="addExample"
                  :icon="Plus"
                  type="large"
              >添加样例
              </el-button>
            </div>
          </el-col>
        </el-row>
        <!-- 题目提示-->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
                label="题目提示"
                v-model="problemInfo.hint"
                prop="hint"
            >
              <AdminMakedown v-model:code="problemInfo.hint"></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-button @click="submit" type="primary" style="width: 100%;">提交</el-button>
    </el-form>
  </el-card>
</template>

<script setup>
import {ref} from "vue";
import AdminMakedown from "@/components/admin/common/AdminMakedown";
import {Delete, Plus, UploadFilled} from "@element-plus/icons-vue";
import {marked} from 'marked'
import api from "@/api/api";
import router from "@/router";
import {ElMessage} from "element-plus";
import AdminAccordion from "@/components/admin/common/AdminAccordion";

/**
 * 题目信息
 */
const problemInfo = ref({
  title: '',
  timeLimit: 1000,
  memoryLimit: 256,
  stackLimit: 128,
  markdown: false,
  background: '',
  description: '',
  input: '',
  output: '',
  examples: [],
  hint: '',
  caseFiles:'',
})

/**
 * 表单容器
 */
const problemInfoRef = ref()

/**
 * 删除样例
 */
const delExample = (index) => {
  problemInfo.value.examples.splice(index, 1)
}
/**
 * 添加样例
 */
const addExample = () => {
  problemInfo.value.examples.push({isOpen: true, input: '', tips: '', output: ''})
}
/**
 * 提交
 */
const submit = () => {
  problemInfoRef.value.validateField('title', (valid) => {
    if (valid) {
      api.problem.getBaseProblem()
          .then(response => {
            let tmp = response;
            tmp.Description.BackGround = marked(problemInfo.value.background)
            tmp.Description.Description = marked(problemInfo.value.description)
            tmp.Description.Examples = JSON.stringify(problemInfo.value.examples)
            tmp.Description.Hint = marked(problemInfo.value.hint.toString())
            tmp.Description.Input = marked(problemInfo.value.input)
            tmp.Description.Output = marked(problemInfo.value.output)
            tmp.Description.Markdown = problemInfo.value.markdown
            tmp.CaseFiles = ''
            tmp.Title = problemInfo.value.title
            tmp.TimeLimit=problemInfo.value.timeLimit
            tmp.StackLimit=problemInfo.value.stackLimit
            tmp.MemoryLimit= problemInfo.value.memoryLimit
            console.log('提交',tmp)
            api.problem.addProblem(tmp)
                .then(res => {
                  console.log(res)
                  ElMessage({
                    type:'success',
                    message:'创建成功！'
                  })
                  reset()
                })
          })
    } else {
      ElMessage({
        type: "warning",
        message: '请填写题目标题'
      })
    }
  })
}
/**
 * 重置
 */
const reset=()=>{
  problemInfoRef.value.resetFields()
  problemInfo.value.examples=[]
}
/**
 * 选择markdown文件
 * 转化为Html
 */
const selectFile = (uploadFile) => {
  const reader = new FileReader();
  reader.readAsText(uploadFile.raw, 'utf8');
  reader.onload = () => {
    problemInfo.value.Description = marked(reader.result);
  }
}

/**
 * 返回上一页
 */
const goBack = () => {
  router.back()
}
</script>

<style scoped>

.add-examples {
  width: 100%;
  background-color: #fff;
  border: 1px dashed #19bc6b;
  outline: none;
  cursor: pointer;
  color: #19bc6b;
  height: 35px;
  font-size: 14px;
}

.add-examples i {
  margin-right: 10px;
}

.add-examples:hover {
  border: 0px;
  background-color: #19bc6b !important;
  color: #fff;
}
</style>