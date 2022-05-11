<template>
  <div>{{text}}</div>
  <el-button @click="connect">连接</el-button>
</template>

<script setup>


import { ref} from "vue";


const text = ref('')



const connect = () => {
  const source =new EventSource('http://localhost:8002/sse/subscribe/1')
  source.addEventListener("msg",function (e){
    text.value+=e.data;
  })
  source.onerror=function (e){
    if(e.readyState === EventSource.CLOSED)
    {
      console.log('连接关闭')
    }
  }
  source.onopen = function (e){
    console.log('已连接');
    console.log(e);
  }
}
</script>


<style scoped>

</style>
