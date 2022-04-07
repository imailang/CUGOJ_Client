<template>
  <el-select v-model="data.language" filterable placeholder="Select" @change="changeLanguage">
    <el-option
        v-for="item in data.languageOptions"
        :key="item"
        :label="item"
        :value="item"
    />
  </el-select>
  <el-select v-model="data.editorTheme" filterable placeholder="Select" @change="changeTheme">
    <el-option label="Visual Studio Dark" value="vs-dark"></el-option>
    <el-option label="Visual Studio" value="vs"></el-option>
    <el-option label="High Contrast Dark" value="hc-black"></el-option>
  </el-select>
  <div ref="container" style="text-align: left;height: 500px">
  </div>

</template>

<script setup>
import * as monaco from 'monaco-editor'
import {onMounted, reactive, ref, toRaw} from "vue";
import {
  cppCompletion,
  csharpCompletion,
  goCompletion,
  javaCompletion,
  pythonCompletion,
  sqlCompletion
} from "@/utils/completion";

//实例
const editor = ref()
//容器
const container = ref()

//基础数据
const data = reactive({
  language: 'java',
  // languageOptions:["bat", "cpp", "csharp", "css", "dockerfile", "go", "graphql", "html", "ini",
  //   "java", "javascript", "json", "julia", "kotlin", "less", "markdown", "mysql", "objective-c", "pascal", "pascaligo",
  //   "perl", "php", "powershell", "python", "r", "redis", "rust", "scala", "scheme", "scss", "shell",
  //   "sophia", "sql", "swift", "tcl", "typescript", "xml", "yaml"],
  languageOptions: ['java', 'cpp', 'python', 'sql', 'csharp','go'],
  editorTheme: 'vs-dark',
})

/**
 * 初始化容器
 */
const initEditor = () => {
  editor.value = monaco.editor.create(container.value, {
    value: 'console.log(\'zx\')', //编辑器初始显示文字
    language: data.language, //语言支持自行查阅demo
    theme: data.editorTheme, //官方自带三种主题vs, hc-black, or vs-dark
    selectOnLineNumbers: true,//显示行号
    roundedSelection: false,
    readOnly: false, // 只读
    cursorStyle: 'line', //光标样式
    automaticLayout: true, //自动布局
    glyphMargin: true, //字形边缘
    useTabStops: false,
    fontSize: 15, //字体大小
    autoIndent: true, //自动布局
    quickSuggestionsDelay: 100, //代码提示延时
  });
  //代码提示
  pythonCompletion
  sqlCompletion
  cppCompletion
  csharpCompletion
  javaCompletion
  goCompletion
}

// eslint-disable-next-line no-unused-vars
const changeTheme = (val) => {

  data.editorTheme = val
  monaco.editor.setTheme(val)

  console.log(toRaw(editor.value).getValue())
}
//修改语言
const changeLanguage = (val) => {
  data.language = val;
  console.log(val)
  monaco.editor.setModelLanguage(toRaw(editor.value).getModel(),val)
}


onMounted(() => {
  initEditor();
})

</script>

<style scoped>

</style>