<script lang="ts">
export default {
  name: "ServiceStatusEntityTable"
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
    <el-table-column type="expand">
      <template #default="props">
          <el-input v-model="props.row.jsonTxt" :autosize="{ minRows: 1, maxRows: 100 }" :readonly="true"
                    type="textarea"/>
      </template>
    </el-table-column>
    <el-table-column label="应用名称" min-width="220" prop="serviceName"/>
    <el-table-column align="center" label="业务类型" min-width="80" prop="conflictStatus">
      <template #default="scope">
        <el-tag v-if="scope.row.serviceType === 'service'" type="normal">服务</el-tag>
        <el-tag v-else-if="scope.row.serviceType === 'kernel'" type="warning">内核</el-tag>
        <el-tag v-else-if="scope.row.serviceType === 'system'" type="success">系统</el-tag>
        <el-tag v-else type="success">未定义</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="模块名称" min-width="120" prop="modelName"/>
    <el-table-column label="模块类型" min-width="120" prop="modelType"/>
    <el-table-column label="程序名称" min-width="250" prop="applicationName"/>
    <el-table-column label="过期时间" min-width="120" prop="timeout"/>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="活动时间" prop="activeTime"
                     width="180"/>
  </el-table>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from "vue";

import {formatDate4elTableColumn,} from '@/utils/formatter';
import {ServiceStatusItem} from "@/api/service/service/types";
import {
  listServiceStatusList,
} from "@/api/service/service";

const emit = defineEmits(['rowClick']);// 定义组件的事件通知

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
  // 非单个禁用
  single: true,
  // 非多个禁用
  multiple: true,
  // 实体数据
  entityList: [] as ServiceStatusItem[],
});

// 数据状态：双向引用
const {
  // 页面转载状态
  loading,
  // 实体数据
  entityList,
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
  listServiceStatusList().then(({data}) => {
    data.forEach(value => {
      let item = value;
      item.timeout = (item.currentTime - item.activeTime) / 1000;
      item.active = item.timeout < 60.0;

      item.jsonTxt = JSON.stringify(item, null, 5);
      dataState.entityList.push(item)
    });

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
function refreshTable() {

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
