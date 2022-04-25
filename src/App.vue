<template>
  <router-view v-if="reload"></router-view>
</template>

<script setup>
import {nextTick, provide, ref} from "vue";

const reload = ref(true)
const onReload = () => {
  reload.value=false;
  nextTick(() => {
    reload.value = true  //渲染后又展示 实现刷新组件
  })
}
provide('reload',onReload)

</script>

<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
