<script lang="ts">
export default {
  name: "DeviceDecoderEntityTable"
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
    <el-table-column label="文件名称" min-width="360" prop="fileName"/>
    <el-table-column align="center" label="冲突检测" min-width="120" prop="conflictStatus">
      <template #default="scope">
        <el-tag v-if="scope.row.conflictStatus === true" type="error">冲突</el-tag>
        <el-tag v-else type="success">正常</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" label="是否加载" prop="status">
      <template #default="scope">
        <el-switch
          v-model="scope.row.load"
          :active-value=true
          :inactive-value=false
          @change="handleStatusChange(scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="创建时间" prop="createTime" width="180"/>
    <el-table-column :formatter="formatDate4elTableColumn" align="center" label="更新时间" prop="updateTime" width="180"/>
    <el-table-column align="center" label="操作" width="150">
      <template #default="scope">
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
  CreateDeviceDecoderRequestVO,
  DeviceDecoderItem,
  DeviceDecoderQueryParam
} from "@/api/device/decoder/types";
import {
  listDeviceDecoderEntityPages, updateDeviceDecoderEntity,
} from "@/api/device/decoder";
import {Delete} from '@element-plus/icons-vue';
import {ElMessageBox, ElMessage} from 'element-plus';
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
  queryParams: {pageNum: 1, pageSize: 10} as DeviceDecoderQueryParam,
  // 实体数据
  entityList: [] as DeviceDecoderItem[],
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
 * 捕获删除按钮
 * @taskParam row 行信息
 */
function handleDeleteDialog(row: any) {
  if (row.load === true) {
    ElMessage.info('不允许删除加载状态的解码器！');
    return;
  }

  emit('delete', 'table', 'delete', row.fileName);
}

/**
 * 用户状态change
 */
function handleStatusChange(row: { [key: string]: any }) {
  const text = row.load === true ? '修改为启动' : '修改为停用';
  ElMessageBox.confirm(
    '确认要' + text + '' + row.fileName + '解码器吗?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      let entity = {} as CreateDeviceDecoderRequestVO;
      entity.fileName = row.fileName;
      entity.load = row.load;
      return updateDeviceDecoderEntity(entity);
    })
    .then(() => {
      ElMessage.success(text + '成功');
    })
    .catch(() => {
      row.load = row.load !== true;
    });
}


/**
 * 刷新页面信息
 */
function handleQuery() {
  emit('rowClick', {});

  dataState.loading = true;

  dataState.entityList = [];
  listDeviceDecoderEntityPages(dataState.queryParams).then(({data}) => {
    data.list.forEach(value => {
      value.conflictStatus = value.conflictFileName !== undefined;
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
function refreshTable(queryParams: DeviceDecoderQueryParam) {
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
