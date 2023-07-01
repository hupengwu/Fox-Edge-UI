<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';

import ParamTemplateEditDialog from './components/ParamTemplateEditDialog.vue';
import ParamTemplateEntityTable from './components/ParamTemplateEntityTable.vue';
import ParamTemplateFormHeader from './components/ParamTemplateFormHeader.vue';

import {getEntity,} from '@/utils/entity';

// 引入设备的API和数据类型
import {
  updateParamTemplateEntity,
  createParamTemplateEntity,
  deleteParamTemplateEntity,
} from '@/api/param/template';
import {
  ParamTemplateQueryParam,
} from '@/api/param/template/types';


const paramTemplateEditDialogRef = ref<any>(); // 这了的变量名称必须和<paramTemplate-edit-dialog>的ref值一样
const paramTemplateEntityTableRef = ref<any>(); // 这了的变量名称必须和<paramTemplate-edit-dialog>的ref值一样
const paramTemplateFormHeaderRef = ref<any>(); // 这了的变量名称必须和<paramTemplate-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as ParamTemplateQueryParam,
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
  paramTemplateEntityTableRef.value.refreshTable(queryParams);
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
    let ids = paramTemplateEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(paramTemplateEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    paramTemplateEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;

    return;
  }

  if (source === 'table' && type === 'update') {
    if (value === undefined) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(paramTemplateEntityTableRef.value.getEntities(), value);
    // 初始化编辑对话框的数据
    paramTemplateEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;
  }
}

function handleCreateDialog(source: string, type: any) {
  // 创建对话框
  if (source === 'header' && type === 'create') {
    editDialog.value.visible = true;
    paramTemplateEditDialogRef.value.initEditData(type, undefined);
    return;
  }
}

/**
 * 捕获来自对话框的创建操作
 * @taskParam value
 */
async function handleCreate(value: any) {
  let formData = {
    templateName: value.taskName,
    templateType: value.templateType,
    templateParam: value.taskParam,
    templateParamJson: value.taskParamJson,
  }

  await createParamTemplateEntity(formData).then(() => {
    ElMessage.success('新增成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    paramTemplateEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handleUpdate(value: any) {
  let formData = {
    id: value.id,
    templateName: value.taskName,
    templateType: value.templateType,
    templateParam: value.taskParam,
  }

  await updateParamTemplateEntity(formData).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    paramTemplateEntityTableRef.value.refreshTable(state.queryParams);
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
    let idList = paramTemplateEntityTableRef.value.getIds();
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
    deleteParamTemplateEntity(ids).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      paramTemplateEntityTableRef.value.refreshTable(state.queryParams);
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
    <param-template-form-header ref="paramTemplateFormHeaderRef"
                                @create="handleCreateDialog"
                                @delete="handleDeleteDialog"
                                @query="handleQuery"
                                @update="handleUpdateDialog"
    />

    <!-- 数据表单：创建/修改 -->
    <param-template-entity-table ref="paramTemplateEntityTableRef"
                                 @create="handleCreateDialog"
                                 @delete="handleDeleteDialog"
                                 @update="handleUpdateDialog"

    />

    <!-- 设备编辑对话框：创建/修改 -->
    <param-template-edit-dialog ref="paramTemplateEditDialogRef" v-model:visible="editDialog.visible"
                                @cancel="handleCancel"
                                @create="handleCreate"
                                @update="handleUpdate"

    />

  </div>
</template>
