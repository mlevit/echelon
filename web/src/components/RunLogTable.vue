<script setup>
import CodeBadge from "@/components/CodeBadge.vue";
import LogPriorityBadge from "@/components/LogPriorityBadge.vue";
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
      rawRunLogData: null,
      liveIntervalId: null,
    };
  },
  created() {
    this.getRunData();
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
    getRunData() {
      const url = new URL(this.apiStore.runLog);
      url.searchParams.append("id", this.runId);
      axios
        .get(url.href)
        .then((response) => (this.rawRunLogData = response.data));
      // this.apiStore.storeLiveConnection(url.href, 1)
    },
    clearInterval() {
      if (this.liveIntervalId) {
        window.clearInterval(this.liveIntervalId);
      }
    },
    createInterval() {
      if (this.runStatus === "running") {
        this.liveIntervalId = window.setInterval(this.getRunData, 5000);
      } else {
        this.clearInterval();
      }
    },
    copyData() {
      navigator.clipboard.writeText(
        JSON.stringify(this.rawRunLogData, null, 2)
      );
    },
    formatDate(date) {
      if (date) {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      }
    },
    wrapCode(message) {
      const codeClass =
        "rounded bg-gray-100 px-2 py-2 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300";

      const singleQuoteRegex = /'([^']+)'/g;

      const newMessage = message.replace(
        singleQuoteRegex,
        `<code class="${codeClass}">$1</code>`
      );
      return newMessage;
    },
  },
};
</script>

<template>
  <div class="grid w-full gap-y-4 dark:bg-background-darker">
    <div class="flex items-center">
      <h6 class="text-lg font-bold dark:text-textPrimary-dark">Logs</h6>
      <SvgIcon
        icon="clipboard"
        color="black"
        class="ml-2 cursor-pointer"
        @click="copyData"
        data-tooltip-target="tooltip-copy"
        data-tooltip-placement="right"
      />
      <div
        id="tooltip-copy"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-background-darker px-3 py-2 text-sm font-medium text-textPrimary-dark opacity-0 shadow-sm dark:bg-gray-700"
      >
        Copy
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
    <div>
      <div
        class="overflow-x-auto border border-tableBorder dark:border-tableBorder-dark sm:rounded-lg"
        v-if="!_.isEmpty(rawRunLogData)"
      >
        <table
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <thead
            class="bg-tableHeadBg text-xs uppercase text-textSecondary dark:bg-tableHeadBg-dark dark:text-textSecondary-dark"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Timestamp</th>
              <th scope="col" class="px-6 py-3">Job</th>
              <th scope="col" class="px-6 py-3">Function</th>
              <th scope="col" class="px-6 py-3">Priority</th>
              <th scope="col" class="px-6 py-3">Message</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b bg-tableTrBg hover:bg-tableTrBgHover dark:border-tableBorder-dark dark:bg-tableTrBg-dark dark:hover:bg-tableTrBgHover-dark"
              v-for="record in rawRunLogData"
              :key="record.log_id"
            >
              <td class="whitespace-nowrap px-6 py-4">
                {{ formatDate(record.insert_date) }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <CodeBadge :value="record.job" />
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <CodeBadge :value="record.function" />
              </td>
              <td class="px-6 py-4">
                <LogPriorityBadge :priority="record.priority" />
              </td>
              <td
                class="px-6 py-4 leading-9"
                v-html="wrapCode(record.message)"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p class="text-gray-400 dark:text-gray-500">No logs captured.</p>
      </div>
    </div>
  </div>
</template>
