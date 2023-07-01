<script lang="ts">
export default {
  name: "DeviceDecoderFormHeader"
}
</script>

<template>
  <el-form ref="queryFormRef" :inline="true" :model="queryParams">
    <el-form-item>
      <el-button :icon="Search" type="primary" @click="handleQuery">刷新</el-button>
      <el-button :icon="RefreshLeft" type="danger" @click="handleRestart">重启</el-button>
    </el-form-item>

  </el-form>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from "vue";

import {
  DeviceDecoderQueryParam
} from "@/api/device/decoder/types";

import {Search, RefreshLeft} from '@element-plus/icons-vue';

const emit = defineEmits(['query', 'restart']);// 定义组件的事件通知


// 数据状态：定义
let dataState = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceDecoderQueryParam,
});

// 数据状态：双向引用
const {
  // 查询参数
  queryParams,
} = toRefs(dataState);

function handleRestart() {
  emit('restart', 'header', queryParams.value);
}


function handleQuery() {
  emit('query', 'header', queryParams.value);
}

function resetQuery() {
  dataState.queryParams.fileName = undefined;
  dataState.queryParams.load = undefined;

  emit('query', 'header', queryParams.value);
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {

});

</script>
