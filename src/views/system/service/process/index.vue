<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, ref} from 'vue';

import ProcessStatusEntityTable from './components/ProcessStatusEntityTable.vue';
import ProcessStatusFormHeader from './components/ProcessStatusFormHeader.vue';


const processStatusEntityTableRef = ref<any>(); // 这了的变量名称必须和<processStatus-edit-dialog>的ref值一样
const processStatusFormHeaderRef = ref<any>(); // 这了的变量名称必须和<processStatus-edit-dialog>的ref值一样


/**
 * 响应查询按钮：页查询数据
 */
function handleQuery(source: string, value: any) {
  processStatusEntityTableRef.value.refreshTable(source, value);
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
    <process-status-form-header ref="processStatusFormHeaderRef"
                                @query="handleQuery"
    />

    <!-- 数据表单：创建/修改 -->
    <process-status-entity-table ref="processStatusEntityTableRef"
    />


  </div>
</template>
