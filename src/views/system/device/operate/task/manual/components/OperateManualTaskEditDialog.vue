<script lang="ts">
export default {
  name: "OperateManualTaskEditDialog"
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

      <!-- 下拉框：设备类型 -->
      <el-form-item label="设备类型" prop="deviceType">
        <el-select v-model="formData.deviceType" placeholder="请选择"
                   @change="handleSelectDeviceType">
          <el-option
            v-for="item in deviceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- 下拉框：设备类型 -->
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
      </el-form-item>


      <!-- 下拉框：设备类型 -->
      <el-form-item label="操作名称" prop="operateName">
        <el-select v-model="formData.operateName" placeholder="请选择">
          <el-option
            v-for="item in operateNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- 下拉框：设备类型 -->
        <el-form-item label="操作模式" prop="operateMode">
          <el-select v-model="formData.operateMode" placeholder="请选择">
            <el-option
              v-for="item in operateModeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form-item>

      <el-form-item label="通信超时" prop="timeout">
        <el-input v-model.number="formData.timeout"/>
      </el-form-item>


      <!-- 下拉框：配置参数 -->
      <el-form-item label="模板参数" prop="paramJson">
        <el-input v-model="formData.paramJson" :autosize="{ minRows: 1, maxRows: 100 }" type="textarea"/>
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
import {onMounted, reactive, ref, toRefs} from "vue";

import {ElForm, ElMessage} from "element-plus";
import {
  OperateManualTaskItem,
  OperateRequestItem
} from "@/api/device/operate/task/manual/types";
import {listOption2VLList, listOptionList} from "@/api/option";

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
    id: 0,
    deviceName: '',
    deviceType: '',
    taskName: '',
    taskParam: {},
    // 第一个项目的参数
    operateName: '',
    operateMode: '',
    param: '',
    paramJson: '',
    timeout: 2000,
  },

  // 设备类型选项
  deviceTypeOptions: [] as OptionType[],
  // 设备名称选项
  deviceNameOptions: [] as OptionType[],
  // 操作名称选项
  operateNameOptions: [] as OptionType[],
  // 操作模式选项
  operateModeOptions: [] as OptionType[],

  // 对话框的各控件输入规则
  rules: {
    taskName: [{required: true, message: '不能为空', trigger: 'blur'}],
    deviceName: [{required: true, message: '不能为空', trigger: 'blur'}],
    deviceType: [{required: true, message: '不能为空', trigger: 'blur'}],
    operateName: [{required: true, message: '不能为空', trigger: 'blur'}],
    operateMode: [{required: true, message: '不能为空', trigger: 'blur'}],
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
  // 操作名称选项
  operateNameOptions,
  // 操作模式选项
  operateModeOptions,
  // 对话框输入约束规则
  rules,
} = toRefs(dataState);

/**
 * 设备类型下拉框
 * @taskParam value
 */
async function handleSelectDeviceType(value: any) {
  await listOption2VLList("DeviceEntity", "deviceType", value, "deviceName", 'deviceName', 'deviceName').then(({data}) => {
    deviceNameOptions.value = data;
  });

  await listOption2VLList("OperateEntity", "deviceType", value, "operateName", 'operateName', 'operateName').then(({data}) => {
    operateNameOptions.value = data;
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

  formData.value.paramJson = formData.value.paramJson.trim();
  if (!formData.value.paramJson.startsWith('{')) {
    ElMessage.info('输入参数，不是一个JSON对象，格式应该为{}');
    return false;
  }

  try {
    let requestItem = {} as OperateRequestItem;
    requestItem.operateMode = formData.value.operateMode;
    requestItem.operateName = formData.value.operateName;
    requestItem.deviceName = formData.value.deviceName;
    requestItem.deviceType = formData.value.deviceType;
    requestItem.timeout = formData.value.timeout;
    requestItem.param = JSON.parse(formData.value.paramJson as string);

    let requestVOS = [] as OperateRequestItem[];
    requestVOS.push(requestItem);
    formData.value.taskParam = requestVOS;

    return true;
  } catch (e) {
    ElMessage.info('配置参数的格式，不是合法的JSON格式!');
    return false;
  }
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
function initEditData(type: string, entity: OperateManualTaskItem) {
  if (entity !== undefined) {
    dataState.formData.taskName = entity.taskName;
    dataState.formData.deviceName = entity.deviceName;
    dataState.formData.deviceType = entity.deviceType;
    dataState.formData.taskParam = entity.taskParam;

    listOption2VLList("OperateEntity", "deviceType", entity.deviceType as string, "operateName", 'operateName', 'operateName').then(({data}) => {
      operateNameOptions.value = data;
    });
    listOption2VLList("DeviceEntity", "deviceType", entity.deviceType as string, "deviceName", 'deviceName', 'deviceName').then(({data}) => {
      deviceNameOptions.value = data;
    });

    // 取出数组的第一个元素
    const requestItems = entity.taskParam as OperateRequestItem[];
    if (requestItems.length > 0) {
      dataState.formData.operateMode = requestItems[0].operateMode;
      dataState.formData.operateName = requestItems[0].operateName;
      dataState.formData.deviceName = entity.deviceName;
      dataState.formData.timeout = requestItems[0].timeout;
      dataState.formData.paramJson = JSON.stringify(requestItems[0].param, null, 5);
    }
  } else {
    dataState.formData.taskName = '';
    dataState.formData.deviceName = '';
    dataState.formData.deviceType = '';
    dataState.formData.taskParam = {};
    dataState.formData.operateMode = 'exchange';
    dataState.formData.operateName = '';
    dataState.formData.timeout = 2000;
    dataState.formData.param = '{}';
  }

  if (type === 'create') {
    dataState.type = type;
    dataState.title = '新增配置';

    dataState.formData.id = 0;

    return;
  }

  if (type === 'update') {
    dataState.type = type;
    dataState.title = '修改配置';

    dataState.formData.id = entity.id as number;
    return;
  }
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  listOptionList("DeviceEntity", "deviceType").then(({data}) => {
    deviceTypeOptions.value = data;
  });

  operateModeOptions.value.push({value: 'exchange', label: 'exchange'} as OptionType);
  operateModeOptions.value.push({value: 'publish', label: 'publish'} as OptionType);
});

</script>
