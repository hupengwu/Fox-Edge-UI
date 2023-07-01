<script lang="ts">
export default {
  name: "OperateMonitorTaskEntityTable"
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
    <el-table-column label="模板名称" min-width="160" prop="templateName"/>
    <el-table-column label="设备类型" min-width="120" prop="deviceType"/>
    <el-table-column label="绑定数量" min-width="80" prop="countDeviceBind"/>
    <el-table-column label="可绑定数" min-width="80" prop="countDeviceType"/>
    <el-table-column label="设备类型" min-width="120" prop="deviceType"/>
    <el-table-column label="模板参数" min-width="120" prop="templateParamJson" type="expand">
      <template #default="props">
        <el-form-item label="模板参数">
          <el-input v-model="props.row.templateParamJson" :autosize="{ minRows: 1, maxRows: 100 }" :readonly="true"
                    type="textarea"/>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="创建时间" prop="createTime" width="180"/>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="更新时间" prop="updateTime" width="180"/>
    <el-table-column align="center" label="操作" width="150">
      <template #default="scope">
        <el-button :icon="Edit" circle plain type="primary" @click.stop="handleEditDialog(scope.row)"/>
        <el-button :icon="Link" circle plain type="warning" @click.stop="handleBindDialog(scope.row)"/>
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
  OperateMonitorTaskItem,
  OperateMonitorTaskQueryParam
} from "@/api/device/operate/task/monitor/types";
import {
  listOperateTemplateEntityPages,
} from "@/api/device/operate/task/monitor";
import {Edit, Link, Delete} from '@element-plus/icons-vue';
import {formatDate4elTableColumn,} from '@/utils/formatter';


const emit = defineEmits(['rowClick', 'update', 'delete', 'binding']);// 定义组件的事件通知

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
  queryParams: {pageNum: 1, pageSize: 10} as OperateMonitorTaskQueryParam,
  // 实体数据
  entityList: [] as OperateMonitorTaskItem[],
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
 * 捕获按钮的打开对话框操作：create/update
 * @taskParam row 行信息
 */
function handleBindDialog(row: any) {
  emit('binding', 'table', 'binding', row.id);
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


  dataState.entityList = [];
  listOperateTemplateEntityPages(dataState.queryParams).then(({data}) => {
    data.list.forEach(value => {
      let item = value;
      item.templateParamJson = JSON.stringify(value.templateParam, null, 5);
      item.deviceIdsJson = JSON.stringify(value.deviceIds, null, 5);
      dataState.entityList.push(item)
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
function refreshTable(queryParams: OperateMonitorTaskQueryParam) {
  dataState.queryParams = queryParams;
  if (dataState.queryParams.templateName === '') {
    dataState.queryParams.templateName = undefined;
  }
  if (dataState.queryParams.deviceType === '') {
    dataState.queryParams.deviceType = undefined;
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
