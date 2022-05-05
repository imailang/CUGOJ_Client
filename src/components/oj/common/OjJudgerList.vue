<template>
  <el-card>
    <!-- 标题头 -->
    <template #header>
      <el-row justify="space-between" align="middle">
        <el-col :xs="7" :sm="4"><p class="panel-title">评测列表</p></el-col>
        <el-col :xs="8" :sm="4"> </el-col>
        <el-col :xs="9" :sm="6"> </el-col>
        <el-col :xs="6" :sm="5">
          <el-dropdown trigger="click" @command="selectStatus">
            <span class="el-dropdown-link">
              {{ statusKey
              }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  :command="item.value"
                  v-for="(item, index) in statusList"
                  :key="index"
                  >{{ item.label }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col :xs="6" :sm="4">
          <el-button
            round
            :icon="Refresh"
            type="primary"
            @click="getjudgerList"
            v-loading="loading"
            >刷新</el-button
          >
        </el-col>
      </el-row>
    </template>
    <!-- 评测列表-->
    <div>
      <vxe-table
        :data="judgerList"
        ref="judgerListRef"
        stripe
        align="center"
        show-overflow
        :row-config="{ height: 35 }"
      >
        <vxe-column field="ID" title="评测编号"></vxe-column>
        <vxe-column field="PTitle" title="题目"></vxe-column>
        <vxe-column field="Status" title="评测状态" width="90px">
          <template v-slot="{ row }">
            <el-tag
              :style="
                'background-color:' +
                colorList[row.Status] +
                ';color: white;font-size:14px;width:80px'
              "
            >
              {{ row.Status }}
            </el-tag>
          </template>
        </vxe-column>
        <vxe-column field="Time_use" title="耗时">
          <template v-slot="{ row }"> {{ row.TimeUse }} ms </template>
        </vxe-column>
        <vxe-column field="Memory_use" title="内存">
          <template v-slot="{ row }"> {{ row.MemoryUse }} KB </template>
        </vxe-column>
        <vxe-column field="Length" title="代码长度"></vxe-column>
        <vxe-column field="Language" title="语言"></vxe-column>
        <vxe-column field="Judger" title="评测机"></vxe-column>
        <vxe-column field="SubmitTime" title="提交时间" width="200px">
          <template v-slot="{ row }">
            {{ updateTime(row.SubmitTime) }}
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <!-- 分页-->
    <div>
      <vxe-pager
        perfect
        v-model:current-page="pageBody.offset"
        v-model:page-size="pageBody.pageSize"
        :total="Number(pageBody.totalPage)"
        @page-change="handleSizeChange"
        :page-sizes="[5, 10, 20, 50]"
        :layouts="[
          'PrevJump',
          'PrevPage',
          'JumpNumber',
          'NextPage',
          'NextJump',
          'Sizes',
          'FullJump',
          'Total',
        ]"
      >
      </vxe-pager>
    </div>
  </el-card>
</template>

<script setup>
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  CID: {
    default: 0,
  },
});

import { Refresh, ArrowDown } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import api from "@/api/api";
import moment from "moment";
import { ElMessage } from "element-plus";

/**
 * 选择查看状态
 */
const statusKey = ref("状态");

/**
 * 状态列表
 */
const statusList = ref([
  {
    label: "全部",
    value: "全部",
  },
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Compiling",
    value: "Compiling",
  },
  {
    label: "Running",
    value: "Running",
  },
  {
    label: "AC",
    value: "AC",
  },
  {
    label: "CE",
    value: "CE",
  },
  {
    label: "WA",
    value: "WA",
  },
  {
    label: "TLE",
    value: "TLE",
  },
  {
    label: "MLE",
    value: "MLE",
  },
  {
    label: "OLE",
    value: "OLE",
  },
]);
/**
 * 评测列表
 */
const judgerList = ref();
/**
 * 评测数据
 */
const judgerData = ref();
/**
 * 列表容器
 */
const judgerListRef = ref();
/**
 * 颜色列表
 */
const colorList = ref({
  Pending: "#7c7c7c",
  Compiling: "#fd8387",
  Running: "#5db75e",
  AC: "#00b23e",
  CE: "#efc110",
  RE: "#8d43af",
  WA: "#e74b3d",
  TLE: "#2d468c",
  MLE: "#2d468a",
  OLE: "#10efc6",
  SE: "#ff8000",
});

const loading = ref(false);

onMounted(() => {
  getjudgerList();
});

/**
 *
 */
const selectStatus = (val) => {
  if (val === "全部") val = "状态";
  statusKey.value = val;
  filterData();
};

/**
 * 分页
 */
const pageBody = ref({
  offset: 1,
  pageSize: 20,
  totalPage: 0,
});
/**
 * 获取评测列表
 */
const getjudgerList = () => {
  loading.value = true;
  api.judge.getContestJudgeList(Number(props.CID)).then((res) => {
    loading.value = false;
    if (typeof res == "undefined") {
      ElMessage.error("请求出错");
      return;
    } else if (res.Statu != "000") {
      return;
    }
    judgerData.value = JSON.parse(res.Info);
    pageBody.value.totalPage = judgerData.value.length;
    filterData();
    console.log(judgerList.value);
  });
};

const filterData = () => {
  if (statusKey.value == "状态") {
    judgerList.value = judgerData.value;
  } else {
    judgerList.value = judgerData.value.filter((item) => {
      return item.Status == statusKey.value;
    });
  }
  judgerList.value.sort((a, b) => {
    return -(new Date(a.SubmitTime) - new Date(b.SubmitTime));
  });
};

/**
 * 翻页
 */
const handleSizeChange = () => {
  let pages =
    Math.floor(pageBody.value.totalPage / pageBody.value.pageSize) + 1;

  if (pageBody.value.offset >= pages) {
    pageBody.value.offset = pages;
  }
  getjudgerList();
};
/**
 * 修改时间格式
 */
const updateTime = (val) => {
  return moment(val).format("YYYY-MM-DD HH:mm:ss");
};

defineExpose({ getjudgerList });
</script>

<style scoped>
.panel-title {
  font-size: 1.5rem !important;
  font-weight: 500;
  line-height: 0;
  text-align: center;
}
</style>