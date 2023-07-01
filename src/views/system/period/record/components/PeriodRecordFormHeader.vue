<script lang="ts">
export default {
  name: "PeriodRecordFormHeader"
}
</script>

<template>
  <el-form ref="queryFormRef" :inline="true" :model="queryParams">
    <!-- 下拉框：对象名称-->
    <el-form-item label="任务名称">
      <el-select v-model="queryParams.taskName" placeholder="请选择" @change="handleSelectTaskName">
        <el-option
          v-for="item in taskNameOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item prop="deviceName">
      <el-input v-model="queryParams.deviceName" clearable placeholder="设备名称" @keyup.enter="handleQuery"/>
    </el-form-item>

    <!-- 下拉框：对象名称-->
    <el-form-item label="对象名称">
      <el-select v-model="queryParams.objectName" placeholder="请选择">
        <el-option
          v-for="item in objectNameOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item prop="recordBatch">
      <el-input v-model="queryParams.recordBatch" clearable placeholder="批次名称" @keyup.enter="handleQuery"/>
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
  PeriodRecordQueryParam
} from "@/api/period/record/types";

import {Search, Refresh} from '@element-plus/icons-vue';
import {listOptionList} from "@/api/option";
import {getPeriodTaskEntity} from "@/api/period/task";

const emit = defineEmits(['query']);// 定义组件的事件通知


// 数据状态：定义
let dataState = reactive({
  // 任务名称选项
  taskNameOptions: [] as OptionType[],
  // 对象类型选项
  objectNameOptions: [] as OptionType[],
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as PeriodRecordQueryParam,
});

// 数据状态：双向引用
const {
  // 任务名称选项
  taskNameOptions,
  // 对象类型选项
  objectNameOptions,
  // 查询参数
  queryParams,
} = toRefs(dataState);

function handleQuery() {
  emit('query', 'header', queryParams.value);
}

/**
 * 响应通道类型的选择：联动通道类型和通道名称
 * @taskParam value
 */
function handleSelectTaskName(value: any) {
  // 查询指定通道类型的通道实体
  getPeriodTaskEntity(value).then(({data}) => {
    let objectIds = data.objectIds as string[];
    // 向后台查询数据，并转换数据结构位option
    const options = [] as OptionType[];
    for (let i = 0; i < objectIds.length; i++) {
      const option = {value: objectIds[i], label: objectIds[i]} as OptionType;
      options.push(option);
    }

    // 将option保存到通道列表选项的存储空间
    objectNameOptions.value = options;
  });
}

function resetQuery() {
  dataState.queryParams.deviceName = undefined;
  dataState.queryParams.recordBatch = undefined;
  dataState.queryParams.taskName = undefined;
  dataState.queryParams.objectName = undefined;
  emit('query', 'header', queryParams.value);
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询任务名称选项，并保存在产量区
  listOptionList("PeriodTaskEntity", "taskName").then(({data}) => {
    taskNameOptions.value = data;
  });
});

</script>
