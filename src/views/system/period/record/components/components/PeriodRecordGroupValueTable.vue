<script lang="ts">
export default {
  name: "PeriodRecordGroupValueTable"
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
  >
    <el-table-column label="设备ID" width="120" prop="id"/>
    <el-table-column label="设备名称" min-width="120" prop="name"/>
    <el-table-column label="设备数值" min-width="120" prop="value"/>
  </el-table>

  <!-- 分页工具条 -->
  <pagination v-if="total > 0" v-model:limit="queryParams.pageSize" v-model:page="queryParams.pageNum" :total="total"
              @pagination="handleQuery"/>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRefs} from "vue";

import {DeviceValueQueryParam} from "@/api/device/value/types";
import {ElTable} from "element-plus";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps(['value']);
const dataTableRef = ref<InstanceType<typeof ElTable>>()

// 数据状态：定义
let dataState = reactive({
  // 页面转载状态
  loading: true,
  // 记录总数
  total: 0,
  // 查询参数
  queryParams: {pageNum: 1, pageSize: 10} as DeviceValueQueryParam,
  // 实体数据
  entityList: [] as any,
  // 实体数据
  dataList: [] as any,
});

// 数据状态：双向引用
const {
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
 * 刷新页面信息
 */
function handleQuery() {
  // 异步查询开始
  dataState.loading = true;

  let list = [];
  for (let i = 0; i < dataState.dataList.length; i++) {
    let value = dataState.dataList[i];
    if ((i >= (queryParams.value.pageNum - 1) * queryParams.value.pageSize) && (i < queryParams.value.pageNum * queryParams.value.pageSize)) {
      list.push(value);
    }
  }

  dataState.entityList = list;

  // 异步查询结束
  dataState.loading = false;
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 初始化：全体数据列表
  dataState.dataList = props.value;
  dataState.total = props.value.length;

  // 刷新当前页面数据
  handleQuery();
});

</script>
