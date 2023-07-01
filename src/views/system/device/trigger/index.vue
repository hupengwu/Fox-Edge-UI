<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';

import DeviceTriggerEntityTable from './components/DeviceTriggerEntityTable.vue';
import DeviceTriggerFormHeader from './components/DeviceTriggerFormHeader.vue';

import {
  DeviceTriggerQueryParam,
} from '@/api/device/trigger/types';


const deviceTriggerEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceTrigger-edit-dialog>的ref值一样
const deviceTriggerFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceTrigger-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceTriggerQueryParam,
  // 对话框状态
  editDialog: {
    visible: false,
  },
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
  deviceTriggerEntityTableRef.value.refreshTable(queryParams);
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
    <device-trigger-form-header ref="deviceTriggerFormHeaderRef"
                         @query="handleQuery"
    />

    <!-- 数据表单：创建/修改 -->
    <device-trigger-entity-table ref="deviceTriggerEntityTableRef"
    />

  </div>
</template>
