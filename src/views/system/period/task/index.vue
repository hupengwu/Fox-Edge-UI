<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';

import PeriodTaskBindDeviceDialog from './components/PeriodTaskBindDeviceDialog.vue';
import PeriodTaskBindObjectDialog from './components/PeriodTaskBindObjectDialog.vue';
import PeriodTaskEditDialog from './components/PeriodTaskEditDialog.vue';
import PeriodTaskEntityTable from './components/PeriodTaskEntityTable.vue';
import PeriodTaskFormHeader from './components/PeriodTaskFormHeader.vue';

import {getEntity,} from '@/utils/entity';

// 引入设备的API和数据类型
import {
  updatePeriodTaskEntity,
  createPeriodTaskEntity,
  deletePeriodTaskEntity,
} from '@/api/period/task';
import {
  PeriodTaskQueryParam,
} from '@/api/period/task/types';

const periodTaskBindDeviceDialogRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样
const periodTaskBindObjectDialogRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样
const periodTaskEditDialogRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样
const periodTaskEntityTableRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样
const periodTaskFormHeaderRef = ref<any>(); // 这了的变量名称必须和<operateTemplate-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as PeriodTaskQueryParam,
  // 对话框状态
  editDialog: {
    visible: false,
  },
  // 对话框状态
  bindDeviceDialog: {
    visible: false,
  },
  // 对话框状态
  bindObjectDialog: {
    visible: false,
  },
});

const {
  // 查询参数
  queryParams,
  // 对话框状态
  editDialog,
  // 对话框状态
  bindDeviceDialog,
  // 对话框状态
  bindObjectDialog,
} = toRefs(state);


/**
 * 响应查询按钮：页查询数据
 */
function handleQuery(source: string, value: any) {
  queryParams.value = value;
  periodTaskEntityTableRef.value.refreshTable(queryParams);
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
    let ids = periodTaskEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(periodTaskEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    periodTaskEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;

    return;
  }

  if (source === 'table' && type === 'update') {
    if (value === undefined) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(periodTaskEntityTableRef.value.getEntities(), value);
    // 初始化编辑对话框的数据
    periodTaskEditDialogRef.value.initEditData(type, entity);
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
  if (source === 'header' && type === 'device') {
    let ids = periodTaskEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(periodTaskEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    periodTaskBindDeviceDialogRef.value.initEditData(type, entity);
    // 显示对话框
    bindDeviceDialog.value.visible = true;
    bindObjectDialog.value.visible = false;

    return;
  }

  if (source === 'header' && type === 'object') {
    let ids = periodTaskEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(periodTaskEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    periodTaskBindObjectDialogRef.value.initEditData(type, entity);
    // 显示对话框
    bindDeviceDialog.value.visible = false;
    bindObjectDialog.value.visible = true;

    return;
  }

  if (source === 'table' && type === 'device') {
    if (value === undefined) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(periodTaskEntityTableRef.value.getEntities(), value);
    // 初始化编辑对话框的数据
    periodTaskBindDeviceDialogRef.value.initEditData(type, entity);
    // 显示对话框
    bindDeviceDialog.value.visible = true;
    bindObjectDialog.value.visible = false;
  }
}

function handleCreateDialog(source: string, type: any) {
  // 创建对话框
  if (source === 'header' && type === 'create') {
    let ids = periodTaskEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      editDialog.value.visible = true;
      periodTaskEditDialogRef.value.initEditData(type, undefined);
      return;
    }

    // 取出选中的元素
    let entity = getEntity(periodTaskEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    periodTaskEditDialogRef.value.initEditData(type, entity);
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
    taskName: value.taskName,
    deviceType: value.deviceType,
    taskParam: value.taskParam,
    selectDevice: value.selectDevice,
    deviceIds: value.deviceIds,
  }

  await createPeriodTaskEntity(formData).then(() => {
    ElMessage.success('新增成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    periodTaskEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handleEditUpdate(value: any) {
  let formData = {
    id: value.id,
    taskName: value.taskName,
    deviceType: value.deviceType,
    taskParam: value.taskParam,
    selectDevice: value.selectDevice,
    deviceIds: value.deviceIds,
  }

  await updatePeriodTaskEntity(formData).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    periodTaskEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handleBindDeviceUpdate(value: any) {
  let formData = {
    id: value.id,
    taskName: value.taskName,
    deviceType: value.deviceType,
    selectDevice: value.selectDevice,
    taskParam: value.taskParam,
    deviceIds: value.deviceIds,
  }

  await updatePeriodTaskEntity(formData).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    bindDeviceDialog.value.visible = false;
    // 刷新表单
    periodTaskEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handleBindObjectUpdate(value: any) {
  let formData = {
    id: value.id,
    taskName: value.taskName,
    deviceType: value.deviceType,
    taskParam: value.taskParam,
    selectDevice: value.selectDevice,
    deviceIds: value.deviceIds,
    objectIds: value.objectIds,
  }

  await updatePeriodTaskEntity(formData).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    bindObjectDialog.value.visible = false;
    // 刷新表单
    periodTaskEntityTableRef.value.refreshTable(state.queryParams);
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
function handleBindDeviceCancel() {
  // 隐藏对话框
  bindDeviceDialog.value.visible = false;
}

/**
 * 捕获对话框的取消操作
 * @taskParam value
 */
function handleBindObjectCancel() {
  // 隐藏对话框
  bindObjectDialog.value.visible = false;
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
    let idList = periodTaskEntityTableRef.value.getIds();
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
    deletePeriodTaskEntity(ids).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      periodTaskEntityTableRef.value.refreshTable(state.queryParams);
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
    <period-task-form-header ref="periodTaskFormHeaderRef"
                                  @create="handleCreateDialog"
                                  @delete="handleDeleteDialog"
                                  @query="handleQuery"
                                  @update="handleUpdateDialog"
                                  @binding="handleBindingDialog"
    />

    <!-- 数据表单：创建/修改 -->
    <period-task-entity-table ref="periodTaskEntityTableRef"
                                   @create="handleCreateDialog"
                                   @delete="handleDeleteDialog"
                                   @update="handleUpdateDialog"
                                   @binding="handleBindingDialog"

    />

    <!-- 设备编辑对话框：创建/修改 -->
    <period-task-edit-dialog ref="periodTaskEditDialogRef" v-model:visible="editDialog.visible"
                                      @cancel="handleEditCancel"
                                      @create="handleEditCreate"
                                      @update="handleEditUpdate"

    />

    <!-- 设备编辑对话框：创建/修改 -->
    <period-task-bind-device-dialog ref="periodTaskBindDeviceDialogRef" v-model:visible="bindDeviceDialog.visible"
                                      @cancel="handleBindDeviceCancel"
                                      @update="handleBindDeviceUpdate"

    />

    <!-- 设备编辑对话框：创建/修改 -->
    <period-task-bind-object-dialog ref="periodTaskBindObjectDialogRef" v-model:visible="bindObjectDialog.visible"
                                    @cancel="handleBindObjectCancel"
                                    @update="handleBindObjectUpdate"

    />

  </div>
</template>
