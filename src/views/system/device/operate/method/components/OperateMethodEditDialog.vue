<script lang="ts">
export default {
  name: "OperateMethodEditDialog"
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

      <!-- 编辑框：设备类型 -->
      <el-form-item label="设备类型" prop="deviceType">
        <el-input v-model="formData.deviceType" :disabled="type==='update'"/>
      </el-form-item>

      <!-- 编辑框：操作名称 -->
      <el-form-item label="操作名称" prop="operateName">
        <el-input v-model="formData.operateName" :disabled="type==='update'"/>
      </el-form-item>

      <!-- 编辑框：制造厂商 -->
      <el-form-item label="制造厂商" prop="manufacturer">
        <el-input v-model="formData.manufacturer" :disabled="type==='update'"/>
      </el-form-item>

      <!-- 下拉框：操作模式 -->
      <el-form-item label="操作模式" prop="operateMode">
        <el-select v-model="formData.operateMode" :disabled="type==='update'" placeholder="请选择">
          <el-option
            v-for="item in operateModeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 下拉框：数据类型 -->
      <el-form-item label="数据类型" prop="dataType">
        <el-select v-model="formData.dataType" :disabled="type==='update'" placeholder="请选择">
          <el-option
            v-for="item in dataTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 下拉框：是否轮询 -->
      <el-form-item label="是否轮询" prop="polling">
        <el-select v-model="formData.pollingTxt" placeholder="请选择">
          <el-option
            v-for="item in pollingOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 编辑框：通信超时 -->
      <el-form-item label="通信超时" prop="timeout">
        <el-input v-model="formData.timeout"/>
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
import {DeviceOperateItem, CreateDeviceOperateRequestVO} from "@/api/device/operate/method/types";
import {listOptionList} from "@/api/device/operate/method/option";

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
    operateName: '',
    operateMode: '',
    manufacturer: '',
    dataType: '',
    polling: false,
    timeout: 2000,
  } as CreateDeviceOperateRequestVO,

  // 是否轮询选项
  pollingOptions: [] as OptionType[],
  // 操作模式选项
  operateModeOptions: [] as OptionType[],
  // 数据类型选项
  dataTypeOptions: [] as OptionType[],

  // 对话框的各控件输入规则
  rules: {
    deviceType: [{required: true, message: '设备类型不能为空', trigger: 'blur'}],
    operateName: [{required: true, message: '操作名称不能为空', trigger: 'blur'}],
    operateMode: [{required: true, message: '操作模式不能为空', trigger: 'blur'}],
    manufacturer: [{required: true, message: '制造厂商不能为空', trigger: 'blur'}],
    dataType: [{required: true, message: '数据类型不能为空', trigger: 'blur'}],
    polling: [{required: true, message: '数据类型不能为空', trigger: 'blur'}],
    timeout: [{required: true, message: '数据类型不能为空', trigger: 'blur'}],
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
  // 设备类型选项
  pollingOptions,
  // 操作模式选项
  operateModeOptions,
  // 数据类型选项
  dataTypeOptions,
  // 对话框输入约束规则
  rules,
} = toRefs(dataState);

/**
 * 取消
 */
function handleCancel() {
  //执行调用<deviceOperate-edit-dialog @cancel="cancelEdit">
  emit('cancel', "子组件传给父组件的值");
}

/**
 * 确认：新增/修改实体
 */
function handleSubmit() {
  if (type.value === 'create') {
    // 执行调用<deviceOperate-edit-dialog @create="createEdit">的create
    emit('create', formData.value);
  }
  if (type.value === 'update') {
    //执行调用<deviceOperate-edit-dialog @update="updateEdit">
    formData.value.polling = formData.value.pollingTxt === 'true';
    emit('update', formData.value);
  }
}

/**
 * 初始化对话框
 * @taskParam type 对话框类型
 * @taskParam entity 实体
 */
function initEditData(type: string, entity: DeviceOperateItem) {
  if (type === 'create') {
    dataState.type = type;
    dataState.title = '新增配置';

    dataState.formData.id = undefined;
    dataState.formData.deviceType = '';
    dataState.formData.operateName = '';
    dataState.formData.operateMode = '';
    dataState.formData.manufacturer = '';
    dataState.formData.dataType = '';
    dataState.formData.polling = true;
    dataState.formData.pollingTxt = 'true';
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
    dataState.formData.deviceType = entity.deviceType;
    dataState.formData.operateName = entity.operateName;
    dataState.formData.operateMode = entity.operateMode;
    dataState.formData.manufacturer = entity.manufacturer;
    dataState.formData.dataType = entity.dataType;
    dataState.formData.polling = entity.polling;
    dataState.formData.pollingTxt = String(entity.polling);
    dataState.formData.timeout = entity.timeout;

    return;
  }
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询设备类型选项，并保存在产量区
  pollingOptions.value = listOptionList("polling");
  dataTypeOptions.value = listOptionList("dataType");
  operateModeOptions.value = listOptionList("operateMode");
});

</script>
