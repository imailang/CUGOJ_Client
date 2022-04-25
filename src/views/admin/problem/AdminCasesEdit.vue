<template>
  <el-card v-loading="loading">
    <template #header>
      <el-page-header content="题目用例编辑" @back="goBack" />
    </template>
    <div style="width: 100%">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-row :gutter="20">
            <div style="float: left">
              <el-col>
                <div style="margin-top: 5px">
                  已选择
                  <span style="color: blue; ">
                    {{ caseCheckInfo.cnt }}
                  </span>
                  项
                </div>
              </el-col>
              <el-col>
                <el-button
                  type="primary"
                  size="middle"
                  @click="checkAll(caseData.value)"
                  >全选</el-button
                >
              </el-col>
              <el-col>
                <el-button
                  type="danger"
                  size="middle"
                  @click="unUseAll()"
                  :disabled="caseCheckInfo.cnt == 0"
                  >取消使用</el-button
                >
              </el-col>
            </div>
          </el-row>
          <div style="margin-top: 20px">
            <vxe-table
              :data="caseData"
              stripe
              align="center"
              show-overflow
              :row-config="{ height: 35 }"
            >
              <vxe-colgroup title="测试用例清单">
                <vxe-column
                  field="ID"
                  title="评测编号"
                  width="90px"
                ></vxe-column>
                <vxe-column field="Path" title="文件路径"></vxe-column>
                <vxe-column title="批量操作" width="90px">
                  <template v-slot="{ row }">
                    <el-checkbox
                      v-model="row.checked"
                      @change="
                        (value) => {
                          if (value) {
                            caseCheckInfo.cnt++;
                          } else caseCheckInfo.cnt--;
                        }
                      "
                    ></el-checkbox>
                  </template>
                </vxe-column>
                <vxe-column title="操作" width="90px">
                  <template v-slot="{ row }">
                    <el-button
                      type="danger"
                      :icon="Delete"
                      circle
                      size="small"
                      @click="unUse(row.Path)"
                    ></el-button>
                  </template>
                </vxe-column>
              </vxe-colgroup>
            </vxe-table>
          </div>
        </el-col>
        <el-col :span="16">
          <el-row :gutter="20" style="width: 100%">
            <div style="float: left">
              <el-col>
                <div style="margin-top: 5px">
                  已选择
                  <font color="blue">
                    {{ fileCheckInfo.cnt }}
                  </font>
                  项
                </div>
              </el-col>
              <el-col>
                <el-button
                  type="primary"
                  size="middle"
                  @click="checkAll(fileData.value)"
                  >全选</el-button
                >
              </el-col>
              <el-col>
                <el-button
                  type="primary"
                  size="middle"
                  @click="useAll()"
                  :disabled="fileCheckInfo.cnt == 0 || !fileCheckInfo.usable"
                  >加入测试用例</el-button
                >
              </el-col>
              <el-col>
                <el-button
                  type="primary"
                  size="middle"
                  @click="unCompressAll()"
                  :disabled="
                    fileCheckInfo.cnt == 0 || !fileCheckInfo.unCompable
                  "
                  >全部解压</el-button
                >
              </el-col>
              <el-col>
                <el-button
                  type="danger"
                  size="middle"
                  @click="deleteFiles()"
                  :disabled="fileCheckInfo.cnt == 0 || !fileCheckInfo.deletable"
                  >删除文件</el-button
                >
              </el-col>
            </div>
            <div style="position: absolute; right: 10px; float: right">
              <el-col>
                <el-button
                  type="primary"
                  size="middle"
                  @click="uploadDialogVisible = true"
                  >上传文件</el-button
                >
              </el-col>
              <el-col>
                <a @click="showHelp = true">点击这里查看帮助</a>
                <el-button
                  style="margin-left: 5px"
                  type="primary"
                  size="middle"
                  @click="showHelp = true"
                  :icon="Help"
                  circle
                ></el-button>
              </el-col>
            </div>
          </el-row>
          <div style="margin-top: 20px">
            <vxe-table
              :data="fileData"
              stripe
              align="center"
              show-overflow
              :row-config="{ height: 35 }"
            >
              <vxe-colgroup title="文件清单">
                <vxe-column field="Path" title="评测文件路径"></vxe-column>
                <vxe-column field="Info" title="状态"></vxe-column>
                <vxe-column title="批量操作" width="90px">
                  <template v-slot="{ row }">
                    <el-checkbox
                      v-model="row.checked"
                      :disabled="row.used"
                      @change="updateFileCheckInfo()"
                    ></el-checkbox>
                  </template>
                </vxe-column>
                <vxe-column title="操作" width="120px">
                  <template v-slot="{ row }">
                    <el-button
                      v-if="!row.used && row.legal"
                      type="primary"
                      :icon="Plus"
                      circle
                      size="small"
                      @click="use(row.Path)"
                    ></el-button>
                    <el-button
                      v-if="row.comp"
                      type="primary"
                      :icon="FolderOpened"
                      circle
                      size="small"
                      @click="unCompress(row.Path)"
                    >
                    </el-button>
                    <el-button
                      v-if="!row.used"
                      type="danger"
                      :icon="Delete"
                      circle
                      size="small"
                      @click="onDeleteFile(row.Path, row.legal)"
                    >
                    </el-button>
                  </template>
                </vxe-column>
              </vxe-colgroup>
            </vxe-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
  <el-dialog v-model="uploadDialogVisible" title="上传文件">
    <el-upload
      class="upload-demo"
      drag
      method="post"
      action="/api/cases/uploadfiles"
      multiple
      :data="UploadParam"
      style="width: 100%"
      :on-success="
        (ant, uploadfile, uploadfiles) => {
          updateData();
        }
      "
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖拽到此处或者 <em>点击 上传文件</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          测试用例请以同名的.in和.out文件成组上传,允许上传zip、rar、tar、7z格式进行解压。
        </div>
      </template>
    </el-upload>
  </el-dialog>

  <el-dialog v-model="showHelp" title="帮助">
    <el-steps :space="200" :active="helpStep" simple>
      <el-step title="上传文件" :icon="UploadFilled" />
      <el-step title="解压文件" :icon="FolderOpened" />
      <el-step title="选择用例" :icon="Plus" />
      <el-step title="删除不必要的用例、文件" :icon="Delete" />
    </el-steps>
    <el-row style="margin-top: 10px" justify="space-between">
      <el-col :span="6">
        <el-button
          @click="
            () => {
              helpStep--;
              if (helpStep < 1) helpStep = 1;
            }
          "
          :disabled="helpStep <= 1"
          >上一步</el-button
        >
      </el-col>
      <el-col :span="6">
        <el-button
          @click="
            () => {
              helpStep++;
              if (helpStep > 4) helpStep = 4;
            }
          "
          :disabled="helpStep >= 4"
          >下一步</el-button
        >
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px; text-align: left">
      <el-col :span="18" :offset="3">
        <div v-if="helpStep == 1">
          <p>1.点击上传文件按钮，打开上传页面</p>
          <el-button type="primary" size="middle">上传文件</el-button>
          <p>2.点击或拖拽文件上传</p>
          <el-upload
            class="upload-demo"
            drag
            method="post"
            multiple
            style="width: 100%"
            :on-success="
              (ant, uploadfile, uploadfiles) => {
                updateData();
              }
            "
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              将文件拖拽到此处或者 <em>点击 上传文件</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                测试用例请以同名的.in和.out文件成组上传,允许上传zip、rar、tar、7z格式进行解压。
              </div>
            </template>
          </el-upload>

          <p>
            左侧列表为评测用例列表，右侧为文件列表，上传成功的文件会显示在右侧列表中
          </p>
          <p>
            文件系统会自动检测出同名的成对.in和.out文件，每一对.in和.out文件可以作为一组评测用例进行使用。
          </p>
          <p>
            可以上传zip、rar、tar、7z格式的压缩文件进行解压，解压过程中会覆盖掉相同路径下的其他同名文件。
          </p>
        </div>
        <div v-if="helpStep == 2">
          <p>
            如果上传了系统支持的压缩文件，文件列表中对应文件后的操作栏会出现解压按钮：
          </p>
          <el-button
            type="primary"
            :icon="FolderOpened"
            circle
            size="small"
          ></el-button>
          <p>解压成功之后，解压出来的文件会更新到文件列表中。</p>
        </div>
        <div v-if="helpStep == 3">
          <p>
            对于合法的用例，会在文件列表中显示："合法测试用例"，点击使用按钮即可将测试数据加入测试用例列表中：
          </p>
          <el-button
            type="primary"
            :icon="Plus"
            circle
            size="small"
          ></el-button>
        </div>
        <div v-if="helpStep == 4">
          <p>对于不需要的测试用例，在测试用例列表中点击移除按钮：</p>
          <el-button type="danger" :icon="Delete" circle size="small">
          </el-button>
          <p>
            注意，从测试用例中移除并不会真地从文件中删除，你仍然可以在文件列表中找到被移除的测试用例并重新加入使用
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px; text-align: left">
      <el-col :span="18" :offset="3">
        <p>Tips:</p>
        <p>1. 文件上传允许一次上传多个文件</p>
        <p>
          2.
          两个列表都可以进行批量操作，如果部分批量操作的按钮不可用，请注意是否选择了不合理的文件，例如：删除正在使用的测试用例的文件；解压非压缩文件；使用不合法的文件作为测试用例等。
        </p>
        <p>
          3.
          文件列表中操作栏并不会显示所有功能的按钮，而是显示目前对于该文件合法的操作按钮。
        </p>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script setup>
import {
  UploadFilled,
  Delete,
  Plus,
  FolderOpened,
  Help,
} from "@element-plus/icons-vue";
import router from "@/router";
import { useRoute } from "vue-router";
import api from "@/api/api";
import { ElMessage } from "element-plus";
import {onBeforeMount, onMounted, reactive,ref} from "vue";
const loading = ref(false);
const showHelp = ref(false);
const fileData = ref();
const caseData = ref();
const problemId = ref();
const helpStep = ref(1);
const uploadDialogVisible = ref(false);
const route = useRoute();
const caseCheckInfo = reactive({ cnt: 0 });
const fileCheckInfo = reactive({
  cnt: 0,
  deletable: false,
  usable: false,
  unCompable: false,
});

var UploadParam = {
  ID: 0,
};

onBeforeMount(() => {
  problemId.value = route.params.problemId;
  UploadParam.ID = problemId.value;
  updateData();
});

onMounted(() => {});

const unUse = (path) => {
  var id = 0;
  caseData.value = caseData.value.filter(function (item) {
    if (item.Path != path) {
      id++;
      item.ID = id.toString();
      return item.ID;
    }
  });
  fileData.value = fileData.value.filter((item) => {
    if (item.Path == path) {
      item.used = false;
    }
    return item;
  });
  setCases();
};

const use = (path) => {
  fileData.value = fileData.value.filter((item) => {
    if (item.Path == path) {
      item.used = true;
      item.checked = false;
    }
    return item;
  });
  caseData.value.push({
    Path: path,
    checked: false,
  });
  var id = 0;
  caseData.value = caseData.value.filter((item) => {
    id++;
    item.ID = id.toString();
    return item;
  });
  setCases();
};

const updateData = async () => {
  var ac = true;
  var _fileData = [];
  var _caseData = [];
  await api.cases.getFiles(problemId.value).then((response) => {
    if (response.Statu === "000") _fileData = JSON.parse(response.Info);
    else {
      ElMessage({
        message:
          "发生了错误，代码：" +
          response.Statu +
          "\n+错误信息：" +
          response.Info,
        type: "error",
      });
      ac = false;
    }
  });
  await api.cases.getCaseUsed(problemId.value).then((response) => {
    if (response.Statu === "000") {
      if (response.Info === "") response.Info = "[]";
      _caseData = JSON.parse(response.Info);
    } else {
      ElMessage({
        message:
          "发生了错误，代码：" +
          response.Statu +
          "\n+错误信息：" +
          response.Info,
        type: "error",
      });
      ac = false;
    }
  });
  if (!ac) return;

  _caseData = _caseData.filter((item) => {
    _fileData.forEach((element) => {
      if (element.Path === item.Path) element.used = true;
    });
    item.checked = false;
    return item;
  });
  _fileData = _fileData.filter((item) => {
    item.legal = false;
    item.comp = false;
    switch (item.Info) {
      case "in":
        item.Path += ".in";
        item.Info = "该测试用例缺少后缀为.out的标准输出文件";
        break;
      case "out":
        item.Path += ".out";
        item.Info = "该测试用例缺少后缀为.in的标准输出文件";
        break;
      case "legal":
        item.Info = "合法测试用例";
        item.legal = true;
        break;
      case "comp":
        item.Info = "该文件为压缩文件，允许解压";
        item.comp = true;
        break;
      default:
        item.Info = "文件格式未知或不支持使用";
    }
    item.checked = false;
    caseCheckInfo.cnt = 0;
    fileCheckInfo.cnt = 0;
    fileCheckInfo.deletable = false;
    fileCheckInfo.usable = false;
    fileCheckInfo.unCompable = false;
    return item;
  });
  _fileData.sort((a, b) => {
    return a.Path < b.Path ? -1 : 1;
  });
  fileData.value = _fileData;
  caseData.value = _caseData;
};

const deleteFile = (paths) => {
  var tmp = [problemId.value.toString()];
  paths.forEach((item) => {
    tmp.push(item);
  });
  api.cases.deleteFile(tmp).then(() => {
    updateData();
  });
};
const onDeleteFile = (path, legal) => {
  if (!legal) {
    deleteFile([path]);
  } else {
    deleteFile([path + ".in", path + ".out"]);
  }
};
const checkAll = (items) => {
  var cnt = 0;
  items.forEach((item) => {
    if (item.checked) cnt++;
  });
  var checked = cnt == items.length;
  items.forEach((item) => {
    item.checked = checked;
  });
};
const deleteFiles = () => {
  var paths = [];
  fileData.value.forEach((item) => {
    if (item.checked) {
      if (!item.legal) {
        paths.push(item.Path);
      } else {
        paths.push(item.Path + ".in");
        paths.push(item.Path + ".out");
      }
    }
  });
  deleteFile(paths);
};

const updateFileCheckInfo = () => {
  fileCheckInfo.cnt = 0;
  fileCheckInfo.deletable = true;
  fileCheckInfo.usable = true;
  fileCheckInfo.unCompable = true;

  fileData.value.forEach((item) => {
    if (item.checked) {
      fileCheckInfo.cnt++;
      if (item.used) {
        fileCheckInfo.deletable = false;
      }
      if (!item.comp) {
        fileCheckInfo.unCompable = false;
      }
      if (!item.legal || item.used) {
        fileCheckInfo.usable = false;
      }
    }
  });
  console.log(fileCheckInfo.cnt);
};

const unUseAll = () => {
  var id = 0;
  caseData.value = caseData.value.filter(function (item) {
    if (!item.checked) {
      fileData.value.forEach((file) => {
        if (item.Path == file.Path) {
          file.used = false;
        }
      });
      id++;
      item.ID = id.toString();
      return item.ID;
    }
  });
  setCases();
};

const useAll = () => {
  fileData.value.forEach((item) => {
    if (item.checked && item.legal) {
      item.used = true;
      item.checked = false;
    }
  });
  var id = 0;
  caseData.value = fileData.value.filter((item) => {
    if (item.used) {
      id++;
      return {
        ID: id,
        Path: item.Path,
        checked: false,
      };
    }
  });
  setCases();
};

const unCompressAll = async () => {
  var paths = fileData.value.filter((item) => {
    if (item.unCompable && item.checked) {
      return item.Path;
    }
  });
  paths.forEach(async (item) => {
    await unCompress(item);
  });
};


const setCases = () => {
  loading.value = true;
  var tmp = [problemId.value.toString()];
  console.log(caseData.value);
  caseData.value.forEach((item) => {
    tmp.push(item.Path);
  });
  api.cases.setCases(tmp).then((response) => {
    if (response.Statu != "000") {
      ElMessage.error("修改评测用例失败：" + response.Info);
    }
    updateData().then(() => {
      loading.value = false;
    });
  });
};

/**
 * 解压
 */
const unCompress = async (path) => {
  await api.cases
    .unCompress([problemId.value.toString(), path])
    .then((response) => {
      if (response.Statu == "000") {
        ElMessage.success("解压成功");
        updateData();
      } else {
        ElMessage.error("解压出错：" + response.Info);
      }
    });
};

/**
 * 返回
 */
const goBack = () => {
  router.back();
};
</script>