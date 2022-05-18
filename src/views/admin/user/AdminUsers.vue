<template>
  <el-card>
    <template #header>
      <el-row align="middle">
        <el-col :span="24" style="text-align: left;margin-bottom: 10px">
          <span class="panel-title home-title">用户列表</span>
        </el-col>
      </el-row>
    </template>
    <!-- 表格-->
    <vxe-table :loading="loading" border :data="userList" stripe align="center" show-overflow :row-config="{height: 45,isHover: true}">
      <vxe-column type="seq" width="40"></vxe-column>
      <vxe-column field="Avatar" title="头像" width="70">
        <template v-slot="{row}">
          <el-avatar :src="row.Avatar"></el-avatar>
        </template>
      </vxe-column>
      <vxe-column field="ID" title="用户ID"></vxe-column>
      <vxe-column field="Username" title="用户名"></vxe-column>
      <vxe-column field="Nickname" title="昵称">
        <template v-slot="{row}">
          <div :style="'color:'+row.NameColor ">{{ row.Nickname }}</div>
        </template>
      </vxe-column>
      <vxe-column title="头衔">
        <template v-slot="{row}">
          <CUGTitle :title="row.Title" :key="row.ID"></CUGTitle>
        </template>
      </vxe-column>
      <vxe-column field="Email" title="邮箱"></vxe-column>
      <vxe-column field="LastLoginIP" title="上次登录IP"></vxe-column>
      <vxe-column field="LastLoginTime" title="上次登录时间">
        <template v-slot="{row}">
          <b style="color: royalblue">{{ utils.calLastTime(row.LastLoginTime) }}</b>
          {{ utils.changeTimeFormat(row.LastLoginTime) }}
        </template>
      </vxe-column>
      <vxe-column title="操作" width="290">
        <template v-slot="{ row }">
          <el-check-tag :checked="row.Status===0" @change="disableUser(row)">{{ row.Status === 0 ? '封禁' : '解封' }}
          </el-check-tag>
          <el-button type="warning" style="margin-left: 8px;" @click="kickUser(row)">下线</el-button>
          <el-button type="primary" style="margin-left: 8px;" @click="clickEdit(row)">编辑</el-button>
          <el-button type="danger" style="margin-left: 8px;" @click="kickUser(row)">删除</el-button>
        </template>
      </vxe-column>

    </vxe-table>
    <!-- 分页-->
    <div>
      <vxe-pager
          perfect
          v-model:current-page="pageBody.offset"
          v-model:page-size="pageBody.pageSize"
          :total="pageBody.totalPage"
          @page-change="handleSizeChange"
          :page-sizes="[5,10, 20, 50]"
          :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
      </vxe-pager>
    </div>
  </el-card>
  <vxe-modal v-model="editDialog.visible" title="编辑&保存" width="800" min-width="600" min-height="300" resize
             destroy-on-close>
    <AdminUserEdit v-model:user-info="editDialog.userInfo"></AdminUserEdit>
  </vxe-modal>

</template>

<script setup>
import {onMounted, ref,reactive} from "vue";
import api from "@/api/api";
import utils from "@/utils";
import {ElMessage, ElMessageBox} from "element-plus";
import AdminUserEdit from "@/views/admin/user/AdminUserEdit";
import CUGTitle from "@/components/CUGTitle";

const loading = ref(false)
/**
 * 编辑数据
 */
const editDialog = reactive({
  visible: false,
  userInfo: '',
})
/**
 * 用户列表
 */
const userList = ref([])
/**
 * 分页
 */
const pageBody = ref({
  pageSize: 10,
  offset: 1,
  totalPage: 0,
})
/**
 * 封禁 解封
 * @param row
 */
const disableUser = (row) => {
  if (row.Status === 0) {
    ElMessageBox.confirm(
        '是否确认封禁此账号?',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
        .then(() => {
          row.Status = 1;
          api.user.disable({
            ID: row.ID,
            time: 2592000
          })
              .then(res => {
                if (res.code === 200) {
                  ElMessage.success("封禁成功")
                }
              })
        })
        .catch(() => {
          ElMessage.info('已取消')
        })
  } else {
    row.Status = 0;
    api.user.untieDisable({
      ID: row.ID
    })
        .then(res => {
          if (res.code === 200) {
            ElMessage.success('解封成功')
          }
        })
  }
}
/**
 * 踢人下线
 * @param row
 */
const kickUser = (row) => {
  api.user.kickout({
    ID: row.ID
  }).then(res => {
    if (res.code === 200) {
      ElMessage.success(res.msg)
    }
  })
}
/**
 * 打开编辑
 * @param row
 */
const clickEdit = (row) => {
  editDialog.visible = true
  editDialog.userInfo = row
}
/**
 * 初始化
 */
onMounted(() => {
  getUserList()
})
/**
 * 获取用户列表
 */
const getUserList = () => {
  loading.value=true
  getListTotal()
  api.user.getUserList({
    "pagequery": {
      "offset": pageBody.value.offset - 1,
      "pagesize": pageBody.value.pageSize
    }
  }).then(response => {
    userList.value = JSON.parse(response.Info)
    console.log('用户列表', userList.value)
    loading.value=false
  })
}
/**
 * 获取用户总数
 */
const getListTotal = () => {
  api.user.getUserCount({})
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
  getUserList()
}
</script>

<style scoped>
.home-title {
  color: #409eff;
  font-size: 25px;
}
</style>
