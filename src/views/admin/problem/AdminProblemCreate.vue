<template>
  <div>
    <el-card>
      <template #header></template>
      <el-form
          ref="form"
          :model="description"
          label-position="top"
          label-width="70px"
      >
        <!-- 题目标题-->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="Title"
                          label="题目标题"
                          required>
              <el-input
                  placeholder="请输入题目标题"
                  size="large"
                  v-model="description.Title"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 题目描述模块-->
        <el-switch v-model="description.Markdown"/><i style="font-size: 10px;color: #cac6c6">文件上传题目</i>
        <!-- 开启markdown-->
        <el-row v-if="description.Markdown" :gutter="20">
          <el-col :span="24">
            <el-form-item
                label="文件上传"
                required
                v-model="description.Description"
            >
              <el-upload
                  class="upload-demo"
                  drag
                  :limit="1"
                  :auto-upload="false"
                  accept=".md,.makedown"
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
                  v-model="description.BackGround"
              >
                <AdminMakedown v-model:code="problemInfo.background"
                               v-model:code-html="description.BackGround"></AdminMakedown>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 题目描述-->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item
                  label="题目描述"
                  v-model="description.Description"
              >
                <AdminMakedown v-model:code="problemInfo.description"
                               v-model:code-html="description.Description"></AdminMakedown>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 输入描述-->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item
                  label="输入描述"
                  v-model="description.Input"
              >
                <AdminMakedown v-model:code="problemInfo.input"
                               v-model:code-html="description.Input"></AdminMakedown>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 输出描述-->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item
                  label="输出描述"
                  v-model="description.Output"
              >
                <AdminMakedown v-model:code="problemInfo.output"
                               v-model:code-html="description.Output"></AdminMakedown>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 题目样例-->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item
                  label="题目样例"
                  v-model="description.Examples"
              >
                <AdminMakedown v-model:code="problemInfo.examples"
                               v-model:code-html="description.Examples"></AdminMakedown>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 题目提示-->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item
                  label="题目提示"
                  v-model="description.Hint"
              >
                <AdminMakedown v-model:code="problemInfo.hint"
                               v-model:code-html="description.Hint"></AdminMakedown>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-button @click="submit" type="primary" style="width: 100%;">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {ref} from "vue";
import AdminMakedown from "@/components/admin/common/AdminMakedown";
import {UploadFilled} from "@element-plus/icons-vue";
import {marked} from 'marked'
import api from "@/api/api";

const description=ref({
  Title:'',
  Markdown:false,
  BackGround:'',
  Description:'',
  Input:'',
  Output:'',
  Examples:'',
  Hint:'',
})
/**
 * 题目信息
 */
const problemInfo = ref({
  description: '',
  background: '',
  input: '',
  output: '',
  examples: '',
  hint: '',
})
/**
 * 提交
 */
const submit = () => {
  api.problem.getBaseProblem()
  .then(response=>{
    console.log(response)
    let tmp =response;
    tmp.Description.BackGround=description.value.BackGround
    tmp.Description.CaseFiles=''
    tmp.Description.Description=description.value.Description
    tmp.Description.Examples=description.value.Examples
    tmp.Description.Hint=description.value.Hint
    tmp.Description.Input=description.value.Input
    tmp.Description.Output=description.value.Output
    tmp.Description.Markdown=description.value.Markdown
    tmp.Title=description.value.Title
    api.problem.addProblem(tmp)
    .then(res=>{
      console.log(res)
    })

  })
  console.log(description.value)
}
/**
 * 选择markdown文件
 * 转化为Html
 */
const selectFile = (uploadFile) => {
  console.log(uploadFile)
  const reader = new FileReader();
  reader.readAsText(uploadFile.raw, 'utf8');
  reader.onload = () => {
    let tmp =marked(reader.result)
    description.value.Description=tmp;
    console.log(tmp)
  }
}

</script>

<style scoped>

</style>