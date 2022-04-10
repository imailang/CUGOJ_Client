<template>
    <el-row :gutter="30">
      <el-col :sm="15" :xs="24">
        <el-card shadow="always "> Always</el-card>
      </el-col>
      <el-col :sm="9" :xs="24">
        <el-card shadow="always"> Always</el-card>
      </el-col>
      <el-col :sm="15" :xs="24">
        <div class="card-top">
        <el-card shadow="always" > Always</el-card>
        </div>
      </el-col>
    </el-row>
</template>

<script setup>


</script>

<style scoped>

.card-top{
  margin-top: 20px;
}




</style>