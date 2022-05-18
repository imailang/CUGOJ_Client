<template>
  <mavon-editor
    :model-value="code"
    @change="codeChange"
    style="width: 100%"
  ></mavon-editor>
  <!--    :subfield="false"-->
  <!--    defaultOpen="preview"-->
  <!--    :toolbarsFlag="false"-->
</template>

<script setup>
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  code: {
    type: String,
    default: "",
  },
});
// eslint-disable-next-line no-undef
const emits = defineEmits(["update:code"]);
/**
 * 编辑区代码变化
 */
const codeChange = (val) => {
  emits("update:code", val);
};
</script>

<style scoped>
</style>