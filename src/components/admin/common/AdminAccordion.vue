<template>
  <div class="accordion">
    <header>
      <el-row justify="space-between" align="middle">
        <span class="title">{{ title }}</span>
        <span class="header_right">
        <slot name="header"></slot>
      </span>
      </el-row>
    </header>
    <div class="body" v-show="isOpen">
      <slot></slot>
    </div>
    <footer @click="changeVisible">
      <i
          v-if="isOpen"
          style="color:#2d8cf0"
      >
        <el-icon>
          <caret-top></caret-top>
        </el-icon>
      </i>
      <i
          v-else
          style="color:#2d8cf0"
      >
        <el-icon>
          <caret-bottom></caret-bottom>
        </el-icon>
      </i>
    </footer>
  </div>
</template>

<script setup>
import {CaretBottom, CaretTop} from "@element-plus/icons-vue";


/**
 * 传入数据
 * 标题  是否展开  下标
 */
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: false,
    default: true,
  },
  index: {
    type: Number,
    required: false,
  },
})

// eslint-disable-next-line no-undef
const emites = defineEmits(['update:isOpen'])

const changeVisible = () => {
  emites('update:isOpen', !props.isOpen)
}

</script>

<style scoped>
.accordion {
  border: 1px solid #eaeefb;
  width: 100%;
}

.accordion header {
  position: relative;
}

.title {
  font-size: 14px;
  margin: 0 0 0 10px;
  line-height: 50px;
}

.header_right {
  float: right;
}

.body {
  background-color: #fdfdfe;
  border-top: 1px solid #eaeefb;
  clear: both;
  overflow: hidden;
  padding: 15px 10px;
}

footer {
  border-top: 1px solid #eaeefb;
  height: 36px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  margin-top: -1px;
  color: #d3dce6;
  cursor: pointer;
  transition: 0.2s;
}

footer:hover {
  background-color: #ebeef5;
}

.rotate {
  transform: rotate(180deg);
}
</style>