<template>
  <MonacoEditor
      :code="data.code"
      height="500"
      style="text-align: left"
      @mounted="mounted"
      @codeChange="codeChange"
      :options="data.option"
  ></MonacoEditor>
</template>

<script setup>
import MonacoEditor from 'vue-monaco-editor'
import {reactive, ref} from "vue";


const editor =ref()
const data = reactive({
  code:'console.log(33)',
  options:{
    selectOnLineNumbers:false
  },
  randomKey:12314213
})
const mounted = (ed) => {
  editor.value=ed
}
const codeChange = (ed) => {
  console.log(ed.getValue())
}



</script>