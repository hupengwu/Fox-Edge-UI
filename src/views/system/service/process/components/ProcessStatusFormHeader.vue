<script lang="ts">
export default {
  name: "ProcessStatusFormHeader"
}
</script>

<template>
  <el-form ref="queryFormRef">
    <el-form-item>
      <el-button :icon="Search" type="primary" @click="handleQuery">刷新</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {onMounted,} from "vue";

import {Search} from '@element-plus/icons-vue';

const emit = defineEmits(['query']);// 定义组件的事件通知

function handleQuery() {
  emit('query', 'header', '');
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
})

</script>
