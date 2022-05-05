<template>
  <!-- <el-row justify="space-around" v-if="permission == 0">
    <el-col :span="24">
      <el-card>
        <el-skeleton />
        <br />
        <el-skeleton style="--el-skeleton-circle-size: 100px">
          <template #template> </template>
        </el-skeleton>
      </el-card>
    </el-col>
  </el-row> -->
  <el-row justify="space-around" v-if="permission == 1">
    <el-col :span="24">
      <el-card>
        <el-row>
          <el-col :span="24">
            <h1>该页面只允许校ACM队内成员访问</h1>
            <h2>如果想要成为ACM队成员，请参照如下内容：</h2>
            <el-row>
              <el-col :span="12" :offset="6">
                <div style="text-align: left">
                  <p><b>目的：</b>Program Your Life and Unearth the Unknown</p>
                  <p><b>对象：</b>主要针对大一、大二本科生</p>
                  <p><b>条件：</b></p>
                  <p>1. 人品好，不弄虚作假骗取AC业绩；</p>
                  <p>
                    2.
                    良好团队精神，尊重老师和队友，和其他队员能融洽相处，服从训练、组队、参赛安排；
                  </p>
                  <p>
                    3.
                    乐观、积极、有毅力，能坚持长时间大运动量训练，耐得住寂寞，不患得患失，不把竞赛获奖当成唯一目的；
                  </p>
                  <p>
                    4.
                    热爱计算机专业，对算法、编码有执着热爱，数学推理能力强，有创新思维、钻研精神；
                  </p>
                  <p>
                    5. 各大OJ
                    60题以上AC，或新生赛前10名队员，或平时训练有良好基础及业绩（请在申请表中详细注明，择优录取）。
                  </p>
                  <p><b>报名方法：</b></p>
                  <p>使用CUGOJ账号登入报名系统提交申请表。</p>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <el-row justify="space-around" v-if="permission == 2">
    <el-col :span="14">
      <el-card>
        <template #header>
          <el-row justify="space-between" align="middle">
            <el-col :offset="2"
              ><p class="panel-title" style="text-align: left">
                训练清单
              </p></el-col
            >
          </el-row>
        </template>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <template #header>
          <el-row justify="space-between" align="middle">
            <el-col :offset="2"
              ><p class="panel-title" style="text-align: left">
                训练情况
              </p></el-col
            >
          </el-row>
        </template>
        <el-row justify="start" align="middle">
          <el-col :span="16" :offset="2" v-if="submitCount.loading">
            <el-skeleton />
          </el-col>
          <el-col :span="16" :offset="2" v-if="!submitCount.loading">
            <el-row justify="start" style="text-align: left">
              <p>
                近七日提交: <b>{{ submitCount.seven }}</b> , AC数:
                <b> {{ submitCount.sevenAC }}</b>
              </p>
            </el-row>
            <el-row justify="start" align="middle">
              <el-col :span="6" style="text-align: left"> AC率: </el-col>
              <el-col :span="18">
                <el-progress :percentage="submitCount.sevenRate.toFixed(2)" />
              </el-col>
            </el-row>
            <el-row justify="start" style="text-align: left">
              <p>
                近三十日提交: <b>{{ submitCount.thirty }} </b>, AC数:
                <b> {{ submitCount.thirtyAC }}</b>
              </p>
            </el-row>
            <el-row justify="start" align="middle">
              <el-col :span="6" style="text-align: left"> AC率: </el-col>
              <el-col :span="18">
                <el-progress :percentage="submitCount.thirtyRate.toFixed(2)" />
              </el-col>
            </el-row>
            <el-row justify="start" style="text-align: left">
              <p>
                总提交: <b>{{ submitCount.all }}</b> , AC数:
                <b> {{ submitCount.allAC }}</b>
              </p>
            </el-row>
            <el-row justify="start" align="middle">
              <el-col :span="6" style="text-align: left"> AC率: </el-col
              ><el-col :span="18">
                <el-progress :percentage="submitCount.allRate.toFixed(2)" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { onBeforeMount, onMounted, ref, reactive } from "vue";
const { default: api } = require("@/api/api");
var userID = -1;
const permission = ref(0);
const loading = ref(true);
const submitCount = reactive({ loading: true });

onBeforeMount(() => {
  api.practice.checkPermission().then((response) => {
    console.log(response)
    if (typeof response == "undefined") {
      permission.value = false;
      ElMessage.error("请求出错");
    } else if (response.Statu == "000") {
      permission.value = 2;
      userID = parseInt(response.Info);
      getSubmitCount();
    } else {
      permission.value = 1;
    }
    loading.value = false;
  });
});
onMounted(() => {});
const getSubmitCount = () => {
  api.user.getSubmitCount(userID).then((response) => {
    if (typeof response == "undefined") {
      permission.value = false;
      ElMessage.error("请求出错");
    } else if (response.Statu == "000") {
      permission.value = 2;
      var tmp = JSON.parse(response.Info);
      submitCount.all = tmp.all;
      submitCount.allAC = tmp.allAC;
      submitCount.seven = tmp.seven;
      submitCount.sevenAC = tmp.sevenAC;
      submitCount.thirty = tmp.thirty;
      submitCount.thirtyAC = tmp.thirtyAC;
      submitCount.allRate =
        (submitCount.allAC * 100) / Math.max(1, submitCount.all);
      submitCount.sevenRate =
        (submitCount.sevenAC * 100) / Math.max(1, submitCount.seven);
      submitCount.thirtyRate =
        (submitCount.thirtyAC * 100) / Math.max(1, submitCount.thirty);
      submitCount.loading = false;
      console.log(submitCount);
    } else {
      permission.value = 1;
    }
  });
};
</script>

<style scoped>
.panel-title {
  font-size: 1.5rem !important;
  font-weight: 500;
  line-height: 0;
}
</style>
