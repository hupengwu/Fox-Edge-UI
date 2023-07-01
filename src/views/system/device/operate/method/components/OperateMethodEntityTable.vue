<script lang="ts">
export default {
  name: "OperateMethodEntityTable"
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
    <el-table-column label="设备类型" min-width="150" prop="deviceType"/>
    <el-table-column label="操作名称" min-width="150" prop="operateName"/>
    <el-table-column :formatter="getOptionLabel" label="操作模式" min-width="100" prop="operateMode"/>
    <el-table-column :formatter="getOptionLabel" label="数据类型" min-width="100" prop="dataType"/>
    <el-table-column :formatter="getOptionLabel" label="是否轮询" min-width="100" prop="polling"/>
    <el-table-column label="通信超时" min-width="100" prop="timeout"/>
    <el-table-column label="制造厂商" min-width="150" prop="manufacturer"/>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="创建时间" prop="createTime" width="160"/>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="更新时间" prop="updateTime" width="160"/>
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
  DeviceOperateItem,
  DeviceOperateQueryParam
} from "@/api/device/operate/method/types";
import {
  listDeviceOperateEntityPages,
} from "@/api/device/operate/method";
import {Edit, Delete} from '@element-plus/icons-vue';
import {formatDate4elTableColumn,} from '@/utils/formatter';
import {getOptionLabel} from "@/api/device/operate/method/option";

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
  queryParams: {pageNum: 1, pageSize: 10} as DeviceOperateQueryParam,
  // 实体数据
  entityList: [] as DeviceOperateItem[],
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
 * 捕获按钮的打开对话框操作：create/update
 * @taskParam row 行信息
 */
function handleEditDialog(row: any) {
  emit('update', 'table', 'update', row.id);
}

/**
 * 捕获删除按钮
 * @taskParam row 行信息
 */
function handleDeleteDialog(row: any) {
  emit('delete', 'table', 'delete', row.id);
}

/**
 * 刷新页面信息
 */
function handleQuery() {
  emit('rowClick', {});

  dataState.loading = true;

  // 查询参数的数据类型转换：防止回写影响其他组件
  let queryParams = {} as DeviceOperateQueryParam;
  queryParams.pageNum = dataState.queryParams.pageNum;
  queryParams.pageSize = dataState.queryParams.pageSize;
  queryParams.deviceType = dataState.queryParams.deviceType;
  queryParams.dataType = dataState.queryParams.dataType;
  queryParams.operateName = dataState.queryParams.operateName;
  if (dataState.queryParams.polling !== undefined) {
    queryParams.polling = JSON.parse(String(dataState.queryParams.polling));
  }

  dataState.entityList = [];
  listDeviceOperateEntityPages(queryParams).then(({data}) => {
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
function refreshTable(queryParams: DeviceOperateQueryParam) {
  dataState.queryParams = queryParams;
  if (dataState.queryParams.deviceType === '') {
    dataState.queryParams.deviceType = undefined;
  }
  if (dataState.queryParams.operateName === '') {
    dataState.queryParams.operateName = undefined;
  }
  if (dataState.queryParams.operateMode === '') {
    dataState.queryParams.operateMode = undefined;
  }
  if (dataState.queryParams.manufacturer === '') {
    dataState.queryParams.manufacturer = undefined;
  }
  if (dataState.queryParams.dataType === '') {
    dataState.queryParams.dataType = undefined;
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
