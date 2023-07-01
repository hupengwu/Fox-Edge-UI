<script lang="ts">
export default {
  name: "TriggerConfigEditDialog"
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
      <el-form-item label="配置名称" prop="triggerConfigName">
        <el-input v-model="formData.triggerConfigName"/>
      </el-form-item>

      <!-- 下拉框：配置类型 -->
      <el-form-item label="对象范围" prop="objectRange">
        <el-select v-model="formData.objectRange" placeholder="请选择">
          <el-option
            v-for="item in objectRangeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 下拉框：设备名称 -->
      <el-form-item label="设备类型" prop="deviceType">
        <el-select v-model="formData.deviceType" placeholder="请选择" @change="handleSelectDeviceType">
          <el-option
            v-for="item in deviceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 下拉框：设备名称 -->
      <el-form-item label="设备名称" prop="deviceName">
        <el-select v-model="formData.deviceName" placeholder="请选择">
          <el-option
            v-for="item in deviceNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>


      <!-- 下拉框：对象列表 -->
      <el-form-item label="对象列表" prop="objectListJson">
        <el-input v-model="formData.objectListJson" :autosize="{ minRows: 1, maxRows: 100 }" type="textarea"/>
      </el-form-item>


      <!-- 下拉框：设备类型 -->
      <el-form-item label="模块名称" prop="triggerModelName">
        <el-select v-model="formData.triggerModelName" placeholder="请选择" @change="handleSelectModelName">
          <el-option
            v-for="item in modelNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 通道类型和通道名称 -->
      <el-form-item label="方法名称" prop="channelType">
        <el-select v-model="formData.triggerMethodName" placeholder="请选择">
          <el-option
            v-for="item in methodNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 下拉框：队列深度 -->
      <el-form-item label="队列深度" prop="queueDeep">
        <el-input v-model="formData.queueDeep" :autosize="{ minRows: 1, maxRows: 100 }" type="textarea"/>
      </el-form-item>

      <!-- 下拉框：队列深度 -->
      <el-form-item label="配置参数" prop="paramsJson">
        <el-input v-model="formData.paramsJson" :autosize="{ minRows: 1, maxRows: 100 }" type="textarea"/>
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
import {TriggerConfigItem, CreateTriggerConfigRequestVO} from "@/api/device/trigger/config/types";
import {listOptionList, listOption2List} from "@/api/option";
import {listTriggerOptionList} from "@/api/device/trigger/config/triggerOption";

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
    id: undefined,
    deviceType: '',
    triggerMethodName: '',
    triggerModelName: '',
    objectRange: '',
    queueDeep: 1 as number,
    triggerConfigName: '',
    deviceName: '',
    params: {},
    paramsJson: '{}',
    objectList: [],
    objectListJson: '[]',
  } as CreateTriggerConfigRequestVO,

  // 表单中triggerConfigParam对象的JSON文本
  configParamJson: '',

  // 配置类型选项
  deviceTypeOptions: [] as OptionType[],
  // 设备名称选项
  deviceNameOptions: [] as OptionType[],
  // 配置名称选项
  objectRangeOptions: [] as OptionType[],
  // 模块名称选项
  modelNameOptions: [] as OptionType[],
  // 方法名称选项
  methodNameOptions: [] as OptionType[],

  // 对话框的各控件输入规则
  rules: {
    deviceName: [{required: true, message: '设备名称不能为空', trigger: 'blur'}],
    deviceType: [{required: true, message: '设备类型不能为空', trigger: 'blur'}],
    triggerMethodName: [{required: true, message: '方法名称不能为空', trigger: 'blur'}],
    triggerModelName: [{required: true, message: '模块名称不能为空', trigger: 'blur'}],
    objectRange: [{required: true, message: '对象范围不能为空', trigger: 'blur'}],
    triggerConfigName: [{required: true, message: '配置名称不能为空', trigger: 'blur'}],
    paramsJson: [{required: true, message: '配置参数不能为空', trigger: 'blur'}],
    objectListJson: [{required: true, message: '对象列表不能为空', trigger: 'blur'}],
    queueDeep: [{required: true, message: '队列深度不能为空', trigger: 'blur'}],


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
  deviceTypeOptions,
  // 设备名称选项
  deviceNameOptions,
  // 配置名称选项
  objectRangeOptions,
  // 模块名称选项
  modelNameOptions,
  // 方法名称选项
  methodNameOptions,
  // 对话框输入约束规则
  rules,
} = toRefs(dataState);

/**
 * 取消
 */
function handleCancel() {
  //执行调用<triggerConfig-edit-dialog @cancel="cancelEdit">
  emit('cancel', "子组件传给父组件的值");
}

/**
 * 确认：新增/修改实体
 */
function handleSubmit() {
  try {
    if (Array.isArray(JSON.parse(formData.value.paramsJson))) {
      ElMessage.info('配置参数的格式，必须是对象类型!');
    }
    formData.value.params = JSON.parse(formData.value.paramsJson)
  } catch (e) {
    ElMessage.info('配置参数的格式，不是合法的JSON格式!');
    return;
  }

  try {
    if (!Array.isArray(JSON.parse(formData.value.objectListJson))) {
      ElMessage.info('配置参数的格式，必须是数组类型!');
    }
    formData.value.objectList = JSON.parse(formData.value.objectListJson);
  } catch (e) {
    ElMessage.info('配置参数的格式，不是合法的JSON格式!');
    return;
  }

  if (type.value === 'create') {
    // 执行调用<triggerConfig-edit-dialog @create="createEdit">的create
    emit('create', formData.value);
  }
  if (type.value === 'update') {
    //执行调用<triggerConfig-edit-dialog @update="updateEdit">
    emit('update', formData.value);
  }
}

/**
 * 初始化对话框
 * @taskParam type 对话框类型
 * @taskParam entity 实体
 */
function initEditData(type: string, entity: TriggerConfigItem) {
  if (type === 'create') {
    dataState.type = type;
    dataState.title = '新增配置';

    dataState.formData.id = undefined;
    dataState.formData.deviceType = '';
    dataState.formData.triggerMethodName = '';
    dataState.formData.triggerModelName = '';
    dataState.formData.objectRange = '';
    dataState.formData.queueDeep = 1;
    dataState.formData.triggerConfigName = '';
    dataState.formData.deviceName = '';
    dataState.formData.params = {};
    dataState.formData.paramsJson = '{}';
    dataState.formData.objectList = [];
    dataState.formData.objectListJson = '[]';

    nextTick(() => {
      dataFormRef.value.resetFields();
    })

    return;
  }

  if (type === 'update') {
    dataState.type = type;
    dataState.title = '修改配置';

    dataState.formData.id = entity.id;
    dataState.formData.deviceType = entity.deviceType;
    dataState.formData.triggerMethodName = entity.triggerMethodName;
    dataState.formData.triggerModelName = entity.triggerModelName;
    dataState.formData.objectRange = entity.objectRange;
    dataState.formData.queueDeep = entity.queueDeep;
    dataState.formData.triggerConfigName = entity.triggerConfigName;
    dataState.formData.deviceName = entity.deviceName;
    dataState.formData.params = entity.params;
    dataState.formData.paramsJson = JSON.stringify(entity.params, null, 5);
    dataState.formData.objectList = entity.objectList;
    dataState.formData.objectListJson = JSON.stringify(entity.objectList, null, 5);
    return;
  }
}

/**
 * 响应通道类型的选择：联动通道类型和通道名称
 * @taskParam value
 */
async function handleSelectModelName(value: any) {
  await listOption2List("TriggerEntity", "modelName", value, "methodName").then(({data}) => {
    methodNameOptions.value = data;
  });

  formData.value.triggerMethodName = methodNameOptions.value[0].value;
}

/**
 * 响应通道类型的选择：联动通道类型和通道名称
 * @taskParam value
 */
async function handleSelectDeviceType(value: any) {
  if (value === '') {
    deviceNameOptions.value = [];
    formData.value.deviceName = '';
    return;
  }

  await listOption2List("DeviceEntity", "deviceType", value, "deviceName").then(({data}) => {
    deviceNameOptions.value = data;
  });

  if (deviceNameOptions.value.length > 0) {
    formData.value.deviceName = deviceNameOptions.value[0].value;
  } else {
    formData.value.deviceName = '';
  }

}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  listOptionList("OperateEntity", "deviceType").then(({data}) => {
    deviceTypeOptions.value = data;
    deviceTypeOptions.value.push({
      value: '',
      label: '全部'
    })
  });

  listOptionList("TriggerEntity", "modelName").then(({data}) => {
    modelNameOptions.value = data;
  });

  // 查询方法类型选项，并保存在存量区
  listOption2List("TriggerEntity", "modelName", dataState.formData.triggerModelName, "methodName").then(({data}) => {
    methodNameOptions.value = data;
  });

  objectRangeOptions.value = listTriggerOptionList("objectRange");
});

</script>
