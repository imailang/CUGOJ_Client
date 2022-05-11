<template>
  <el-card :body-style="{ padding: '5px' }">
    <!-- 标题头 -->
    <template #header>
      <el-row justify="space-between" align="middle">
        <el-col :xs="7" :sm="4"><p class="panel-title">排名</p></el-col>
        <el-col :xs="8" :sm="4"> </el-col>
        <el-col :xs="9" :sm="6"> <el-input></el-input></el-col>
        <el-col :xs="6" :sm="5" style="text-align: left">
          <el-button>查询</el-button>
        </el-col>
        <el-col :xs="6" :sm="4">
          <el-button
            round
            :icon="Refresh"
            type="primary"
            v-loading="loading"
            @click="updateRecords"
            >刷新</el-button
          >
        </el-col>
      </el-row>
    </template>
    <!-- 评测列表-->
    <div>
      <vxe-table
        :data="rankList"
        stripe
        align="center"
        show-overflow
        :cell-style="cellStyle"
        border
        :row-config="{ height: 60 }"
      >
        <vxe-column field="Rank" title="排名" width="80px"></vxe-column>
        <vxe-column field="Name" title="参赛选手"></vxe-column>
        <vxe-column field="Count" title="过题数" width="80px"></vxe-column>
        <vxe-column field="Penalty" title="罚时" width="80px"></vxe-column>
        <vxe-column
          v-for="problem in problems"
          :key="problem.ID"
          :title="problem.showID"
          width="80px"
        >
          <template v-slot="{ row }">
            <div v-if="row.Scores.get(problem.ID)">
              <el-row>
                <el-col v-if="row.Scores.get(problem.ID).penalty != 0">
                  -{{ row.Scores.get(problem.ID).penalty }}
                </el-col>
              </el-row>
              <el-row>
                <el-col v-if="row.Scores.get(problem.ID).pass">
                  {{ row.Scores.get(problem.ID).time }}
                </el-col>
              </el-row>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <!-- 分页-->
    <div>
      <vxe-pager
        perfect
        v-model:current-page="pageInfo.currentPage"
        v-model:page-size="pageInfo.pageSize"
        :total="Number(pageInfo.total)"
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
const { default: api } = require("@/api/api");
const { ref, reactive } = require("@vue/reactivity");
const { onMounted } = require("@vue/runtime-core");
const { ElMessage } = require("element-plus");
import { Refresh } from "@element-plus/icons-vue";

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  problems: {
    default: [],
  },
  CID: {
    default: 0,
  },
});

const pageInfo = reactive({
  offset: 0,
  pageSize: 50,
  pageCount: 1,
  total: 0,
  currentPage: 1,
});

onMounted(() => {
  updateRecords();
});

const curTime = ref(0x7fffffff);

const getCPID = (showID) => {
  for (var i = 0; i < props.problems.length; i++) {
    if (props.problems[i].showID == showID) {
      return props.problems[i].ID;
    }
  }
  return 0;
};

const loading = ref(false);
const records = ref([]);
const rankData = ref([]);
const rankList = ref([]);

// const cellClassName = ({ row, column }) => {
//   const key = CPID_ShowIDMap.value.get(column.title);
//   if (key) {
//     var tmp = row.Scores.get(key);
//     if (tmp) {
//       console.log(tmp);
//       if (tmp.pass) {
//         console.log("fuck");
//         return "cell-pass";
//       } else {
//         return "cell-notpass";
//       }
//     }
//   }
//   return null;
// };

const cellStyle = ({ row, column }) => {
  const key = getCPID(column.title);
  if (key != 0) {
    var tmp = row.Scores.get(key);
    if (tmp) {
      console.log(tmp);
      if (tmp.pass) {
        return {
          backgroundColor: "#eff9f7",
        };
      } else {
        return {
          backgroundColor: "#ffecec",
        };
      }
    }
  }
  return null;
};

const addRecord = (current, record) => {
  var score = {
    pass: false,
    penalty: 0,
    time: 0,
  };
  if (current.Scores.has(record.CPID)) {
    score = current.Scores.get(record.CPID);
  }
  if (!score.pass) {
    if (record.Score == 1) {
      score.time = record.SubmitTime;
      score.pass = true;
      current.Count++;
      current.Penalty += record.SubmitTime + score.penalty * 20;
    } else {
      score.penalty++;
    }
  }

  current.Scores.set(record.CPID, score);
};

const handleSizeChange = () => {
  filterData();
};

const calculateRanking = () => {
  const tmp = new Map();
  records.value.sort((a, b) => {
    return a.SubmitTime - b.SubmitTime;
  });
  records.value.forEach((item) => {
    if (item.SubmitTime > curTime.value) {
      return;
    }
    var id = item.UID;
    var current = {};
    if (tmp.has(id)) {
      current = tmp.get(id);
    } else {
      current = {
        UID: item.UID,
        Name: item.Name,
        Count: 0,
        Penalty: 0,
        Scores: new Map(),
        Rank: 0,
      };
    }
    addRecord(current, item);
    tmp.set(id, current);
  });

  rankData.value = Array.from(tmp.values());
  rankData.value.sort((a, b) => {
    if (a.Count == b.Count) {
      return a.Penalty - b.Penalty;
    }
    return b.Count - a.Count;
  });
  for (var i = 0; i < rankData.value.length; i++) {
    rankData.value[i].Rank = i + 1;
  }
  pageInfo.total = rankData.value.length;
  filterData();
  console.log(rankData.value);
  console.log(rankList.value);
};

const filterData = () => {
  pageInfo.offset - pageInfo.currentPage - 1;
  var beg = pageInfo.offset * pageInfo.pageSize;
  var ed = beg + pageInfo.pageSize;
  ed = Math.min(ed, pageInfo.total);
  rankList.value = rankData.value.slice(beg, ed);
};

const updateRecords = () => {
  loading.value = true;
  api.contest.getRecords(Number(props.CID)).then((response) => {
    if (!response) {
      ElMessage.error("请求出错");
    } else if (response.Statu != "000") {
      ElMessage.error(response.Info);
    } else {
      records.value = JSON.parse(response.Info);
      calculateRanking();
    }
    loading.value = false;
    emits("updated");
  });
};

const timeChanged = (time) => {
  curTime.value = time;
  calculateRanking();
};

defineExpose({ updateRecords, timeChanged });
const emits = defineEmits(["updated"]);
</script>
<style scoped>
.panel-title {
  font-size: 1.5rem !important;
  font-weight: 500;
  line-height: 0;
  text-align: center;
}
</style>
