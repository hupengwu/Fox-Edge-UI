<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';

import TriggerConfigEditDialog from './components/TriggerConfigEditDialog.vue';
import TriggerConfigEntityTable from './components/TriggerConfigEntityTable.vue';
import TriggerConfigFormHeader from './components/TriggerConfigFormHeader.vue';

import {getEntity,} from '@/utils/entity';

// 引入设备的API和数据类型
import {
  updateTriggerConfigEntity,
  createTriggerConfigEntity,
  deleteTriggerConfigEntity,
} from '@/api/device/trigger/config';
import {
  TriggerConfigQueryParam,
} from '@/api/device/trigger/config/types';


const triggerConfigEditDialogRef = ref<any>(); // 这了的变量名称必须和<triggerConfig-edit-dialog>的ref值一样
const triggerConfigEntityTableRef = ref<any>(); // 这了的变量名称必须和<triggerConfig-edit-dialog>的ref值一样
const triggerConfigFormHeaderRef = ref<any>(); // 这了的变量名称必须和<triggerConfig-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as TriggerConfigQueryParam,
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
  triggerConfigEntityTableRef.value.refreshTable(queryParams);
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
    let ids = triggerConfigEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(triggerConfigEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    triggerConfigEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;

    return;
  }

  if (source === 'table' && type === 'update') {
    if (value === undefined) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(triggerConfigEntityTableRef.value.getEntities(), value);
    // 初始化编辑对话框的数据
    triggerConfigEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;
  }
}

function handleCreateDialog(source: string, type: any) {
  // 创建对话框
  if (source === 'header' && type === 'create') {
    editDialog.value.visible = true;
    triggerConfigEditDialogRef.value.initEditData(type, undefined);
    return;
  }
}

/**
 * 捕获来自对话框的创建操作
 * @taskParam value
 */
async function handleCreate(value: any) {
  let formData = {
    deviceType: value.deviceType,
    triggerMethodName: value.triggerMethodName,
    triggerModelName: value.triggerModelName,
    objectRange: value.objectRange,
    queueDeep: Number(value.queueDeep),
    triggerConfigName: value.triggerConfigName,
    deviceName: value.deviceName,
    params: value.params,
    paramsJson: value.paramsJson,
    objectList: value.objectList,
    objectListJson: value.objectListJson,
  }

  await createTriggerConfigEntity(formData).then(() => {
    ElMessage.success('新增成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    triggerConfigEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handleUpdate(value: any) {
  let formData = {
    id: value.id,
    deviceType: value.deviceType,
    triggerMethodName: value.triggerMethodName,
    triggerModelName: value.triggerModelName,
    objectRange: value.objectRange,
    queueDeep: Number(value.queueDeep),
    triggerConfigName: value.triggerConfigName,
    deviceName: value.deviceName,
    params: value.params,
    paramsJson: value.paramsJson,
    objectList: value.objectList,
    objectListJson: value.objectListJson,
  }

  await updateTriggerConfigEntity(formData).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    triggerConfigEntityTableRef.value.refreshTable(state.queryParams);
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
    let idList = triggerConfigEntityTableRef.value.getIds();
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
    deleteTriggerConfigEntity(ids).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      triggerConfigEntityTableRef.value.refreshTable(state.queryParams);
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
    <trigger-config-form-header ref="triggerConfigFormHeaderRef"
                                @create="handleCreateDialog"
                                @delete="handleDeleteDialog"
                                @query="handleQuery"
                                @update="handleUpdateDialog"
    />

    <!-- 数据表单：创建/修改 -->
    <trigger-config-entity-table ref="triggerConfigEntityTableRef"
                                 @create="handleCreateDialog"
                                 @delete="handleDeleteDialog"
                                 @update="handleUpdateDialog"

    />

    <!-- 设备编辑对话框：创建/修改 -->
    <trigger-config-edit-dialog ref="triggerConfigEditDialogRef" v-model:visible="editDialog.visible"
                                @cancel="handleCancel"
                                @create="handleCreate"
                                @update="handleUpdate"

    />

  </div>
</template>
