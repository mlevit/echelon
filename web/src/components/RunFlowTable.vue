<script setup>
import CodeBadge from "@/components/CodeBadge.vue";
import SvgIcon from "@/components/SvgIcon.vue";

import { useApiStore } from "@/stores/api";

import axios from "axios";
import { initFlowbite } from "flowbite";
import _ from "lodash";
import moment from "moment";

defineProps({
  runId: {
    type: String,
    required: true,
  },
  runStatus: {
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
      copyText: "Copy",
      liveIntervalId: null,
      rawRunFlowData: null,
    };
  },
  created() {
    this.getRunFlowData();
    this.createInterval();
  },
  mounted() {
    initFlowbite();
  },
  unmounted() {
    this.clearInterval();
  },
  computed: {},
  methods: {
    getRunFlowData() {
      const url = new URL(this.apiStore.runFlow);
      url.searchParams.append("id", this.runId);
      axios
        .get(url.href)
        .then((response) => (this.rawRunFlowData = response.data));
    },
    formatDate(date) {
      if (date) {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      }
    },
    clearInterval() {
      if (this.liveIntervalId) {
        window.clearInterval(this.liveIntervalId);
      }
    },
    copyData() {
      navigator.clipboard.writeText(
        JSON.stringify(this.rawRunFlowData, null, 2)
      );

      let ref = this;
      this.copyText = "Copied";
      setTimeout(function () {
        ref.copyText = "Copy";
      }, 2000);
    },
    createInterval() {
      if (this.runStatus === "running") {
        this.liveIntervalId = window.setInterval(this.getRunFlowData, 5000);
      } else {
        this.clearInterval();
      }
    },
  },
};
</script>

<template>
  <div class="grid w-full gap-y-4">
    <div class="flex items-center">
      <h6 class="text-lg font-bold dark:text-textPrimary-dark">Metrics</h6>
      <SvgIcon
        icon="clipboard"
        color="black"
        class="ml-2 cursor-pointer focus:outline-none"
        @click="copyData"
        data-tooltip-target="tooltip-copy-flow"
        data-tooltip-placement="right"
      />
      <div
        id="tooltip-copy-flow"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-background-darker px-3 py-2 text-sm font-medium text-textPrimary-dark opacity-0 shadow-sm dark:bg-gray-700"
      >
        {{ copyText }}
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
    <div>
      <div
        class="overflow-x-auto border border-tableBorder dark:border-tableBorder-dark sm:rounded-lg"
        v-if="!_.isEmpty(rawRunFlowData)"
      >
        <table
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <thead
            class="bg-tableHeadBg text-xs uppercase text-textSecondary dark:bg-tableHeadBg-dark dark:text-textSecondary-dark"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Job</th>
              <th scope="col" class="px-6 py-3">Function</th>
              <th scope="col" class="px-6 py-3">Label</th>
              <th scope="col" class="px-6 py-3">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b bg-tableTrBg hover:bg-tableTrBgHover dark:border-tableBorder-dark dark:bg-tableTrBg-dark dark:hover:bg-tableTrBgHover-dark"
              v-for="record in rawRunFlowData"
              :key="record.flow_id"
            >
              <td class="px-6 py-4"><CodeBadge :value="record.job" /></td>
              <td class="px-6 py-4"><CodeBadge :value="record.function" /></td>
              <td class="px-6 py-4"><CodeBadge :value="record.label" /></td>
              <td class="px-6 py-4">{{ record.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p class="text-gray-400 dark:text-gray-500">No metrics captured.</p>
      </div>
    </div>
  </div>
</template>
