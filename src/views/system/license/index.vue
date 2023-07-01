<script lang="ts">
export default {
  name: 'manage',
};
</script>

<script lang="ts" setup>

import {onMounted, reactive, toRefs} from 'vue';
import {ElForm, ElInput, ElMessage, ElMessageBox} from 'element-plus';


import {getLicenseId, registerLicense} from "@/api/license";
import {licenseInfo} from "@/api/license/types";


const dataState = reactive({
  // license信息
  license: {} as licenseInfo,
});

const {
  license,
} = toRefs(dataState);


/**
 * 响应查询按钮：页查询数据
 */
function handleQuery() {
  getLicenseId().then(({data}) => {
    dataState.license = data;
  });
}

/**
 * 注册序列号
 */
function handleRegisterLicense() {
  ElMessageBox.confirm('注册序列号？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    registerLicense(dataState.license.license).then(() => {
      ElMessage.success('注册成功');
    });
  })
    .catch(() => ElMessage.info('已取消注册'));
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">

    <el-form :inline="true">
      <div>
        <el-form-item class="el-input" label="网关信息">
          <el-input v-model="license.cpuid" :disabled="true" clearable placeholder="网关ID"/>
        </el-form-item>
      </div>

      <div>
        <el-form-item class="el-input" label="网关信息">
          <el-input v-model="license.license" :autosize="{ minRows: 1, maxRows: 100 }" clearable placeholder="序列号"
                    type="textarea"/>
        </el-form-item>
      </div>

      <div style="float: right">
        <el-button type="primary" @click="handleRegisterLicense">注 册</el-button>
      </div>
    </el-form>

  </div>
</template>

<style lang="scss" scoped>
.app-container {
  min-width: 500px;

  .el-input {
    min-width: 500px;
  }
}
</style>



