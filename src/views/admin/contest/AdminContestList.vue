<template>
  <div>
    <el-card>
      <vxe-table border :data="competitionList">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="id" title="竞赛编号"></vxe-column>
        <vxe-column field="startTime" title="开始时间"></vxe-column>
        <vxe-column field="endTime" title="结束时间"></vxe-column>
        <vxe-column field="description" title="描述"></vxe-column>
      </vxe-table>
    </el-card>
  </div>
</template>

<script setup>

import {ref} from 'vue';

const competitionList = ref([
  {
    id: '1',
    authur: 'zx',
    title: '小白月赛',
    startTime: '2022-4-11 17:34:37',
    endTime: '2022-4-16 17:34:30',
    description: '比赛描述',
  },

])
</script>

<style scoped>

</style>