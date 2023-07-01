<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';

import DeviceDecoderEntityTable from './components/DeviceDecoderEntityTable.vue';
import DeviceDecoderFormHeader from './components/DeviceDecoderFormHeader.vue';

// 引入设备的API和数据类型
import {
  deleteDeviceDecoderEntity, restartDeviceService,
} from '@/api/device/decoder';
import {
  DeviceDecoderQueryParam,
} from '@/api/device/decoder/types';


const deviceDecoderEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceDecoder-edit-dialog>的ref值一样
const deviceDecoderFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceDecoder-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceDecoderQueryParam,
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
  deviceDecoderEntityTableRef.value.refreshTable(queryParams);
}

/**
 * 响应查询按钮：页查询数据
 */
function handleRestart(source: string, value: any) {
  ElMessageBox.confirm('确认重启设备服务?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    restartDeviceService().then(() => {
      ElMessage.success('重启设备服务成功');
      // 刷新表单
      deviceDecoderEntityTableRef.value.refreshTable(state.queryParams);
    });
  })
    .catch(() => ElMessage.info('已取消重启设备服务'));
}

/**
 * 捕获删除对话框消息
 * @taskParam source 发出消息的数据来源：button/table
 * @taskParam type 操作类型：delete
 * @taskParam row 行信息
 */
function handleDeleteDialog(source: string, type: string, row: any) {
  ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteDeviceDecoderEntity(row).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      deviceDecoderEntityTableRef.value.refreshTable(state.queryParams);
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
    <device-decoder-form-header ref="deviceDecoderFormHeaderRef"
                                @query="handleQuery"
                                @restart="handleRestart"
    />

    <!-- 数据表单：创建/修改 -->
    <device-decoder-entity-table ref="deviceDecoderEntityTableRef"
                                 @delete="handleDeleteDialog"
    />

  </div>
</template>
