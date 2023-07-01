<script lang="ts">
export default {
  name: "ConfigFormHeader"
}
</script>

<template>
  <el-form ref="queryFormRef" :inline="true" :model="queryParams">
    <el-form-item>
      <el-button :icon="Plus" type="success" @click="handleCreateDialog">新增</el-button>
      <el-button :icon="Edit" type="primary" @click="handleUpdateDialog">修改</el-button>
      <el-button :icon="Delete" type="danger" @click="handleDeleteDialog">删除</el-button>
    </el-form-item>

    <el-form-item prop="configName">
      <el-input v-model="queryParams.configName" clearable placeholder="配置名称" @keyup.enter="handleQuery"/>
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
  ConfigQueryParam
} from "@/api/config/types";

import {Plus, Edit, Delete, Search, Refresh} from '@element-plus/icons-vue';

const emit = defineEmits(['query', 'create', 'update', 'delete']);// 定义组件的事件通知


// 数据状态：定义
let dataState = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as ConfigQueryParam,
});

// 数据状态：双向引用
const {
  // 查询参数
  queryParams,
} = toRefs(dataState);

/**
 * 新增设备对话框
 */
function handleCreateDialog() {
  emit('create', 'header', 'create');
}

/**
 * 修改设备对话框
 */
function handleUpdateDialog() {
  emit('update', 'header', 'update');
}

/**
 * 删除设备对话框
 */
function handleDeleteDialog() {
  emit('delete', 'header', 'delete');
}

function handleQuery() {
  emit('query', 'header', queryParams.value);
}

function resetQuery() {
  dataState.queryParams.serviceName = undefined;
  dataState.queryParams.configName = undefined;
  dataState.queryParams.configValue = undefined;
  emit('query', 'header', queryParams.value);
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
});

</script>
