<template>
  <el-row>
    <el-col :span="24" @mouseenter="seen=true" @mouseleave="seen=false">
      <el-button
          v-show="seen"
          type="text"
          style="position: absolute;right: 40px;top:20px;z-index: 10000"
          @click="copy(code)">
        <el-icon size="large">
          <CopyDocument></CopyDocument>
        </el-icon>
        复制
      </el-button>
      <mavon-editor
          :model-value="'```'+language+'\n'+code+'\n```'"
          @change="codeChange"
          :subfield="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
          style="width: 100%;font-size: 30px">
      </mavon-editor>
    </el-col>
  </el-row>

</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {CopyDocument} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import useClipboard from "vue-clipboard3";

const seen = ref(false)
/**
 * 复制函数
 */
const {toClipboard} = useClipboard();

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  code: {     //内容
    type: String,
    default: "",
  },
  language: {        //是否可编辑
    type: String,
    default: ""
  }
});
// eslint-disable-next-line no-undef
const emits = defineEmits(["update:code"]);
/**
 * 编辑区代码变化
 */
const codeChange = (val) => {
  emits("update:code", val);
};

/**
 * 复制
 */
const copy = async (val) => {
  await toClipboard(val);
  ElMessage.success("复制成功");
};
onBeforeMount(() => {
  const tmp = document.querySelectorAll('pre code')
  console.log(tmp)
})
</script>

<style scoped>
</style>