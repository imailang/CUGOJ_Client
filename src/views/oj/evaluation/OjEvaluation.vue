<template>
  <el-card>
    <!-- 标题头 -->
    <template #header>
      <el-row justify="space-between" align="middle">
        <el-col :xs="7" :sm="4"><p class="panel-title">评测列表</p></el-col>
        <el-col :xs="8" :sm="4">
          <el-switch
              class="mb-2"
              active-text="全部"
              inactive-text="我的"
          />
        </el-col>
        <el-col :xs="9" :sm="6">
          <el-input
              placeholder="请输入关键字"
              :suffix-icon="Search"
          />
        </el-col>
        <el-col :xs="6" :sm="5">
          <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          状态<el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col :xs="6" :sm="4">
          <el-button round :icon="Refresh" type="primary">刷新</el-button>
        </el-col>
      </el-row>
    </template>
    <!-- 评测列表-->
    <div>
      <vxe-table :data="problemList" ref="Xtable">
        <vxe-column field="ID" title="题目ID"></vxe-column>
        <vxe-column field="Title" title="题目"></vxe-column>
        <vxe-column field="SubmitNumber" title="提交数"></vxe-column>

      </vxe-table>
    </div>
  </el-card>
</template>

<script setup>
import {Search, Refresh, ArrowDown} from "@element-plus/icons-vue";
</script>

<style scoped>
.panel-title {
  font-size: 1.5rem !important;
  font-weight: 500;
  line-height: 0;
  text-align: left;
}

</style>