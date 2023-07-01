<script lang="ts">
export default {
  name: "ConsoleFormHeader"
}
</script>

<template>
  <el-form ref="queryFormRef" :inline="true" :model="queryParams">
    <el-form-item prop="serviceName">
      <el-input v-model="queryParams.serviceName" clearable placeholder="业务名称" @keyup.enter="handleQuery"/>
    </el-form-item>

    <el-form-item prop="serviceType">
      <el-input v-model="queryParams.serviceType" clearable placeholder="业务类型" @keyup.enter="handleQuery"/>
    </el-form-item>

    <el-form-item prop="level">
      <el-input v-model="queryParams.level" clearable placeholder="级别" @keyup.enter="handleQuery"/>
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
  ConsoleQueryParam
} from "@/api/console/types";

import {Search, Refresh} from '@element-plus/icons-vue';

const emit = defineEmits(['query', 'create', 'update', 'delete']);// 定义组件的事件通知


// 数据状态：定义
let dataState = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as ConsoleQueryParam,
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
  dataState.queryParams.serviceName = undefined;
  dataState.queryParams.serviceType = undefined;
  dataState.queryParams.level = undefined;
  emit('query', 'header', queryParams.value);
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
});

</script>
