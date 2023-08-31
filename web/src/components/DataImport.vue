<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
import { useApiStore } from "@/stores/api";

import axios from "axios";
import { initFlowbite } from "flowbite";
import _ from "lodash";
</script>

<script>
export default {
  data() {
    return {
      alertMessage: "test",
      alertType: null,
      apiStore: useApiStore(),
      isImporting: false,
      insertSelection: false,
      updateSelection: false,
      deleteSelection: false,
      pastedEntries: null,
    };
  },
  mounted() {
    initFlowbite();
  },
  computed: {
    canImport() {
      return (
        !!this.pastedEntries &&
        (this.insertSelection || this.updateSelection || this.deleteSelection)
      );
    },
  },
  methods: {
    async importData() {
      if (!this.isImporting) {
        this.isImporting = true;

        let request = {
          inputJson: JSON.stringify(JSON.parse(this.pastedEntries)),
        };

        if (this.insertSelection) {
          request["insert"] = null;
        }
        if (this.updateSelection) {
          request["update"] = null;
        }
        if (this.updateSelection) {
          request["delete"] = null;
        }

        const url = new URL(this.apiStore.import);
        const response = await axios.post(url.href, request);

        this.isImporting = false;
      }
    },
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
        <div class="flex justify-between gap-x-4">
          <div class="flex">
            <div class="mr-4 flex items-center">
              <input
                id="insertCheckbox"
                type="checkbox"
                value="insert"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-accent focus:ring-0 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-accent-dark dark:ring-offset-gray-800 dark:focus:ring-accent-dark"
                v-model="insertSelection"
              />
              <label
                for="insertCheckbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                data-popover-target="popover-insert"
                data-popover-placement="bottom"
              >
                Insert
              </label>
            </div>
            <div class="mr-4 flex items-center">
              <input
                id="updateCheckbox"
                type="checkbox"
                value="update"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-accent focus:ring-0 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-accent-dark dark:ring-offset-gray-800 dark:focus:ring-accent-dark"
                v-model="updateSelection"
              />
              <label
                for="updateCheckbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                data-popover-target="popover-update"
                data-popover-placement="bottom"
              >
                Update
              </label>
            </div>
            <div class="mr-4 flex items-center">
              <input
                id="deleteCheckbox"
                type="checkbox"
                value="delete"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-accent focus:ring-0 focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-accent-dark dark:ring-offset-gray-800 dark:focus:ring-accent-dark"
                v-model="deleteSelection"
              />
              <label
                for="deleteCheckbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                data-popover-target="popover-delete"
                data-popover-placement="bottom"
              >
                Delete
              </label>
            </div>
          </div>
          <button
            type="button"
            class="inline-flex select-none items-center justify-center rounded-lg border border-border bg-background-lightest px-4 py-2 text-sm font-medium text-textPrimary hover:bg-hover hover:text-accent dark:border-gray-600 dark:bg-gray-700 dark:text-textPrimary-dark dark:hover:bg-gray-600 dark:hover:text-textPrimary-dark"
            @click="importData()"
            :disabled="!canImport"
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
  </div>
  <div class="overflow-x-autosm:rounded-lg relative w-full">
    <div class="flex items-center justify-between">
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
      <div class="inline-flex w-full items-center justify-center">
        <hr class="my-8 h-px w-64 border-0 bg-gray-200 dark:bg-gray-700" />
        <span
          class="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white"
          >or</span
        >
      </div>
    </div>
  </div>
  <div class="overflow-x-autosm:rounded-lg relative w-full">
    <div class="flex h-[calc(100vh-395px)] items-center justify-between">
      <textarea
        id="pastedEntries"
        class="block h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-sm text-gray-900 focus:border-accent focus:ring-accent dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-accent-dark dark:focus:ring-accent-dark"
        placeholder=""
        v-model="pastedEntries"
      ></textarea>
    </div>
  </div>
  <div
    data-popover
    id="popover-insert"
    role="tooltip"
    class="invisible absolute z-10 inline-block w-72 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
  >
    <div class="space-y-2 p-3">
      <h3 class="font-semibold text-gray-900 dark:text-white">
        Insert New Entries
      </h3>
      <p>
        Insert entries that are not present within Echelon. If a matching entry
        is found, no action will be taken.
      </p>
    </div>
    <div data-popper-arrow></div>
  </div>
  <div
    data-popover
    id="popover-update"
    role="tooltip"
    class="invisible absolute z-10 inline-block w-72 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
  >
    <div class="space-y-2 p-3">
      <h3 class="font-semibold text-gray-900 dark:text-white">
        Update Existing Entries
      </h3>
      <p>
        Update existing entries present within Echelon. If a matching entry does
        not exist, no action will taken.
      </p>
    </div>
    <div data-popper-arrow></div>
  </div>
  <div
    data-popover
    id="popover-delete"
    role="tooltip"
    class="invisible absolute z-10 inline-block w-72 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
  >
    <div class="space-y-2 p-3">
      <h3 class="font-semibold text-gray-900 dark:text-white">
        Delete Existing Entries
      </h3>
      <p>
        Delete existing entries that are not present within the imported
        entries.
      </p>
    </div>
    <div data-popper-arrow></div>
  </div>
</template>
