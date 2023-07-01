<script lang="ts">
export default {
  name: "OperateManualTaskWorkSpace"
}
</script>

<template>
  <div>
    <el-form-item>
      <el-button :icon="Message" type="primary" @click="handleSendRequest(row)">发送</el-button>
    </el-form-item>
<!--
    <el-form-item label="请求参数:">
      <el-input v-model="row.taskParamJson" :autosize="{ minRows: 1, maxRows: 100 }" :readonly="true" type="textarea"/>
    </el-form-item>
-->
    <el-form-item label="返回数据:">
      <el-input v-model="row.rspdParamJson" :autosize="{ minRows: 1, maxRows: 100 }" :readonly="true" type="textarea"/>
    </el-form-item>
  </div>
</template>


<script lang="ts" setup>
import {reactive, toRefs,} from "vue";

import {Message} from '@element-plus/icons-vue'
import {OperateRequestVO, TaskRequestVO, TaskRespondVO} from "@/api/operate/device/types";
import {uuid} from "vue-uuid";
import {operateDevice} from "@/api/operate/device";

/**
 * 对外声明接口：父页面可以调用它
 */
defineExpose({initWorkSpace});

// 数据状态：定义
let dataState = reactive({
  //行信息
  row: {} as TaskRequestVO,
});

// 数据状态：双向引用
const {
  //行信息
  row
} = toRefs(dataState);

function initWorkSpace(rowClick: any) {
  row.value = rowClick;
}

/**
 * 捕获发送请求
 * @param row
 */
function handleSendRequest(row: any) {
  let taskRequestVO = {} as TaskRequestVO;

  taskRequestVO.timeout = 0;
  taskRequestVO.uuid = uuid.v4();
  taskRequestVO.requestVOS = [] as OperateRequestVO[];
  for (const request of row.taskParam) {
    let requestVO = {} as OperateRequestVO;
    requestVO.uuid = uuid.v4();
    requestVO.deviceName = row.deviceName;
    requestVO.deviceType = row.deviceType;
    requestVO.operateMode = request.operateMode;
    requestVO.operateName = request.operateName;
    requestVO.param = request.param;
    requestVO.timeout = request.timeout;
    requestVO.record = true;

    taskRequestVO.requestVOS.push(requestVO);
    taskRequestVO.timeout += requestVO.timeout;
  }

  // 操作设备
  row.rspdParamJson = '';
  operateDevice(taskRequestVO).then((response: TaskRespondVO) => {
    row.rspdParamJson = JSON.stringify(response.respondVOS, null, 5);
  });
}

</script>
