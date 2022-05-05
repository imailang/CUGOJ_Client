<template>
  <el-row class="title">
    <el-col :span="4" :offset="1">
      <span>标题: </span>
    </el-col>
    <el-col :span="18">
      <span class=".title">{{ msg.Title }}</span>
    </el-col>
  </el-row>
  <el-row class="title">
    <el-col :span="4" :offset="1">
      <span>发送人: </span>
    </el-col>
    <el-col :span="18">
      <span style="color: #505bff">{{ msg.Sender }}</span>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="22" :offset="1">
      <el-card :body-style="{ padding: '5px' }" shadow="none">
        <InviteMessage
          :message="msg.Content"
          :MID="msg.ID"
          v-if="msg.Type == 1"
        ></InviteMessage>
        <span v-else v-html="msg.Content" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import InviteMessage from "@/components/oj/messagePages/OjInviteMessage.vue";
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  msg: {
    default: {},
  },
});
</script>

<style scoped>
.title {
  font-size: 22px;
  text-align: left;
  margin-bottom: 5px;
}
</style>