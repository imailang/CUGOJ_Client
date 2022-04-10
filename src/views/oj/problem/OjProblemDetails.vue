<template>
  <div>
    <el-row>
      <el-col :sm="24" :md="24" :lg="12" class="problem-left">
        <el-tabs
            type="border-card"
        >
          <el-tab-pane name="3">
            <template #label>
              <div>
                <el-icon>
                  <Notebook></Notebook>
                </el-icon>
                题目描述
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import {onMounted} from "vue";
import {useRoute} from "vue-router";
import {Notebook} from "@element-plus/icons-vue";


const route = useRoute();
onMounted(() => {
  console.log(route.params.problemId)
})
</script>

<style scoped>

</style>