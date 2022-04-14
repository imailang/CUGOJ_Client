<template>
  <div>
    <mavon-editor
        :model-value="code"
        @change="codeChange"
    ></mavon-editor>
  </div>
</template>

<script setup>

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  codeHtml: {
    type: String,
    default: ''
  }
})
// eslint-disable-next-line no-undef
const emits = defineEmits(['update:code', 'update:codeHtml'])

/**
 * 编辑区代码变化
 */
const codeChange = (val, render) => {
  emits('update:code', val)
  emits('update:codeHtml', render)

}


</script>

<style scoped>

</style>