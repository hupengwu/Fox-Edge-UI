<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';

import UserPwdDialog from './components/UserPwdDialog.vue';
import UserEditDialog from './components/UserEditDialog.vue';
import UserEntityTable from './components/UserEntityTable.vue';
import UserFormHeader from './components/UserFormHeader.vue';

import {getEntity,} from '@/utils/entity';

// 引入设备的API和数据类型
import {
  updateUserEntity,
  createUserEntity,
  deleteUserEntity, updateUserPassword,
} from '@/api/user';
import {
  UserQueryParam,
} from '@/api/user/types';

const userPwdDialogRef = ref<any>(); // 这了的变量名称必须和<user-edit-dialog>的ref值一样
const userEditDialogRef = ref<any>(); // 这了的变量名称必须和<user-edit-dialog>的ref值一样
const userEntityTableRef = ref<any>(); // 这了的变量名称必须和<user-edit-dialog>的ref值一样
const userFormHeaderRef = ref<any>(); // 这了的变量名称必须和<user-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as UserQueryParam,
  // 对话框状态
  editDialog: {
    visible: false,
  },
  // 对话框状态
  pwdDialog: {
    visible: false,
  },
});

const {
  // 查询参数
  queryParams,
  // 对话框状态
  editDialog,
  // 对话框状态
  pwdDialog,
} = toRefs(state);


/**
 * 响应查询按钮：页查询数据
 */
function handleQuery(source: string, value: any) {
  queryParams.value = value;
  userEntityTableRef.value.refreshTable(queryParams);
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
    let ids = userEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(userEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    userEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;

    return;
  }

  if (source === 'table' && type === 'update') {
    if (value === undefined) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(userEntityTableRef.value.getEntities(), value);
    // 初始化编辑对话框的数据
    userEditDialogRef.value.initEditData(type, entity);
    // 显示对话框
    editDialog.value.visible = true;
  }
}

function handleCreateDialog(source: string, type: any) {
  // 创建对话框
  if (source === 'header' && type === 'create') {
    editDialog.value.visible = true;
    userEditDialogRef.value.initEditData(type, undefined);
    return;
  }
}

/**
 * 捕获按钮的打开对话框操作：create/update
 * @taskParam source
 * @taskParam type
 * @taskParam value
 */
function handleUpdatePwdDialog(source: string, type: any, value: any) {
  // 更新对话框
  if (source === 'header' && type === 'update') {
    let ids = userEntityTableRef.value.getIds();
    if (ids === undefined || ids.length === 0) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(userEntityTableRef.value.getEntities(), ids[0]);
    // 初始化编辑对话框的数据
    userPwdDialogRef.value.initEditData(type, entity);
    // 显示对话框
    pwdDialog.value.visible = true;

    return;
  }

  if (source === 'table' && type === 'update') {
    if (value === undefined) {
      return;
    }

    // 取出选中的元素
    let entity = getEntity(userEntityTableRef.value.getEntities(), value);
    // 初始化编辑对话框的数据
    userPwdDialogRef.value.initEditData(type, entity);
    // 显示对话框
    pwdDialog.value.visible = true;
  }
}

/**
 * 捕获来自对话框的创建操作
 * @taskParam value
 */
async function handleCreate(value: any) {
  let formData = {
    username: value.username,
    password: value.password,
    role: value.role,
    permission: value.permission,
    menu: value.menu,
  }

  await createUserEntity(formData).then(() => {
    ElMessage.success('新增成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    userEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handleUpdate(value: any) {
  let formData = {
    id: value.id,
    username: value.username,
    password: value.password,
    role: value.role,
    permission: value.permission,
    menu: value.menu,
  }

  await updateUserEntity(formData).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    editDialog.value.visible = false;
    // 刷新表单
    userEntityTableRef.value.refreshTable(state.queryParams);
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
 * 捕获来自对话框的更新操作
 * @taskParam value
 */
async function handlePwdUpdate(value: any) {
  let formData = {
    id: value.id,
    username: value.username,
    oldPassword: value.oldPassword,
    newPassword: value.newPassword,
  }

  await updateUserPassword(formData).then(() => {
    ElMessage.success('更新成功');
    // 隐藏对话框
    pwdDialog.value.visible = false;
    // 刷新表单
    userEntityTableRef.value.refreshTable(state.queryParams);
  })
}

/**
 * 捕获对话框的取消操作
 * @taskParam value
 */
function handlePwdCancel() {
  // 隐藏对话框
  pwdDialog.value.visible = false;
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
    let idList = userEntityTableRef.value.getIds();
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
    deleteUserEntity(ids).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      userEntityTableRef.value.refreshTable(state.queryParams);
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
    <user-form-header ref="userFormHeaderRef"
                      @create="handleCreateDialog"
                      @delete="handleDeleteDialog"
                      @password="handleUpdatePwdDialog"
                      @query="handleQuery"
                      @update="handleUpdateDialog"
    />

    <!-- 数据表单：创建/修改 -->
    <user-entity-table ref="userEntityTableRef"
                       @create="handleCreateDialog"
                       @delete="handleDeleteDialog"
                       @update="handleUpdateDialog"

    />

    <!-- 设备编辑对话框：创建/修改 -->
    <user-edit-dialog ref="userEditDialogRef" v-model:visible="editDialog.visible"
                      @cancel="handleCancel"
                      @create="handleCreate"
                      @update="handleUpdate"

    />

    <!-- 设备编辑对话框：创建/修改 -->
    <user-pwd-dialog ref="userPwdDialogRef" v-model:visible="pwdDialog.visible"
                     @cancel="handlePwdCancel"
                     @update="handlePwdUpdate"

    />

  </div>
</template>
