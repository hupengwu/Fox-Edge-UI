<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';

import DeviceRecordEntityTable from './components/DeviceRecordEntityTable.vue';
import DeviceRecordFormHeader from './components/DeviceRecordFormHeader.vue';


// 引入设备的API和数据类型
import {
  DeviceRecordQueryParam,
} from '@/api/device/record/types';


const deviceRecordEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceRecord-edit-dialog>的ref值一样
const deviceRecordFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceRecord-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceRecordQueryParam,
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
  deviceRecordEntityTableRef.value.refreshTable(queryParams);
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
    <device-record-form-header ref="deviceRecordFormHeaderRef"
                              @query="handleQuery"
    />

    <!-- 数据表单：创建/修改 -->
    <device-record-entity-table ref="deviceRecordEntityTableRef"
    />


  </div>
</template>
