<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';

import OperateMethodEditDialog from './components/OperateMethodEditDialog.vue';
import OperateMethodEntityTable from './components/OperateMethodEntityTable.vue';
import OperateMethodFormHeader from './components/OperateMethodFormHeader.vue';

import {getEntity,} from '@/utils/entity';

// 引入设备的API和数据类型
import {
  updateDeviceOperateEntity,
  deleteDeviceOperateEntity,
} from '@/api/device/operate/method';
import {
  DeviceOperateQueryParam,
} from '@/api/device/operate/method/types';


const operateMethodEditDialogRef = ref<any>(); // 这了的变量名称必须和<deviceOperate-edit-dialog>的ref值一样
const operateMethodEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceOperate-edit-dialog>的ref值一样
const operateMethodFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceOperate-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceOperateQueryParam,
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
  operateMethodEntityTableRef.value.refreshTable(queryParams);
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
    let ids = operateMethodEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(operateMethodEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    operateMethodEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;

    return;
  }

  if (source === 'table' && type === 'update') {
    if (value === undefined) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(operateMethodEntityTableRef.value.getEntities(), value);
    // 初始化编辑对话框的数据
    operateMethodEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;
  }
}

/**
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handleUpdate(value: any) {
  let formData = {
    id: value.id,
    deviceType: value.deviceType,
    operateName: value.operateName,
    operateMode: value.operateMode,
    manufacturer: value.manufacturer,
    dataType: value.dataType,
    polling: value.polling,
    pollingTxt: value.pollingTxt,
    timeout: Number(value.timeout),
  }

  await updateDeviceOperateEntity(formData).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    operateMethodEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获对话框的取消操作
 * @taskParam value
 */
function handleCancel(value: any) {
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
    let idList = operateMethodEntityTableRef.value.getIds();
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
    deleteDeviceOperateEntity(ids).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      operateMethodEntityTableRef.value.refreshTable(state.queryParams);
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
    <operate-method-form-header ref="operateMethodFormHeaderRef"
                                @delete="handleDeleteDialog"
                                @query="handleQuery"
                                @update="handleUpdateDialog"
    />

    <!-- 数据表单：创建/修改 -->
    <operate-method-entity-table ref="operateMethodEntityTableRef"
                                 @delete="handleDeleteDialog"
                                 @update="handleUpdateDialog"

    />

    <!-- 设备编辑对话框：创建/修改 -->
    <operate-method-edit-dialog ref="operateMethodEditDialogRef" v-model:visible="editDialog.visible"
                                @cancel="handleCancel"
                                @update="handleUpdate"

    />

  </div>
</template>
