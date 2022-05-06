<template>
  <div>
    <el-card>
      <template #header>
        <el-row align="middle">
          <el-col :span="24" style="text-align: left; margin-bottom: 10px">
            <span class="panel-title home-title">竞赛列表</span>
          </el-col>
          <el-col :xs="5" :sm="4" style="text-align: left">
            <router-link
              to="/admin/contest/create"
              style="text-decoration: none"
            >
              <el-button :icon="Plus" type="primary">创建 </el-button>
            </router-link>
          </el-col>
          <el-col :xs="8" :sm="5">
            <el-input placeholder="请输入搜索关键字"></el-input>
          </el-col>
        </el-row>
      </template>
      <vxe-table border :data="contestList" v-loading="loading" align="center">
        <vxe-column field="id" title="#" width="90px"></vxe-column>
        <vxe-column field="title" title="比赛名"></vxe-column>
        <vxe-column field="startTime" title="开始时间"></vxe-column>
        <vxe-column field="endTime" title="结束时间"></vxe-column>
        <vxe-column title="操作" width="100" show-overflow>
          <template #default="{ row }">
            <el-button type="text" @click="editContest(row.id)">
              <el-icon>
                <edit></edit>
              </el-icon>
            </el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="red"
              title="操作无法撤销,确认删除比赛吗?"
              @confirm="removeContest(row.id)"
            >
              <template #reference>
                <el-button type="text">
                  <el-icon>
                    <delete></delete>
                  </el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-pager
        perfect
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[5, 10, 20]"
        :layouts="[
          'PrevJump',
          'PrevPage',
          'Number',
          'NextPage',
          'NextJump',
          'Sizes',
          'FullJump',
          'Total',
        ]"
        @page-change="
          () => {
            updateContest();
          }
        "
      >
      </vxe-pager>
    </el-card>
  </div>
</template>

<script setup>
import api from "@/api/api";
import { ElMessage } from "element-plus";
import { onBeforeMount, reactive, ref } from "vue";
import { Delete, InfoFilled, Edit, Plus } from "@element-plus/icons-vue";
import router from "@/router";
const currentPage = ref(1);
const pageSize = ref(10);
const loading = ref(false);
const odds = reactive({
  pagequery: {
    offset: 0,
    pagesize: 10,
  },
  order: "start_time desc",
});

const total = ref(0);

const contestList = ref([]);

onBeforeMount(() => {
  updateContest();
});

const editContest = (id) => {
  router.push({
    path: "/admin/contest/edit/" + id,
  });
};

const removeContest = (id) => {
  loading.value = true;
  api.contest.deleteContest(id).then((response) => {
    if (typeof response === "undefined") {
      ElMessage.error("请求出错");
      return;
    } else if (response.Statu !== "000") {
      ElMessage.error(response.Info);
    } else {
      ElMessage.success("删除成功");
      updateContest();
    }
    loading.value = false;
  });
};

const updateContest = () => {
  loading.value = true;
  odds.pagequery.offset = currentPage.value - 1;
  if (
    odds.pagequery.offset != 0 &&
    odds.pagequery.offset * odds.pagequery.pagesize >= total.value
  ) {
    odds.pagequery.offset--;
  }
  odds.pagequery.pagesize = pageSize.value;
  api.contest.getUserContestCount(odds).then((response) => {
    if (typeof response === "undefined" || response.Statu != "000") {
      ElMessage.error("请求出错");
      loading.value = false;
      return;
    }
    total.value = Number(response.Info);
  });
  api.contest.getUserContestList(odds).then((response) => {
    if (typeof response === "undefined") {
      ElMessage.error("请求出错");
      loading.value = false;
      return;
    }
    var tmp = JSON.parse(response.Info);
    contestList.value = [];
    tmp.forEach((element) => {
      contestList.value.push({
        id: element.ID,
        title: element.Title,
        type: element.Type,
        startTime: element.StartTime,
        endTime: element.EndTime,
        num: element.RegisterCount,
        owner: element.Owner,
        permission: element.Permission,
        registerMode: element.RegisteMode,
        visible: element.Visible,
      });
    });
    contestList.value.forEach((element) => {
      var d1 = new Date(element.startTime);
      var d2 = new Date(element.endTime);
      element.startTime = d1.toLocaleString("zh", { hour12: false });
      element.endTime = d2.toLocaleString("zh", { hour12: false });
    });

    loading.value = false;
  });
};
</script>



<style scoped>
.home-title {
  color: #409eff;
  font-size: 25px;
}

.el-input {
  max-width: 200px;
}
</style>