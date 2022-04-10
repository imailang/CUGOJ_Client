<template>
  <OjCodeEditor></OjCodeEditor>
  <el-divider></el-divider>
  <MonacoEditor ref="editor" height="500" style="text-align: left"></MonacoEditor>
</template>

<script setup>
import OjCodeEditor from "@/components/oj/common/OjCodeEditor";
import MonacoEditor from 'vue-monaco-editor'
import {ref} from "vue";

const editor = ref()
</script>

<style scoped>

</style>