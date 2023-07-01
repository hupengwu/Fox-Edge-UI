<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';

import DeviceTimeOutEntityTable from './components/DeviceTimeOutEntityTable.vue';
import DeviceTimeOutFormHeader from './components/DeviceTimeOutFormHeader.vue';


// 引入设备的API和数据类型
import {
  DeviceTimeOutQueryParam,
} from '@/api/device/timeout/types';
import {ElMessage, ElMessageBox} from "element-plus";
import {deleteDeviceEntity} from "@/api/device/device";


const deviceTimeOutEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceTimeOut-edit-dialog>的ref值一样
const deviceTimeOutFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceTimeOut-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceTimeOutQueryParam,
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
  deviceTimeOutEntityTableRef.value.refreshTable(queryParams);
}

/**
 * 捕获删除对话框消息
 * @taskParam source 发出消息的数据来源：button/table
 * @taskParam type 操作类型：delete
 * @taskParam row 行信息
 */
function handleDeleteDialog(source: string, type: string, row: any) {
  let ids = '';
  if (source === 'table') {
    ids = row;
  }
  if (source === 'header') {
    let idList = deviceTimeOutEntityTableRef.value.getIds();
    if (idList.length === 0) {
      return;
    }

    ids = idList.join(',');
  }

  ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteDeviceEntity(ids).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      deviceTimeOutEntityTableRef.value.refreshTable(state.queryParams);
    });
  })
    .catch(() => ElMessage.info('已取消删除'));
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
    <device-time-out-form-header ref="deviceTimeOutFormHeaderRef"
                               @query="handleQuery"
                               @delete="handleDeleteDialog"
    />

    <!-- 数据表单：创建/修改 -->
    <device-time-out-entity-table ref="deviceTimeOutEntityTableRef"
    />


  </div>
</template>
