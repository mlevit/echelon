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
      <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">Lineage</h6>
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
.label {
  @apply text-textPrimary dark:text-textPrimary-dark !important;
  @apply font-sans text-sm !important;
  @apply flex items-center justify-center !important;
}

.label g foreignObject div {
  @apply relative top-1/2 -translate-y-1/2 transform whitespace-nowrap text-center;
}

.node rect {
  @apply fill-background dark:fill-background-dark !important;
  @apply stroke-border dark:stroke-border-dark !important;
}

.edgePath path {
  @apply stroke-border-dark dark:stroke-border !important;
}

.arrowheadPath {
  @apply fill-border-dark dark:fill-border !important;
}
</style>
