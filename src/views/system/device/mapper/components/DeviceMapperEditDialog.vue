<script lang="ts">
export default {
  name: "DeviceMapperEditDialog"
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
    <el-form ref="dataFormRef" :model="formData" label-width="100px">

      <!-- 下拉框：设备类型 :disabled="type==='update'  -->
      <el-form-item :disabled=formData.disable label="对象名称" prop="objectName">
        <el-select v-model="formData.objectName" :disabled="formData.disable===true" placeholder="请选择">
          <el-option
            v-for="item in objectNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <!-- 编辑框 -->
        <el-form-item label="映射名称" prop="mapperName">
          <el-input v-model="formData.mapperName" :disabled="formData.disable===true"/>
        </el-form-item>
      </el-form-item>

      <!-- 通道类型和通道名称 -->
      <el-form-item label="映射模式" prop="mapperMode">
        <el-select v-model="formData.mapperMode" placeholder="请选择">
          <el-option
            v-for="item in mapperModeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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

import {ElForm} from "element-plus";
import {DeviceMapperItem, CreateDeviceMapperRequestVO} from "@/api/device/mapper/types";

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
    objectName: '',
    mapperName: '',
    mapperMode: '0',
    disable: true,
  } as CreateDeviceMapperRequestVO,

  // 实体数据
  entityList: [] as DeviceMapperItem[],

  // 对象名称选项
  objectNameOptions: [] as OptionType[],
  // 映射模式选项
  mapperModeOptions: [] as OptionType[],
});

// 数据状态：双向引用
const {
  // 类型：create/update
  type,
  // 标题
  title,
  //表单数据
  formData,
  // 实体数据
  entityList,
  // 通道设备类型选项
  objectNameOptions,
  // 通道类型选项
  mapperModeOptions,
} = toRefs(dataState);

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
  if (type.value === 'create') {
    // 执行调用<device-edit-dialog @create="createEdit">的create
    emit('create', formData.value, entityList.value);
  }
  if (type.value === 'update') {
    //执行调用<device-edit-dialog @update="updateEdit">
    emit('update', formData.value, entityList.value);
  }
}

/**
 * 初始化对话框
 * @taskParam type 对话框类型
 * @taskParam entity 实体
 */
function initEditData(type: string, entitys: DeviceMapperItem[]) {
  if (type === 'update') {
    dataState.type = type;
    dataState.title = '修改实体';

    dataState.entityList = entitys;
    dataState.formData.disable = dataState.entityList.length > 1;
    dataState.formData.objectName = entitys[0].objectName;
    dataState.formData.mapperName = entitys[0].mapperName;
    dataState.formData.mapperMode = entitys[0].mapperMode.toString();

    objectNameOptions.value = [];
    objectNameOptions.value.push({value: entitys[0].objectName, label: entitys[0].objectName});
  }
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  mapperModeOptions.value.push({value: '0', label: '原状'});
  mapperModeOptions.value.push({value: '1', label: '替换'});
  mapperModeOptions.value.push({value: '2', label: '副本'});
  mapperModeOptions.value.push({value: '3', label: '剔除'});
});

</script>
