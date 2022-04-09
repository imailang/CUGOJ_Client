<template>
<div>
  <el-drawer :model-value="leftDrawerVisible"
             direction="ltr"
             :show-close="false"
             :before-close="closeDrawer">
    <NavBar mode="vertical"></NavBar>
  </el-drawer>
</div>
</template>

<script setup>

import NavBar from "@/components/oj/basic/NavBar";
import {computed} from "vue";
import {mapGetters} from "vuex/dist/vuex.esm-browser";
import store from "@/store";

/**
 * 传入数据
 */


/**
 * 左弹窗显示
 */
const leftDrawerVisible = computed(
    mapGetters(['getLeftDrawerVisible']).getLeftDrawerVisible.bind({$store:store})
)

/**
 * 关闭左弹窗
 */
const closeDrawer =()=>{
  store.dispatch("changeLeftDrawerVisible",false)
}



</script>

<style scoped>

</style>