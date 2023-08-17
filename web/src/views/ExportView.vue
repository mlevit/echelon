<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
import { useApiStore } from "@/stores/api";
import axios from "axios";

import Treeselect from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";
</script>

<script>
export default {
  components: { Treeselect },
  data() {
    return {
      alwaysOpen: true,
      apiStore: useApiStore(),
      appendToBody: false,
      autoFocus: true,
      maxHeight: window.innerHeight - 200,
      options: null,
      value: null,
      valueConsistsOf: "ALL",
    };
  },
  created() {
    this.getExportData();
  },
  methods: {
    getExportData() {
      const url = new URL(this.apiStore.export);
      axios.get(url.href).then((response) => (this.options = response.data));
    },
  },
};
</script>

<template>
  <div class="min-h-screen p-4 dark:bg-background-darker sm:ml-64">
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2 flex h-fit items-center justify-center rounded">
        <div class="w-full">
          <div>
            <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">
              Available Records
            </h6>
          </div>
          <div
            class="flex h-fit border border-tableBorder marker:overflow-x-auto dark:border-tableBorder-dark sm:rounded-lg"
          >
            <treeselect
              v-model="value"
              :always-open="alwaysOpen"
              :append-to-body="appendToBody"
              :auto-focus="autoFocus"
              :max-height="maxHeight"
              :multiple="true"
              :options="[options]"
              :value-consists-of="valueConsistsOf"
              placeholder="Select records to export"
              v-if="options"
            />
          </div>
        </div>
      </div>
      <div class="flex h-fit items-center justify-center rounded">
        <div class="w-full">
          <div>
            <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">
              Selected Records
            </h6>
          </div>
          <div
            class="overflow-x-auto border border-tableBorder dark:border-tableBorder-dark sm:rounded-lg"
          >
            <pre
              class="h-full w-full overflow-y-auto rounded-lg border border-border-lighter bg-background-lightest p-4 text-textPrimary shadow dark:border-border-darker dark:bg-background-darker dark:text-textPrimary-dark"
              >{{ value }}</pre
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Remove focus borders from all input elements */
.vue-treeselect__input:focus {
  outline: none !important;
  border-color: transparent !important;
  box-shadow: none !important;
}

.vue-treeselect__control {
  @apply bg-inputBg-dark;
}

.vue-treeselect__input {
  /* padding-left: 0px !important; */
  @apply pl-0 !important;
  @apply bg-inputBg-dark;
}

.vue-treeselect__menu-container {
  z-index: auto !important;
}
</style>
