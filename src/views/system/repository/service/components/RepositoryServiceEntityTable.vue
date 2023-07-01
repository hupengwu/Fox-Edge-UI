<!--suppress ALL -->
<script lang="ts">
export default {
  name: "RepositoryServiceEntityTable"
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
    <!-- 展开列表 -->
    <el-table-column type="expand">
      <template #default="props">
        <el-form-item>
          <el-input v-model="props.row.description" :autosize="{ minRows: 3, maxRows: 100 }" :readonly="true"
                    type="textarea"/>
        </el-form-item>
        <el-table
          ref="dataTableRef"
          :data="props.row.versions"
          border
          highlight-current-row
          @row-click="handleRowClick"
        >
          <el-table-column align="center" label="版本号" min-width="100" prop="version"/>
          <el-table-column align="center" label="说明" min-width="200" prop="description"/>
          <el-table-column :formatter="formatFileSize4elTableColumn" align="center" label="文件大小" prop="fileSize"
                           width="120"/>
          <el-table-column :formatter="formatDate4elTableColumn" align="center" label="上传时间" prop="updateTime"
                           width="170"/>
          <el-table-column align="center" label="类型" prop="conflictStatus" width="120">
            <template #default="scope">
              <el-tag v-if="scope.row.component === 'service'" type="info">服务</el-tag>
              <el-tag v-else-if="scope.row.component === 'kernel'" type="warning">内核</el-tag>
              <el-tag v-else-if="scope.row.component === 'system'" type="success">系统</el-tag>
              <el-tag v-else type="success">未定义</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" prop="conflictStatus" width="120">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 0" type="info">未扫描</el-tag>
              <el-tag v-else-if="scope.row.status === 1" type="info">未下载</el-tag>
              <el-tag v-else-if="scope.row.status === 2" type="danger">已下载</el-tag>
              <el-tag v-else-if="scope.row.status === 3" type="danger">已解压</el-tag>
              <el-tag v-else-if="scope.row.status === 4" type="warning">未安装</el-tag>
              <el-tag v-else-if="scope.row.status === 5" type="success">已安装</el-tag>
              <el-tag v-else-if="scope.row.status === 6" type="danger">破损包</el-tag>
              <el-tag v-else type="danger">未定义</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="150">
            <template #default="scope">
              <el-button :icon="Download" circle plain type="primary" @click.stop="handleDownloadPackage(scope.row)"/>
              <el-button :icon="SetUp" circle plain type="primary" @click.stop="handleInstallPackageDialog(scope.row)"/>
              <el-button :icon="Delete" circle plain type="danger" @click.stop="handleDeletePackageDialog(scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>


    <!-- 列表 -->
    <el-table-column align="center" min-width="40" type="selection"/>
    <el-table-column label="模块名称" min-width="200" prop="modelName"/>
    <el-table-column label="最新版本" prop="lastVersion.version" width="120"/>
    <el-table-column :formatter="formatFileSize4elTableColumn2" align="center" label="文件大小" prop="lastVersion.fileSize"
                     width="120"/>
    <el-table-column :formatter="formatDate4elTableColumn2" align="center" label="上传时间" prop="lastVersion.updateTime"
                     width="180"/>

    <el-table-column align="center" label="类型" prop="conflictStatus" width="120">
      <template #default="scope">
        <el-tag v-if="scope.row.component === 'service'" type="info">服务</el-tag>
        <el-tag v-else-if="scope.row.component === 'kernel'" type="warning">内核</el-tag>
        <el-tag v-else-if="scope.row.component === 'system'" type="success">系统</el-tag>
        <el-tag v-else type="success">未定义</el-tag>
      </template>
    </el-table-column>

    <el-table-column align="center" label="状态" prop="conflictStatus" width="120">
      <template #default="scope">
        <el-tag v-if="scope.row.status === 0" type="info">未扫描</el-tag>
        <el-tag v-else-if="scope.row.status === 1" type="info">未下载</el-tag>
        <el-tag v-else-if="scope.row.status === 2" type="danger">已下载</el-tag>
        <el-tag v-else-if="scope.row.status === 3" type="danger">已解压</el-tag>
        <el-tag v-else-if="scope.row.status === 4" type="warning">未安装</el-tag>
        <el-tag v-else-if="scope.row.status === 5" type="success">已安装</el-tag>
        <el-tag v-else-if="scope.row.status === 6" type="danger">破损包</el-tag>
        <el-tag v-else type="danger">未定义</el-tag>
      </template>
    </el-table-column>

    <el-table-column align="center" label="解码器操作" width="150">
      <template #default="scope">
        <el-button :icon="Download" circle plain type="success" @click.stop="handleDownloadPackage(scope.row)"/>
        <el-button :icon="SetUp" circle plain type="primary" @click.stop="handleInstallPackageDialog(scope.row)"/>
        <el-button :icon="Delete" circle plain type="warning" @click.stop="handleDeletePackageDialog(scope.row)"/>
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
  RepositoryItem, RepositoryQueryParam, RepositoryVerItem
} from "@/api/device/repository/types";
import {
  listEntityList,
  scanEntityList
} from "@/api/device/repository";
import {Download, SetUp, Delete} from '@element-plus/icons-vue';
import {formatDate4elTableColumn, formatDate4elTableColumn2} from '@/utils/formatter';
import {formatFileSize4elTableColumn, formatFileSize4elTableColumn2} from '@/utils/fileutil';

const emit = defineEmits(['rowClick', 'update', 'delete', 'deleteVersion', 'download', 'install']);// 定义组件的事件通知

/**
 * 对外声明接口：父页面可以调用它
 */
defineExpose({refreshTable, getEntities, scanService, getSelects});

// 数据状态：定义
let dataState = reactive({
  // 页面转载状态
  loading: false,
  // 选中ID数组
  selects: [],
  // 记录总数
  total: 0,
  // 非单个禁用
  single: true,
  // 非多个禁用
  multiple: true,
  // 实体数据
  entityList: [] as RepositoryItem[],
  // 查询参数
  queryParams: {modelType: 'service', pageNum: 1, pageSize: 10} as RepositoryQueryParam,
});

// 数据状态：双向引用
const {
  // 页面转载状态
  loading,
  // 实体数据
  entityList,
  // 记录总数
  total,
  // 查询参数
  queryParams,
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
function handleDownloadPackage(row: any) {
  emit('download', 'table', 'download', row);
}

function handleInstallPackageDialog(row: any) {
  if (row.status < 2) {
    return;
  }

  emit('install', 'table', 'install', row);
}

function handleDeletePackageDialog(row: any) {
  if (row.status < 2) {
    return;
  }

  emit('delete', 'table', 'delete', row);
}


/**
 * 刷新表单
 */
function refreshTable(queryParams: RepositoryQueryParam) {
  dataState.queryParams = queryParams;
  if (dataState.queryParams.source === '') {
    dataState.queryParams.source = undefined;
  }
  if (dataState.queryParams.modelName === '') {
    dataState.queryParams.modelName = undefined;
  }
  if (dataState.queryParams.component === '') {
    dataState.queryParams.component = undefined;
  }

  handleQuery();
}

/**
 * 刷新页面信息
 */
function handleQuery() {
  emit('rowClick', {});

  listEntityList(dataState.queryParams).then(({data}) => {
    data.list.forEach(value => {
      for (let version of value.versions as RepositoryVerItem[]) {
        version.modelName = value.modelName;
        version.modelType = value.modelType;
      }
      if (value.lastVersion !== undefined) {
        value.lastVersion.modelType = value.modelType;
        value.lastVersion.modelName = value.modelName;
      }

      dataState.entityList.push(value)
    });

    dataState.entityList = data.list;
    dataState.total = data.total;
  });
}

/**
 * 刷新页面信息
 */
function scanService() {
  scanEntityList(dataState.queryParams);
}

/**
 * 获得选中的ID
 */
function getSelects(): any {
  return dataState.selects;
}

/**
 * 获得实体信息
 */
function getEntities(): any {
  return dataState.entityList;
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询实体数据
  handleQuery();
});

</script>
