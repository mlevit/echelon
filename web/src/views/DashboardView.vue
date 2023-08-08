<script setup>
import AuditChart from "@/components/AuditChart.vue";
import AuditListTable from "@/components/AuditListTable.vue";
import AuditUpcomingListTable from "@/components/AuditUpcomingListTable.vue";
import KpiCard from "@/components/KpiCard.vue";

import { useApiStore } from "@/stores/api";
import { useDateStore } from "@/stores/date";
import { useTitle } from "@vueuse/core";

import axios from "axios";
import _ from "lodash";
import moment from "moment";

useTitle("Echelon");
</script>

<script>
export default {
  data() {
    return {
      apiStore: useApiStore(),
      auditData: null,
      dateStore: useDateStore(),
    };
  },
  created() {
    this.getAuditData();
    this.dateStore.$subscribe(this.getAuditData);
  },
  computed: {
    completedCount() {
      return _.get(this.auditData, "completed");
    },
    failedCount() {
      return _.get(this.auditData, "failed");
    },
    runningCount() {
      return _.get(this.auditData, "running");
    },
  },
  methods: {
    getAuditData() {
      const url = new URL(this.apiStore.processAudit);
      url.searchParams.append("start", this.dateStore.startTimestamp);
      url.searchParams.append("end", this.dateStore.endTimestamp);
      url.searchParams.append(
        "jq",
        '[group_by (.status)[] | {"\\(.[0].status)": length}] | add'
      );
      url.searchParams.append("limit", 1000);
      axios.get(url.href).then((response) => (this.auditData = response.data));
    },
    formatDate(date) {
      if (date) {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      }
    },
  },
};
</script>

<template>
  <div class="min-h-screen px-4 py-6 dark:bg-gray-900 sm:ml-64">
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <AuditChart />
    </div>
    <div class="mb-4 grid grid-cols-3 gap-4">
      <div
        class="flex h-fit items-center justify-center rounded bg-gray-50 dark:bg-gray-800"
      >
        <KpiCard
          title="Running"
          :value="runningCount"
          unit="jobs"
          textColor="text-yellow-800 dark:text-yellow-300"
        />
      </div>
      <div
        class="flex h-fit items-center justify-center rounded bg-gray-50 dark:bg-gray-800"
      >
        <KpiCard
          title="Completed"
          :value="completedCount"
          unit="jobs"
          textColor="text-green-800 dark:text-green-300"
        />
      </div>
      <div
        class="flex h-fit items-center justify-center rounded bg-gray-50 dark:bg-gray-800"
      >
        <KpiCard
          title="Failed"
          :value="failedCount"
          unit="jobs"
          textColor="text-red-800 dark:text-red-300"
        />
      </div>
    </div>
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <AuditListTable />
    </div>
    <div class="mb-4 flex h-fit items-center justify-center rounded">
      <AuditUpcomingListTable />
    </div>
    <!-- <div class="mb-4 grid grid-cols-2 gap-4">
      <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
    </div>
    <div class="mb-4 flex h-48 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
      <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div class="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
    </div> -->
  </div>
</template>
