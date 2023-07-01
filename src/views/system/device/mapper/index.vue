<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';


import DeviceMapperEditDialog from './components/DeviceMapperEditDialog.vue';
import DeviceMapperEntityTable from './components/DeviceMapperEntityTable.vue';
import DeviceMapperFormHeader from './components/DeviceMapperFormHeader.vue';


// 引入设备的API和数据类型
import {
  DeviceMapperItem,
  DeviceMapperQueryParam,
} from '@/api/device/mapper/types';
import {ElMessage, ElMessageBox} from "element-plus";
import {deleteDeviceMapperEntity, updateDeviceMapperEntity} from "@/api/device/mapper";

const deviceMapperEditDialogRef = ref<any>(); // 这了的变量名称必须和<deviceMapper-edit-dialog>的ref值一样
const deviceMapperEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceMapper-edit-dialog>的ref值一样
const deviceMapperFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceMapper-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceMapperQueryParam,
  // 对话框状态
  editDialog: {
    visible: false,
  }
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
  deviceMapperEntityTableRef.value.refreshTable(queryParams);
}

/**
 * 捕获删除对话框消息
 * @taskParam source 发出消息的数据来源：button/table
 * @taskParam type 操作类型：delete
 * @taskParam row 行信息
 */
function handleDeleteDialog(source: string, type: string, row: any) {
  let selects = [] as any;
  if (source === 'table') {
    selects.push(row);
  }
  if (source === 'header') {
    let idList = deviceMapperEntityTableRef.value.getSelects();
    if (idList.length === 0) {
      return;
    }

    selects = idList;
  }

  if (selects.length === 0) {
    return;
  }

  let services = [] as any;
  for (let item of selects) {
    let data = item.id;
    services.push(data);
  }

  ElMessageBox.confirm('确认删除已选中的数据项的缓存?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteDeviceMapperEntity(services).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      deviceMapperEntityTableRef.value.refreshTable(state.queryParams);
    });
  })
    .catch(() => ElMessage.info('已取消删除'));
}

/**
 * 捕获按钮的打开对话框操作：create/update
 * @taskParam source
 * @taskParam type
 * @taskParam value
 */
function handleUpdateDialog(source: string, type: any, row: any) {
  let selects = [] as any;
  if (source === 'table') {
    selects.push(row);
  }
  if (source === 'header') {
    let idList = deviceMapperEntityTableRef.value.getSelects();
    if (idList.length === 0) {
      return;
    }

    selects = idList;
  }

  if (selects.length === 0) {
    return;
  }

  let services = [] as any;
  for (let item of selects) {
    services.push(item);
  }

  // 初始化编辑对话框的数据
  deviceMapperEditDialogRef.value.initEditData(type, services);
  // 显示对话框
  editDialog.value.visible = true;
}

/**
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handleUpdate(value: any, rows: DeviceMapperItem[]) {
  let data = [] as DeviceMapperItem[];
  for (let row of rows) {
    // 如果是多条记录：只修改映射模式
    if (rows.length > 1) {
      row.mapperMode = Number.parseInt(value.mapperMode);
      data.push(row);
    }
    // 如果是1条记录：修改映射模式和映射名称
    if (rows.length === 1) {
      row.mapperName = value.mapperName;
      row.mapperMode = Number.parseInt(value.mapperMode);
      data.push(row);
    }
  }

  await updateDeviceMapperEntity(data).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    deviceMapperEntityTableRef.value.refreshTable(state.queryParams);
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
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
});
</script>

<template>
  <div class="app-container">

    <!-- 表单头：各种按钮 -->
    <device-mapper-form-header ref="deviceMapperFormHeaderRef"
                               @delete="handleDeleteDialog"
                               @query="handleQuery"
                               @update="handleUpdateDialog"
    />

    <!-- 数据表单：创建/修改 -->
    <device-mapper-entity-table ref="deviceMapperEntityTableRef"
                                @delete="handleDeleteDialog"
                                @update="handleUpdateDialog"
    />

    <!-- 设备编辑对话框：创建/修改 -->
    <device-mapper-edit-dialog ref="deviceMapperEditDialogRef" v-model:visible="editDialog.visible"
                               @cancel="handleCancel"
                               @update="handleUpdate"

    />


  </div>
</template>
