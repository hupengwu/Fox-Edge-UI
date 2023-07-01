<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';

import ConsoleEntityTable from './components/ConsoleEntityTable.vue';
import ConsoleFormHeader from './components/ConsoleFormHeader.vue';


// 引入设备的API和数据类型
import {
  ConsoleQueryParam,
} from '@/api/console/types';


const consoleEntityTableRef = ref<any>(); // 这了的变量名称必须和<console-edit-dialog>的ref值一样
const consoleFormHeaderRef = ref<any>(); // 这了的变量名称必须和<console-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as ConsoleQueryParam,
  // 对话框状态
  editDialog: {
    visible: false,
  },
});

const {
  // 查询参数
  queryParams,
  // 对话框状态
  editDialog,
} = toRefs(state);


/**
 * 响应查询按钮：页查询数据
 */
function handleQuery(source: string, value: any) {
  queryParams.value = value;
  consoleEntityTableRef.value.refreshTable(queryParams);
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
    <console-form-header ref="consoleFormHeaderRef"
                         @query="handleQuery"
    />

    <!-- 数据表单：创建/修改 -->
    <console-entity-table ref="consoleEntityTableRef"
    />

  </div>
</template>
