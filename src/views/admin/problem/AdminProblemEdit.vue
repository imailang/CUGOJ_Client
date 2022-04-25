<template>
  <el-card>
    <template #header>
      <el-page-header content="编辑题目" @back="goBack"/>
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
          <el-form-item prop="Title"
                        label="题目标题"
                        required>
            <el-input
                placeholder="请输入题目标题"
                size="large"
                v-model="problemInfo.Title"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 空间大小-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item
              label="时间限制"
              v-model="problemInfo.TimeLimit"
              required
          >
            <vxe-input v-model="problemInfo.TimeLimit" type="integer"></vxe-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
              label="内存限制"
              v-model="problemInfo.MemoryLimit"
              required
          >
            <vxe-input v-model="problemInfo.MemoryLimit" type="integer"></vxe-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
              label="栈限制"
              v-model="problemInfo.StackLimit"
              required
          >
            <vxe-input v-model="problemInfo.StackLimit" type="integer"></vxe-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 题目描述模块-->
      <el-switch v-model="problemInfo.Markdown"/>
      <i style="font-size: 10px;color: #cac6c6">文件上传描述</i>
      <!-- 开启markdown-->
      <el-row v-if="problemInfo.Markdown" :gutter="20">
        <el-col :span="24">
          <el-form-item
              label="文件上传"
              prop="Markdown"
              v-model="problemInfo.Description"
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
      <div v-else>
        <!-- 题目背景-->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
                label="题目背景"
                v-model="problemInfo.BackGround"
                prop="BackGround"
            >
              <AdminMakedown v-model:code="problemInfo.BackGround"></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 题目描述-->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
                label="题目描述"
                v-model="problemInfo.Description"
                prop="Description"
            >
              <AdminMakedown v-model:code="problemInfo.Description"></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 输入描述-->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
                label="输入描述"
                v-model="problemInfo.Input"
                prop="Input"
            >
              <AdminMakedown v-model:code="problemInfo.Input"></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 输出描述-->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
                label="输出描述"
                v-model="problemInfo.Output"
                prop="Output"
            >
              <AdminMakedown v-model:code="problemInfo.Output"></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 题目样例-->
        <el-row :gutter="20">
          <el-col :span="24">
            题目样例
            <el-form-item
                v-for="(example,index) in problemInfo.Examples"
                prop="Examples"
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
                v-model="problemInfo.Hint"
                prop="Hint"
            >
              <AdminMakedown v-model:code="problemInfo.Hint"></AdminMakedown>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-button @click="submit" type="primary" style="width: 100%;">提交</el-button>
    </el-form>
  </el-card>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";
import api from "@/api/api";
import {Delete, Plus, UploadFilled} from "@element-plus/icons-vue";
import AdminMakedown from "@/components/admin/common/AdminMakedown";
import {marked} from "marked";
import {ElMessage} from "element-plus";
import AdminAccordion from "@/components/admin/common/AdminAccordion";
import TurndownService from 'turndown'

/**
 * html转markdown
 */
const turndownService = new TurndownService()
/**
 * 路由
 */
const route = useRoute();
/**
 * 题目信息
 */
const problemInfo =ref({})
/**
 * 表单容器
 * @type {Ref<any>}
 */
const problemInfoRef =ref()
/**
 * 初始化
 */
onMounted(()=>{
   problemInfo.value.ID=route.params.problemId
  getProblemInfo()
})
/**
 * 获取问题信息
 */
const getProblemInfo = () => {
  console.log(  turndownService.turndown('<h1>hello</h1>'))
  api.problem.getProblem(problemInfo.value.ID)
      .then(response => {
        problemInfo.value = JSON.parse(response.Info)
        console.log(problemInfo.value)
        for(const item in problemInfo.value.Description)
        {
          if(item==='Description'||item==='ID')continue
          if(item==='BackGround'||item==='Output'||item==='Input'||item==='Hint')
          {
            problemInfo.value[item]=turndownService.turndown(problemInfo.value.Description[item])
          }
          else {
            problemInfo.value[item]=problemInfo.value.Description[item] ;
          }
        }
        problemInfo.value['Description'] = turndownService.turndown(problemInfo.value.Description['Description'])
        problemInfo.value.Examples=JSON.parse(problemInfo.value.Examples)
      })
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
 * 删除样例
 */
const delExample = (index) => {
  problemInfo.value.Examples.splice(index, 1)
}
/**
 * 添加样例
 */
const addExample = () => {
  problemInfo.value.Examples.push({isOpen: true, input: '', tips: '', output: ''})
}
/**
 * 提交
 */
const submit = () => {
  problemInfoRef.value.validateField('Title', (valid) => {
    if (valid) {
      console.log(problemInfo.value.ID)
      api.problem.getProblem(problemInfo.value.ID)
          .then(response => {
            let tmp = JSON.parse(response.Info);
            tmp.Description.BackGround = marked(problemInfo.value.BackGround)
            tmp.Description.Description = marked(problemInfo.value.Description)
            tmp.Description.Examples = JSON.stringify(problemInfo.value.Examples)
            tmp.Description.Hint = marked(problemInfo.value.Hint)
            tmp.Description.Input = marked(problemInfo.value.Input)
            tmp.Description.Output = marked(problemInfo.value.Output)
            tmp.Description.Markdown = problemInfo.value.Markdown
            tmp.Title = problemInfo.value.Title
            tmp.CaseFiles=''
            console.log('提交',tmp)
            api.problem.changeProblem(tmp)
                .then(res => {
                  console.log(res)
                  if(res.Statu==='000')
                  {
                    ElMessage({
                      type:'success',
                      message:'修改成功！'
                    })
                  }
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
// eslint-disable-next-line no-unused-vars
const reset=()=>{
  problemInfoRef.value.resetFields()
  problemInfo.value.Examples=[]
}
/**
 * 返回
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