<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
import { useApiStore } from "@/stores/api";

import axios from "axios";
import { initDropdowns } from "flowbite";
import { RouterLink } from "vue-router";

defineProps({
  jobName: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  runId: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return { apiStore: useApiStore(), rawRunData: null };
  },
  created() {
    this.getRunData();
  },
  mounted() {
    initDropdowns();
  },
  methods: {
    getRunData() {
      const url = new URL(this.apiStore.run);
      url.searchParams.append("name", this.jobName);
      url.searchParams.append("jq", `map(select(.run_id != ${this.runId}))`);
      axios.get(url.href).then((response) => (this.rawRunData = response.data));
    },
  },
};
</script>

<template>
  <nav
    class="flex w-full select-none rounded-lg border border-border-lighter bg-background px-5 py-3 text-textSecondary dark:border-border-darker dark:bg-background-darker"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <RouterLink
          to="/job"
          class="inline-flex items-center text-sm font-medium text-textSecondary hover:text-blue-600 dark:text-gray-400 dark:hover:text-textPrimary-dark"
        >
          Job
        </RouterLink>
      </li>
      <li>
        <div class="flex items-center">
          <SvgIcon icon="chevronRight" />
          <RouterLink
            :to="'/job/' + jobId"
            class="ml-1 text-sm font-medium text-textSecondary hover:text-blue-600 dark:text-gray-400 dark:hover:text-textPrimary-dark md:ml-2"
            >{{ jobName }}</RouterLink
          >
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <SvgIcon icon="chevronRight" />
          <span
            class="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2"
          >
            <RouterLink
              to="/run"
              class="inline-flex items-center text-sm font-medium text-textSecondary hover:text-blue-600 dark:text-gray-400 dark:hover:text-textPrimary-dark"
            >
              Run
            </RouterLink></span
          >
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <SvgIcon icon="chevronRight" class="mr-2" />
          <button
            id="dropdownrun"
            data-dropdown-toggle="dropdown-run"
            class="inline-flex rounded-lg border border-border bg-background-lightest px-2 py-2 text-center text-sm font-normal text-textSecondary hover:bg-hover dark:border-gray-600 dark:bg-background-darker dark:text-gray-400 dark:hover:bg-background-darker dark:focus:ring-gray-700"
          >
            #{{ runId }}
            <SvgIcon icon="chevronDown" class="ml-2" />
          </button>
          <div
            id="dropdown-run"
            class="z-10 hidden w-fit divide-y divide-gray-100 rounded-lg border border-border-lighter bg-background-lightest shadow dark:border-gray-600 dark:bg-gray-700"
          >
            <ul
              class="py-2 text-sm text-textSecondary dark:text-gray-200"
              aria-labelledby="dropdownDefault"
            >
              <li v-for="record in rawRunData" :key="record.run_id">
                <RouterLink
                  :to="'/job/' + jobId + '/run/' + record.run_id"
                  class="block px-4 py-2 hover:bg-hover dark:hover:bg-gray-600 dark:hover:text-textPrimary-dark"
                >
                  #{{ record.run_id }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ol>
  </nav>
</template>
