<script setup>
import { useApiStore } from "@/stores/api";

import Treeselect from "vue3-treeselect";
import { LOAD_CHILDREN_OPTIONS } from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";

import axios from "axios";
import _ from "lodash";
import moment from "moment";
</script>

<script>
export default {
  components: { Treeselect },
  data() {
    return {
      rawJobData: null,
      // Tree variables
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
    this.getJobData();
  },
  methods: {
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
        '[.[] | {id: ("entity_" + (.entity_id | tostring)), label: .name, children: null}]'
      );

      const urlTarget = new URL(this.apiStore.jobTarget);
      urlTarget.searchParams.append("name", jobName);
      urlTarget.searchParams.append(
        "jq",
        '[.[] | {id: ("entity_" + (.entity_id | tostring)), label: .name, children: null}]'
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
                id: `${parentNode.id}_job_constants`,
                label: "Constants",
                children: jobConstandData,
              };
              jobChildrenObject.push(constantObject);
            }

            const entityData = await this.getJobEntityData(parentNode.label);
            if (entityData.length > 0) {
              let entityObject = {
                id: `${parentNode.id}_entities`,
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
                id: `${parentNode.id}_relationships`,
                label: "Relationships",
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
                id: `${parentNode.id}_entity_constants`,
                label: "Constants",
                children: entityConstandData,
              };
              entityChildrenObject.push(constantObject);
            }

            const fieldData = await this.getFieldData(parentNode.label);
            if (fieldData.length > 0) {
              let fieldObject = {
                id: `${parentNode.id}_fields`,
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
  <div class="overflow-x-autosm:rounded-lg relative w-full">
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
              :load-options="loadOptions"
              :max-height="maxHeight"
              :multiple="true"
              :options="options"
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

/* .vue-treeselect__control {
  @apply bg-inputBg-dark;
} */

.vue-treeselect__input {
  /* padding-left: 0px !important; */
  @apply pl-0 !important;
  /* @apply bg-inputBg-dark; */
}

.vue-treeselect__menu-container {
  z-index: auto !important;
}
</style>
