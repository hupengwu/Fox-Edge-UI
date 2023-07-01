<script lang="ts">
export default {
  name: "ConfigEditDialog"
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

      <!-- 下拉框：配置类型 -->
      <el-form-item label="应用名称" prop="serviceName">
        <el-select v-model="formData.serviceName" :disabled="type==='update'" placeholder="请选择"
                   @change="handleSelectServiceName">
          <el-option
            v-for="item in serviceNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-form-item label="应用类型" prop="serviceType">
          <el-select v-model="formData.serviceType" :disabled="type==='update'" placeholder="请选择">
            <el-option
              v-for="item in serviceTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form-item>

      <!-- 编辑框：配置名称 -->
      <el-form-item label="配置名称" prop="configName">
        <el-input v-model="formData.configName" :disabled="type==='update'"/>
      </el-form-item>

      <!-- 编辑框：备注信息 -->
      <el-form-item label="备注信息" prop="remark">
        <el-input v-model="formData.remark" :autosize="{ minRows: 1, maxRows: 100 }" type="textarea"/>
      </el-form-item>

      <!-- 下拉框：配置参数 -->
      <el-form-item label="配置参数" prop="serviceName">
        <el-input v-model="configValueJson" :autosize="{ minRows: 1, maxRows: 100 }" type="textarea"/>
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
import {ConfigItem, CreateConfigRequestVO} from "@/api/config/types";
import {listServiceStatusList} from "@/api/service/service";
import {listProcessStatusList} from "@/api/service/process";

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
    serviceName: '',
    configName: '',
    configValue: {},
  } as CreateConfigRequestVO,

  // 表单中configValue对象的JSON文本
  configValueJson: '',

  // 配置类型选项
  serviceNameOptions: [] as OptionType[],
  // 配置类型选项
  serviceTypeOptions: [] as OptionType[],
  // 对话框的各控件输入规则
  rules: {
    configName: [{required: true, message: '配置名称不能为空', trigger: 'blur'}],
    serviceName: [{required: true, message: '业务名称不能为空', trigger: 'blur'}],
    serviceType: [{required: true, message: '业务类型不能为空', trigger: 'blur'}],
    configValueJson: [{required: true, message: '配置参数不能为空', trigger: 'blur'}],
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
  // 表单中configValue对象的JSON文本
  configValueJson,
  // 配置类型选项
  serviceNameOptions,
  // 配置类型选项
  serviceTypeOptions,
  // 对话框输入约束规则
  rules,
} = toRefs(dataState);

/**
 * 取消
 */
function handleCancel() {
  //执行调用<config-edit-dialog @cancel="cancelEdit">
  emit('cancel', "子组件传给父组件的值");
}

/**
 * 确认：新增/修改实体
 */
function handleSubmit() {
  try {
    formData.value.configValue = JSON.parse(configValueJson.value);
  } catch (e) {
    ElMessage.info('配置参数的格式，不是合法的JSON格式!');
    return;
  }

  if (type.value === 'create') {
    // 执行调用<config-edit-dialog @create="createEdit">的create
    emit('create', formData.value);
  }
  if (type.value === 'update') {
    //执行调用<config-edit-dialog @update="updateEdit">
    emit('update', formData.value);
  }
}

/**
 * 初始化对话框
 * @taskParam type 对话框类型
 * @taskParam entity 实体
 */
function initEditData(type: string, entity: ConfigItem) {
  if (type === 'create') {
    dataState.type = type;
    dataState.title = '新增配置';

    dataState.formData.id = undefined;
    dataState.formData.configName = '';
    dataState.formData.serviceName = '';
    dataState.formData.serviceType = '';
    dataState.formData.configValue = {};
    dataState.configValueJson = '{}';

    nextTick(() => {
      dataFormRef.value.resetFields();
    })

    return;
  }

  if (type === 'update') {
    dataState.type = type;
    dataState.title = '修改配置';

    dataState.formData.id = entity.id;
    dataState.formData.configName = entity.configName;
    dataState.formData.serviceName = entity.serviceName;
    dataState.formData.serviceType = entity.serviceType;
    dataState.formData.remark = entity.remark;
    dataState.formData.configValue = entity.configValue;
    dataState.configValueJson = JSON.stringify(entity.configValue, null, 5);
    return;
  }
}

/**
 * 响应通道类型的选择：联动通道类型和通道名称
 * @taskParam value
 */
function handleSelectServiceName(value: any) {
  // 查询指定通道类型的通道实体
  listProcessStatusList().then(({data}) => {
    // 向后台查询数据，并转换数据结构位option
    const options = [] as OptionType[];
    for (let i = 0; i < data.length; i++) {
      if (data[i].appName === value) {
        let option = {value: data[i].appType, label: data[i].appType} as OptionType;
        options.push(option);
      }
    }

    // 将option保存到通道列表选项的存储空间
    serviceTypeOptions.value = options;

    //设置缺省的通道选择
    formData.value.serviceType = options[0].value;
  });
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询配置类型选项，并保存在存量区
  listServiceStatusList().then((response) => {
    let data = response.data;
    for (let item of data) {
      let option = {} as OptionType;
      option.value = item.serviceName;
      option.label = item.serviceName;

      serviceNameOptions.value.push(option);
    }
  });

  // 业务类型
  serviceTypeOptions.value.push({value: 'kernel', label: 'kernel'} as OptionType);
  serviceTypeOptions.value.push({value: 'system', label: 'system'} as OptionType);
  serviceTypeOptions.value.push({value: 'service', label: 'service'} as OptionType);
});

</script>
