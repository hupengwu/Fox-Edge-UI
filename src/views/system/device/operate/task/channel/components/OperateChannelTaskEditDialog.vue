<script lang="ts">
export default {
  name: "OperateChannelTaskEditDialog"
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

      <!-- 编辑框：任务名称 -->
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="formData.taskName" :disabled="type==='update'"/>
      </el-form-item>

      <!-- 下拉框：任务类型 -->
      <el-form-item label="通道类型" prop="channelType">
        <el-select v-model="formData.channelType" placeholder="请选择"
                   @change="handleSelectChannelType">
          <el-option
            v-for="item in channelTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 下拉框：任务类型 -->
      <el-form-item label="通道名称" prop="channelName">
        <el-select v-model="formData.channelName" placeholder="请选择">
          <el-option
            v-for="item in channelNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 下拉框：参数类型 -->
      <el-form-item label="发送模式" prop="channelName">
        <el-select v-model="formData.sendMode" placeholder="请选择">
          <el-option
            v-for="item in sendModeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 下拉框：参数类型 -->
      <el-form-item label="通信超时" prop="channelName">
        <el-input v-model.number="formData.timeout"/>
      </el-form-item>

      <!-- 下拉框：参数类型 -->
      <el-form-item label="参数类型" prop="channelName">
        <el-select v-model="formData.taskParamType" placeholder="请选择">
          <el-option
            v-for="item in taskParamTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 下拉框：配置参数 -->
      <el-form-item label="模板参数" prop="taskParamJson">
        <el-input v-model="formData.taskParamJson" :autosize="{ minRows: 1, maxRows: 100 }" type="textarea"/>
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
import {
  OperateChannelTaskItem,
  CreateOperateChannelTaskRequestVO, TaskParamObject
} from "@/api/device/operate/task/channel/types";
import {listOption2List, listOption2VLList, listOptionList} from "@/api/option";

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
    channelName: '',
    channelType: '',
    taskName: '',
    taskParam: {},
    taskParamJson: '"    "',
    taskParamType: 'sendTxt',
    sendMode: 'exchange',
    timeout: 2000,
  } as CreateOperateChannelTaskRequestVO,

  // 通道类型选项
  channelTypeOptions: [] as OptionType[],
  // 通道名称选项
  channelNameOptions: [] as OptionType[],
  // 参数类型选项
  taskParamTypeOptions: [] as OptionType[],
  // 发送模式选项
  sendModeOptions: [] as OptionType[],

  // 对话框的各控件输入规则
  rules: {
    taskName: [{required: true, message: '不能为空', trigger: 'blur'}],
    channelName: [{required: true, message: '不能为空', trigger: 'blur'}],
    channelType: [{required: true, message: '不能为空', trigger: 'blur'}],
    taskParamJson: [{required: true, message: '不能为空', trigger: 'blur'}],
    timeout: [{required: true, message: '不能为空', trigger: 'blur'}],
    sendMode: [{required: true, message: '不能为空', trigger: 'blur'}],
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
  channelTypeOptions,
  // 任务名称选项
  channelNameOptions,
  // 发送模式选项
  sendModeOptions,
  // 参数类似选项
  taskParamTypeOptions,
  // 对话框输入约束规则
  rules,
} = toRefs(dataState);

/**
 * 任务类型下拉框
 * @taskParam value
 */
async function handleSelectChannelType(value: any) {
  await listOption2VLList("ChannelEntity", "channelType", value, "channelName", 'channelName', 'channelName').then(({data}) => {
    channelNameOptions.value = data;
  });
}

/**
 * 取消
 */
function handleCancel() {
  //执行调用<operateTemplate-edit-dialog @cancel="cancelEdit">
  emit('cancel', "子组件传给父组件的值");
}

function verifyTaskParam(): boolean {
  if (formData.value.taskName === undefined || formData.value.taskName === '') {
    ElMessage.info('任务名称，不能为空!');
    return false;
  }

  let taskParamObject = {} as TaskParamObject;
  if (formData.value.taskParamType === 'sendTxt') {
    if (!formData.value.taskParamJson?.startsWith('"') || !formData.value.taskParamJson?.endsWith('"')) {
      ElMessage.info('配置参数的格式，不是合法的文本格式!');
      return false;
    }

    taskParamObject.sendTxt = formData.value.taskParamJson?.substring(1, formData.value.taskParamJson?.length - 1) as string;
    taskParamObject.sendMap = undefined;
    taskParamObject.sendList = undefined;
    formData.value.taskParam = taskParamObject;
  }
  if (formData.value.taskParamType === 'sendMap') {
    if (!formData.value.taskParamJson?.startsWith('{') || !formData.value.taskParamJson?.endsWith('}')) {
      ElMessage.info('配置参数的格式，不是合法的JSON格式!');
      return false;
    }

    try {
      taskParamObject.sendTxt = undefined;
      taskParamObject.sendList = undefined;
      taskParamObject.sendMap = JSON.parse(formData.value.taskParamJson as string);
      formData.value.taskParam = taskParamObject;
    } catch (e) {
      ElMessage.info('配置参数的格式，不是合法的JSON格式!');
      return false;
    }
  }
  if (formData.value.taskParamType === 'sendList') {
    if (!formData.value.taskParamJson?.startsWith('[') || !formData.value.taskParamJson?.endsWith(']')) {
      ElMessage.info('配置参数的格式，不是合法的JSON格式!');
      return false;
    }

    try {
      taskParamObject.sendTxt = undefined;
      taskParamObject.sendList = JSON.parse(formData.value.taskParamJson as string);
      taskParamObject.sendMap = undefined;
      formData.value.taskParam = taskParamObject;
    } catch (e) {
      ElMessage.info('配置参数的格式，不是合法的JSON格式!');
      return false;
    }
  }

  // 转成数字
  formData.value.timeout = Number(formData.value.timeout);

  return true;
}

/**
 * 确认：新增/修改实体
 */
function handleSubmit() {
  if (!verifyTaskParam()) {
    return;
  }

  if (type.value === 'create') {
    // 执行调用<operateTemplate-edit-dialog @create="createEdit">的create
    formData.value.taskParamJson = undefined;
    emit('create', formData.value);
  }
  if (type.value === 'update') {
    //执行调用<operateTemplate-edit-dialog @update="updateEdit">
    emit('update', formData.value);
  }
}

/**
 * 初始化对话框
 * @taskParam type 对话框类型
 * @taskParam entity 实体
 */
function initEditData(type: string, entity: OperateChannelTaskItem) {
  if (type === 'create') {
    dataState.type = type;
    dataState.title = '新增配置';

    dataState.formData.id = undefined;
    dataState.formData.taskName = '';
    dataState.formData.channelName = '';
    dataState.formData.channelType = '';
    dataState.formData.taskParam = {};
    dataState.formData.taskParamJson = '"    "';
    dataState.formData.taskParamType = 'sendTxt';
    dataState.formData.sendMode = 'exchange';
    dataState.formData.timeout = 2000;

    nextTick(() => {
      dataFormRef.value.resetFields();
    })

    return;
  }

  if (type === 'update') {
    dataState.type = type;
    dataState.title = '修改配置';

    dataState.formData.id = entity.id;
    dataState.formData.taskName = entity.taskName;
    dataState.formData.channelName = entity.channelName;
    dataState.formData.channelType = entity.channelType;
    dataState.formData.taskParam = entity.taskParam;
    dataState.formData.sendMode = entity.sendMode;
    dataState.formData.timeout = entity.timeout;

    if (entity.taskParam?.sendTxt !== undefined) {
      dataState.formData.taskParamType = 'sendTxt';
      dataState.formData.taskParamJson = JSON.stringify(entity.taskParam?.sendTxt, null, 5);
    }
    if (entity.taskParam?.sendMap !== undefined) {
      dataState.formData.taskParamType = 'sendMap';
      dataState.formData.taskParamJson = JSON.stringify(entity.taskParam?.sendMap, null, 5);
    }
    if (entity.taskParam?.sendList !== undefined) {
      dataState.formData.taskParamType = 'sendList';
      dataState.formData.taskParamJson = JSON.stringify(entity.taskParam?.sendList, null, 5);
    }

    if (entity.channelType !==undefined){
      listOption2List("ChannelEntity", "channelType", entity.channelType as string, "channelName").then(({data}) => {
        channelNameOptions.value = data;
      });
    }

    return;
  }
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 通道类型
  listOptionList("ChannelEntity", "channelType").then(({data}) => {
    channelTypeOptions.value = data;
  });

  // 参数类型
  taskParamTypeOptions.value = [];
  taskParamTypeOptions.value.push({value: 'sendTxt', label: 'sendTxt'});
  taskParamTypeOptions.value.push({value: 'sendMap', label: 'sendMap'});
  taskParamTypeOptions.value.push({value: 'sendList', label: 'sendList'});

  // 发送模式
  sendModeOptions.value = [];
  sendModeOptions.value.push({value: 'exchange', label: 'exchange'});
  sendModeOptions.value.push({value: 'publish', label: 'publish'});
});

</script>
