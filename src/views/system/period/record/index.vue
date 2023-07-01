<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';

import PeriodRecordEntityTable from './components/PeriodRecordEntityTable.vue';
import PeriodRecordFormHeader from './components/PeriodRecordFormHeader.vue';


// 引入设备的API和数据类型
import {
  PeriodRecordQueryParam,
} from '@/api/period/record/types';


const periodRecordEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceRecord-edit-dialog>的ref值一样
const periodRecordFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceRecord-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as PeriodRecordQueryParam,
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
  periodRecordEntityTableRef.value.refreshTable(queryParams);
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
    <period-record-form-header ref="periodRecordFormHeaderRef"
                              @query="handleQuery"
    />

    <!-- 数据表单：创建/修改 -->
    <period-record-entity-table ref="periodRecordEntityTableRef"
    />


  </div>
</template>
