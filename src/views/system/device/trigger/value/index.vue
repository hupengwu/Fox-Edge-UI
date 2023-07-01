<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';

import TriggerValueEntityTable from './components/TriggerValueEntityTable.vue';
import TriggerValueFormHeader from './components/TriggerValueFormHeader.vue';


// 引入设备的API和数据类型
import {
  TriggerValueQueryParam,
} from '@/api/device/trigger/value/types';


const triggerValueEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceValue-edit-dialog>的ref值一样
const triggerValueFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceValue-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as TriggerValueQueryParam,
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
  triggerValueEntityTableRef.value.refreshTable(queryParams);
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
    <trigger-value-form-header ref="triggerValueFormHeaderRef"
                              @query="handleQuery"
    />

    <!-- 数据表单：创建/修改 -->
    <trigger-value-entity-table ref="triggerValueEntityTableRef"
    />


  </div>
</template>
