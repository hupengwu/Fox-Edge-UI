<script lang="ts">
export default {
  name: "ParamTemplateEditDialog"
}
</script>

<!--
 * @Descripttion: 编辑对话框
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

      <!-- 编辑框：配置名称 -->
      <el-form-item label="模板名称" prop="taskName">
        <el-input v-model="formData.templateName" :disabled="type==='update'"/>
      </el-form-item>

      <!-- 下拉框：配置类型 -->
      <el-form-item label="模板类型" prop="templateType">
        <el-select v-model="formData.templateType" :disabled="type==='update'" placeholder="请选择">
          <el-option
            v-for="item in templateTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 下拉框：配置参数 -->
      <el-form-item label="模板参数" prop="taskParamJson">
        <el-input v-model="formData.templateParamJson" :autosize="{ minRows: 1, maxRows: 100 }" type="textarea"/>
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
import {ParamTemplateItem, CreateParamTemplateRequestVO} from "@/api/param/template/types";
import {listOptionList} from "@/api/param/template/option";

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
  title: '添加模板',
  // 表单数据
  formData: {
    id: undefined,
    templateType: '',
    templateName: '',
    templateParam: {},
    templateParamJson: '{}',
  } as CreateParamTemplateRequestVO,

  // 配置类型选项
  templateTypeOptions: [] as OptionType[],

  // 对话框的各控件输入规则
  rules: {
    deviceName: [{required: true, message: '模板名称不能为空', trigger: 'blur'}],
    deviceType: [{required: true, message: '模板类型不能为空', trigger: 'blur'}],
    configParamJson: [{required: true, message: '模板参数不能为空', trigger: 'blur'}],
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
  // 配置类型选项
  templateTypeOptions,
  // 对话框输入约束规则
  rules,
} = toRefs(dataState);

/**
 * 取消
 */
function handleCancel() {
  //执行调用<paramTemplate-edit-dialog @cancel="cancelEdit">
  emit('cancel', "子组件传给父组件的值");
}

/**
 * 确认：新增/修改实体
 */
function handleSubmit() {
  try {
    formData.value.templateParam = JSON.parse(formData.value.templateParamJson as string);
  } catch (e) {
    ElMessage.info('配置参数的格式，不是合法的JSON格式!');
    return;
  }

  if (type.value === 'create') {
    // 执行调用<paramTemplate-edit-dialog @create="createEdit">的create
    emit('create', formData.value);
  }
  if (type.value === 'update') {
    //执行调用<paramTemplate-edit-dialog @update="updateEdit">
    emit('update', formData.value);
  }
}

/**
 * 初始化对话框
 * @taskParam type 对话框类型
 * @taskParam entity 实体
 */
function initEditData(type: string, entity: ParamTemplateItem) {
  if (type === 'create') {
    dataState.type = type;
    dataState.title = '新增配置';

    dataState.formData.id = undefined;
    dataState.formData.templateName = '';
    dataState.formData.templateType = '';
    dataState.formData.templateParam = {};
    dataState.formData.templateParamJson = '{}';


    nextTick(() => {
      dataFormRef.value.resetFields();
    })

    return;
  }

  if (type === 'update') {
    dataState.type = type;
    dataState.title = '修改配置';

    dataState.formData.id = entity.id;
    dataState.formData.templateName = entity.templateName;
    dataState.formData.templateType = entity.templateType;
    dataState.formData.templateParam = entity.templateParam;
    dataState.formData.templateParamJson = JSON.stringify(entity.templateParam, null, 5);

    return;
  }
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  templateTypeOptions.value = listOptionList("templateType");
});

</script>
