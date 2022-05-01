<template>
  <el-card>
    <!-- 标题头 -->
    <template #header>
      <el-row justify="space-between" align="middle">
        <el-col :xs="7" :sm="4"><p class="panel-title">评测列表</p></el-col>
        <el-col :xs="8" :sm="4">
          <el-switch
              class="mb-2"
              active-text="全部"
              inactive-text="我的"
              v-model="isAllKey"
              @change="getEvaluationList"
          />
        </el-col>
        <el-col :xs="9" :sm="6">
          <vxe-input v-model="searchKey" placeholder="请输入关键字" type="search"
                     @search-click="getEvaluationList"></vxe-input>
        </el-col>

        <el-col :xs="6" :sm="5">
          <el-dropdown trigger="click"
                       @command="selectStatus"
          >
        <span class="el-dropdown-link">
          {{ statusKey }}<el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="item.value" v-for="(item,index) in statusList" :key="index">
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col :xs="6" :sm="4">
          <el-button round :icon="Refresh" type="primary" @click="getEvaluationList">刷新</el-button>
        </el-col>
      </el-row>
    </template>
    <!-- 评测列表-->
    <div>
      <vxe-table :data="evaluationList" ref="evaluationListRef" stripe align="center" show-overflow
                 :row-config="{height: 35,isHover: true}">
        <vxe-column field="ID" title="评测编号"></vxe-column>
        <vxe-column field="PTitle" title="题目">
          <template v-slot="{row}">
            <el-tooltip class="box-item" effect="dark" content="跳转题目">
              <el-link @click="getProblemUri(row.PID)" style="color: #308ff1">{{ row.PTitle }}</el-link>
            </el-tooltip>
          </template>
        </vxe-column>
        <vxe-column field="UserInfo.Nickname" title="用户昵称"></vxe-column>
        <vxe-column field="Status" title="评测状态" width="90px">
          <template v-slot="{row}">
            <el-tag :style="'background-color:'+colorList[row.Status]+';color: white;font-size:14px;width:80px'">
              {{ row.Status }}
            </el-tag>
          </template>
        </vxe-column>
        <vxe-column field="Time_use" title="耗时">
          <template v-slot="{row}">
            {{ row.TimeUse }} ms
          </template>
        </vxe-column>
        <vxe-column field="Memory_use" title="内存">
          <template v-slot="{row}">
            {{ row.MemoryUse }} KB
          </template>
        </vxe-column>
        <vxe-column field="Length" title="代码长度"></vxe-column>
        <vxe-column field="Language" title="语言">
          <template v-slot="{row}">
            <el-tooltip class="box-item" effect="dark" content="查看提交详情">
              <el-link @click="getEvaluationUri(row.ID)" style="color: #308ff1">{{ LanguageList[row.Language] }}</el-link>
            </el-tooltip>
          </template>
        </vxe-column>
        <vxe-column field="Judger" title="评测机"></vxe-column>
        <vxe-column field="SubmitTime" title="提交时间" width="200px">
          <template v-slot="{row}">
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
          :page-sizes="[5,10, 20, 50]"
          :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
      </vxe-pager>
    </div>
  </el-card>
</template>

<script setup>
import {Refresh, ArrowDown} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import api from "@/api/api";
import moment from "moment";
import store from "@/store";
import router from "@/router";

/**
 * 是否全部
 */
const isAllKey = ref(true)
/**
 * 选择查看状态
 */
const statusKey = ref('状态')
/**
 * 关键字
 */
const searchKey = ref('')
/**
 * 状态列表
 */
const statusList = ref([
  {
    label: '全部',
    value: '全部',
  },
  {
    label: 'Pending',
    value: 'Pending',
  },
  {
    label: 'Compiling',
    value: 'Compiling',
  },
  {
    label: 'Running',
    value: 'Running',
  },
  {
    label: 'AC',
    value: 'AC',
  },
  {
    label: 'CE',
    value: 'CE',
  },
  {
    label: 'WA',
    value: 'WA',
  },
  {
    label: 'TLE',
    value: 'TLE',
  },
  {
    label: 'MLE',
    value: 'MLE',
  },
  {
    label: 'OLE',
    value: 'OLE',
  },
])
/**
 * 评测列表
 */
const evaluationList = ref()
/**
 * 列表容器
 */
const evaluationListRef = ref()
/**
 * 颜色列表
 */
const colorList = ref({
  Pending: '#7c7c7c',
  Compiling: '#fd8387',
  Running: '#5db75e',
  AC: '#00b23e',
  CE: '#efc110',
  RE: '#8d43af',
  WA: '#e74b3d',
  TLE: '#2d468c',
  MLE: '#2d468a',
  OLE: '#10efc6',
  SE: '#ff8000'
})
/**
 * 语言表达方式转换
 */
const LanguageList = reactive({
  "gnu c99": "c99",
  "gnu c11": "c11",
  "gnu cpp11": "c++11",
  "gnu cpp14": "c++14",
  "gnu cpp17": "c++17",
  "gnu cpp20": "c++20",
});
onMounted(() => {
  getEvaluationList()
})

/**
 * 状态选择
 */
const selectStatus = (val) => {
  if (val === '全部') val = '状态'
  statusKey.value = val
  getEvaluationList()
}
/**
 * 点击跳转题目
 */
const getEvaluationUri = (evaluationId) => {
  router.push({
    path: '/evaluation/' + evaluationId
  })
}
/**
 * 分页
 */
const pageBody = ref({
  offset: 1,
  pageSize: 20,
  totalPage: 0,
})
/**
 * 获取评测列表
 */
const getEvaluationList = () => {
  getListTotal()
  let params = {
    pagequery: {
      offset: pageBody.value.offset - 1,
      pagesize: pageBody.value.pageSize
    },
    odd1: {},   //odd1   用户  状态
    odd2: {},   //编号
    odd3: {},   //题目
  }
  //odd1   用户  状态
  {
    if (!isAllKey.value) {
      params.odd1.UID = store.getters.getUserInfo.ID
    }
    if (statusKey.value !== '状态') {
      params.odd1.status = statusKey.value
    }
  }
  if (searchKey.value !== '') {
    params.odd2 = JSON.parse(JSON.stringify(params.odd1))
    params.odd2.ID = searchKey.value
    params.odd3 = JSON.parse(JSON.stringify(params.odd1))
    params.odd3.p_title = searchKey.value
    params.odd1 = {}
  }

  api.judge.getJudgeList(params)
      .then(res => {
        evaluationList.value = JSON.parse(res.Info)
        console.log(evaluationList.value)
      })
}
/**
 * 获取评测总数
 */
const getListTotal = () => {
  let params = {
    odd1: {},   //odd1   用户  状态
    odd2: {},   //编号
    odd3: {},   //题目
  }
  //odd1   用户  状态
  {
    if (!isAllKey.value) {
      params.odd1.UID = store.getters.getUserInfo.ID
    }
    if (statusKey.value !== '状态') {
      params.odd1.status = statusKey.value
    }
  }
  if (searchKey.value !== '') {
    params.odd2 = JSON.parse(JSON.stringify(params.odd1))
    params.odd2.ID = searchKey.value
    params.odd3 = JSON.parse(JSON.stringify(params.odd1))
    params.odd3.p_title = searchKey.value
    params.odd1 = {}
  }
  api.judge.getJudgeCount(params)
      .then(res => {
        pageBody.value.totalPage = res.Info
      })
}
/**
 * 翻页
 */
const handleSizeChange = () => {
  let pages = Math.floor(pageBody.value.totalPage / pageBody.value.pageSize) + 1;
  console.log(pages)
  if (pageBody.value.offset >= pages) {
    pageBody.value.offset = pages
  }
  getEvaluationList()
}
/**
 * 修改时间格式
 */
const updateTime = (val) => {
  return moment(val).format('YYYY-MM-DD HH:mm:ss')
}

</script>

<style scoped>
.panel-title {
  font-size: 1.5rem !important;
  font-weight: 500;
  line-height: 0;
  text-align: left;
}

</style>