<template>
<div>
  <el-drawer :model-value="props.drawerVisible"
             direction="ltr"
             :show-close="false"
             :before-close="closeDrawer">
    <NavBar mode="vertical" @clickClose="clickClose"></NavBar>
  </el-drawer>
</div>
</template>

<script setup>

import NavBar from "@/components/oj/common/NavBar";

/**
 * 传入数据
 */

// eslint-disable-next-line no-undef
const props = defineProps({
  drawerVisible:Boolean
})
// /**
//  * 返回函数接口
//  */
// // eslint-disable-next-line no-undef
// const emits = defineEmits(["closeDrawer"])
// /**
//  * 执行接口
//  */
// eslint-disable-next-line no-undef,vue/valid-define-emits
const emits = defineEmits();
const closeDrawer =()=>{
  emits("update:drawerVisible",false)
}

const clickClose = () => {
  closeDrawer()

}


</script>

<style scoped>

</style>