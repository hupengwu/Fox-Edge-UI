<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';

import OperateRecordEntityTable from './components/OperateRecordEntityTable.vue';
import OperateRecordFormHeader from './components/OperateRecordFormHeader.vue';


// 引入设备的API和数据类型
import {
  OperateRecordQueryParam,
} from '@/api/device/operate/record/types';


const operateRecordEntityTableRef = ref<any>(); // 这了的变量名称必须和<operateRecord-edit-dialog>的ref值一样
const operateRecordFormHeaderRef = ref<any>(); // 这了的变量名称必须和<operateRecord-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as OperateRecordQueryParam,
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
  operateRecordEntityTableRef.value.refreshTable(queryParams);
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
    <operate-record-form-header ref="operateRecordFormHeaderRef"
                              @query="handleQuery"
    />

    <!-- 数据表单：创建/修改 -->
    <operate-record-entity-table ref="operateRecordEntityTableRef"
    />


  </div>
</template>
