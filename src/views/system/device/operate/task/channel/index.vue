<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';

import OperateChannelTaskEditDialog from './components/OperateChannelTaskEditDialog.vue';
import OperateChannelTaskEntityTable from './components/OperateChannelTaskEntityTable.vue';
import OperateChannelTaskFormHeader from './components/OperateChannelTaskFormHeader.vue';
import OperateChannelTaskWorkSpace from './components/OperateChannelTaskWorkSpace.vue';

import {getEntity,} from '@/utils/entity';

// 引入通道的API和数据类型
import {
  updateOperateChannelTaskEntity,
  createOperateChannelTaskEntity,
  deleteOperateChannelTaskEntity,
} from '@/api/device/operate/task/channel';
import {
  OperateChannelTaskQueryParam,
} from '@/api/device/operate/task/channel/types';


const operateChannelTaskEditDialogRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样
const operateChannelTaskEntityTableRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样
const operateChannelTaskFormHeaderRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样
const operateChannelTaskWorkSpaceRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as OperateChannelTaskQueryParam,
  // 对话框状态
  editDialog: {
    visible: false,
  },
});

const {
  // 查询参数
  queryParams,
  // 对话框状态
  editDialog,
} = toRefs(state);


/**
 * 响应查询按钮：页查询数据
 */
function handleQuery(source: string, value: any) {
  queryParams.value = value;
  operateChannelTaskEntityTableRef.value.refreshTable(queryParams);
}

/**
 * 捕获按钮的打开对话框操作：create/update
 * @taskParam source
 * @taskParam type
 * @taskParam value
 */
function handleUpdateDialog(source: string, type: any, value: any) {
  // 更新对话框
  if (source === 'header' && type === 'update') {
    let ids = operateChannelTaskEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(operateChannelTaskEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    operateChannelTaskEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;

    return;
  }

  if (source === 'table' && type === 'update') {
    if (value === undefined) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(operateChannelTaskEntityTableRef.value.getEntities(), value);
    // 初始化编辑对话框的数据
    operateChannelTaskEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;
  }
}

function handleCreateDialog(source: string, type: any) {
  // 创建对话框
  if (source === 'header' && type === 'create') {
    editDialog.value.visible = true;
    operateChannelTaskEditDialogRef.value.initEditData(type, undefined);
    return;
  }
}

/**
 * 捕获来自对话框的创建操作
 * @taskParam value
 */
async function handleCreate(value: any) {
  let formData = {
    taskName: value.taskName,
    channelName: value.channelName,
    channelType: value.channelType,
    taskParam: value.taskParam,
    sendMode: value.sendMode,
    timeout: value.timeout,
  }

  await createOperateChannelTaskEntity(formData).then(() => {
    ElMessage.success('新增成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    operateChannelTaskEntityTableRef.value.refreshTable(state.queryParams);
  })
}

async function handleClickRow(rowClick: any) {
  if (rowClick.channelName === undefined || rowClick.taskParam === undefined) {
    return;
  }

  operateChannelTaskWorkSpaceRef.value.initWorkSpace(rowClick);
}


/**
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handleUpdate(value: any) {
  let formData = {
    id: value.id,
    taskName: value.taskName,
    channelName: value.channelName,
    channelType: value.channelType,
    taskParam: value.taskParam,
    sendMode: value.sendMode,
    timeout: value.timeout,
  }

  await updateOperateChannelTaskEntity(formData).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    operateChannelTaskEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获对话框的取消操作
 * @taskParam value
 */
function handleCancel() {
  // 隐藏对话框
  editDialog.value.visible = false;
}

/**
 * 捕获删除对话框消息
 * @taskParam source 发出消息的数据来源：button/table
 * @taskParam type 操作类型：delete
 * @taskParam row 行信息
 */
function handleDeleteDialog(source: string, type: string, row: any) {
  let ids = '';
  if (source === 'table') {
    ids = row;
  }
  if (source === 'header') {
    let idList = operateChannelTaskEntityTableRef.value.getIds();
    if (idList.length === 0) {
      return;
    }

    ids = idList.join(',');
  }

  ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteOperateChannelTaskEntity(ids).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      operateChannelTaskEntityTableRef.value.refreshTable(state.queryParams);
    });
  })
    .catch(() => ElMessage.info('已取消删除'));
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
});
</script>

<template>
  <div class="app-container">

    <!-- 表单头：各种按钮 -->
    <operate-channel-task-form-header ref="operateChannelTaskFormHeaderRef"
                                      @create="handleCreateDialog"
                                      @delete="handleDeleteDialog"
                                      @query="handleQuery"
                                      @update="handleUpdateDialog"
    />

    <!-- 数据表单：创建/修改 -->
    <operate-channel-task-entity-table ref="operateChannelTaskEntityTableRef"
                                       @create="handleCreateDialog"
                                       @delete="handleDeleteDialog"
                                       @rowClick="handleClickRow"
                                       @update="handleUpdateDialog"

    />

    <!-- 通道编辑对话框：创建/修改 -->
    <operate-channel-task-edit-dialog ref="operateChannelTaskEditDialogRef" v-model:visible="editDialog.visible"
                                      @cancel="handleCancel"
                                      @create="handleCreate"
                                      @update="handleUpdate"
    />

    <!-- 通道编辑对话框：创建/修改 -->
    <operate-channel-task-work-space ref="operateChannelTaskWorkSpaceRef" v-model:visible="editDialog.visible"
    />

  </div>
</template>
