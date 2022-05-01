<template>
  <div>
    <el-card :style="'background-color: '+colorList[evaluationInfo.Status]+''">
      <el-row>
        <div style="width: 50px ;text-align: left;color: white;font-size: 25px">{{ evaluationInfo.Status }}</div>
        <el-row style="margin-top: 5px">
          <el-col style="color: white;font-size: 14px">
            <i> 运行时间{{ evaluationInfo.TimeUse }}ms </i>
            <i> 运行内存{{ evaluationInfo.MemoryUse }}KB </i>
            <i> 代码长度{{ evaluationInfo.Length }} </i>
            <i> 语言{{ evaluationInfo.Language }} </i>
          </el-col>
        </el-row>
      </el-row>
    </el-card>
    <el-row v-if="store.getters.getUserInfo.ID===evaluationInfo.UID" style="text-align: left;font-size: 20px;">
      <el-col :span="24">
        <el-button style="position: absolute;right: 0;top:20px" type="text"
                   @click="copy(evaluationInfo.Code)">
          <el-icon size="large">
            <CopyDocument></CopyDocument>
          </el-icon>
          复制
        </el-button>
        <highlightjs :code="evaluationInfo.Code"></highlightjs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import api from "@/api/api";
import {ElMessage} from "element-plus";
import {CopyDocument} from "@element-plus/icons-vue";
import useClipboard from "vue-clipboard3";
import store from "@/store";
import router from "@/router";


/**
 * 复制函数
 */
const {toClipboard} = useClipboard();
/**
 * 复制
 */
const copy = async (val) => {
  await toClipboard(val);
  ElMessage.success("复制成功");
};
const route = useRoute()

/**
 * 颜色列表
 */
const colorList = ref({
  Pending: '#7c7c7c',
  Compiling: '#fd8387',
  Running: '#5db75e',
  AC: '#00b23e',
  CE: '#efc110',
  RE: '#8d43af',
  WA: '#e74b3d',
  TLE: '#2d468c',
  MLE: '#2d468a',
  OLE: '#10efc6',
  SE: '#ff8000'
})
/**
 * 评测信息
 */
const evaluationInfo = ref({
  Code: ''
})


onMounted(() => {
  evaluationInfo.value.id = route.params.evaluationId;
  getJudgeFull()
})

/**
 * 获取评测信息
 */
const getJudgeFull = () => {
  api.judge.getJudgeFull(evaluationInfo.value.id)
      .then(res => {
        if (res.Statu === '000') {
          console.log(res)
          evaluationInfo.value = JSON.parse(res.Info)
          console.log(evaluationInfo.value)
        } else {
          ElMessage.warning('无权查看')
          router.back();
        }
      })
}

</script>

<style scoped>

</style>