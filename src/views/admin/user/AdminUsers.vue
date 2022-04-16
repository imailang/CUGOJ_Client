<template>
<div>
  <vxe-table border :data="userList">
    <vxe-column type="seq" width="60"></vxe-column>
    <vxe-column field="id" title="用户ID"></vxe-column>
    <vxe-column field="username" title="用户名"></vxe-column>
    <vxe-column field="email" title="邮箱"></vxe-column>
  </vxe-table>

</div>
</template>

<script setup>
import { ref} from "vue";

const userList= ref([
  {
    id:'1',
    username:'zx',
    email:'1@c.c',
  },
  {
    id:'3',
    username:'zxx',
    email:'1@c.c',
  }
])


</script>

<style scoped>

</style>