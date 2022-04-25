<template>
<div>
  <vxe-table border :data="userList">
    <vxe-column type="seq" width="40"></vxe-column>
    <vxe-column field="ID" title="用户ID"></vxe-column>
    <vxe-column field="Username" title="用户名"></vxe-column>
    <vxe-column field="Email" title="邮箱"></vxe-column>
  </vxe-table>
  <!-- 分页-->
  <div>
    <vxe-pager
        perfect
        v-model:current-page="pageBody.offset"
        v-model:page-size="pageBody.pageSize"
        :total="pageBody.totalPage"
        @page-change="handleSizeChange"
        :page-sizes="[5,10, 20, 50]"
        :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
    </vxe-pager>
  </div>
</div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import api from "@/api/api";

/**
 * 用户列表
 */
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
/**
 * 分页
 */
const pageBody = ref({
  pageSize: 10,
  offset: 1,
  totalPage: 0,
})

onMounted(()=>{
  getUserList()
  getListTotal()
})

/**
 * 获取用户列表
 */
const getUserList=()=>{
  api.user.getUserList({
    "pagequery": {
      "offset": pageBody.value.offset - 1,
      "pagesize": pageBody.value.pageSize
    }
  }).then(response => {
    userList.value = JSON.parse(response.Info)
    console.log('用户列表', userList.value)
  })
}
/**
 * 获取用户总数
 */
const getListTotal = () => {
  api.user.getUserCount({})
      .then(res => {
        pageBody.value.totalPage = res.Info
      })
}
/**
 * 翻页
 */
const handleSizeChange = () => {
  let pages =Math.floor(pageBody.value.totalPage/pageBody.value.pageSize)+1;
  console.log(pages)
  if(pageBody.value.offset>=pages)
  {
    pageBody.value.offset=pages
  }
  getUserList()
}
</script>

<style scoped>

</style>