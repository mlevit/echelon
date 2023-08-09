<script setup>
import { useApiStore } from "@/stores/api";

import router from "@/router";
import axios from "axios";

defineProps({
  jobId: {
    type: String,
    required: true,
  },
  jobName: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return {
      apiStore: useApiStore(),
      rawSourceData: null,
      rawTargetData: null,
    };
  },
  created() {
    this.getSourceData();
    this.getTargetData();
  },
  computed: {},
  methods: {
    jobLink(jobId) {
      router.push(`/job/${jobId}`);
    },
    getSourceData() {
      const url = new URL(this.apiStore.jobDepend);
      url.searchParams.append("name", this.jobName);
      axios
        .get(url.href)
        .then((response) => (this.rawSourceData = response.data));
    },
    getTargetData() {
      const url = new URL(this.apiStore.jobDependant);
      url.searchParams.append("name", this.jobName);
      axios
        .get(url.href)
        .then((response) => (this.rawTargetData = response.data));
    },
    getLineageGraph() {
      var lineage = [
        { id: parseInt(this.jobId), text: this.jobName, edgeType: "round" },
      ];
      for (let record of this.rawSourceData) {
        lineage.push({
          id: record.job_id,
          text: record.name,
          link: "-->",
          next: [this.jobId],
          editable: true,
          edgeType: "round",
        });
      }

      for (let record of this.rawTargetData) {
        lineage.push({
          id: record.job_id,
          text: record.name,
          editable: true,
          edgeType: "round",
        });

        lineage.push({
          id: this.jobId,
          text: this.jobName,
          link: "-->",
          next: [record.job_id],
          editable: true,
          edgeType: "round",
        });
      }

      return lineage;
    },
  },
};
</script>

<template>
  <div class="w-full">
    <div>
      <h6 class="mb-4 text-lg font-bold dark:text-white">Lineage</h6>
    </div>
    <vue-mermaid
      :nodes="getLineageGraph()"
      type="graph LR"
      @nodeClick="jobLink"
      class="-ml-2 -mt-2"
      v-if="rawSourceData && rawTargetData"
    ></vue-mermaid>
    <div v-else>
      <p class="text-gray-400 dark:text-gray-500">No lineage defined.</p>
    </div>
  </div>
</template>

<style>
.edgePaths {
  stroke: rgb(156 163 175) !important;
}

.edgePaths .path {
  stroke: rgb(156 163 175) !important;
  margin-left: 5px !important;
}

.arrowheadPath {
  fill: rgb(156 163 175) !important;
}

.node {
  fill: rgb(31 41 55) !important;
  stroke: rgb(156 163 175) !important;
  stroke-width: 1px !important;
}

.label-container {
  fill: rgb(31 41 55) !important;
  stroke: rgb(156 163 175) !important;
}

.label-container:hover {
  fill: rgb(75 85 99) !important;
}

.label {
  color: white !important;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
  font-size: 14px !important;
  pointer-events: none;
}
</style>
