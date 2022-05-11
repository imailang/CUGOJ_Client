<template>
  <div>
    <el-form :model="userInfo" label-position="top">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="用户名" prop="Username">
            <el-input v-model="userInfo.Username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="Email">
            <el-input v-model="userInfo.Email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
        <el-col :span="12"></el-col>
        <el-col :span="12"></el-col>
        <el-col :span="12"></el-col>
      </el-row>

    </el-form>
    {{ userInfo }}
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  userInfo: {
    type: Object,
    default: Object
  }
})
const userInfo = ref(props.userInfo)

onMounted(() => {
  console.log(userInfo.value)
})


</script>

<style scoped>

</style>