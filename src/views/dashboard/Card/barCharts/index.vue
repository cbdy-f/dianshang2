<template>
  <div class="charts" ref="charts"></div>
</template>

<script >
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        //隐藏
        show: false,
        type: "category",
      },
      yAxis: {
        //隐藏
        show: false,
      },
      series: [
        {
          type: "bar",
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          color: "cyan",
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip: {},
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
