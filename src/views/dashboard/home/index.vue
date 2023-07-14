<script lang="ts">
export default {name: 'Dashboard'};
</script>

<script lang="ts" setup>
// 组件引用
import GithubCorner from '@/components/GithubCorner/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import PieChart from './components/Chart/PieChart.vue';
import {onMounted, reactive, ref, toRefs} from "vue";

import {listIndicator,} from '@/api/dashboard';
import {Indicator,} from '@/api/dashboard/types';

const diskPieChartTableRef = ref<any>(); // 这了的变量名称必须和<device-edit-dialog>的ref值一样
const ramPieChartTableRef = ref<any>(); // 这了的变量名称必须和<device-edit-dialog>的ref值一样
const swapPieChartTableRef = ref<any>(); // 这了的变量名称必须和<device-edit-dialog>的ref值一样
const cpuPieChartTableRef = ref<any>(); // 这了的变量名称必须和<device-edit-dialog>的ref值一样


const state = reactive({
  // 指标数据
  indicator: {} as Indicator,
  diskPieChart: {
    id: "diskPieChart",
    title: "磁盘空间",
    height: "400px",
    width: "100%",
    class: "chart-container",
    items: [] as any,
  },
  ramPieChart: {
    id: "ramPieChart",
    title: "内存空间",
    height: "400px",
    width: "100%",
    class: "chart-container",
    items: [] as any,
  },
  swapPieChart: {
    id: "swapPieChart",
    title: "交换空间",
    height: "400px",
    width: "100%",
    class: "chart-container",
    items: [] as any,
  },
  cpuPieChart: {
    id: "cpuPieChart",
    title: "CPU占用率",
    height: "400px",
    width: "100%",
    class: "chart-container",
    items: [] as any,
  },

});

const {
  // 指标数据
  indicator,
  diskPieChart,
  ramPieChart,
  swapPieChart,
  cpuPieChart,
} = toRefs(state);

/**
 * 刷新页面信息
 */
function handleQuery() {
  listIndicator().then(({data}) => {
    indicator.value = data as Indicator;

    diskPieChart.value.title = "磁盘空间=" + indicator.value.diskSizeTxt;
    diskPieChart.value.items = [];
    diskPieChart.value.items.push({value: indicator.value.diskUsed, name: '已用空间'});
    diskPieChart.value.items.push({value: indicator.value.diskAvail, name: '剩余空间'});
    diskPieChartTableRef.value.refresh();

    ramPieChart.value.title = "内存空间=" + indicator.value.ramTotalTxt;
    ramPieChart.value.items = [];
    ramPieChart.value.items.push({value: indicator.value.ramUsed, name: '已用空间'});
    ramPieChart.value.items.push({value: indicator.value.ramFree, name: '剩余空间'});
    ramPieChartTableRef.value.refresh();

    swapPieChart.value.title = "交换空间=" + indicator.value.swapTotalTxt;
    swapPieChart.value.items = [];
    swapPieChart.value.items.push({value: indicator.value.swapUsed, name: '已用空间'});
    swapPieChart.value.items.push({value: indicator.value.swapFree, name: '剩余空间'});
    swapPieChartTableRef.value.refresh();

    cpuPieChart.value.title = "CPU占用率=" + (100 - indicator.value.cpuId).toFixed(1) + "%";
    cpuPieChart.value.items = [];
    cpuPieChart.value.items.push({value: indicator.value.cpuUs, name: '用户占比'});
    cpuPieChart.value.items.push({value: indicator.value.cpuId, name: '空闲占比'});
    cpuPieChart.value.items.push({
      value: indicator.value.cpuSy + indicator.value.cpuHi + indicator.value.cpuNi + indicator.value.cpuSt + indicator.value.cpuWa,
      name: '系统占比'
    });
    cpuPieChartTableRef.value.refresh();
  });
}

/**
 * 响应页面安装：页面的初始化工作
 */
onMounted(() => {
  // 查询实体数据
  handleQuery();

});

</script>

<template>
  <div class="dashboard-container">
    <github-corner class="github-corner"/>

    <!-- 数据 -->
    <el-row :gutter="40" class="card-panel__col">
      <el-col :lg="8" :sm="12" :xs="24" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-blue">
            <svg-icon icon-class="cpu-id" size="4em"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">网关序列号</div>
            <div class="card-panel-num">{{ indicator.cpuUID }}</div>
          </div>
        </div>
      </el-col>

      <el-col :lg="8" :sm="12" :xs="24" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-black">
            <svg-icon icon-class="device-list" size="4em"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">设备总数</div>
            <div class="card-panel-num">{{ indicator.deviceTotalCount }}</div>
          </div>
        </div>
      </el-col>

      <el-col :lg="8" :sm="12" :xs="24" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-blue">
            <svg-icon icon-class="device-list" size="4em"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">设备种类</div>
            <div class="card-panel-num">{{ indicator.deviceTypeCount }}</div>
          </div>
        </div>
      </el-col>

      <el-col :lg="8" :sm="12" :xs="24" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-pink">
            <svg-icon icon-class="device-list" size="4em"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">断开设备</div>
            <div class="card-panel-num">{{ indicator.deviceFailedCount }}</div>
          </div>
        </div>
      </el-col>


      <el-col :lg="8" :sm="12" :xs="24" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-green">
            <svg-icon icon-class="device-list" size="4em"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">连接设备</div>
            <div class="card-panel-num">{{ indicator.deviceSuccessCount }}</div>
          </div>
        </div>
      </el-col>

      <el-col :lg="8" :sm="12" :xs="24" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-blue">
            <svg-icon icon-class="channel" size="4em"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">通道数量</div>
            <div class="card-panel-num">{{ indicator.channelTotalCount }}</div>
          </div>
        </div>
      </el-col>

      <el-col :lg="8" :sm="12" :xs="24" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-green">
            <svg-icon icon-class="channel" size="4em"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">通道类型</div>
            <div class="card-panel-num">{{ indicator.channelTypeCount }}</div>
          </div>
        </div>
      </el-col>


      <el-col :lg="8" :sm="12" :xs="24" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-green">
            <svg-icon icon-class="device-object" size="4em"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">对象数量</div>
            <div class="card-panel-num">{{ indicator.objectTotalCount }}</div>
          </div>
        </div>
      </el-col>

      <el-col :lg="8" :sm="12" :xs="24" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-green">
            <svg-icon icon-class="service-status" size="4em"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">服务数量</div>
            <div class="card-panel-num">{{ indicator.serviceActiveCount }}</div>
          </div>
        </div>
      </el-col>

    </el-row>

    <!-- Echarts 图表 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :lg="6" :sm="12" :xs="24" class="card-panel__col">
        <pie-chart ref="diskPieChartTableRef"
                   v-model:class="diskPieChart.class"
                   v-model:height="diskPieChart.height"
                   v-model:id="diskPieChart.id"
                   v-model:items="diskPieChart.items"
                   v-model:title="diskPieChart.title"
                   v-model:width="diskPieChart.width"
        />
      </el-col>

      <el-col :lg="6" :sm="12" :xs="24" class="card-panel__col">
        <pie-chart ref="cpuPieChartTableRef"
                   v-model:class="cpuPieChart.class"
                   v-model:height="cpuPieChart.height"
                   v-model:id="cpuPieChart.id"
                   v-model:items="cpuPieChart.items"
                   v-model:title="cpuPieChart.title"
                   v-model:width="cpuPieChart.width"
        />
      </el-col>

      <el-col :lg="6" :sm="12" :xs="24" class="card-panel__col">
        <pie-chart ref="ramPieChartTableRef"
                   v-model:class="ramPieChart.class"
                   v-model:height="ramPieChart.height"
                   v-model:id="ramPieChart.id"
                   v-model:items="ramPieChart.items"
                   v-model:title="ramPieChart.title"
                   v-model:width="ramPieChart.width"
        />
      </el-col>

      <el-col :lg="6" :sm="12" :xs="24" class="card-panel__col">
        <pie-chart ref="swapPieChartTableRef"
                   v-model:class="swapPieChart.class"
                   v-model:height="swapPieChart.height"
                   v-model:id="swapPieChart.id"
                   v-model:items="swapPieChart.items"
                   v-model:title="swapPieChart.title"
                   v-model:width="swapPieChart.width"
        />
      </el-col>
    </el-row>


  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  padding: 24px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
    z-index: 99;
  }

  .box-center {
    margin: 0 auto;
    display: table;
  }

  .user-profile {
    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .card-panel__col {
    margin-bottom: 12px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .icon-blue {
      color: #36a3f7;
    }

    .icon-black {
      color: #8c939d;
    }

    .icon-pink {
      color: #f4516c;
    }

    .icon-green {
      color: #34bfa3;
    }

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-black {
        background: #8c939d;
      }

      .icon-blue {
        background: #36a3f7;
      }

      .icon-pink {
        background: #f4516c;
      }

      .icon-green {
        background: #34bfa3;
      }
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 20px 0;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
        text-align: right;
      }
    }
  }

  .chart-container {
    background: #ffffff;
  }
}
</style>
