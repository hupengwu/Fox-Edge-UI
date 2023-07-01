<script lang="ts">
export default {
  name: "OperateChannelTaskWorkSpace"
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
import {ChannelRespondVO, ChannelRequestVO} from "@/api/operate/channel/types";
import {uuid} from "vue-uuid";
import {operateChannel} from "@/api/operate/channel";
import {OperateChannelTaskItem} from "@/api/device/operate/task/channel/types";

/**
 * 对外声明接口：父页面可以调用它
 */
defineExpose({initWorkSpace});

// 数据状态：定义
let dataState = reactive({
  //行信息
  row: {} as OperateChannelTaskItem,
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
  let channelRequestVO = {} as ChannelRequestVO;

  channelRequestVO.uuid = uuid.v4();
  channelRequestVO.name = row.channelName;
  channelRequestVO.mode = row.sendMode;
  channelRequestVO.timeout = row.timeout;
  if (row.taskParam.sendTxt !== undefined) {
    channelRequestVO.send = row.taskParam.sendTxt;
  }
  if (row.taskParam.sendMap !== undefined) {
    channelRequestVO.send = row.taskParam.sendMap;
  }
  if (row.taskParam.sendList !== undefined) {
    channelRequestVO.send = row.taskParam.sendList;
  }

  let channelType = row.channelType;

  // 操作通道
  row.rspdParamJson = '';
  operateChannel(channelType, channelRequestVO).then((response: ChannelRespondVO) => {
    row.rspdParamJson = JSON.stringify(response, null, 5);
  });
}

</script>
