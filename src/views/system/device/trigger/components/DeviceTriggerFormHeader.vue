<script lang="ts">
export default {
  name: "DeviceTriggerFormHeader"
}
</script>

<template>
  <el-form ref="queryFormRef" :inline="true" :model="queryParams">
    <el-form-item prop="modelName">
      <el-input v-model="queryParams.modelName" clearable placeholder="模块名称" @keyup.enter="handleQuery"/>
    </el-form-item>

    <el-form-item prop="modelName">
      <el-input v-model="queryParams.methodName" clearable placeholder="方法名称" @keyup.enter="handleQuery"/>
    </el-form-item>

    <el-form-item prop="modelName">
      <el-input v-model="queryParams.manufacturer" clearable placeholder="制造厂商" @keyup.enter="handleQuery"/>
    </el-form-item>

    <el-form-item>
      <el-button :icon="Search" type="primary" @click="handleQuery">搜索</el-button>
      <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from "vue";

import {
  DeviceTriggerQueryParam
} from "@/api/device/trigger/types";

import {Search, Refresh} from '@element-plus/icons-vue';

const emit = defineEmits(['query', 'create', 'update', 'delete']);// 定义组件的事件通知


// 数据状态：定义
let dataState = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceTriggerQueryParam,
});

// 数据状态：双向引用
const {
  // 查询参数
  queryParams,
} = toRefs(dataState);

function handleQuery() {
  emit('query', 'header', queryParams.value);
}

function resetQuery() {
  dataState.queryParams.methodName = undefined;
  dataState.queryParams.modelName = undefined;
  dataState.queryParams.manufacturer = undefined;
  emit('query', 'header', queryParams.value);
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
});

</script>
