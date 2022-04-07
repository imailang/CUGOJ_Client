<template>
<div>
  <CodeEditor v-model:value="data.code" :scene="data.type" height-size="200"></CodeEditor>
</div>
</template>

<script setup>
import {reactive} from "vue";
import CodeEditor from "@/components/oj/common/codeEditor";

const data = reactive({
  code: '',
  type: 'add'
})
</script>

<style scoped>

</style>