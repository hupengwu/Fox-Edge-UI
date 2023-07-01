<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';

import OperateMonitorTaskBindDialog from './components/OperateMonitorTaskBindDialog.vue';
import OperateMonitorTaskEditDialog from './components/OperateMonitorTaskEditDialog.vue';
import OperateMonitorTaskEntityTable from './components/OperateMonitorTaskEntityTable.vue';
import OperateMonitorTaskFormHeader from './components/OperateMonitorTaskFormHeader.vue';

import {getEntity,} from '@/utils/entity';

// 引入设备的API和数据类型
import {
  updateOperateTemplateEntity,
  createOperateTemplateEntity,
  deleteOperateTemplateEntity,
} from '@/api/device/operate/task/monitor';
import {
  OperateMonitorTaskQueryParam,
} from '@/api/device/operate/task/monitor/types';

const operateMonitorTaskBindDialogRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样
const operateMonitorTaskEditDialogRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样
const operateMonitorTaskEntityTableRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样
const operateMonitorTaskFormHeaderRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as OperateMonitorTaskQueryParam,
  // 对话框状态
  editDialog: {
    visible: false,
  },
  // 对话框状态
  bindDialog: {
    visible: false,
  },
});

const {
  // 查询参数
  queryParams,
  // 对话框状态
  editDialog,
  // 对话框状态
  bindDialog,
} = toRefs(state);


/**
 * 响应查询按钮：页查询数据
 */
function handleQuery(source: string, value: any) {
  queryParams.value = value;
  operateMonitorTaskEntityTableRef.value.refreshTable(queryParams);
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
    let ids = operateMonitorTaskEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(operateMonitorTaskEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    operateMonitorTaskEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;

    return;
  }

  if (source === 'table' && type === 'update') {
    if (value === undefined) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(operateMonitorTaskEntityTableRef.value.getEntities(), value);
    // 初始化编辑对话框的数据
    operateMonitorTaskEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;
  }
}

/**
 * 捕获按钮的打开对话框操作：create/update
 * @taskParam source
 * @taskParam type
 * @taskParam value
 */
function handleBindingDialog(source: string, type: any, value: any) {
  // 更新对话框
  if (source === 'header' && type === 'binding') {
    let ids = operateMonitorTaskEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(operateMonitorTaskEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    operateMonitorTaskBindDialogRef.value.initEditData(type, entity);
    // 显示对话框
    bindDialog.value.visible = true;

    return;
  }

  if (source === 'table' && type === 'binding') {
    if (value === undefined) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(operateMonitorTaskEntityTableRef.value.getEntities(), value);
    // 初始化编辑对话框的数据
    operateMonitorTaskBindDialogRef.value.initEditData(type, entity);
    // 显示对话框
    bindDialog.value.visible = true;
  }
}

function handleCreateDialog(source: string, type: any) {
  // 创建对话框
  if (source === 'header' && type === 'create') {
    let ids = operateMonitorTaskEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      editDialog.value.visible = true;
      operateMonitorTaskEditDialogRef.value.initEditData(type, undefined);
      return;
    }

    // 取出选中的元素
    let entity = getEntity(operateMonitorTaskEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    operateMonitorTaskEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;

    return;
  }
}

/**
 * 捕获来自对话框的创建操作
 * @taskParam value
 */
async function handleEditCreate(value: any) {
  let formData = {
    templateName: value.templateName,
    deviceType: value.deviceType,
    templateParam: value.templateParam,
    deviceIds: value.deviceIds,
  }

  await createOperateTemplateEntity(formData).then(() => {
    ElMessage.success('新增成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    operateMonitorTaskEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handleEditUpdate(value: any) {
  let formData = {
    id: value.id,
    templateName: value.templateName,
    deviceType: value.deviceType,
    templateParam: value.templateParam,
    deviceIds: value.deviceIds,
  }

  await updateOperateTemplateEntity(formData).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    operateMonitorTaskEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handleBindUpdate(value: any) {
  let formData = {
    id: value.id,
    templateName: value.templateName,
    deviceType: value.deviceType,
    templateParam: value.templateParam,
    deviceIds: value.deviceIds,
  }

  await updateOperateTemplateEntity(formData).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    bindDialog.value.visible = false;
    // 刷新表单
    operateMonitorTaskEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获对话框的取消操作
 * @taskParam value
 */
function handleEditCancel() {
  // 隐藏对话框
  editDialog.value.visible = false;
}

/**
 * 捕获对话框的取消操作
 * @taskParam value
 */
function handleBindCancel() {
  // 隐藏对话框
  bindDialog.value.visible = false;
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
    let idList = operateMonitorTaskEntityTableRef.value.getIds();
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
    deleteOperateTemplateEntity(ids).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      operateMonitorTaskEntityTableRef.value.refreshTable(state.queryParams);
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
    <operate-monitor-task-form-header ref="operateMonitorTaskFormHeaderRef"
                                  @create="handleCreateDialog"
                                  @delete="handleDeleteDialog"
                                  @query="handleQuery"
                                  @update="handleUpdateDialog"
                                  @binding="handleBindingDialog"
    />

    <!-- 数据表单：创建/修改 -->
    <operate-monitor-task-entity-table ref="operateMonitorTaskEntityTableRef"
                                   @create="handleCreateDialog"
                                   @delete="handleDeleteDialog"
                                   @update="handleUpdateDialog"
                                   @binding="handleBindingDialog"

    />

    <!-- 设备编辑对话框：创建/修改 -->
    <operate-monitor-task-edit-dialog ref="operateMonitorTaskEditDialogRef" v-model:visible="editDialog.visible"
                                      @cancel="handleEditCancel"
                                      @create="handleEditCreate"
                                      @update="handleEditUpdate"

    />

    <!-- 设备编辑对话框：创建/修改 -->
    <operate-monitor-task-bind-dialog ref="operateMonitorTaskBindDialogRef" v-model:visible="bindDialog.visible"
                                      @cancel="handleBindCancel"
                                      @update="handleBindUpdate"

    />

  </div>
</template>
