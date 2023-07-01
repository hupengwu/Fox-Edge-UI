<script lang="ts">
export default {
  name: "DeviceHistoryFormHeader"
}
</script>

<template>
  <el-form ref="queryFormRef" :inline="true" :model="queryParams">
    <!-- 下拉框：设备类型 -->
    <el-form-item label="设备类型" prop="deviceType">
      <el-select v-model="queryParams.deviceType" placeholder="请选择" @change="handleSelectDeviceType">
        <el-option
          v-for="item in deviceTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- 下拉框：设备名称 -->
    <el-form-item label="设备名称" prop="deviceName">
      <el-select v-model="queryParams.deviceName" placeholder="请选择" @change="handleSelectDeviceName">
        <el-option
          v-for="item in deviceNameOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- 下拉框：设备名称 -->
    <el-form-item label="对象名称" prop="objectName">
      <el-select v-model="queryParams.objectName" placeholder="请选择">
        <el-option
          v-for="item in objectNameOptions"
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
  DeviceHistoryQueryParam
} from "@/api/device/history/types";

import {Search, Refresh} from '@element-plus/icons-vue';
import {listOption2List, listOptionList, listOption2VLList} from "@/api/option";

const emit = defineEmits(['query']);// 定义组件的事件通知


// 数据状态：定义
let dataState = reactive({
  // 设备类型选项
  deviceTypeOptions: [] as OptionType[],
  // 设备名称选项
  deviceNameOptions: [] as OptionType[],
  // 设备名称选项
  objectNameOptions: [] as OptionType[],
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceHistoryQueryParam,
});

// 数据状态：双向引用
const {
  // 设备类型选项
  deviceTypeOptions,
  // 设备名称选项
  deviceNameOptions,
  // 对象名称选项
  objectNameOptions,
  // 查询参数
  queryParams,
} = toRefs(dataState);

function handleQuery() {
  emit('query', 'header', queryParams.value);
}

function resetQuery() {
  dataState.queryParams.deviceName = undefined;
  dataState.queryParams.deviceType = undefined;
  dataState.queryParams.objectName = undefined;
  dataState.queryParams.objectId = undefined;
  dataState.queryParams.paramValue = undefined;

  emit('query', 'header', queryParams.value);
}

/**
 * 响应通道类型的选择：联动通道类型和通道名称
 * @taskParam value
 */
async function handleSelectDeviceType(value: any) {
  await listOption2List("DeviceEntity", "deviceType", value, "deviceName").then(({data}) => {
    deviceNameOptions.value = data;
    queryParams.value.deviceName = deviceNameOptions.value[0].value;
  });
}

/**
 * 响应通道类型的选择：联动通道类型和通道名称
 * @taskParam value
 */
async function handleSelectDeviceName(value: any) {
  await listOption2VLList("DeviceObjectEntity", "deviceName", value, "objectName", 'objectName', 'paramName').then(({data}) => {
    objectNameOptions.value = data;
  });
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询设备类型选项，并保存在产量区
  listOptionList("DeviceObjectEntity", "deviceType").then(({data}) => {
    deviceTypeOptions.value = data;
  });
});

</script>
