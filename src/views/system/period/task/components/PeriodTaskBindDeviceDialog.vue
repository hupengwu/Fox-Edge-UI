<script lang="ts">
export default {
  name: "PeriodTaskBindDeviceDialog"
}
</script>


<!--
 * @Descripttion: 设备编辑对话框
 * @version:
 * @Author: hupengwu
 * @Date: 2022-10-24 09:10:28
 * @LastEditors: hupengwu
 * @LastEditTime: 2022-10-24 09:10:28
-->
<template>
  <!-- 对话框 -->
  <el-dialog :close-on-click-modal="false" :model-value="visible" :title="title" min-width="200px"
             @close="handleCancel">
    <el-switch v-model="dataState.monitorTask.selectDevice"
               :active-value=true :inactive-value=false
               active-text="选定设备" inactive-text="全体设备"
    />


    <!-- 数据表单 -->
    <el-table
      v-show="dataState.monitorTask.selectDevice"
      ref="dataTableRef"
      v-loading="loading"
      :data="entityList"
      border
      highlight-current-row
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <el-table-column align="center" min-width="40" type="selection"/>
      <el-table-column align="center" label="ID" min-width="80" prop="id"/>
      <el-table-column label="设备名称" min-width="200" prop="deviceName"/>
      <el-table-column label="设备类型" min-width="120" prop="deviceType"/>
      <el-table-column label="通道类型" min-width="120" prop="channelType"/>
      <el-table-column label="通道名称" min-width="200" prop="channelName"/>
    </el-table>

    <!-- 分页工具条 -->
    <pagination v-if="total > 0" v-model:limit="queryParams.pageSize" v-model:page="queryParams.pageNum" :total="total"
                @pagination="handleQuery"/>

    <!-- 脚部：确认/取消按钮-->
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, reactive, ref, toRefs} from "vue";

import {ElTable} from "element-plus";

import {DeviceItem, DeviceQueryParam} from "@/api/device/device/types";
import {listDeviceEntityPages} from "@/api/device/device";
import {PeriodTaskItem} from "@/api/period/task/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps(['visible']);
const emit = defineEmits(['rowClick', 'update', 'cancel']); //注意：这个是父组件<dict-type-edit>标签上的@close
const dataTableRef = ref<InstanceType<typeof ElTable>>()
/**
 * 对外声明接口：父页面可以调用它
 */
defineExpose({initEditData});

// 数据状态：定义
let dataState = reactive({
  // 标题
  title: '',
  // 页面转载状态
  loading: true,
  // 全体页面选中的设备ID
  deviceIds: new Set,
  // 当前页面选中ID数组
  selectedIds: [],
  // 记录总数
  total: 0,
  // 非单个禁用
  single: true,
  // 非多个禁用
  multiple: true,
  // 监控任务
  monitorTask: {} as PeriodTaskItem,
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceQueryParam,
  // 实体数据
  entityList: [] as DeviceItem[],
});

// 数据状态：双向引用
const {
  // 标题
  title,
  // 页面转载状态
  loading,
  // 查询参数
  queryParams,
  // 实体数据
  entityList,
  // 记录总数
  total,
} = toRefs(dataState);

/**
 * 捕获列表中的选择变化
 * @taskParam selection
 */
function handleSelectionChange(selection: any) {
  // 检查：是否还在异步查询过程中，避免异步带来的数据更新问题
  if (dataState.loading) {
    return;
  }

  dataState.selectedIds = selection.map((item: any) => item.id);
  dataState.single = selection.length !== 1;
  dataState.multiple = !selection.length;

  // 删除当前页面所有的数据
  dataState.entityList.forEach(value => {
    dataState.deviceIds.delete(value.id);
  });
  // 重新添加当前页面选中的数据
  dataState.selectedIds.forEach(value => {
    dataState.deviceIds.add(value);
  });
}

/**
 * 捕获列表中的行选择
 * @taskParam row
 */
function handleRowClick(row: any) {
  emit('rowClick', row);
}

/**
 * 刷新页面信息
 */
function handleQuery() {
  emit('rowClick', {});

  // 异步查询开始
  dataState.loading = true;

  // 查询设备实体列表：同时对deviceParamJson进行JSON显示转换
  listDeviceEntityPages(dataState.queryParams).then(({data}) => {
    dataState.entityList = data.list;
    dataState.total = data.total;

    // 如果当前页面的设备在deviceIds中，则标识为选中
    nextTick(() => {
      for (let obj of entityList.value) {
        let selected = dataState.deviceIds.has(obj.id);
        dataTableRef.value?.toggleRowSelection(obj, selected);
      }

      // 异步查询结束
      dataState.loading = false;
    });
  });
}

/**
 * 取消
 */
function handleCancel() {
  //执行调用<device-edit-dialog @cancel="cancelEdit">
  emit('cancel', "子组件传给父组件的值");
}

/**
 * 确认：新增/修改实体
 */
function handleSubmit() {
  // 交集数据处理：因为可能两边的数据可能各自修改过
  let deviceIds = [];
  for (let entity of dataState.entityList) {
    if (dataState.deviceIds.has(entity.id)) {
      deviceIds.push(entity.id);
    }
  }

  dataState.monitorTask.deviceIds = deviceIds;
  emit('update', dataState.monitorTask);
}

/**
 * 初始化对话框
 * @taskParam type 对话框类型
 * @taskParam entity 实体
 */
function initEditData(type: string, entity: PeriodTaskItem) {
  dataState.monitorTask = entity;
  dataState.queryParams.deviceType = entity.deviceType;

  dataState.title = '绑定设备:' + entity.deviceType;

  // 清空选中状态
  dataState.deviceIds = new Set;
  nextTick(() => {
    dataTableRef.value?.clearSelection();
  });


  // 初始化选中的deviceIds
  const deviceIds = dataState.monitorTask.deviceIds as number[];
  for (let deviceId of deviceIds) {
    dataState.deviceIds.add(deviceId);
  }

  handleQuery();
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
});

</script>
