<script lang="ts">
export default {
  name: "UserEditDialog"
}
</script>

<!--
 * @Descripttion: 用户编辑对话框
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
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="formData.username" :disabled="type==='update'"/>
      </el-form-item>

      <!-- 下拉框：用户类型 -->
      <el-form-item label="用户菜单" prop="menu">
        <el-select v-model="formData.menu" placeholder="请选择">
          <el-option
            v-for="item in menuOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 通道类型和通道名称 -->
      <el-form-item label="用户权限" prop="permission">
        <el-select v-model="formData.permission" placeholder="请选择">
          <el-option
            v-for="item in permissionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-form-item label="用户角色" prop="role">
          <el-select v-model="formData.role" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
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

import {ElForm} from "element-plus";
import {UserItem, CreateUserRequestVO} from "@/api/user/types";
import {listOptionList} from "@/api/user/option";

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
  title: '添加用户',
  // 表单数据
  formData: {
    id: undefined,
    username: '',
    password: '',
    role: '',
    permission: '',
    menu: '',
  } as CreateUserRequestVO,

  // 用户类型选项
  menuOptions: [] as OptionType[],
  // 通道类型选项
  permissionOptions: [] as OptionType[],
  // 通道名称选项
  roleOptions: [] as OptionType[],

  // 对话框的各控件输入规则
  rules: {
    username: [{required: true, message: '用户名称不能为空', trigger: 'blur'}],
    role: [{required: true, message: '用户角色不能为空', trigger: 'blur'}],
    permission: [{required: true, message: '用户权限不能为空', trigger: 'blur'}],
    menu: [{required: true, message: '用户菜单不能为空', trigger: 'blur'}],
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
  // 通道用户类型选项
  menuOptions,
  // 通道类型选项
  permissionOptions,
  // 通道名称选项
  roleOptions,
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
    dataState.title = '新增用户';

    dataState.formData.id = undefined;
    dataState.formData.username = '';
    dataState.formData.password = '';
    dataState.formData.role = '';
    dataState.formData.permission = '';
    dataState.formData.menu = '';

    nextTick(() => {
      dataFormRef.value.resetFields();
    })
    return;
  }

  if (type === 'update') {
    dataState.type = type;
    dataState.title = '修改用户';

    dataState.formData.id = entity.id;
    dataState.formData.username = entity.username;
    dataState.formData.password = entity.password;
    dataState.formData.role = entity.role;
    dataState.formData.permission = entity.permission;
    dataState.formData.menu = entity.menu;
    return;
  }
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询用户类型选项，并保存在产量区
  menuOptions.value = listOptionList("menu");
  permissionOptions.value = listOptionList("permission");
  roleOptions.value = listOptionList("role");
});

</script>
