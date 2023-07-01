<script lang="ts">
export default {
  name: "DeviceMapperEntityTable"
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
    <el-table-column align="center" label="对象ID" min-width="80" prop="id"/>
    <el-table-column label="设备类型" min-width="120" prop="deviceType"/>
    <el-table-column label="对象名称" min-width="150" prop="objectName"/>
    <el-table-column label="映射名称" min-width="150" prop="mapperName"/>

    <el-table-column align="center" label="映射模式" min-width="120" prop="mapperMode">
      <template #default="scope">
        <el-tag v-if="scope.row.mapperMode === 0" type="primary">原状</el-tag>
        <el-tag v-else-if="scope.row.mapperMode === 1" type="success">替换</el-tag>
        <el-tag v-else-if="scope.row.mapperMode === 2" type="warning">副本</el-tag>
        <el-tag v-else-if="scope.row.mapperMode === 3" type="danger">剔除</el-tag>
        <el-tag v-else type="success">原状</el-tag>
      </template>
    </el-table-column>

    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="创建时间" prop="createTime" width="180"/>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="更新时间" prop="updateTime" width="180"/>

    <el-table-column align="center" label="操作" width="150">
      <template #default="scope">
        <el-button :icon="Edit" circle plain type="primary" @click.stop="handleEditDialog(scope.row)"/>
        <el-button :icon="Delete" circle plain type="danger" @click.stop="handleDeleteDialog(scope.row)"/>
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
  DeviceMapperItem,
  DeviceMapperQueryParam
} from "@/api/device/mapper/types";
import {
  listDeviceMapperEntityPages,
} from "@/api/device/mapper";
import {formatDate4elTableColumn,} from '@/utils/formatter';
import {Edit, Delete} from '@element-plus/icons-vue';

const emit = defineEmits(['rowClick', 'update', 'delete']);// 定义组件的事件通知

/**
 * 对外声明接口：父页面可以调用它
 */
defineExpose({refreshTable,getSelects, getEntities});

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
  queryParams: {pageNum: 1, pageSize: 10} as DeviceMapperQueryParam,
  // 实体数据
  entityList: [] as DeviceMapperItem[],
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
 * 获得选中的ID
 */
function getSelects(): any {
  return dataState.selects;
}

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
 * 刷新页面信息
 */
function handleQuery() {
  emit('rowClick', {});

  dataState.loading = true;

  dataState.entityList = [];
  listDeviceMapperEntityPages(dataState.queryParams).then(({data}) => {
    data.list.forEach(value => {
      dataState.entityList.push(value);
    });

    dataState.total = data.total;
    dataState.loading = false;
  });
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
function refreshTable(queryParams: DeviceMapperQueryParam) {
  dataState.queryParams = queryParams;
  if (dataState.queryParams.deviceType === '') {
    dataState.queryParams.deviceType = undefined;
  }
  if (dataState.queryParams.objectName === '') {
    dataState.queryParams.objectName = undefined;
  }

  handleQuery();
}


/**
 * 捕获按钮的打开对话框操作：create/update
 * @taskParam row 行信息
 */
function handleEditDialog(row: any) {
  emit('update', 'table', 'update', row);
}

/**
 * 捕获删除按钮
 * @taskParam row 行信息
 */
function handleDeleteDialog(row: any) {
  emit('delete', 'table', 'delete', row);
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询实体数据
  handleQuery();
});

</script>
