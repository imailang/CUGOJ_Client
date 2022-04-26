<template>
  <el-card>
    <el-row justify="space-between">
      <el-col :span="12">
        <div>
          <el-row>
            <el-col :xs="10" :sm="8" :lg="6">
              <el-avatar style="--el-avatar-size: 120px"
                         src="https://assets.leetcode-cn.com/aliyun-lc-upload/users/mrwesleyfoxmailcom/avatar_1585403468.png?x-oss-process=image%2Fformat%2Cwebp"></el-avatar>
            </el-col>
            <el-col :xs="14" :sm="16" :lg="18">
              <el-row style="text-align: left;">
                <el-col :span="24">
                  <el-row align="middle" justify="space-between">
                    <b style="font-size: 50px">{{ userInfo.Username }}</b>
                  </el-row>
                </el-col>
                <el-col :span="24">
                  <p style="color: #a7a9ad;font-size: 15px">这个人很懒，什么都没留下</p></el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <el-row justify="end">
          <el-col :span="24" style="text-align: right">
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="moment(userInfo.UpdatedAt).format('YYYY-MM-DD HH:mm:ss')">
              <el-tag type="success">最近上线时间:{{ calTime(userInfo.UpdatedAt) }}</el-tag>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <div style="text-align: center">
              <p><b style="font-size: 25px">0</b></p>
              总提交数
            </div>
          </el-col>
          <el-col :span="4">
            <div style="text-align: center">
              <p><b style="font-size: 25px">0</b></p>
              AC数
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>

import {onMounted, ref} from "vue";
import moment from "moment";
import store from "@/store";


const userInfo = ref({
  Username: '',
  UpdatedAt: '',
})

onMounted(() => {
  /**
   * 用户信息
   */
  userInfo.value = store.getters.getUserInfo
})


/**
 * 计算上线时间
 */
const calTime = (val) => {
  console.log(val)
  moment.suppressDeprecationWarnings = true;
  val = moment(val).format('YYYY-MM-DD HH:mm:ss')
  const now = moment().format('YYYY-MM-DD HH:mm:ss')
  const seconds = moment(now).diff(val, "seconds")
  if (seconds <= 60) {
    return seconds + '秒前'
  } else if (seconds <= 3600) {
    return (seconds / 60).toFixed(0) + '分钟前'
  } else if (seconds <= 86400) {
    return (seconds / 3600).toFixed(0) + '小时前'
  } else {
    return (seconds / 86400).toFixed(0) + '天前'
  }
}

</script>

<style scoped>

</style>