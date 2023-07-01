<script lang="ts">
export default {
  name: "PieChart"
}
</script>

<!-- 饼图 -->
<template>
  <div :id="id" :class="className" :style="{ height, width }"/>
</template>

<script lang="ts" setup>
import {
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted
} from 'vue';
import {init, EChartsOption} from 'echarts';
import resize from '@/utils/resize';

const props = defineProps({
  title: {
    type: String,
    default: '饼图'
  },
  id: {
    type: String,
    default: 'pieChart'
  },
  className: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '200px',
    required: true
  },
  height: {
    type: String,
    default: '200px',
    required: true
  },
  items: {
    type: [],
    default: []
  }
});

const {mounted, chart, beforeDestroy, activated, deactivated} = resize();

defineExpose({refresh});

/**
 * 刷新页面
 */
function refresh() {
  nextTick(() => {
    initChart();
  });
}

/**
 * 挂载并初始化chart组件
 */
function initChart() {
  const pieChart = init(document.getElementById(props.id) as HTMLDivElement);

  pieChart.setOption({
    title: {
      show: true,
      text: props.title,
      x: 'center',
      padding: 15,
      textStyle: {
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: '#337ecc'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'bottom'
    },
    series: [
      {
        name: '数值',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        data: props.items
      }
    ]
  } as EChartsOption);

  chart.value = pieChart;
}

onBeforeUnmount(() => {
  beforeDestroy();
});

onActivated(() => {
  activated();
});

onDeactivated(() => {
  deactivated();
});

onMounted(() => {
  mounted();
});
</script>

<style lang="scss" scoped></style>
