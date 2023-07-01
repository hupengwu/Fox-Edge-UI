<script lang="ts">
export default {
  name: "ProcessStatusEntityTable"
}
</script>

<template>
  <!-- 数据表单 -->
  <el-table
    ref="dataTableRef"
    v-loading="loading"
    :data="entityList"
    border
    highlight-current-row
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
  >
    <el-table-column align="center" min-width="40" type="selection"/>
    <el-table-column label="应用名称" min-width="250" prop="appName"/>

    <el-table-column align="center" label="应用类型" min-width="90" prop="conflictStatus">
      <template #default="scope">
        <el-tag v-if="scope.row.appType === 'service'" type="normal">服务</el-tag>
        <el-tag v-else-if="scope.row.appType === 'kernel'" type="warning">内核</el-tag>
        <el-tag v-else-if="scope.row.appType === 'system'" type="success">系统</el-tag>
        <el-tag v-else type="success">未定义</el-tag>
      </template>
    </el-table-column>

    <el-table-column align="center" label="是否加载" min-width="100" prop="appLoad">
      <template #default="scope">
        <el-switch v-model="scope.row.appLoad" :active-value=true :disabled="scope.row.appType === 'kernel'"
                   :inactive-value=false
                   @change="handleLoadChange(scope.row)"
        />

      </template>
    </el-table-column>

    <el-table-column label="PID" min-width="100" prop="pid"/>
    <el-table-column label="配置端口" min-width="100" prop="appPort"/>
    <el-table-column :formatter="rssFormatter" label="内存大小(兆)" min-width="120" prop="rss"/>
    <el-table-column label="内存占用率(%)" min-width="120" prop="men"/>
    <el-table-column label="CPU使用率(%)" min-width="130" prop="cpu"/>
    <el-table-column label="启动时间" min-width="90" prop="stime"/>
    <el-table-column align="center" label="操作" width="200">
      <template #default="scope">
        <el-button :disabled="scope.row.pid === undefined" :icon="Compass" circle plain type="primary"
                   @click.stop="handleGcDialog(scope.row)"/>
        <el-button :disabled="scope.row.appLoad === false" :icon="RefreshLeft" circle plain type="warning"
                   @click.stop="handleRestartDialog(scope.row)"/>
        <el-button :disabled="scope.row.pid === undefined ||scope.row.appLoad
         === true || scope.row.appType === 'kernel'" :icon="Stopwatch" circle plain type="danger"
                   @click.stop="handleStopDialog(scope.row)"/>
        <el-button :disabled="scope.row.pid !== undefined || scope.row.appType === 'kernel'" :icon="Delete" circle plain
                   type="danger"
                   @click.stop="handleUninstallDialog(scope.row)"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from "vue";

import {ProcessStatusItem} from "@/api/service/process/types";
import {
  listProcessStatusList, restartProcess, gcProcess, updateLoadConfig, stopProcess, uninstallProcess,
} from "@/api/service/process";
import {ElMessage, ElMessageBox} from "element-plus";
import {RefreshLeft, Compass, Stopwatch, Delete} from '@element-plus/icons-vue';

const emit = defineEmits(['rowClick']);// 定义组件的事件通知

/**
 * 对外声明接口：父页面可以调用它
 */
defineExpose({refreshTable});

// 数据状态：定义
let dataState = reactive({
  // 页面转载状态
  loading: true,
  // 选中ID数组
  ids: [],
  // 非单个禁用
  single: true,
  // 非多个禁用
  multiple: true,
  // 实体数据
  entityList: [] as ProcessStatusItem[],
});

// 数据状态：双向引用
const {
  // 页面转载状态
  loading,
  // 实体数据
  entityList,
} = toRefs(dataState);

function rssFormatter(row: any) {
  return String(row.rss / 1024).split('.')[0];
}

/**
 * 捕获列表中的选择变化
 * @taskParam selection
 */
function handleSelectionChange(selection: any) {
  dataState.ids = selection.map((item: any) => item.id);
  dataState.single = selection.length !== 1;
  dataState.multiple = !selection.length;
}

/**
 * 捕获列表中的行选择
 * @taskParam row
 */
function handleRowClick(row: any) {
  emit('rowClick', row);
}

/**
 * 捕获删除按钮
 * @taskParam row 行信息
 */
function handleRestartDialog(row: any) {
  if (row.appLoad !== true) {
    return;
  }

  ElMessageBox.confirm('确认重启服务?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    await restartProcess(row.appName, row.appType).then(() => {
      ElMessage.success('重启服务成功');
    });

    // 重新装载数据
    handleQuery();
  })
    .catch(() => ElMessage.info('已取消重启设备服务'));
}

/**
 * 捕获删除按钮
 * @taskParam row 行信息
 */
function handleStopDialog(row: any) {
  ElMessageBox.confirm('确认停止服务?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    await stopProcess(row.appName, row.appType).then(() => {
      ElMessage.success('停止服务成功');
    });

    // 重新装载数据
    handleQuery();
  })
    .catch(() => ElMessage.info('已取消停止设备服务'));
}

function handleUninstallDialog(row: any) {
  if (row.pid !== undefined) {
    return;
  }

  ElMessageBox.confirm('确认删除服务?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    await uninstallProcess(row.appName, row.appType).then(() => {
      ElMessage.success('删除服务成功');
    });

    // 重新装载数据
    handleQuery();
  })
    .catch(() => ElMessage.info('已取消删除服务'));
}

/**
 * 捕获删除按钮
 * @taskParam row 行信息
 */
function handleGcDialog(row: any) {
  if (row.appLoad !== true || row.pid == undefined) {
    return;
  }

  ElMessageBox.confirm('确认GC服务?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    gcProcess(row.pid).then(() => {
      ElMessage.success('GC服务成功');
    });
  })
    .catch(() => ElMessage.info('已取消重启设备服务'));
}

/**
 * 用户状态change
 */
function handleLoadChange(row: { [key: string]: any }) {
  if (row.appType === 'kernel') {
    row.appLoad = true;
    return;
  }

  const text = row.appLoad === true ? '修改为启动' : '修改为停用';
  ElMessageBox.confirm(
    '确认要' + text + '' + row.appName + '启动项目吗?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(async () => {
      // 更新配置
      await updateLoadConfig(row.appName, row.appType, row.appLoad);

      // 重新装载数据
      handleQuery();
    })
    .then(() => {
      ElMessage.success(text + '成功');
    })
    .catch(() => {
      row.appLoad = row.appLoad !== true;
    });


}

/**
 * 刷新页面信息
 */
function handleQuery() {
  emit('rowClick', {});

  dataState.loading = true;

  dataState.entityList = [];
  listProcessStatusList().then(({data}) => {
    data.forEach(value => {
      dataState.entityList.push(value)
    });

    dataState.loading = false;
  });
}

/**
 * 刷新表单
 */
function refreshTable() {
  handleQuery();
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询实体数据
  handleQuery();
});

</script>
