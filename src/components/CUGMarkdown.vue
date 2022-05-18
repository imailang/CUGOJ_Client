<template>
  <mavon-editor
      v-if="isEdit"
      :model-value="code"
      @change="codeChange"
      style="width: 100%"
  ></mavon-editor>
  <mavon-editor
      v-else
      :model-value="code"
      @change="codeChange"
      :subfield="false"
      defaultOpen="preview"
      :toolbarsFlag="false"
      style="width: 100%"
  ></mavon-editor>

</template>

<script setup>

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  code: {     //内容
    type: String,
    default: "",
  },
  isEdit: {        //是否可编辑
    type: Boolean,
    default: true
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
</script>

<style scoped>
</style>