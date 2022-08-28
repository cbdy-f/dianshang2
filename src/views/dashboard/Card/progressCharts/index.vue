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
        //最小值与最大值的设置
        min: 0,
        max: 100,
      },
      yAxis: {
        //隐藏
        show: false,
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "yellowgreen",
          //柱状图的宽度
          barWidth: 10,
          //背景颜色
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          //文本
          label: {
            show: true,
            formatter: "|",
            position: "right",
          },
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
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
