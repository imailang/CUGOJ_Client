<template>
    <el-row :gutter="30">
      <el-col :sm="15" :xs="24">
        <el-card>
          <template #header>
            <b style="font-size: 30px;color: #308ff1">欢迎来到CUGOJ</b>
          </template>
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        </el-card>
      </el-col>
      <el-col :sm="9" :xs="24">
        <el-card shadow="always"> 近期比赛</el-card>
      </el-col>
      <el-col :sm="15" :xs="24">
        <div class="card-top">
        <el-card shadow="always" > 公告</el-card>
        </div>
      </el-col>
    </el-row>
  <el-row>
    <el-col v-for="item in 500" :key="item">
      {{item}}
    </el-col>
  </el-row>

</template>

<script setup>


</script>
<script>

</script>

<style scoped>

.card-top{
  margin-top: 20px;
}




</style>