<template>
  <div>
    <!-- 面包屑导航 -->
    <myBreadcrumb
      level1="数据统计"
      level2="数据报表"
    ></myBreadcrumb>
    <el-card>
      <div
        id="main"
        style="width: 600px;height:400px;"
      >

      </div>
    </el-card>
  </div>

</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      dataList: {}
    };
  },
  mounted() {
    let myChart = echarts.init(document.getElementById("main"));
    myChart.showLoading();
    this.$http({
      url: "reports/type/1",
      method: "get"
    }).then(res => {
      let { data, meta } = res.data;
      if (meta.status === 200) {
        this.dataList = data;
        this.dataList.xAxis[0].boundaryGap = false;
        let oldoption = {
          title: {
            text: "堆叠区域图"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          }
        };
        var option = { ...this.dataList, ...oldoption };
        // 绘制图表
        myChart.setOption(option);
        myChart.hideLoading();
      } else {
        this.$message.error(meta.msg);
      }
    });
  }
};
</script>

<style scoped>
</style>