<template>
<el-row>
  <div v-for="(item,index) in titleList" :key="index">
    <el-tag>{{item}}</el-tag>
  </div>
</el-row>
</template>

<script setup>
import {onMounted,ref} from "vue";

const props = defineProps({
  title:{
    type:String,
    default:''
  }
})

const titleList = ref()
onMounted(()=>{
  titleList.value=props.title.split(";")
})

</script>

<style scoped>

</style>