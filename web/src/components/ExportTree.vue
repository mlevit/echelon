<script setup>
import { useApiStore } from "@/stores/api";
import SvgIcon from "@/components/SvgIcon.vue";

import Treeselect from "vue3-treeselect";
import { LOAD_CHILDREN_OPTIONS } from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";

import axios from "axios";
import { initFlowbite } from "flowbite";
import _ from "lodash";
</script>

<script>
export default {
  components: { Treeselect },
  data() {
    return {
      isExporting: false,
      exportData: null,
      // Tree variables
      alwaysOpen: true,
      apiStore: useApiStore(),
      appendToBody: false,
      autoFocus: true,
      clearable: true,
      displayLimit: 0,
      maxHeight: window.innerHeight - 140,
      multiSelect: true,
      options: null,
      searchable: false,
      selectedRecords: null,
      valueConsistsOf: "ALL",
    };
  },
  created() {
    this.getJobData();
  },
  mounted() {
    initFlowbite();
  },
  methods: {
    copyData() {
      navigator.clipboard.writeText(JSON.stringify(this.exportData, null, 2));
    },
    getJobData() {
      const url = new URL(this.apiStore.job);
      url.searchParams.append(
        "jq",
        '[.[] | {id: ("job_" + (.job_id | tostring)), label: .name, children: null}]'
      );
      axios.get(url.href).then((response) => (this.options = response.data));
    },
    async getJobConstantData(jobName) {
      const url = new URL(this.apiStore.jobConstant);
      url.searchParams.append("name", jobName);
      url.searchParams.append(
        "jq",
        '[.[] | {id: ("job_constant_" + (.job_constant_id | tostring)), label: .name}]'
      );

      const response = await axios.get(url.href);
      return response.data;
    },
    async getJobEntityData(jobName) {
      const urlSource = new URL(this.apiStore.jobSource);
      urlSource.searchParams.append("name", jobName);
      urlSource.searchParams.append(
        "jq",
        '[.[] | {id: ("entity_" + (.entity_id | tostring)), label: .name, children: null, isDefaultExpanded: true}]'
      );

      const urlTarget = new URL(this.apiStore.jobTarget);
      urlTarget.searchParams.append("name", jobName);
      urlTarget.searchParams.append(
        "jq",
        '[.[] | {id: ("entity_" + (.entity_id | tostring)), label: .name, children: null, isDefaultExpanded: true}]'
      );

      const responseSource = await axios.get(urlSource.href);
      const responseTarget = await axios.get(urlTarget.href);
      return [...responseSource.data, ...responseTarget.data];
    },
    async getJobRelationshipData(jobName) {
      const url = new URL(this.apiStore.jobRelationship);
      url.searchParams.append("name", jobName);
      url.searchParams.append(
        "jq",
        '[.[] | {id: ("job_entity_rel_" + (.job_entity_rel_id | tostring)), label: ((.source_entity_name | tostring) + " > " + (.target_entity_name | tostring))}]'
      );

      const response = await axios.get(url.href);
      return response.data;
    },
    async getEntityConstantData(entityName) {
      const url = new URL(this.apiStore.entityConstant);
      url.searchParams.append("name", entityName);
      url.searchParams.append(
        "jq",
        '[.[] | {id: ("entity_constant_" + (.entity_constant_id | tostring)), label: .name}]'
      );

      const response = await axios.get(url.href);
      return response.data;
    },
    async getFieldData(entityName) {
      const url = new URL(this.apiStore.entityField);
      url.searchParams.append("name", entityName);
      url.searchParams.append(
        "jq",
        '[.[] | {id: ("field_" + (.field_id | tostring)), label: .physical_name}]'
      );

      const response = await axios.get(url.href);
      return response.data;
    },
    getCleanExportRequest() {
      const cleanRequest = {};
      for (const item of this.selectedRecords) {
        if (item.charAt(0) != "!") {
          let table = item.slice(0, item.lastIndexOf("_"));
          let recordId = item.slice(item.lastIndexOf("_") + 1, item.length);

          cleanRequest[table] = cleanRequest[table] || [];
          cleanRequest[table].push(recordId);
        }
      }

      return cleanRequest;
    },
    async getExportData() {
      if (this.isExporting) {
        this.isExporting = false;
      } else {
        this.isExporting = true;
        this.exportData = null;

        const url = new URL(this.apiStore.export);
        // url.searchParams.append("table", ["job", "entity"]);
        // url.searchParams.append("record", this.getCleanExportRequest());
        const response = await axios.post(url.href, {
          apiJson: JSON.stringify(this.getCleanExportRequest()),
        });

        this.exportData = response.data;
        this.isExporting = false;
        // return response.data;
      }
    },
    async loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        switch (true) {
          case /job_\d+/.test(parentNode.id):
            let jobChildrenObject = [];

            const jobConstandData = await this.getJobConstantData(
              parentNode.label
            );
            if (jobConstandData.length > 0) {
              let constantObject = {
                id: `!${parentNode.id}_job_constants`,
                label: "Constants",
                children: jobConstandData,
              };
              jobChildrenObject.push(constantObject);
            }

            const entityData = await this.getJobEntityData(parentNode.label);
            if (entityData.length > 0) {
              let entityObject = {
                id: `!${parentNode.id}_entities`,
                label: "Entities",
                children: entityData,
              };
              jobChildrenObject.push(entityObject);
            }

            const jobRelationshipData = await this.getJobRelationshipData(
              parentNode.label
            );
            if (jobRelationshipData.length > 0) {
              let jobRelationshipObject = {
                id: `!${parentNode.id}_relationships`,
                label: "Entity Relationships",
                children: jobRelationshipData,
              };
              jobChildrenObject.push(jobRelationshipObject);
            }

            parentNode.children = jobChildrenObject;

            callback();
            break;
          case /entity_\d+/.test(parentNode.id):
            let entityChildrenObject = [];

            const entityConstandData = await this.getEntityConstantData(
              parentNode.label
            );
            if (entityConstandData.length > 0) {
              let constantObject = {
                id: `!${parentNode.id}_entity_constants`,
                label: "Constants",
                children: entityConstandData,
              };
              entityChildrenObject.push(constantObject);
            }

            const fieldData = await this.getFieldData(parentNode.label);
            if (fieldData.length > 0) {
              let fieldObject = {
                id: `!${parentNode.id}_fields`,
                label: "Fields",
                children: fieldData,
              };
              entityChildrenObject.push(fieldObject);
            }

            parentNode.children = entityChildrenObject;

            callback();
            break;
          default:
            break;
        }
      }
    },
  },
};
</script>

<template>
  <div class="overflow-x-autosm:rounded-lg relative h-fit w-full">
    <div class="grid h-fit grid-cols-9 gap-4">
      <div class="col-span-4 flex h-fit items-center justify-center rounded">
        <div class="w-full">
          <div>
            <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">
              Available Records
            </h6>
          </div>
          <div class="flex h-fit marker:overflow-x-auto">
            <treeselect
              v-model="selectedRecords"
              :always-open="alwaysOpen"
              :append-to-body="appendToBody"
              :auto-focus="autoFocus"
              :clearable="clearable"
              limit="displayLimit"
              :load-options="loadOptions"
              :max-height="maxHeight"
              :multiple="multiSelect"
              :options="options"
              :searchable="searchable"
              :value-consists-of="valueConsistsOf"
              placeholder="..."
              v-if="options"
            />
          </div>
        </div>
      </div>
      <div class="flex h-full items-center justify-center pt-[46px]">
        <button
          type="button"
          class="inline-flex min-w-full max-w-full select-none items-center justify-center rounded-lg border border-border bg-background-lightest px-4 py-2 text-sm font-medium text-textPrimary hover:bg-hover hover:text-accent dark:border-gray-600 dark:bg-gray-700 dark:text-textPrimary-dark dark:hover:bg-gray-600 dark:hover:text-textPrimary-dark"
          @click="getExportData()"
        >
          {{ isExporting ? "" : "Export" }}
          <SvgIcon
            :icon="isExporting ? 'reload' : 'chevronRight'"
            color="black"
            :class="isExporting ? 'animate-spin' : 'animate-name ml-2'"
          />
        </button>
      </div>
      <div class="col-span-4 flex h-full items-center justify-center rounded">
        <div class="w-full">
          <div class="flex items-center">
            <h6 class="mb-4 text-lg font-bold dark:text-textPrimary-dark">
              Exported Records
            </h6>
            <SvgIcon
              icon="clipboard"
              color="black"
              class="mb-4 ml-2 cursor-pointer"
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
          <div
            class="overflow-x-auto border border-tableBorder dark:border-tableBorder-dark sm:rounded-lg"
          >
            <pre
              class="h-[calc(100vh-140px)] max-h-[calc(100vh-140px)] w-full overflow-y-auto rounded-lg border border-border-lighter bg-background-lightest p-4 text-textPrimary shadow dark:border-border-darker dark:bg-background-darker dark:text-textPrimary-dark"
              >{{ exportData }}</pre
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

.vue-treeselect {
  @apply h-full w-full;
  @apply rounded-lg;
}

.vue-treeselect__control {
  @apply bg-inputBg dark:bg-inputBg-dark;
  @apply border-inputBorder dark:border-inputBorder-dark;
  @apply hidden;
}

.vue-treeselect__control:hover {
  @apply border-inputBorder dark:border-inputBorder-dark !important;
}

.vue-treeselect__multi-value {
  @apply mb-0 !important;
}
.vue-treeselect__list {
  @apply border-inputBorder dark:border-inputBorder-dark;
  @apply w-full;
}

.vue-treeselect__option {
  @apply hover:bg-hover hover:dark:bg-hover-dark;
}

.vue-treeselect__menu {
  @apply bg-background dark:bg-background-darker;
  @apply border-inputBorder dark:border-inputBorder-dark;
  @apply h-[calc(100vh-140px)] w-full !important;
  @apply p-0;
  @apply rounded-lg;
}

.vue-treeselect__input {
  @apply pl-0 !important;
}

.vue-treeselect__option--highlight {
  @apply bg-transparent dark:bg-transparent;
}

.vue-treeselect__label {
  @apply text-textPrimary dark:text-textPrimary-dark;
}
</style>
