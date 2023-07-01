<script lang="ts">
export default {
  name: "PeriodRecordEntityTable"
}
</script>

<template>
  <!-- 数据表单 -->
  <el-table
    ref="dataTableRef"
    v-loading="loading"
    :data="entityList"
    border
    highlight-current-row
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
  >
    <el-table-column align="center" min-width="40" type="selection"/>
    <el-table-column align="center" label="ID" min-width="80" prop="id"/>
    <el-table-column label="任务名称" min-width="120" prop="taskName"/>
    <el-table-column label="设备名称" min-width="120" prop="deviceName"/>
    <el-table-column label="对象名称" min-width="120" prop="objectName"/>
    <el-table-column label="对象数值" min-width="120" prop="objectValue.value"/>
    <el-table-column label="记录批次" min-width="120" prop="recordBatch"/>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="创建时间" prop="createTime" width="180"/>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="采样时间" prop="updateTime" width="180"/>
  </el-table>

  <!-- 分页工具条 -->
  <pagination v-if="total > 0" v-model:limit="queryParams.pageSize" v-model:page="queryParams.pageNum" :total="total"
              @pagination="handleQuery"/>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from "vue";

import {
  PeriodRecordItem,
  PeriodRecordQueryParam
} from "@/api/period/record/types";
import {
  listPeriodRecordObjectEntityPages, listPeriodTaskEntityObjectNames,
} from "@/api/period/record";
import {formatDate4elTableColumn,} from '@/utils/formatter';

const emit = defineEmits(['rowClick', 'update', 'delete']);// 定义组件的事件通知

/**
 * 对外声明接口：父页面可以调用它
 */
defineExpose({refreshTable, getIds, getEntities});

// 数据状态：定义
let dataState = reactive({
  // 页面转载状态
  loading: true,
  // 选中ID数组
  ids: [],
  // 记录总数
  total: 0,
  // 非单个禁用
  single: true,
  // 非多个禁用
  multiple: true,
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as PeriodRecordQueryParam,
  // 实体数据
  entityList: [] as PeriodRecordItem[],
});

// 数据状态：双向引用
const {
  // 页面转载状态
  loading,
  // 查询参数
  queryParams,
  // 实体数据
  entityList,
  // 记录总数
  total,
} = toRefs(dataState);

/**
 * 捕获列表中的选择变化
 * @taskParam selection
 */
function handleSelectionChange(selection: any) {
  dataState.ids = selection.map((item: any) => item.id);
  dataState.single = selection.length !== 1;
  dataState.multiple = !selection.length;
}

/**
 * 捕获列表中的行选择
 * @taskParam row
 */
function handleRowClick(row: any) {
  emit('rowClick', row);
}

/**
 * 刷新页面信息
 */
function handleQuery() {
  emit('rowClick', {});

  dataState.loading = true;


  dataState.entityList = [];
  listPeriodRecordObjectEntityPages(dataState.queryParams).then(({data}) => {
    data.list.forEach(value => {
      let item = value;
      item.updateTime = value.objectValue.time;
      dataState.entityList.push(value)
    });

    dataState.total = data.total;
    dataState.loading = false;
  });
}

/**
 * 获得选中的ID
 */
function getIds(): any {
  return dataState.ids;
}

/**
 * 获得实体信息
 */
function getEntities(): any {
  return dataState.entityList;
}

/**
 * 刷新表单
 */
function refreshTable(queryParams: PeriodRecordQueryParam) {
  dataState.queryParams = queryParams;

  handleQuery();
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(async () => {
  // 查询设备类型选项，并保存在产量区
  await listPeriodTaskEntityObjectNames(dataState.queryParams).then(({data}) => {
    if (data.length > 0) {
      queryParams.value.objectName = data[0];
    }

  });

  // 查询实体数据
  handleQuery();
});

</script>
