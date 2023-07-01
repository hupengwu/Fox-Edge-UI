<script lang="ts">
export default {
  name: "ServiceStatusFormHeader"
}
</script>

<template>
  <el-form ref="queryFormRef" :inline="true" :model="queryParams">
    <el-form-item>
      <el-button :icon="Search" type="primary" @click="handleQuery">刷新</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from "vue";

import {
  DeviceQueryParam
} from "@/api/device/device/types";

import {Search} from '@element-plus/icons-vue';
import {listServiceStatusList} from "@/api/service/service";

const emit = defineEmits(['query']);// 定义组件的事件通知


// 数据状态：定义
let dataState = reactive({
  // 设备类型选项
  modelTypeOptions: [] as OptionType[],
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceQueryParam,
});

// 数据状态：双向引用
const {
  // 设备类型选项
  modelTypeOptions,
  // 查询参数
  queryParams,
} = toRefs(dataState);

function handleQuery() {
  emit('query', 'header', queryParams.value);
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  let modelTypeSet = new Set();
  listServiceStatusList().then(({data}) => {
    data.forEach(value => {
      modelTypeSet.add(value.modelType);
    });

    modelTypeOptions.value = [];
    modelTypeSet.forEach(value => {
      let option = {value:value,label:value} as OptionType;
      modelTypeOptions.value.push(option);
    })
  });
})

</script>
