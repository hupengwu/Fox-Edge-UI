<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';

import DeviceValueEntityTable from './components/DeviceValueEntityTable.vue';
import DeviceValueFormHeader from './components/DeviceValueFormHeader.vue';


// 引入设备的API和数据类型
import {
  DeviceValueQueryParam,
} from '@/api/device/value/types';


const deviceValueEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceValue-edit-dialog>的ref值一样
const deviceValueFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceValue-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceValueQueryParam,
});

const {
  // 查询参数
  queryParams,
} = toRefs(state);


/**
 * 响应查询按钮：页查询数据
 */
function handleQuery(source: string, value: any) {
  queryParams.value = value;
  deviceValueEntityTableRef.value.refreshTable(queryParams);
}

/**
 * 响应查询按钮：页查询数据
 */
function handleDelete(source: string, value: any) {
  queryParams.value = value;
  deviceValueEntityTableRef.value.deleteSelected(queryParams);
}


/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
});
</script>

<template>
  <div class="app-container">

    <!-- 表单头：各种按钮 -->
    <device-value-form-header ref="deviceValueFormHeaderRef"
                              @query="handleQuery"
                              @delete="handleDelete"
    />

    <!-- 数据表单：创建/修改 -->
    <device-value-entity-table ref="deviceValueEntityTableRef"
    />


  </div>
</template>
