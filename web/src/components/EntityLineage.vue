<script setup>
import router from "@/router";
import { useApiStore } from "@/stores/api";

import axios from "axios";
import _ from "lodash";

defineProps({
  entityId: {
    type: String,
    required: true,
  },
  entityName: {
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
      rawEntityData: null,
    };
  },
  created() {
    this.getEntityData();
  },
  methods: {
    entityLink(entityId) {
      router.push(`/data/${entityId}`);
    },
    getEntityData() {
      if (this.entityName) {
        const url = new URL(this.apiStore.entityLineage);
        url.searchParams.append("name", this.entityName);
        axios
          .get(url.href)
          .then((response) => (this.rawEntityData = response.data));
      }
    },
    getLineageGraph() {
      var lineage = [];
      for (let record of this.rawEntityData) {
        lineage.push({
          id: record.target_entity_id,
          text: record.target_entity_name,
          editable: true,
          edgeType: "round",
        });

        lineage.push({
          id: record.source_entity_id,
          text: record.source_entity_name,
          link: "-->",
          next: [record.target_entity_id],
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
      class="-ml-2 -mt-2"
      @nodeClick="entityLink"
      v-if="!_.isEmpty(rawEntityData)"
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
