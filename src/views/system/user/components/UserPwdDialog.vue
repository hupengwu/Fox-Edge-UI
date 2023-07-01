<script lang="ts">
export default {
  name: "UserPwdDialog"
}
</script>

<!--
 * @Descripttion: 设备编辑对话框
 * @version:
 * @Author: hupengwu
 * @Date: 2022-10-24 09:10:28
 * @LastEditors: hupengwu
 * @LastEditTime: 2022-10-24 09:10:28
-->
<template>
  <!-- 对话框 -->
  <el-dialog :close-on-click-modal="false" :model-value="visible" :title="title" min-width="200px"
             @close="handleCancel">

    <!-- 数据表单 -->
    <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">

      <!-- 编辑框：用户名称 -->
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="formData.username" :disabled="type==='update'"/>
      </el-form-item>


      <!-- 编辑框：用户密码 -->
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="formData.oldPassword" :type="['password']"/>
      </el-form-item>

      <!-- 编辑框：用户密码 -->
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="formData.newPassword" :type="['password']"/>
      </el-form-item>

      <!-- 编辑框：用户密码 -->
      <el-form-item label="新密码" prop="newPasswordAgain">
        <el-input v-model="formData.newPasswordAgain" :type="['password']"/>
      </el-form-item>

    </el-form>

    <!-- 脚部：确认/取消按钮-->
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, reactive, ref, toRefs} from "vue";

import {ElForm, ElMessage} from "element-plus";
import {UserItem, UpdatePasswordRequestVO} from "@/api/user/types";


const props = defineProps(['visible']);
const emit = defineEmits(['create', 'update', 'cancel']); //注意：这个是父组件<dict-type-edit>标签上的@close
const dataFormRef = ref(ElForm); // 属性名必须和元素的ref属性值一致

/**
 * 对外声明接口：父页面可以调用它
 */
defineExpose({initEditData});

// 数据状态：定义
let dataState = reactive({
  // 类型：create/update
  type: 'create',
  // 标题
  title: '添加设备',
  // 表单数据
  formData: {
    username: '',
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: '',
  } as UpdatePasswordRequestVO,

  // 对话框的各控件输入规则
  rules: {
    username: [{required: true, message: '用户名称不能为空', trigger: 'blur'}],
    oldPassword: [{required: true, message: '用户密码不能为空', trigger: 'blur'}],
    newPassword: [{required: true, message: '用户密码不能为空', trigger: 'blur'}],
    newPasswordAgain: [{required: true, message: '用户密码不能为空', trigger: 'blur'}],
  },
});

// 数据状态：双向引用
const {
  // 类型：create/update
  type,
  // 标题
  title,
  //表单数据
  formData,
  // 对话框输入约束规则
  rules,
} = toRefs(dataState);


/**
 * 取消
 */
function handleCancel() {
  //执行调用<user-edit-dialog @cancel="cancelEdit">
  emit('cancel', "子组件传给父组件的值");
}

/**
 * 确认：新增/修改实体
 */
function handleSubmit() {
  if (formData.value.newPassword === formData.value.oldPassword) {
    ElMessage.info('新旧密码相同!');
    return;
  }
  if (formData.value.newPassword !== formData.value.newPasswordAgain) {
    ElMessage.info('两次新密码不一致!');
    return;
  }
  if (formData.value.oldPassword === '') {
    ElMessage.info('密码不能为空!');
    return;
  }
  if (formData.value.newPassword === '') {
    ElMessage.info('密码不能为空!');
    return;
  }

  if (type.value === 'create') {
    // 执行调用<user-edit-dialog @create="createEdit">的create
    emit('create', formData.value);
  }
  if (type.value === 'update') {
    //执行调用<user-edit-dialog @update="updateEdit">
    emit('update', formData.value);
  }

}

/**
 * 初始化对话框
 * @taskParam type 对话框类型
 * @taskParam entity 实体
 */
function initEditData(type: string, entity: UserItem) {
  if (type === 'create') {
    dataState.type = type;
    dataState.title = '新增密码';

    dataState.formData.username = '';
    dataState.formData.oldPassword = '';
    dataState.formData.newPassword = '';
    dataState.formData.newPasswordAgain = '';

    nextTick(() => {
      dataFormRef.value.resetFields();
    })
    return;
  }

  if (type === 'update') {
    dataState.type = type;
    dataState.title = '修改密码';

    dataState.formData.username = entity.username;
    dataState.formData.oldPassword = '';
    dataState.formData.newPassword = '';
    dataState.formData.newPasswordAgain = '';
    return;
  }
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
});

</script>
