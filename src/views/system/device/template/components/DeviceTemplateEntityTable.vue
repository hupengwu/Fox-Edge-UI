<script lang="ts">
export default {
  name: "DeviceTemplateEntityTable"
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
    <el-table-column label="模块名称" min-width="150" prop="modelName"/>
    <el-table-column label="版本信息" min-width="80" prop="version"/>
    <el-table-column label="文件名称" min-width="250" prop="fileName"/>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="创建时间" prop="createTime"
                     width="180"/>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="采样时间" prop="updateTime"
                     width="180"/>
    <el-table-column align="center" label="操作" width="150">
      <template #default="scope">
        <el-button :icon="Download" circle plain type="success" @click.stop="handleDownload(scope.row)"/>
        <el-button :icon="Delete" circle plain type="danger" @click.stop="handleDelete(scope.row)"/>
      </template>
    </el-table-column>

  </el-table>

  <!-- 分页工具条 -->
  <pagination v-if="total > 0" v-model:limit="queryParams.pageSize" v-model:page="queryParams.pageNum" :total="total"
              @pagination="handleQuery"/>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from "vue";

import {
  DeviceTemplateItem,
  DeviceTemplateQueryParam
} from "@/api/device/template/types";
import {
  listDeviceTemplateEntities,
} from "@/api/device/template";
import {Delete, Download} from '@element-plus/icons-vue';
import {formatDate4elTableColumn,} from '@/utils/formatter';

const emit = defineEmits(['rowClick', 'update', 'delete', 'download']);// 定义组件的事件通知

/**
 * 对外声明接口：父页面可以调用它
 */
defineExpose({refreshTable, getIds, getEntities});

// 数据状态：定义
let dataState = reactive({
  // 页面转载状态
  loading: true,
  // 选中ID数组
  selects: [],
  // 记录总数
  total: 0,
  // 非单个禁用
  single: true,
  // 非多个禁用
  multiple: true,
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceTemplateQueryParam,
  // 实体数据
  entityList: [] as DeviceTemplateItem[],
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
  dataState.selects = selection.map((item: any) => item);
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
 * 捕获下载按钮
 * @taskParam row 行信息
 */
function handleDownload(row: any) {
  emit('download', 'table', 'download', row);
}

/**
 * 捕获删除按钮
 * @taskParam row 行信息
 */
function handleDelete(row: any) {
  emit('delete', 'table', 'delete', row);
}

/**
 * 刷新页面信息
 */
function handleQuery() {
  emit('rowClick', {});

  dataState.loading = true;

  dataState.entityList = [];
  listDeviceTemplateEntities(dataState.queryParams).then(({data}) => {
    data.list.forEach(value => {
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
  return dataState.selects;
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
function refreshTable(queryParams: DeviceTemplateQueryParam) {
  dataState.queryParams = queryParams;
  if (dataState.queryParams.fileName === '') {
    dataState.queryParams.fileName = undefined;
  }

  handleQuery();
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询实体数据
  handleQuery();
});

</script>
