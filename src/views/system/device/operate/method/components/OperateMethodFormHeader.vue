<script lang="ts">
export default {
  name: "OperateMethodFormHeader"
}
</script>

<template>
  <el-form ref="queryFormRef" :inline="true" :model="queryParams">
    <el-form-item>
      <el-button :icon="Edit" type="primary" @click="handleUpdateDialog">修改</el-button>
      <el-button :icon="Delete" type="danger" @click="handleDeleteDialog">删除</el-button>
    </el-form-item>

    <el-form-item prop="deviceType">
      <el-input v-model="queryParams.deviceType" clearable placeholder="设备类型" @keyup.enter="handleQuery"/>
    </el-form-item>
    <el-form-item prop="operateName">
      <el-input v-model="queryParams.operateName" clearable placeholder="操作名称" @keyup.enter="handleQuery"/>
    </el-form-item>

    <!-- 下拉框：是否轮询 -->
    <el-form-item label="是否轮询">
      <el-select v-model="queryParams.polling" style="width:120px" placeholder="请选择">
        <el-option
          v-for="item in pollingOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- 下拉框：是否轮询 -->
    <el-form-item label="数据类型">
      <el-select v-model="queryParams.dataType" style="width:120px" placeholder="请选择">
        <el-option
          v-for="item in dataTypeOptions"
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
  DeviceOperateQueryParam
} from "@/api/device/operate/method/types";

import {Edit, Delete, Search, Refresh} from '@element-plus/icons-vue';
import {listOptionList} from "@/api/device/operate/method/option";

const emit = defineEmits(['query', 'create', 'update', 'delete']);// 定义组件的事件通知


// 数据状态：定义
let dataState = reactive({
  // 是否轮询选项
  pollingOptions: [] as OptionType[],
  // 操作模式选项
  operateModeOptions: [] as OptionType[],
  // 数据类型选项
  dataTypeOptions: [] as OptionType[],
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceOperateQueryParam,
});

// 数据状态：双向引用
const {
  // 设备类型选项
  pollingOptions,
  // 操作模式选项
  operateModeOptions,
  // 数据类型选项
  dataTypeOptions,
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
  dataState.queryParams.deviceType = undefined;
  dataState.queryParams.operateName = undefined;
  dataState.queryParams.operateMode = undefined;
  dataState.queryParams.manufacturer = undefined;
  dataState.queryParams.dataType = undefined;
  dataState.queryParams.polling = undefined;
  dataState.queryParams.timeout = undefined;

  emit('query', 'header', queryParams.value);
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询设备类型选项，并保存在产量区
  pollingOptions.value  = listOptionList("polling");
  dataTypeOptions.value  = listOptionList("dataType");
  operateModeOptions.value  = listOptionList("operateMode");
});

</script>
