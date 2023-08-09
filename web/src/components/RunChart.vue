<script setup>
import { useDark } from "@vueuse/core";

import { useApiStore } from "@/stores/api";
import { useDateStore } from "@/stores/date";

import axios from "axios";
import _ from "lodash";
import * as echarts from "echarts";

defineProps({
  jobName: {
    type: String,
    required: false,
  },
});
</script>

<script>
export default {
  data() {
    return {
      apiStore: useApiStore(),
      backgroundColorMap: { dark: "rgb(17 24 39)", light: "rgb(255,255,255)" },
      colorMap: {
        dark: {
          completed: "rgb(132 225 188)",
          failed: "rgb(248 180 180)",
          running: "rgb(250 202 21)",
        },
        light: {
          completed: "rgb(132 225 188)",
          failed: "rgb(248 180 180)",
          running: "rgb(250 202 21)",
        },
      },
      dateStore: useDateStore(),
      dashboardChart: null,
      isDark: useDark(),
      rawRunData: null,
    };
  },
  created() {
    this.getRunData();
    this.dateStore.$subscribe(this.getRunData);
  },
  mounted() {
    // Create the echarts instance
    this.dashboardChart = echarts.init(
      document.getElementById("dashboard-chart")
    );
  },
  computed: {
    colorMode() {
      return this.isDark ? "dark" : "light";
    },
    hiddenClass() {
      return _.isEmpty(this.rawRunData) ? "hidden" : "";
    },
  },
  methods: {
    getRunData() {
      const url = new URL(this.apiStore.run);

      if (this.jobName) {
        url.searchParams.append("name", this.jobName);
      } else {
        url.searchParams.append("start", this.dateStore.startTimestamp);
        url.searchParams.append("end", this.dateStore.endTimestamp);
      }

      url.searchParams.append(
        "jq",
        // 'group_by(.start | sub("T.*"; "")) | map({"date": .[0].start | sub("T.*"; ""), "count": length})'
        "group_by(.status) | map({ (.[0].status): group_by(.start) | map({ date: .[0].start, count: length }) })"
      );
      url.searchParams.append("limit", 1000);
      axios.get(url.href).then((response) => (this.rawRunData = response.data));
    },
  },
  watch: {
    rawRunData() {
      /*
      Create x-axis
      */
      const xAxis = new Set(
        this.rawRunData.flatMap((obj) =>
          obj[Object.keys(obj)[0]].map((item) => item.date)
        )
      );

      /*
      Fill in missing dates in each array to have zero values
      */
      this.rawRunData.forEach((obj) => {
        const status = Object.keys(obj)[0];
        const statusArray = obj[status];
        xAxis.forEach((date) => {
          const countObj = statusArray.find((item) => item.date === date);
          if (!countObj) {
            statusArray.push({ date, count: 0 });
          }
        });
        statusArray.sort((a, b) => a.date.localeCompare(b.date));
      });

      /*
      Create series data
      */
      const series = Object.entries(
        this.rawRunData.reduce((acc, obj) => {
          const status = Object.keys(obj)[0];
          const statusArray = obj[status];
          acc[status] = acc[status] || [];
          acc[status].push(...statusArray);
          return acc;
        }, {})
      ).map(([status, countArray]) => ({
        name: status.charAt(0).toUpperCase() + status.substr(1).toLowerCase(),
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 10,
        lineStyle: { color: this.colorMap[this.colorMode][status], width: 3 },
        itemStyle: {
          color: this.colorMap[this.colorMode][status],
        },
        emphasis: {
          disabled: true,
        },
        data: countArray.map(({ date, count }) => [date, count]),
        dataGrouping: {
          enabled: true,
          units: [
            ["day", [1, 7]],
            ["week", [1]],
            ["month", [1, 3, 6]],
            ["year", [1]],
          ],
          approximation: "average",
        },
      }));

      // Draw the chart
      this.dashboardChart.setOption({
        backgroundColor: this.backgroundColorMap[this.colorMode],
        grid: {
          containLabel: true,
          left: 10,
          bottom: 10,
          top: 10,
          right: 10,
        },
        toolbox: {},
        tooltip: {
          show: true,
          trigger: "item",
        },
        series: series,
        xAxis: {
          type: "time",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
      });
    },
    isDark() {
      this.dashboardChart.setOption({
        backgroundColor: this.backgroundColorMap[this.colorMode],
      });
    },
  },
};
</script>

<template>
  <div
    id="dashboard-chart"
    class="grid gap-y-4 dark:bg-background-darker"
    style="width: 100%; height: 300px"
  ></div>
</template>
