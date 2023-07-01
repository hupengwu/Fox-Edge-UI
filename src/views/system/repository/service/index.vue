<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, ref, toRefs} from 'vue';

import RepositoryServiceEntityTable from './components/RepositoryServiceEntityTable.vue';
import RepositoryServiceFormHeader from './components/RepositoryServiceFormHeader.vue';

// 引入设备的API和数据类型
import {
  restartDeviceService,
} from '@/api/device/decoder';
import {ElMessage, ElMessageBox} from "element-plus";
import {CreateRepositoryRequestVO, RepositoryQueryParam} from "@/api/device/repository/types";
import {deleteEntity, downloadEntity, installEntity} from "@/api/device/repository";


const repositoryServiceEntityTableRef = ref<any>(); // 这了的变量名称必须和<deviceService-edit-dialog>的ref值一样
const repositoryServiceFormHeaderRef = ref<any>(); // 这了的变量名称必须和<deviceService-edit-dialog>的ref值一样

const state = reactive({
  // 查询参数
  queryParams: {modelType: 'service', pageNum: 1, pageSize: 10} as RepositoryQueryParam,
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
  repositoryServiceEntityTableRef.value.refreshTable(queryParams);
}

/**
 * 响应查询按钮：页查询数据
 */
function handleScan(source: string, value: any) {
  queryParams.value = value;
  repositoryServiceEntityTableRef.value.scanService();
}

function getSelect(source: string, type: string, row: any) {
  let selects = [] as any;
  if (source === 'table') {
    if (row.lastVersion !== undefined) {
      selects.push(row.lastVersion);
    } else {
      selects.push(row);
    }

  }
  if (source === 'header') {
    let rows = repositoryServiceEntityTableRef.value.getSelects();
    if (rows.length === 0) {
      return;
    }

    for (let row of rows) {
      if (row.lastVersion !== undefined) {
        selects.push(row.lastVersion);
      }
    }
  }

  return selects;
}

/**
 * 捕获下载对话框消息
 * @taskParam source 发出消息的数据来源：button/table
 * @taskParam type 操作类型：delete
 * @taskParam row 行信息
 */
function handleDownload(source: string, type: string, row: any) {
  let selects = getSelect(source, type, row) as any;

  if (selects.length === 0) {
    return;
  }

  let services = [] as any;
  for (let version of selects) {
    let data = {} as CreateRepositoryRequestVO;
    data.modelType = version.modelType;
    data.modelName = version.modelName;
    data.version = version.version;
    data.component = version.component;
    data.pathName = version.pathName;
    services.push(data);
  }

  ElMessageBox.confirm('确认下载已选中的数据项的安裝包?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    downloadEntity(services).then(() => {
      ElMessage.success('添加下载任务成功');
      // 刷新表单
      repositoryServiceEntityTableRef.value.refreshTable(state.queryParams);
    });
  })
    .catch(() => ElMessage.info('已取消下载'));
}


function handleInstall(source: string, type: string, row: any) {
  let selects = getSelect(source, type, row) as any;

  if (selects.length === 0) {
    return;
  }

  let version = selects[0];
  let data = {} as CreateRepositoryRequestVO;
  data.modelType = version.modelType;
  data.modelName = version.modelName;
  data.version = version.version;
  data.component = version.component;
  data.pathName = version.pathName;


  ElMessageBox.confirm('确认下载已选中的数据项的安裝包?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    installEntity(data).then(() => {
      ElMessage.success('安装成功！');
      // 刷新表单
      repositoryServiceEntityTableRef.value.refreshTable(state.queryParams);
    });
  })
    .catch(() => ElMessage.info('已取消安装'));
}

/**
 * 捕获删除对话框消息
 * @taskParam source 发出消息的数据来源：button/table
 * @taskParam type 操作类型：delete
 * @taskParam row 行信息
 */
function handleDelete(source: string, type: string, row: any) {
  let selects = getSelect(source, type, row) as any;

  if (selects.length === 0) {
    return;
  }

  let services = [] as any;
  for (let version of selects) {
    let data = {} as CreateRepositoryRequestVO;
    data.modelType = version.modelType;
    data.modelName = version.modelName;
    data.version = version.version;
    data.component = version.component;
    data.pathName = version.pathName;
    services.push(data);
  }

  ElMessageBox.confirm('确认清理已选中的数据项的缓存?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteEntity(services).then(() => {
      ElMessage.success('删除成功');
      // 刷新表单
      repositoryServiceEntityTableRef.value.refreshTable(state.queryParams);
    });
  })
    .catch(() => ElMessage.info('已取消删除'));
}

/**
 * 响应查询按钮：页查询数据
 */
function handleRestart() {
  ElMessageBox.confirm('确认重启设备服务?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    restartDeviceService().then(() => {
      ElMessage.success('重启设备服务成功');
      // 刷新表单
      repositoryServiceEntityTableRef.value.refreshTable(state.queryParams);
    });
  })
    .catch(() => ElMessage.info('已取消重启设备服务'));
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
    <repository-service-form-header ref="repositoryServiceFormHeaderRef"
                                    @delete="handleDelete"
                                    @download="handleDownload"
                                    @query="handleQuery"
                                    @restart="handleRestart"
                                    @scan="handleScan"
    />

    <!-- 数据表单：创建/修改 -->
    <repository-service-entity-table ref="repositoryServiceEntityTableRef"
                                     @delete="handleDelete"
                                     @download="handleDownload"
                                     @install="handleInstall"
    />

  </div>
</template>
