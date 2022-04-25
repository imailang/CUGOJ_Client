<template>
  <div style="display: flex; flex-direction: column;">
    <div>我现在显示在文档的顶部,会随文档滚动</div>
    <div style="flex: 1;overflow: auto;">
      <ol>
        <li>我是长长的内容；自身无法滚动；会随文档滚动</li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
      </ol>
    </div>
  <div >我现在显示在文档的底部,会随文档滚动；</div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>