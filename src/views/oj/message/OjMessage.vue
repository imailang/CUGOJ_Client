<template>
  <el-row justify="space-around" :gutter="10">
    <el-col :span="6">
      <el-card>
        <template #header>
          <div class="card-header">
            <span style="font-size: 24px">消息中心</span>
            <el-button class="button" type="text">全部已读</el-button>
          </div>
        </template>
        <el-row>
          <el-col :span="24">
            <el-scrollbar height="100%">
              <el-row justify="start" align="middle" style="width: 100%">
                <el-col :span="23">
                  <div v-for="item in messages" :key="item.ID">
                    <el-divider />
                    <el-row
                      :gutter="10"
                      @click="openMessage(item)"
                      style="cursor: pointer"
                    >
                      <el-col :span="8">
                        <el-avatar :size="50" :src="item.Avatar" />
                      </el-col>
                      <el-col :span="16" style="text-align: left">
                        <el-row style="font-size: 22px; color: #505bff">
                          <el-badge
                            value="new"
                            class="item"
                            :hidden="item.Read"
                          >
                            <b>{{ item.Sender }}</b>
                          </el-badge>
                        </el-row>
                        <el-row>
                          <b>{{ item.Title }}</b>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <MessagePage v-if="opened" :msg="currentMessage"></MessagePage>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import MessagePage from "@/components/oj/common/OjMessagePage.vue";
const { default: api } = require("@/api/api");
const { ref, reactive } = require("@vue/reactivity");
const { onBeforeMount } = require("@vue/runtime-core");
const { ElMessage } = require("element-plus");

const messages = ref([]);
const currentMessage = reactive({});
const opened = ref(false);

onBeforeMount(() => {
  api.message.getUserMessageList().then((response) => {
    if (!response) {
      ElMessage.error("请求出错");
    } else if (response.Statu != "000") {
      ElMessage.error(response.Info);
    } else {
      messages.value = JSON.parse(response.Info);
    }
  });
});

const openMessage = (item) => {
  api.message.getMessage(Number(item.ID)).then((response) => {
    if (!response) {
      ElMessage.error("请求出错");
    } else if (response.Statu != "000") {
      ElMessage.error(response.Info);
    } else {
      messages.value.forEach((msg) => {
        if (msg.ID == item.ID) {
          msg.Read = true;
        }
      });
      opened.value = true;
      var tmp = JSON.parse(response.Info);
      currentMessage.ID = tmp.ID;
      currentMessage.Title = tmp.Title;
      currentMessage.Sender = tmp.Sender;
      currentMessage.Content = tmp.Content;
      currentMessage.Avatar = tmp.Avatar;
      currentMessage.Time = tmp.Time;
      currentMessage.Type = tmp.Type;
    }
  });
};
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>