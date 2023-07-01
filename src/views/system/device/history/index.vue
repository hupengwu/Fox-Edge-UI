<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';

import DeviceHistoryEntityTable from './components/DeviceHistoryEntityTable.vue';
import DeviceHistoryFormHeader from './components/DeviceHistoryFormHeader.vue';


// 引入设备的API和数据类型
import {
  DeviceHistoryQueryParam,
} from '@/api/device/history/types';


const deviceHistoryEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceHistory-edit-dialog>的ref值一样
const deviceHistoryFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceHistory-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceHistoryQueryParam,
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
  deviceHistoryEntityTableRef.value.refreshTable(queryParams);
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
    <device-history-form-header ref="deviceHistoryFormHeaderRef"
                              @query="handleQuery"
    />

    <!-- 数据表单：创建/修改 -->
    <device-history-entity-table ref="deviceHistoryEntityTableRef"
    />


  </div>
</template>
