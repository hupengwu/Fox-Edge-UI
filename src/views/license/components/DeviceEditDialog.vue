<script lang="ts">
export default {
  name: "DeviceEditDialog"
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

      <!-- 编辑框：设备名称 -->
      <el-form-item label="设备名称" prop="deviceName">
        <el-input v-model="formData.deviceName" :disabled="type==='update'"/>
      </el-form-item>

      <!-- 下拉框：设备类型 -->
      <el-form-item label="设备类型" prop="deviceType">
        <el-select v-model="formData.deviceType" placeholder="请选择">
          <el-option
            v-for="item in deviceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 通道类型和通道名称 -->
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
      </el-form-item>

      <!-- 下拉框：配置参数 -->
      <el-form-item label="配置参数" prop="deviceParamJson">
        <el-input v-model="formData.deviceParamJson" :autosize="{ minRows: 1, maxRows: 100 }" type="textarea"/>
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
import {DeviceItem, CreateDeviceRequestVO} from "@/api/device/device/types";
import {listChannelEntityList} from "@/api/channel";
import {listOptionList} from "@/api/option";

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
    channelName: '',
    channelType: '',
    deviceName: '',
    operateTemplate: '',
    deviceParam: {},
    deviceParamJson: '{}',
  } as CreateDeviceRequestVO,

  // 设备类型选项
  deviceTypeOptions: [] as OptionType[],
  // 通道类型选项
  channelTypeOptions: [] as OptionType[],
  // 通道名称选项
  channelNameOptions: [] as OptionType[],

  // 对话框的各控件输入规则
  rules: {
    deviceName: [{required: true, message: '设备名称不能为空', trigger: 'blur'}],
    deviceType: [{required: true, message: '设备类型不能为空', trigger: 'blur'}],
    channelName: [{required: true, message: '通道名称不能为空', trigger: 'blur'}],
    channelType: [{required: true, message: '通道类型不能为空', trigger: 'blur'}],
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
  // 通道设备类型选项
  deviceTypeOptions,
  // 通道类型选项
  channelTypeOptions,
  // 通道名称选项
  channelNameOptions,
  // 对话框输入约束规则
  rules,
} = toRefs(dataState);

/**
 * 响应通道类型的选择：联动通道类型和通道名称
 * @taskParam value
 */
function handleSelectChannelType(value: any) {
  // 查询指定通道类型的通道实体
  listChannelEntityList({channelType: value}).then(({data}) => {
    // 向后台查询数据，并转换数据结构位option
    const options = [] as OptionType[];
    for (let i = 0; i < data.length; i++) {
      const option = {value: data[i].channelName, label: data[i].channelName} as OptionType;
      options.push(option);
    }

    // 将option保存到通道列表选项的存储空间
    channelNameOptions.value = options;

    //设置缺省的通道选择
    formData.value.channelName = options[0].value;
  });
}

/**
 * 取消
 */
function handleCancel() {
  //执行调用<device-edit-dialog @cancel="cancelEdit">
  emit('cancel', "子组件传给父组件的值");
}

/**
 * 确认：新增/修改实体
 */
function handleSubmit() {
  try {
    if (formData.value.deviceParamJson === undefined) {
      ElMessage.info('配置参数的格式，不是合法的JSON格式!');
      return;
    }

    formData.value.deviceParam = JSON.parse(formData.value.deviceParamJson);
  } catch (e) {
    ElMessage.info('配置参数的格式，不是合法的JSON格式!');
    return;
  }

  if (type.value === 'create') {
    // 执行调用<device-edit-dialog @create="createEdit">的create
    emit('create', formData.value);
  }
  if (type.value === 'update') {
    //执行调用<device-edit-dialog @update="updateEdit">
    emit('update', formData.value);
  }

}

/**
 * 初始化对话框
 * @taskParam type 对话框类型
 * @taskParam entity 实体
 */
function initEditData(type: string, entity: DeviceItem) {
  if (type === 'create') {
    dataState.type = type;
    dataState.title = '新增设备';

    dataState.formData.id = undefined;
    dataState.formData.channelName = '';
    dataState.formData.channelType = '';
    dataState.formData.deviceName = '';
    dataState.formData.deviceType = '';
    dataState.formData.deviceParam = {};
    dataState.formData.deviceParamJson = '{}';

    nextTick(() => {
      dataFormRef.value.resetFields();
    })
    return;
  }

  if (type === 'update') {
    dataState.type = type;
    dataState.title = '修改设备';

    dataState.formData.id = entity.id;
    dataState.formData.channelName = entity.channelName;
    dataState.formData.channelType = entity.channelType;
    dataState.formData.deviceName = entity.deviceName;
    dataState.formData.deviceType = entity.deviceType;
    dataState.formData.deviceParam = entity.deviceParam;
    dataState.formData.deviceParamJson = entity.deviceParamJson;

    return;
  }
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询设备类型选项，并保存在存量区
  listOptionList("OperateEntity", "deviceType").then(({data}) => {
    deviceTypeOptions.value = data;
  });
  // 查询通道类型选项，并保存在存量区
  listOptionList("ChannelEntity", "channelType").then(({data}) => {
    channelTypeOptions.value = data;
  });
});

</script>
