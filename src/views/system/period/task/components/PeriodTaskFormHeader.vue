<script lang="ts">
export default {
  name: "PeriodTaskFormHeader"
}
</script>

<template>
  <el-form ref="queryFormRef" :inline="true" :model="queryParams">
    <el-form-item>
      <el-button :icon="Plus" type="success" @click="handleCreateDialog">新增</el-button>
      <el-button :icon="Edit" type="primary" @click="handleUpdateDialog">修改</el-button>
      <el-button :icon="Link" type="warning" @click="handleBindDeviceDialog">设备</el-button>
      <el-button :icon="Link" type="info" @click="handleBindObjectDialog">对象</el-button>
      <el-button :icon="Delete" type="danger" @click="handleDeleteDialog">删除</el-button>
    </el-form-item>

    <el-form-item prop="taskName">
      <el-input v-model="queryParams.taskName" clearable placeholder="模板名称" @keyup.enter="handleQuery"/>
    </el-form-item>
    <!-- 下拉框：设备类型 -->
    <el-form-item label="设备类型">
      <el-select v-model="queryParams.deviceType" placeholder="请选择">
        <el-option
          v-for="item in deviceTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
  PeriodTaskQueryParam
} from "@/api/period/task/types";

import {Plus, Edit, Delete, Search, Refresh,Link} from '@element-plus/icons-vue';
import {listOptionList} from "@/api/option";

const emit = defineEmits(['query', 'create', 'update', 'delete', 'binding']);// 定义组件的事件通知


// 数据状态：定义
let dataState = reactive({
  // 设备类型选项
  deviceTypeOptions: [] as OptionType[],
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as PeriodTaskQueryParam,
});

// 数据状态：双向引用
const {
  // 设备类型选项
  deviceTypeOptions,
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
 * 修改设备对话框
 */
function handleBindDeviceDialog() {
  emit('binding', 'header', 'device');
}

/**
 * 修改设备对话框
 */
function handleBindObjectDialog() {
  emit('binding', 'header', 'object');
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
  dataState.queryParams.deviceType = undefined;
  dataState.queryParams.taskName = undefined;
  emit('query', 'header', queryParams.value);
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  listOptionList("OperateEntity", "deviceType").then(({data}) => {
    deviceTypeOptions.value = data;
  });
});

</script>
