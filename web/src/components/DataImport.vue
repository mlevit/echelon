<script setup>
import SvgIcon from "./SvgIcon.vue";

import axios from "axios";
import { initFlowbite } from "flowbite";
import _ from "lodash";
</script>

<script>
export default {
  data() {
    return { isImporting: false, pastedRecords: null };
  },
  mounted() {
    initFlowbite();
  },
};
</script>

<template>
  <div class="mb-4 w-full">
    <div
      class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg"
    >
      <div
        class="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0"
      >
        <div>
          <h5 class="mr-3 font-semibold dark:text-white">Import Data</h5>
          <p class="text-gray-500 dark:text-gray-400">
            Select files to import or paste a JSON payload
          </p>
        </div>
        <button
          type="button"
          class="inline-flex select-none items-center justify-center rounded-lg border border-border bg-background-lightest px-4 py-2 text-sm font-medium text-textPrimary hover:bg-hover hover:text-accent dark:border-gray-600 dark:bg-gray-700 dark:text-textPrimary-dark dark:hover:bg-gray-600 dark:hover:text-textPrimary-dark"
          :disabled="_.isEmpty(pastedRecords)"
        >
          {{ isImporting ? "" : "Import" }}
          <SvgIcon
            icon="reload"
            color="black"
            class="animate-spin"
            v-if="isImporting"
          />
        </button>
      </div>
    </div>
  </div>
  <div class="overflow-x-autosm:rounded-lg relative w-full">
    <div class="flex items-center justify-between pb-4">
      <div class="flex w-full items-center justify-center">
        <label
          for="dropzone-file"
          class="dark:hover:bg-bray-800 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pb-6 pt-5">
            <SvgIcon icon="download" class="mb-4" size="xl" />
            <p class="select-none text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept="application/JSON"
            class="hidden"
          />
        </label>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center">
    <div class="relative w-full overflow-x-auto rounded-lg text-center">
      <div class="select-none pb-4 text-gray-500 dark:text-gray-400">
        — or —
      </div>
    </div>
  </div>
  <div class="overflow-x-autosm:rounded-lg relative w-full">
    <div class="flex h-[calc(100vh-385px)] items-center justify-between">
      <textarea
        id="pastedRecords"
        class="block h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder=""
        v-model="pastedRecords"
      ></textarea>
    </div>
  </div>
</template>
