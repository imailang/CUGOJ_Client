<template>
  <el-card style="text-align: left">
    <el-select :model-value="language" filterable placeholder="Select" @change="changeLanguage">
      <el-option
          v-for="item in languages"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <el-select v-model="theme" filterable placeholder="Select" @change="changeTheme">
      <el-option label="solarized" value="solarized"></el-option>
      <el-option label="monokai" value="monokai"></el-option>
      <el-option label="material" value="material"></el-option>
    </el-select>
    <div >
      <codemirror
          :value="code"
          :options="options"
          ref="container"
          @change="codeChange"
      >
      </codemirror>
    </div>
  </el-card>
</template>

<script setup>
import {codemirror} from 'vue-codemirror-lite';
// 风格对应的样式
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/theme/material.css';

// highlightSelectionMatches 高亮
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/match-highlighter.js';

//////////////////////////// 语言
//text/x-sql
import 'codemirror/mode/sql/sql';
//text/x-java (Java)  text/x-c++src (C++)
//text/x-csrc (C)  text/x-csharp (C#)
import 'codemirror/mode/clike/clike'
//text/x-go
import 'codemirror/mode/go/go.js';
//text/javascript
import 'codemirror/mode/javascript/javascript.js';
//text/x-python
import 'codemirror/mode/python/python.js';

// active-line.js
import 'codemirror/addon/selection/active-line.js';

// foldGutter
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter.js';

import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/matchtags.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/selection/mark-selection.js';
import { onMounted, ref, toRaw} from "vue";

const container = ref()
const editor = ref()
const options = ref({
  // codemirror options
  tabSize: 4,
  mode: 'text/x-c++src',
  theme: 'solarized',
  // 显示行号
  lineNumbers: true,
  line: true,
  // 代码折叠
  foldGutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  lineWrapping: true,
  // 选中文本自动高亮，及高亮方式
  styleSelectedText: true,
  showCursorWhenSelecting: true,
  highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
  extraKeys: {Ctrl: 'autocomplete'}, //自定义快捷键
  matchBrackets: true, //括号匹配
  indentUnit: 4, //一个块（编辑语言中的含义）应缩进多少个空格
  styleActiveLine: true,
  autoCloseBrackets: true,
  autoCloseTags: true,
  hintOptions: {
    // 当匹配只有一项的时候是否自动补全
    completeSingle: false,
  },
})
const languages = ref([
  {
    label: 'go',
    value: 'text/x-go'
  },
  {
    label: 'sql',
    value: 'text/x-sql'
  },
  {
    label: 'java',
    value: 'text/x-java'
  },
  {
    label: 'c',
    value: 'text/x-csrc'
  },
  {
    label: 'c++',
    value: 'text/x-c++src'
  },
  {
    label: 'c#',
    value: 'text/x-csharp'
  },
  {
    label: 'javascript',
    value: 'text/javascript'
  },
  {
    label: 'python',
    value: 'text/x-python'
  },
])
const theme = ref('solarized')


// eslint-disable-next-line no-undef,no-unused-vars
const props=defineProps({
  code:{
    type:String,
    default:'',
  },
  language:{
    type:String,
    default:'c'
  }
})
// eslint-disable-next-line no-undef
const emits =defineEmits(['update:code'])

/**
 * 代码改变
 */
const codeChange=()=>{
  let tmp = editor.value.getValue()
  emits('update:code',tmp)
}
/**
 * 初始化
 */
onMounted(() => {
  editor.value = container.value.editor
})

/**
 * 改变主题
 */
const changeTheme = (val) => {
  toRaw(editor.value).setOption('theme', val)
}
/**
 * 改变语言
 */
const changeLanguage = (val) => {
  toRaw(editor.value).setOption('mode', val)
  emits('update:language',val)
}

</script>


<style scoped>

</style>