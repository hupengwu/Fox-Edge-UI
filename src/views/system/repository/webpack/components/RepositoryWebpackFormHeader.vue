<script lang="ts">
export default {
  name: "RepositoryWebpackFormHeader"
}
</script>

<template>
  <el-form ref="queryFormRef" :inline="true" :model="queryParams">
    <el-form-item>
      <el-button :icon="Search" type="primary" @click="handleList">获取</el-button>
      <el-button :icon="RefreshLeft" type="success" @click="handleScan">扫描</el-button>
      <el-button :icon="Download" type="success" @click="handleDownload">下载</el-button>
      <el-button :icon="Delete" type="warning" @click="handleDelete">清理</el-button>
    </el-form-item>
    <el-form-item prop="modelName">
      <el-input v-model="queryParams.modelName" clearable placeholder="模块名称" @keyup.enter="handleQuery"/>
    </el-form-item>

    <!-- 下拉框：设备类型 -->
    <el-form-item label="状态类型">
      <el-select v-model="queryParams.status" placeholder="请选择" style="width:200px">
        <el-option
          v-for="item in statusTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button :icon="RefreshLeft" type="primary" @click="handleQuery">过滤</el-button>
      <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from "vue";

import {Search, RefreshLeft, Refresh, Delete, Download} from '@element-plus/icons-vue';
import {RepositoryQueryParam} from "@/api/device/repository/types";

const emit = defineEmits(['query', 'scan', 'delete', 'download']);// 定义组件的事件通知


// 数据状态：定义
let dataState = reactive({
  // 组件类型选项
  componentTypeOptions: [] as OptionType[],
  // 组件类型选项
  statusTypeOptions: [] as OptionType[],
  // 查询参数
  queryParams: {modelType: 'webpack', pageNum: 1, pageSize: 10} as RepositoryQueryParam,
});

// 数据状态：双向引用
const {
  // 组件类型选项
  componentTypeOptions,
  // 组件类型选项
  statusTypeOptions,
  // 查询参数
  queryParams,
} = toRefs(dataState);

function handleList() {
  queryParams.value.source = 'uri';
  emit('query', 'header', queryParams.value);
}

function handleScan() {
  queryParams.value.source = 'local';
  emit('scan', 'header', queryParams.value);
}

function handleDownload() {
  queryParams.value.source = 'local';
  emit('download', 'header', queryParams.value);
}

function handleDelete() {
  queryParams.value.source = 'local';
  emit('delete', 'header', queryParams.value);
}

function handleQuery() {
  queryParams.value.source = 'local';
  emit('query', 'header', queryParams.value);
}

function resetQuery() {
  dataState.queryParams.component = undefined;
  dataState.queryParams.modelName = undefined;
  dataState.queryParams.status = undefined;
  emit('query', 'header', queryParams.value);
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  componentTypeOptions.value.push({label: '服务模块', value: 'service'});

  statusTypeOptions.value.push({label: '未检查', value: '0'});
  statusTypeOptions.value.push({label: '未下载', value: '1'});
  statusTypeOptions.value.push({label: '已下载', value: '2'});
  statusTypeOptions.value.push({label: '已解压', value: '3'});
  statusTypeOptions.value.push({label: '未安装', value: '4'});
  statusTypeOptions.value.push({label: '已安装', value: '5'});
  statusTypeOptions.value.push({label: '破损包', value: '6'});
});

</script>
