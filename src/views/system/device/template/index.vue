<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';

import DeviceTemplateEntityTable from './components/DeviceTemplateEntityTable.vue';
import DeviceTemplateFormHeader from './components/DeviceTemplateFormHeader.vue';

// 引入设备的API和数据类型
import {
  deleteDeviceTemplateEntity, downloadDeviceTemplateEntity,
} from '@/api/device/template';
import {
  CreateDeviceTemplateRequestVO,
  DeviceTemplateQueryParam,
} from '@/api/device/template/types';
import {downloadFile,} from '@/utils/download';


const deviceTemplateEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceTemplate-edit-dialog>的ref值一样
const deviceTemplateFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceTemplate-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceTemplateQueryParam,
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
  deviceTemplateEntityTableRef.value.refreshTable(queryParams);
}

/**
 * 捕获删除对话框消息
 * @taskParam source 发出消息的数据来源：button/table
 * @taskParam type 操作类型：delete
 * @taskParam row 行信息
 */
function handleDelete(source: string, type: string, row: any) {
  let selects = [] as any;
  if (source === 'table') {
    selects.push(row);
  }
  if (source === 'header') {
    let idList = deviceTemplateEntityTableRef.value.getSelects();
    if (idList.length === 0) {
      return;
    }

    selects = idList;
  }

  if (selects.length === 0) {
    return;
  }

  let services = [] as any;
  for (let item of selects) {
    let data = {} as CreateDeviceTemplateRequestVO;
    data.modelName = item.modelName;
    data.version = item.version;
    data.component = item.component;
    data.fileName = item.fileName;
    services.push(data);
  }

  ElMessageBox.confirm('确认清理已选中的数据项的缓存?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteDeviceTemplateEntity(services).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      deviceTemplateEntityTableRef.value.refreshTable(state.queryParams);
    });
  })
    .catch(() => ElMessage.info('已取消删除'));
}

/**
 * 捕获下载对话框消息
 * @taskParam source 发出消息的数据来源：button/table
 * @taskParam type 操作类型：delete
 * @taskParam row 行信息
 */
function handleDownload(source: string, type: string, row: any) {
  let selects = [] as any;
  if (source === 'table') {
    selects.push(row);
  }
  if (source === 'header') {
    let idList = deviceTemplateEntityTableRef.value.getSelects();
    if (idList.length === 0) {
      return;
    }

    selects = idList;
  }

  if (selects.length === 0) {
    return;
  }

  let services = [] as any;
  for (let item of selects) {
    let data = {} as CreateDeviceTemplateRequestVO;
    data.modelName = item.modelName;
    data.version = item.version;
    data.component = item.component;
    data.fileName = item.fileName;
    services.push(data);
  }


  downloadDeviceTemplateEntity(services).then(response => {
    // 弹出文件下载对话框，接收文件流
    downloadFile(response, row.fileName);
  })
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
    <device-template-form-header ref="deviceTemplateFormHeaderRef"
                                 @query="handleQuery"
    />

    <!-- 数据表单：创建/修改 -->
    <device-template-entity-table ref="deviceTemplateEntityTableRef"
                                  @delete="handleDelete"
                                  @download="handleDownload"
    />

  </div>
</template>
